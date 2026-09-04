import { describe, expect, it } from "vitest";
import {
  parseFaqMarkdown,
  parseSeoMdx,
  publicPathForTemplate,
  splitBodyAndFaq,
} from "@/lib/parse-seo-mdx";
import { relatedServiceSlug, listSeoPages } from "@/lib/seo-content";

const sample = `---
{
  "title": "What Is Final Expense Insurance?",
  "slug": "what-is-final-expense-insurance",
  "template": "blog-page",
  "description": "A plain-language guide."
}
---

**Quick answer:** Final expense insurance helps with funeral costs.

## What it covers

Body text here.

## Frequently Asked Questions

**Is this burial insurance?**

People often use the names interchangeably.
`;

describe("parseSeoMdx", () => {
  it("reads factory JSON frontmatter and template", () => {
    const parsed = parseSeoMdx(sample);
    expect(parsed.frontmatter.template).toBe("blog-page");
    expect(parsed.frontmatter.slug).toBe("what-is-final-expense-insurance");
    expect(parsed.aeoAnswer).toMatch(/funeral costs/);
    expect(parsed.body).toContain("What it covers");
    expect(parsed.body).not.toContain("Frequently Asked Questions");
    expect(parsed.faq).toHaveLength(1);
    expect(parsed.faq[0].question).toBe("Is this burial insurance?");
  });

  it("keeps a Sources section after FAQ in the body", () => {
    const parsed = parseSeoMdx(`${sample}

## Sources

- [NAIC](https://content.naic.org)
`);
    expect(parsed.faq).toHaveLength(1);
    expect(parsed.body).toContain("## Sources");
  });
});

describe("publicPathForTemplate", () => {
  it("routes each lead-gen template to the right prefix", () => {
    expect(publicPathForTemplate("blog-page", "what-is-final-expense-insurance")).toBe(
      "/resources/what-is-final-expense-insurance"
    );
    expect(publicPathForTemplate("insurance-type-page", "final-expense-insurance")).toBe(
      "/insurance/final-expense-insurance"
    );
    expect(publicPathForTemplate("location-page", "final-expense-insurance-in-florida")).toBe(
      "/locations/final-expense-insurance-in-florida"
    );
  });
});

describe("splitBodyAndFaq", () => {
  it("extracts the factory FAQ markdown shape", () => {
    const { faq } = splitBodyAndFaq(`## Intro

Hello.

## Frequently Asked Questions

**Question one?**

Answer one.

**Question two?**

Answer two.
`);
    expect(faq.map((f) => f.question)).toEqual(["Question one?", "Question two?"]);
  });
});

describe("parseFaqMarkdown", () => {
  it("returns empty for prose without questions", () => {
    expect(parseFaqMarkdown("Just a paragraph.")).toEqual([]);
  });
});

describe("relatedServiceSlug", () => {
  it("maps SEO slugs back to branded service pages", () => {
    expect(relatedServiceSlug("final-expense-insurance-in-florida")).toBe("final-expense");
    expect(relatedServiceSlug("mortgage-protection-guide")).toBe("mortgage-protection");
  });
});

describe("listSeoPages", () => {
  it("loads stub MDX for all three lead-gen templates", () => {
    const pages = listSeoPages();
    const templates = new Set(pages.map((p) => p.frontmatter.template));
    expect(templates.has("blog-page")).toBe(true);
    expect(templates.has("insurance-type-page")).toBe(true);
    expect(templates.has("location-page")).toBe(true);
    expect(pages.some((p) => p.path === "/resources/what-is-final-expense-insurance")).toBe(true);
    expect(pages.some((p) => p.path === "/insurance/final-expense-insurance")).toBe(true);
    expect(pages.some((p) => p.path === "/locations/final-expense-insurance-in-florida")).toBe(true);
  });
});
