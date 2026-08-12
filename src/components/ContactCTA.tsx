import { Link } from "react-router-dom";
import { Mail, Phone, ArrowRight } from "lucide-react";
import {
  contactEmail,
  contactPhone,
  contactPhoneHref,
  scheduleConsultationHref,
} from "@/lib/contact";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
          Let's Talk
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight mb-6">
          Ready to Protect <span className="text-gold-gradient">What Matters Most?</span>
        </h2>
        <div className="gold-underline w-16 mx-auto mb-8" />
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-sans mb-12 max-w-xl mx-auto">
          Schedule a complimentary consultation to discuss your goals, explore
          your options, and find the protection that's right for you and your
          family.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to={scheduleConsultationHref}
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-secondary-foreground text-xs tracking-[0.25em] uppercase font-sans hover:bg-navy-light transition-all duration-300"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-sans text-muted-foreground">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4 text-primary" />
            {contactEmail}
          </a>
          <a
            href={contactPhoneHref}
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            {contactPhone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
