import { Link } from "react-router-dom";
import HeroFullBleed from "@/components/HeroSection";
import HeroSplit from "@/components/HeroSection.split.bak";

const Label = ({ tag, title, note }: { tag: string; title: string; note: string }) => (
  <div className="sticky top-0 z-50 bg-secondary text-secondary-foreground border-b border-white/10">
    <div className="container max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="text-xs tracking-[0.3em] uppercase text-primary font-sans">{tag}</span>
      <span className="font-serif text-lg text-white">{title}</span>
      <span className="text-sm text-white/55 font-sans">— {note}</span>
    </div>
  </div>
);

const Compare = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-foreground">Hero Layout Comparison</h1>
            <p className="text-sm text-muted-foreground font-sans mt-1">
              Scroll to compare both options. The live site currently uses Option A.
            </p>
          </div>
          <Link
            to="/"
            className="text-xs tracking-[0.25em] uppercase font-sans text-foreground/70 hover:text-primary transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>

      <Label tag="Option A" title="Full-bleed" note="full-viewport image, immersive/cinematic" />
      <HeroFullBleed />

      <Label tag="Option B" title="Split editorial" note="cream + image, calm/editorial (matches approved mockup)" />
      <HeroSplit />
    </div>
  );
};

export default Compare;
