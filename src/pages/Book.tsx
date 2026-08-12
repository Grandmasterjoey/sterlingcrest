import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import { contactEmail, contactPhone, contactPhoneHref } from "@/lib/contact";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Pick a time that works",
    description: "Choose from available slots — no back-and-forth emails.",
  },
  {
    icon: Clock,
    title: "Complimentary consultation",
    description: "A focused conversation about your goals, at no obligation.",
  },
  {
    icon: ShieldCheck,
    title: "Independent guidance",
    description: "Recommendations shaped around your family, not a product lineup.",
  },
];

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,hsl(var(--gold)/0.08)_50%,transparent_65%)]" />
          <div className="container max-w-6xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
                Schedule a Consultation
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08]">
                Meet with a Licensed Specialist.
                <br />
                <span className="text-gold-gradient">Plan with confidence.</span>
              </h1>
              <div className="gold-underline w-16 mt-6 md:mt-8" />
              <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-white/75 font-sans max-w-2xl">
                Book a complimentary call to discuss life insurance, mortgage
                protection, retirement planning, and the coverage that fits your
                family's priorities.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary pb-12 md:pb-16">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-6 md:p-8 bg-secondary/80"
                >
                  <item.icon
                    className="w-6 h-6 text-primary shrink-0 mt-0.5"
                    strokeWidth={1.4}
                  />
                  <div>
                    <h2 className="font-serif text-lg text-white">{item.title}</h2>
                    <p className="text-sm text-white/60 font-sans mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="calendar" className="py-16 md:py-24 bg-background">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
                Choose Your Time
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                Book your consultation below
              </h2>
              <div className="gold-underline w-16 mx-auto mt-6" />
            </div>

            <div className="bg-card border border-border/80 shadow-[0_24px_60px_-24px_hsl(var(--navy)/0.18)] overflow-hidden">
              <BookingCalendar />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground font-sans">
              Prefer to reach out directly?{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>{" "}
              or{" "}
              <a
                href={contactPhoneHref}
                className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {contactPhone}
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
