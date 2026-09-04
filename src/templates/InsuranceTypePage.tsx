import { Link } from "react-router-dom";
import { MarkdownBody } from "@/lib/markdown";
import { serviceImages } from "@/lib/images";
import { getService } from "@/lib/services";
import { relatedServiceSlug, type SeoPage } from "@/lib/seo-content";
import {
  AeoAnswer,
  ConsultCta,
  Disclosures,
  FaqSection,
  RelatedLinks,
  SeoChrome,
} from "./seo-shared";

const InsuranceTypePage = ({ page }: { page: SeoPage }) => {
  const { frontmatter, body, aeoAnswer, faq } = page;
  const serviceSlug = relatedServiceSlug(frontmatter.slug);
  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const hero = serviceSlug ? serviceImages[serviceSlug] : serviceImages["final-expense"];
  const isFinalExpense = serviceSlug === "final-expense";

  return (
    <SeoChrome page={page}>
      <section className="relative pt-24 md:pt-28">
        <div className="relative min-h-[320px] md:min-h-[380px] flex items-end overflow-hidden">
          {hero && (
            <img
              src={hero}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/55" />
          <div className="container max-w-4xl mx-auto px-6 pb-12 md:pb-16 relative z-10">
            <Link
              to="/insurance"
              className="inline-block text-primary text-xs tracking-[0.3em] uppercase font-sans mb-6 hover:text-primary/80 transition-colors"
            >
              ← Coverage guides
            </Link>
            <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-3">
              {service?.title ?? "Insurance"}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              {frontmatter.title}
            </h1>
          </div>
        </div>
      </section>

      {aeoAnswer && (
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl mx-auto px-6">
            <AeoAnswer answer={aeoAnswer} />
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl mx-auto px-6">
          <MarkdownBody markdown={body} />
          {service && (
            <p className="mt-10 text-sm text-muted-foreground font-sans">
              Looking for a shorter overview? See our{" "}
              <Link
                to={`/services/${service.slug}`}
                className="text-primary hover:underline underline-offset-4"
              >
                {service.title.toLowerCase()}
              </Link>{" "}
              page.
            </p>
          )}
          <RelatedLinks hrefs={frontmatter.internalLinks} />
        </div>
      </section>

      <FaqSection faq={faq} />
      <ConsultCta
        heading={
          isFinalExpense
            ? "Ready to talk through final expense coverage?"
            : "Start with the conversation that protects your family."
        }
        body={
          isFinalExpense
            ? "Schedule a complimentary consultation to discuss funeral costs, qualification, and coverage options — with no obligation."
            : "Most families start with final expense planning, then decide whether additional coverage belongs in the picture. A complimentary consultation can help you sort that out."
        }
      />
      <Disclosures items={frontmatter.disclosures} />
    </SeoChrome>
  );
};

export default InsuranceTypePage;
