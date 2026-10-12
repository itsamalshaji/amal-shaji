import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { works } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs("/"), changeFrequency: "monthly", priority: 1, images: [abs("/og.jpg")] },
    { url: abs("/works"), changeFrequency: "monthly", priority: 0.9, images: works.map((w) => abs(`/works/${w.slug}.jpg`)) },
    { url: abs("/contact"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
