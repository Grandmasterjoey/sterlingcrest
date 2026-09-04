import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/page-meta";
import { listSeoPagesByPrefix } from "@/lib/seo-content";

const ResourcesIndex = () => {
  const pages = listSeoPagesByPrefix("/resources");
  usePageMeta({
    title: "Guides",
    description:
      "Clear, family-focused guides on final expense insurance and related protection planning from Sterling Crest Financial Group.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-32 pb-20">
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
            Resources
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            Guides for families
          </h1>
          <div className="gold-underline w-16 mt-6 mb-8" />
          <p className="text-base md:text-lg text-muted-foreground font-sans mb-12">
            Educational articles on final expense coverage and the protection
            decisions that surround it. When you are ready, a complimentary
            consultation is the next step.
          </p>
          <ul className="space-y-8">
            {pages.map((page) => (
              <li key={page.path} className="border-t border-border pt-8">
                <Link to={page.path} className="group block">
                  <h2 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                    {page.frontmatter.title}
                  </h2>
                  {page.frontmatter.description && (
                    <p className="mt-3 text-muted-foreground font-sans leading-relaxed">
                      {page.frontmatter.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesIndex;
