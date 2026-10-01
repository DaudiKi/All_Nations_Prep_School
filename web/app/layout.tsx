import type { Metadata } from "next";
import { brandFont } from "./fonts";
import { SCHOOL } from "@/lib/brand/school";
import { JsonLd, schoolJsonLd } from "@/lib/seo/jsonld";
import { siteUrl } from "@/lib/seo/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SCHOOL.name} — ${SCHOOL.motto}`,
    template: `%s — ${SCHOOL.name}`,
  },
  description: SCHOOL.mission,
  applicationName: SCHOOL.name,
  openGraph: {
    type: "website",
    siteName: SCHOOL.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body>
        {children}
        <JsonLd data={schoolJsonLd()} />
      </body>
    </html>
  );
}
