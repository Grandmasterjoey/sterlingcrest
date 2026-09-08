import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import { MarkdownBody } from "@/lib/markdown";
import { guideHeroImage, type SeoPage } from "@/lib/seo-content";
import {
  ConsultCta,
  Disclosures,
  FaqSection,
  GuideHero,
  GuideIntro,
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
  const hero = guideHeroImage(page);

  return (
    <SeoChrome page={page}>
      <GuideHero
        image={hero}
        backTo="/locations"
        backLabel="← Locations"
        tall
        eyebrow={
          <p className="inline-flex items-center gap-2 text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-3">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.6} />
            {place} · Final Expense
          </p>
        }
        title={frontmatter.title}
      />

      <TrustBar />

      <GuideIntro aeoAnswer={aeoAnswer} className="pt-12 md:pt-16" />

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
