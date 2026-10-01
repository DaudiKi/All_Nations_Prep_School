import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site";
import { cms } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const [sections, posts] = await Promise.all([cms.sections(), cms.posts()]);

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/programmes", priority: 0.9 },
    { path: "/admissions", priority: 0.9 },
    { path: "/gallery", priority: 0.6 },
    { path: "/staff", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/legal/privacy-policy", priority: 0.2 },
    { path: "/legal/terms", priority: 0.2 },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...sections.map((s) => ({
      url: `${base}/programmes/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
