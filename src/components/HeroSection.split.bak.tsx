import { LineChart, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { heroImage } from "@/lib/images";

const highlights = [
  {
    icon: LineChart,
    title: "Disciplined Strategies",
    description: "Purpose-led wealth management.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Protection",
    description: "Safeguarding what matters most.",
  },
  {
    icon: Users,
    title: "Generational Growth",
    description: "Building legacies that stand the test of time.",
  },
];

const HeroSection = () => {
  return (
    <section id="top" className="relative bg-background pt-24">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-6rem)]">
        {/* Left: copy */}
        <div className="flex items-center">
          <div className="max-w-xl mx-auto lg:mx-0 lg:ml-auto px-6 lg:pl-12 lg:pr-16 py-16 lg:py-0 animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Strategic Wealth
              <br />
              Built for <span className="text-gold-gradient">Legacy</span>
            </h1>

            <div className="gold-underline w-16 mt-8" />

            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground font-sans max-w-md">
              Private financial guidance designed for entrepreneurs,
              professionals, and families navigating growth.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground text-xs tracking-[0.25em] uppercase font-sans hover:bg-navy-light transition-all duration-300"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border border-secondary/30 text-secondary text-xs tracking-[0.25em] uppercase font-sans hover:bg-secondary/5 transition-all duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>

        {/* Right: image + glass highlight card */}
        <div className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={heroImage}
              alt="Modern financial district at dusk"
              className="w-full h-full object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/75 via-secondary/25 to-transparent" />
            {/* Warm dusk glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_85%,hsl(var(--gold)/0.18),transparent_55%)]" />
          </div>

          {/* Floating glass panel */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end p-6 lg:p-12">
            <div className="glass-panel w-full max-w-sm p-8 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <div className="space-y-7">
                {highlights.map((item, i) => (
                  <div key={item.title}>
                    <div className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.4} />
                      <div>
                        <h3 className="font-serif text-lg text-white/95">{item.title}</h3>
                        <p className="text-sm text-white/65 font-sans mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {i < highlights.length - 1 && (
                      <div className="mt-7 h-px bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
