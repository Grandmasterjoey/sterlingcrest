import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { scheduleConsultationHref } from "@/lib/contact";

const CtaBand = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      {/* Subtle diagonal sheen */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(var(--gold)/0.06)_50%,transparent_60%)]" />
      <div className="container max-w-6xl mx-auto px-6 py-12 md:py-14 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <p className="font-serif text-2xl md:text-3xl text-white">
            The right protection starts with the{" "}
            <span className="text-gold-gradient">right conversation.</span>
          </p>
          <Link
            to={scheduleConsultationHref}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-sans hover:bg-gold-light transition-all duration-300 shrink-0"
          >
            Schedule Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
