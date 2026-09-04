import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { scheduleConsultationHref } from "@/lib/contact";
import { usePageMeta } from "@/lib/page-meta";
import type { SeoPage } from "@/lib/seo-content";
import type { SeoFaq } from "@/lib/parse-seo-mdx";

export function SeoChrome({
  page,
  children,
}: {
  page: SeoPage;
  children: ReactNode;
}) {
  const { frontmatter } = page;
  usePageMeta({
    title: frontmatter.title,
    description: frontmatter.description,
    canonical: frontmatter.canonical,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {frontmatter.schema?.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      {children}
      <Footer />
    </div>
  );
}

export function AeoAnswer({
  answer,
  eyebrow = "Quick answer",
}: {
  answer: string;
  eyebrow?: string;
}) {
  return (
    <div
      data-aeo-answer
      className="aeo-answer border-l-2 border-primary bg-card pl-6 pr-6 py-6 md:py-8"
    >
      <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-3">
        {eyebrow}
      </p>
      <p className="text-base md:text-lg leading-relaxed text-foreground/85 font-sans">
        {answer}
      </p>
    </div>
  );
}

export function FaqSection({ faq }: { faq: SeoFaq[] }) {
  if (!faq.length) return null;
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="container max-w-3xl mx-auto px-6">
        <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
          Questions
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faq.map((item) => (
            <div key={item.question} className="border-t border-border pt-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                {item.question}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground font-sans">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultCta({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-secondary text-secondary-foreground">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">
          {heading}
        </h2>
        <p className="text-white/70 font-sans mb-10 max-w-xl mx-auto">{body}</p>
        <Link
          to={scheduleConsultationHref}
          className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-sans hover:opacity-90 transition-all duration-300"
        >
          Schedule a Consultation
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export function Disclosures({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="py-10">
      <div className="container max-w-3xl mx-auto px-6">
        {items.map((d) => (
          <p
            key={d}
            className="text-xs leading-relaxed text-muted-foreground/80 font-sans"
          >
            {d}
          </p>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinks({ hrefs }: { hrefs?: string[] }) {
  if (!hrefs?.length) return null;
  return (
    <nav className="mt-12 flex flex-wrap gap-4">
      {hrefs.map((href) => (
        <Link
          key={href}
          to={href}
          className="text-xs tracking-[0.25em] uppercase font-sans text-foreground/70 hover:text-primary transition-colors"
        >
          {href === "/book" ? "Book a consultation" : href}
        </Link>
      ))}
    </nav>
  );
}
