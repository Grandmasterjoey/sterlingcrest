// Centralized image sources for the marketing site.
// Owned assets are served from Vercel Blob CDN for faster edge delivery.
// Stock photography uses Unsplash CDN elsewhere on the site.

const CDN = "https://wkz9g1gwrhohvd99.public.blob.vercel-storage.com/images";

export const heroImage = `${CDN}/hero-dusk.webp`;
export const logoImage = `${CDN}/logo-sc.webp`;

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Family photo for the Philosophy section.
export const aboutImage = unsplash("1543342384-1f1350e27861", 1100);

// Advisor meeting with a couple for the Independence section.
export const independenceImage = unsplash("1573497019940-1c28c488b378", 1100);

export const serviceImages: Record<string, string> = {
  "final-expense": unsplash("1529156069898-49953e39b3ac", 900),
  "mortgage-protection": unsplash("1600585154340-be6161a56a0c", 900),
  "term-life": unsplash("1511895426328-dc8714191300", 900),
  "whole-life": unsplash("1609223068552-9f5854a798f0", 900),
  "retirement-legacy": unsplash("1519046909924-21a693751454", 900),
  "annuity": unsplash("1522778119026-d78684874777", 900),
};
