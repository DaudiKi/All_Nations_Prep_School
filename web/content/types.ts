/**
 * Content types.
 *
 * These mirror the Sanity schemas in `sanity/schemas` exactly. The site reads
 * content through `lib/cms`, which serves these local files until the Sanity
 * project exists and then serves Sanity without any page changing.
 */

/** Marks a value the school still has to supply. Surfaced by `npm run content:check`. */
export type Pending<T> = { TODO: string; value?: T };

export const isPending = <T,>(v: T | Pending<T>): v is Pending<T> =>
  typeof v === "object" && v !== null && "TODO" in v;

/** Reads a possibly-pending value, falling back to placeholder copy. */
export function resolve<T>(v: T | Pending<T>, fallback: T): T {
  if (isPending(v)) return v.value ?? fallback;
  return v;
}

export type Section = {
  slug: "daycare" | "kindergarten" | "primary";
  title: string;
  order: number;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Opening paragraphs on the section page. */
  intro: string[];
  ageRange: string | Pending<string>;
  dailyHours: string | Pending<string>;
  /** What a child works on. Real where the brand pack's report cards show it. */
  learningAreas: { title: string; items: string[] }[];
  /** Primary only. */
  yearGroups?: string[];
  /** Which brand icon fronts the section. */
  icon: string;
  /** Which brand pattern backs its header. */
  pattern: "official" | "innovation" | "diversity";
  /** Which tint grounds its cards. */
  tint: "gold" | "sky" | "green";
  fees: string | Pending<string>;
};

export type Staff = {
  slug: string;
  name: string;
  role: string;
  section?: Section["slug"];
  photo?: string;
  bio?: string;
  qualifications?: string[];
  order: number;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  tags: string[];
  /** Simple block content; becomes portable text in Sanity. */
  body: { kind: "p" | "h2" | "quote"; text: string }[];
  cover?: { src: string; alt: string };
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  album: string;
  consentOnFile: boolean;
};

export type Testimonial = {
  quote: string;
  parentName: string;
  section?: Section["slug"];
  consentOnFile: boolean;
};

export type TermDate = { label: string; starts: string; ends: string };
