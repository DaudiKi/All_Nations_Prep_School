import type { Metadata } from "next";
import { brandFont } from "./fonts";
import { SCHOOL } from "@/lib/brand/school";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SCHOOL.name} — ${SCHOOL.motto}`,
    template: `%s — ${SCHOOL.name}`,
  },
  description: SCHOOL.mission,
  applicationName: SCHOOL.name,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body>{children}</body>
    </html>
  );
}
