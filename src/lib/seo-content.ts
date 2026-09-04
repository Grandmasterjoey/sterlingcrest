import {
  parseSeoMdx,
  publicPathForTemplate,
  type ParsedSeoMdx,
} from "./parse-seo-mdx";

const rawPages = import.meta.glob("../../content/seo/*.mdx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type SeoPage = ParsedSeoMdx & {
  path: string;
  file: string;
};

function loadPages(): SeoPage[] {
  return Object.entries(rawPages).map(([file, raw]) => {
    const parsed = parseSeoMdx(raw);
    return {
      ...parsed,
      file,
      path: publicPathForTemplate(parsed.frontmatter.template, parsed.frontmatter.slug),
    };
  });
}

const pages = loadPages();
const byPath = new Map(pages.map((p) => [p.path, p]));

export function listSeoPages(): SeoPage[] {
  return pages;
}

export function listSeoPagesByPrefix(prefix: string): SeoPage[] {
  return pages.filter((p) => p.path.startsWith(prefix));
}

export function getSeoPageByPath(pathname: string): SeoPage | undefined {
  const clean = pathname.replace(/\/$/, "") || "/";
  return byPath.get(clean);
}

export function relatedServiceSlug(pageSlug: string): string | undefined {
  const s = pageSlug.toLowerCase();
  if (s.includes("final-expense") || s.includes("burial") || s.includes("funeral")) {
    return "final-expense";
  }
  if (s.includes("mortgage")) return "mortgage-protection";
  if (s.includes("term-life") || s.includes("term-life-insurance")) return "term-life";
  if (s.includes("whole-life")) return "whole-life";
  if (s.includes("annuit")) return "annuity";
  if (s.includes("retirement") || s.includes("legacy")) return "retirement-legacy";
  return undefined;
}
