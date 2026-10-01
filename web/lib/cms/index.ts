import { SECTIONS, getSection } from "@/content/sections";
import {
  ADMISSIONS, ANNOUNCEMENT, GALLERY, POSTS, STAFF, TERM_DATES, TESTIMONIALS,
} from "@/content/site";
import type { GalleryItem, Post, Section, Staff, Testimonial } from "@/content/types";

/**
 * The content API.
 *
 * Every page reads content through this module and never imports from
 * `content/` directly. Today it serves the local files; once the Sanity
 * project exists, only this module changes — `sanity/schemas` already mirrors
 * these shapes exactly.
 *
 * Everything is async so the swap needs no page edits.
 */

export const cms = {
  async sections(): Promise<Section[]> {
    return [...SECTIONS].sort((a, b) => a.order - b.order);
  },

  async section(slug: string): Promise<Section | undefined> {
    return getSection(slug);
  },

  async staff(): Promise<Staff[]> {
    return [...STAFF].sort((a, b) => a.order - b.order);
  },

  async posts(): Promise<Post[]> {
    return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async post(slug: string): Promise<Post | undefined> {
    return POSTS.find((p) => p.slug === slug);
  },

  async gallery(): Promise<GalleryItem[]> {
    // Never publish a photo of a child without consent recorded, even if one
    // reaches the content layer by mistake.
    return GALLERY.filter((g) => g.consentOnFile);
  },

  async testimonials(): Promise<Testimonial[]> {
    return TESTIMONIALS.filter((t) => t.consentOnFile);
  },

  async settings() {
    return { announcement: ANNOUNCEMENT, termDates: TERM_DATES, admissions: ADMISSIONS };
  },
};

export type { GalleryItem, Post, Section, Staff, Testimonial };
