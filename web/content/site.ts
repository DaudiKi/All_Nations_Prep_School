import type { GalleryItem, Post, Staff, Testimonial, TermDate } from "./types";

/**
 * Content the school has not supplied yet.
 *
 * These are deliberately empty rather than filled with plausible-looking
 * invented people and quotes. The pages render honest empty states, and
 * `npm run content:check` lists what is outstanding.
 */

export const STAFF: Staff[] = [];
export const POSTS: Post[] = [];
export const GALLERY: GalleryItem[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const TERM_DATES: TermDate[] = [];

/** Announcement bar. `enabled: false` until the school confirms the wording. */
export const ANNOUNCEMENT = {
  enabled: true,
  text: "Admissions are open for Daycare, Kindergarten and Primary",
  href: "/admissions",
};

export const ADMISSIONS = {
  /** Steps are generic and safe; the school should confirm its real process. */
  steps: [
    {
      title: "Get in touch",
      body: "Call the school or send an enquiry. Tell us your child's age and the section you have in mind.",
    },
    {
      title: "Visit us",
      body: "Come and see the classrooms, meet the teachers, and ask anything you want to ask.",
    },
    {
      title: "Apply",
      body: "Collect and complete an application form for your child's section.",
    },
    {
      title: "Join us",
      body: "We confirm a place, agree a start date, and tell you exactly what your child needs on their first day.",
    },
  ],
  requirementsTodo:
    "Confirm what a parent must bring to apply — birth certificate, immunisation record, previous report card, passport photographs, transfer letter.",
};
