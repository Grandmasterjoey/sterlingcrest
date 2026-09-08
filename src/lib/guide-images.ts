import type { SeoFrontmatter } from "./parse-seo-mdx";
import { serviceImages } from "./images";

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Topic-relevant images for final expense and related guides. */
const guideImageLibrary = {
  familyPlanning: unsplash("1543342384-1f1350e27861"),
  familiesOutdoors: unsplash("1529156069898-49953e39b3ac"),
  generationalWalk: unsplash("1511895426328-dc8714191300"),
  coastalWarm: unsplash("1507525428034-b723cf961d3e"),
  financialPlanning: unsplash("1454165804606-c3d57bc86b40"),
  advisorConsultation: unsplash("1551836022-d5d88e9218df"),
  homeLegacy: unsplash("1560518883-ce09059eeffa"),
} as const;

const GUIDE_IMAGE_BY_SLUG: Record<string, string> = {
  "what-is-final-expense-insurance": guideImageLibrary.familyPlanning,
  "how-much-does-final-expense-insurance-cost": guideImageLibrary.financialPlanning,
  "final-expense-insurance-rates-by-age": guideImageLibrary.generationalWalk,
  "simplified-issue-vs-guaranteed-issue-final-expense-insurance":
    guideImageLibrary.advisorConsultation,
  "final-expense-insurance": guideImageLibrary.familiesOutdoors,
  "final-expense-insurance-in-florida": guideImageLibrary.coastalWarm,
  "final-expense-insurance-florida": guideImageLibrary.familiesOutdoors,
};

const GUIDE_IMAGE_POOL = Object.values(guideImageLibrary);

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

function matchesAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function resolveByTopic(input: GuideImageInput): string | undefined {
  const slug = input.slug.toLowerCase();
  const keyword = (input.targetKeyword ?? "").toLowerCase();
  const combined = `${slug} ${keyword}`;

  if (input.template === "location-page" || matchesAny(combined, ["-in-", " florida", " texas", " georgia", " michigan", " north-carolina", "location"])) {
    if (matchesAny(combined, ["florida", "-fl"])) return guideImageLibrary.coastalWarm;
    if (matchesAny(combined, ["texas", "-tx"])) return guideImageLibrary.generationalWalk;
    return guideImageLibrary.coastalWarm;
  }

  if (matchesAny(combined, ["rates-by-age", "by-age", "at-50", "at-60", "at-70", "at-80", "50-80"])) {
    return guideImageLibrary.generationalWalk;
  }

  if (matchesAny(combined, ["how-much", "cost", "rate", "premium", "price", "afford"])) {
    return guideImageLibrary.financialPlanning;
  }

  if (matchesAny(combined, ["simplified", "guaranteed", "-vs-", "comparison", "compare"])) {
    return guideImageLibrary.advisorConsultation;
  }

  if (
    matchesAny(combined, [
      "copd",
      "diabetes",
      "cancer",
      "stroke",
      "heart",
      "health",
      "condition",
      "eligibility",
      "medication",
    ])
  ) {
    return guideImageLibrary.advisorConsultation;
  }

  if (matchesAny(combined, ["what-is", "how-does", "how-do", "work", "cover", "need"])) {
    return guideImageLibrary.familyPlanning;
  }

  if (matchesAny(combined, ["burial", "funeral"])) {
    return guideImageLibrary.homeLegacy;
  }

  if (matchesAny(combined, ["mortgage"])) return serviceImages["mortgage-protection"];
  if (matchesAny(combined, ["term-life", "term life"])) return serviceImages["term-life"];
  if (matchesAny(combined, ["whole-life", "whole life"])) return serviceImages["whole-life"];
  if (matchesAny(combined, ["annuit"])) return serviceImages["annuity"];
  if (matchesAny(combined, ["retirement", "legacy"])) return serviceImages["retirement-legacy"];

  return undefined;
}

/** Resolve a unique, topic-relevant hero/thumbnail image for an SEO guide page. */
export function resolveGuideImage(input: GuideImageInput): string {
  if (input.heroImage) {
    return normalizeHeroImage(input.heroImage);
  }

  const slugKey = input.slug.replace(/^\/+/, "").replace(/\.(mdx|md)$/i, "");
  const explicit = GUIDE_IMAGE_BY_SLUG[slugKey];
  if (explicit) return explicit;

  const topical = resolveByTopic(input);
  if (topical) return topical;

  const poolIndex = hashSlug(slugKey) % GUIDE_IMAGE_POOL.length;
  return GUIDE_IMAGE_POOL[poolIndex];
}

export function guideHeroImage(page: { frontmatter: SeoFrontmatter }): string {
  return resolveGuideImage(page.frontmatter);
}
