// Centralized image sources for the marketing site.
// The hero uses an owned/branded asset; stock photography is used elsewhere so
// the design matches the approved direction. To swap in owned photography,
// drop files into `src/assets` and replace the URLs below with imports.

import heroDusk from "@/assets/hero-dusk.png";

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = heroDusk;

// Family / "dad with his kid" photo for the Philosophy section.
export const aboutImage = unsplash("1543342384-1f1350e27861", 1100);

export const serviceImages: Record<string, string> = {
  "final-expense": unsplash("1545324418-cc1a3fa10c00", 900),
  "mortgage-protection": unsplash("1564013799919-ab600027ffc6", 900),
  "term-life": unsplash("1554260570-9140fd3b7614", 900),
  "whole-life": unsplash("1487958449943-2429e8be8625", 900),
  "retirement-legacy": unsplash("1460472178825-e5240623afd5", 900),
  "annuity": unsplash("1582407947304-fd86f028f716", 900),
};
