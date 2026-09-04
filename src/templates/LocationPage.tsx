import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import { MarkdownBody } from "@/lib/markdown";
import { serviceImages } from "@/lib/images";
import type { SeoPage } from "@/lib/seo-content";
import {
  AeoAnswer,
  ConsultCta,
  Disclosures,
  FaqSection,
  RelatedLinks,
  SeoChrome,
} from "./seo-shared";

function locationLabel(page: SeoPage): string {
  const state = page.frontmatter.targetState;
  if (state) return state;
  const kw = page.frontmatter.targetKeyword ?? "";
  const m = kw.match(/\bin\s+(.+)$/i);
  return m?.[1] ?? "Your area";
}

const LocationPage = ({ page }: { page: SeoPage }) => {
  const { frontmatter, body, aeoAnswer, faq } = page;
  const place = locationLabel(page);
  const hero = serviceImages["final-expense"];

  return (
    <SeoChrome page={page}>
      <section className="relative pt-24 md:pt-28">
        <div className="relative min-h-[320px] md:min-h-[400px] flex items-end overflow-hidden">
          <img
            src={hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/50" />
          <div className="container max-w-4xl mx-auto px-6 pb-12 md:pb-16 relative z-10">
            <Link
              to="/locations"
              className="inline-block text-primary text-xs tracking-[0.3em] uppercase font-sans mb-6 hover:text-primary/80 transition-colors"
            >
              ← Locations
            </Link>
            <p className="inline-flex items-center gap-2 text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-3">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.6} />
              {place} · Final Expense
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              {frontmatter.title}
            </h1>
          </div>
        </div>
      </section>

      <TrustBar />

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
          <p className="mt-10 text-sm text-muted-foreground font-sans">
            Learn more about{" "}
            <Link
              to="/services/final-expense"
              className="text-primary hover:underline underline-offset-4"
            >
              final expense insurance
            </Link>{" "}
            or browse other{" "}
            <Link
              to="/#services"
              className="text-primary hover:underline underline-offset-4"
            >
              coverage options
            </Link>
            .
          </p>
          <RelatedLinks hrefs={frontmatter.internalLinks} />
        </div>
      </section>

      <FaqSection faq={faq} />
      <ConsultCta
        heading={`Final expense help for families in ${place}.`}
        body="Sterling Crest serves clients nationwide. Schedule a complimentary consultation to talk through coverage — no local office visit required."
      />
      <Disclosures items={frontmatter.disclosures} />
    </SeoChrome>
  );
};

export default LocationPage;
