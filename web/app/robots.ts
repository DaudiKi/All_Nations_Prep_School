import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal only — never meant for a search index.
        disallow: ["/admin", "/api/", "/styleguide"],
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
