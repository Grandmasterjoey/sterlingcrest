import { useEffect } from "react";

export function usePageMeta(opts: {
  title: string;
  description?: string;
  canonical?: string;
}) {
  useEffect(() => {
    const full = opts.title.includes("Sterling Crest")
      ? opts.title
      : `${opts.title} | Sterling Crest Financial Group`;
    document.title = full;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (opts.description) {
      setMeta("description", opts.description);
      setMeta("og:description", opts.description, "property");
    }
    setMeta("og:title", full, "property");
    if (opts.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", opts.canonical);
    }
  }, [opts.title, opts.description, opts.canonical]);
}
