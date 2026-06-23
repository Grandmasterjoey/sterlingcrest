import { aboutImage, independenceImage } from "@/lib/images";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6 space-y-24 md:space-y-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
              Built on Trust.
              <br /> Focused on Protection.
            </h2>
            <div className="gold-underline w-16 mb-8" />
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
              At Sterling Crest Financial Group, we believe protecting your
              family's future starts with understanding what matters most today.
              Every family has unique goals, responsibilities, and priorities,
              which is why we take the time to understand your situation before
              making a recommendation. Our mission is simple: to provide clear
              guidance, trusted solutions, and lasting security for the people
              who matter most.
            </p>
          </div>

          <div className="relative">
            <img
              src={aboutImage}
              alt="A family together — the people our protection is built for"
              className="w-full h-[360px] md:h-[480px] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/40 -z-0 hidden md:block" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
              Why Independence Matters
            </h3>
            <div className="gold-underline w-16 mb-8" />
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
              Our recommendations begin with your goals—not a company's product
              lineup. As an independent brokerage, we have access to a broad
              network of trusted insurance carriers, allowing us to focus on
              finding solutions that align with your needs, priorities, and
              long-term objectives.
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
              Because every family is different, we believe your coverage should
              be too.
            </p>
          </div>

          <div className="relative">
            <img
              src={independenceImage}
              alt="A professional advisor meeting with a couple at a table"
              className="w-full h-[360px] md:h-[480px] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-primary/40 -z-0 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
