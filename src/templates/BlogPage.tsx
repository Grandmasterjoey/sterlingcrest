import { Link } from "react-router-dom";
import { MarkdownBody } from "@/lib/markdown";
import type { SeoPage } from "@/lib/seo-content";
import {
  AeoAnswer,
  ConsultCta,
  Disclosures,
  FaqSection,
  RelatedLinks,
  SeoChrome,
} from "./seo-shared";

const BlogPage = ({ page }: { page: SeoPage }) => {
  const { frontmatter, body, aeoAnswer, faq } = page;

  return (
    <SeoChrome page={page}>
      <article className="pt-28 md:pt-32">
        <header className="container max-w-3xl mx-auto px-6 pb-12">
          <Link
            to="/resources"
            className="inline-block text-primary text-xs tracking-[0.3em] uppercase font-sans mb-6 hover:text-primary/80 transition-colors"
          >
            ← Guides
          </Link>
          <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
            Guide
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            {frontmatter.title}
          </h1>
          <div className="gold-underline w-16 mt-6" />
        </header>

        {aeoAnswer && (
          <div className="container max-w-3xl mx-auto px-6 mb-12">
            <AeoAnswer answer={aeoAnswer} />
          </div>
        )}

        <section className="pb-16 md:pb-20">
          <div className="container max-w-3xl mx-auto px-6">
            <MarkdownBody markdown={body} />
            <RelatedLinks hrefs={frontmatter.internalLinks} />
          </div>
        </section>

        <FaqSection faq={faq} />
        <ConsultCta
          heading="The right protection starts with the right conversation."
          body="Schedule a complimentary consultation to talk through final expense coverage and any other protection your family may need."
        />
        <Disclosures items={frontmatter.disclosures} />
      </article>
    </SeoChrome>
  );
};

export default BlogPage;
