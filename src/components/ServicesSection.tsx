import { Link } from "react-router-dom";
import { serviceImages } from "@/lib/images";
import { services } from "@/lib/services";

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      {/* Header */}
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-[0.7rem] tracking-[0.45em] uppercase font-sans mb-4">
            Our Services
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            Coverage Solutions for
            <br className="hidden sm:block" />{" "}
            <span className="text-gold-gradient">Every Stage of Life</span>
          </h2>
        </div>
      </div>

      {/* Grid: 6 across on desktop, full-bleed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
        {services.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group relative overflow-hidden min-h-[230px] flex flex-col justify-start p-6"
          >
            {/* Background image */}
            <img
              src={serviceImages[service.slug]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            {/* Navy overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/85 to-secondary/55 group-hover:via-secondary/75 transition-colors duration-500" />
            {/* Gold top accent on hover */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />

            <div className="relative z-10">
              <service.icon
                className="w-7 h-7 text-primary mb-4 group-hover:-translate-y-1 transition-transform duration-300"
                strokeWidth={1.3}
              />
              <h3 className="font-serif text-lg text-white leading-tight mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-white/65 font-sans leading-relaxed">
                {service.cardDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
