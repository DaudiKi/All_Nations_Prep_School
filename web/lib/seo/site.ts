/** The canonical origin. Set NEXT_PUBLIC_SITE_URL in every environment. */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

export const abs = (path: string) => `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
