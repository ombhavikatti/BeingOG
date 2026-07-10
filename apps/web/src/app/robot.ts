import type { MetadataRoute } from "next";

const BASE_URL = "https://being-og-web.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // As we build the app, block admin/dashboard from being indexed:
        // disallow: ["/admin/", "/dashboard/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}