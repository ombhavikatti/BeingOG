import type { MetadataRoute } from "next";

const BASE_URL = "https://being-og-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // As we add more pages (about, blog, pricing, docs), append them here
    // Example when we build Phase 3+ pages:
    // {
    //   url: `${BASE_URL}/pricing`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}