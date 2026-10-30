"use client";
import { useState } from "react";

// Uses /public/screens/<slug>.jpg (run `npm run screenshots`), and falls back to a live screenshot service.
export default function Shot({ slug, url, alt }: { slug: string; url: string; alt: string }) {
  const [src, setSrc] = useState(`/screens/${slug}.jpg`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy"
      onError={() => { if (!src.startsWith("http")) setSrc(`https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=800`); }} />
  );
}
