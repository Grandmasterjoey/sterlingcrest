import type { SeoFrontmatter } from "./parse-seo-mdx";
import { serviceImages } from "./images";
import {
  BASE_GUIDE_IMAGE_CATALOG,
  GUIDE_IMAGE_VARIANTS_PER_PHOTO,
  type CatalogPhoto,
} from "./guide-image-catalog";

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Lock images for live pages — preserves existing hero/thumbnail appearance. */
const GUIDE_IMAGE_BY_SLUG: Record<string, string> = {
  "what-is-final-expense-insurance": unsplash("1543342384-1f1350e27861"),
  "how-much-does-final-expense-insurance-cost": unsplash("1454165804606-c3d57bc86b40"),
  "final-expense-insurance-rates-by-age": unsplash("1511895426328-dc8714191300"),
  "simplified-issue-vs-guaranteed-issue-final-expense-insurance": unsplash(
    "1551836022-d5d88e9218df"
  ),
  "final-expense-insurance": unsplash("1529156069898-49953e39b3ac"),
  "final-expense-insurance-in-florida": unsplash("1507525428034-b723cf961d3e"),
  "final-expense-insurance-florida": unsplash("1529156069898-49953e39b3ac"),
  "final-expense-insurance-with-copd": unsplash("1551836022-d5d88e9218df"),
  "final-expense-insurance-for-seniors-georgia": unsplash("1511895426328-dc8714191300"),
  "final-expense-insurance-with-diabetes": unsplash("1543342384-1f1350e27861"),
};

type GuideImageInput = Pick<
  SeoFrontmatter,
  "slug" | "heroImage" | "targetKeyword" | "template" | "lane" | "targetState"
>;

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function normalizeHeroImage(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  if (/^\d+-[a-f0-9]+$/i.test(trimmed)) {
    return unsplash(trimmed);
  }
  return trimmed;
}

function photoKey(photo: CatalogPhoto): string {
  return photo.url ?? photo.id;
}

function basePhotoUrl(photo: CatalogPhoto): string {
  return photo.url ?? unsplash(photo.id);
}

function variantImageUrl(baseUrl: string, slug: string, variant: number): string {
  const h = hashSlug(`${slug}:v${variant}`);
  const w = 860 + (h % 80);
  const fpX = ((h >> 4) % 100) / 100;
  const fpY = ((h >> 12) % 100) / 100;
  const u = new URL(baseUrl.includes("://") ? baseUrl : unsplash(baseUrl));
  u.searchParams.set("auto", "format");
  u.searchParams.set("fit", "crop");
  u.searchParams.set("w", String(w));
  u.searchParams.set("q", "80");
  u.searchParams.set("fp-x", fpX.toFixed(3));
  u.searchParams.set("fp-y", fpY.toFixed(3));
  return u.toString();
}

function scorePhoto(photo: CatalogPhoto, input: GuideImageInput): number {
  const slug = input.slug.toLowerCase();
  const keyword = (input.targetKeyword ?? "").toLowerCase();
  const combined = `${slug} ${keyword}`;
  const state = input.targetState?.trim().toUpperCase();
  let score = 0;

  for (const tag of photo.tags) {
    if (tag.startsWith("state:")) {
      const code = tag.slice(6).toUpperCase();
      if (state === code) score += 80;
      if (combined.includes(code.toLowerCase())) score += 40;
      continue;
    }
    if (tag.startsWith("condition:")) {
      const condition = tag.slice(10);
      if (combined.includes(condition)) score += 70;
      continue;
    }
    if (combined.includes(tag)) score += 12;
  }

  if (input.template === "location-page" && photo.tags.includes("location")) score += 25;
  if (input.template === "condition-page" && photo.tags.some((t) => t.startsWith("condition:"))) {
    score += 25;
  }

  if (combined.includes("mortgage") && photo.tags.includes("mortgage")) score += 20;
  if (combined.includes("term-life") && photo.tags.includes("term-life")) score += 20;
  if (combined.includes("whole-life") && photo.tags.includes("whole-life")) score += 20;
  if (combined.includes("annuit") && photo.tags.includes("annuity")) score += 20;
  if (combined.includes("retirement") && photo.tags.includes("retirement")) score += 20;

  score += (hashSlug(`${input.slug}:${photoKey(photo)}`) % 7) * 0.01;
  return score;
}

function dedupeCatalog(photos: CatalogPhoto[]): CatalogPhoto[] {
  const seen = new Set<string>();
  const out: CatalogPhoto[] = [];
  for (const photo of photos) {
    const key = photoKey(photo);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(photo);
  }
  return out;
}

function sortedCatalog(input: GuideImageInput): CatalogPhoto[] {
  return dedupeCatalog(BASE_GUIDE_IMAGE_CATALOG).map((photo) => ({
    photo,
    score: scorePhoto(photo, input),
  }))
    .sort((a, b) => b.score - a.score || photoKey(a.photo).localeCompare(photoKey(b.photo)))
    .map((entry) => entry.photo);
}

function assignFromCatalog(input: GuideImageInput, usedImages?: ReadonlySet<string>): string {
  const slugKey = input.slug.replace(/^\/+/, "").replace(/\.(mdx|md)$/i, "");
  const usedUrls = usedImages ?? new Set<string>();
  const catalog = sortedCatalog(input);

  for (const photo of catalog) {
    const url = basePhotoUrl(photo);
    if (!usedUrls.has(url)) return url;
  }

  for (const photo of catalog) {
    const base = basePhotoUrl(photo);
    for (let variant = 1; variant <= GUIDE_IMAGE_VARIANTS_PER_PHOTO; variant += 1) {
      const url = variantImageUrl(base, slugKey, variant);
      if (!usedUrls.has(url)) return url;
    }
  }

  const fallback = catalog[0];
  if (fallback) {
    return variantImageUrl(basePhotoUrl(fallback), slugKey, hashSlug(slugKey) % 997 + 1);
  }

  if (input.targetKeyword?.includes("mortgage")) return serviceImages["mortgage-protection"];
  if (input.targetKeyword?.includes("term-life")) return serviceImages["term-life"];
  if (input.targetKeyword?.includes("whole-life")) return serviceImages["whole-life"];
  if (input.targetKeyword?.includes("annuit")) return serviceImages["annuity"];
  if (input.targetKeyword?.includes("retirement")) return serviceImages["retirement-legacy"];

  return unsplash("1543342384-1f1350e27861");
}

/** Resolve a unique, topic-relevant hero/thumbnail image for an SEO guide page. */
export function resolveGuideImage(input: GuideImageInput): string {
  if (input.heroImage) return normalizeHeroImage(input.heroImage);

  const slugKey = input.slug.replace(/^\/+/, "").replace(/\.(mdx|md)$/i, "");
  const explicit = GUIDE_IMAGE_BY_SLUG[slugKey];
  if (explicit) return explicit;

  return assignFromCatalog(input);
}

export function guideHeroImage(page: { frontmatter: SeoFrontmatter }): string {
  return resolveGuideImage(page.frontmatter);
}
