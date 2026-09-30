/**
 * The school's own facts, quoted from ALL NATIONS STYLE GUIDELINES.pdf.
 *
 * Everything here is content, and all of it moves into the CMS at Phase 6.
 * Until then this module is the single source, so no page hard-codes a phone
 * number the way the template did 257 times.
 */

export const SCHOOL = {
  /** The guidelines set the name as "All Nations Prep School" — Prep, not Pre. */
  name: "All Nations Prep School",
  shortName: "All Nations",

  /** Set beneath the wordmark in the primary logo. Proverbs 22:6. */
  motto: "Train up a child in the way to go",

  /** Carried on every piece of stationery in the brand pack. */
  sections: ["Daycare", "Kindergarten", "Primary"] as const,

  /**
   * NOTE ON VISION AND MISSION
   *
   * The guidelines label these the other way round: the "We exist to…"
   * statement is printed under OUR VISION and the "To be the school that…"
   * statement under OUR MISSION. That is transposed against normal usage —
   * "we exist to" states a purpose (a mission) and "to be the school that"
   * states an aspiration (a vision).
   *
   * Per the school's instruction they are published the right way round here.
   * Both are CMS fields from Phase 6, so flipping back is one edit.
   */
  mission:
    "We exist to provide holistic education to children of diverse backgrounds " +
    "in a safe, rich and God-fearing environment.",
  vision:
    "To be the school that provides holistic education to children of diverse " +
    "backgrounds.",

  values: [
    "Christian character",
    "Accountability",
    "Innovativeness",
    "Teamwork",
    "Excellence",
  ] as const,

  contact: {
    email: "allnationsprep@gmail.com",
    phones: ["+256 782 249 975", "+256 757 787 880", "+256 772 470 667"],
    address: {
      street: "Kasangati – Namugongo Road",
      town: "Kiira Town",
      city: "Kampala",
      country: "Uganda",
    },
  },
} as const;

/** What each part of the badge means, from the logo story page. */
export const LOGO_STORY = [
  {
    element: "The puzzle-like A and N",
    meaning:
      "Solutions, and so innovation and creative thinking — qualities the school " +
      "holds necessary for holistic education.",
  },
  {
    element: "The smiley face",
    meaning: "A welcoming symbol for the care, safety and nurturing the school provides.",
  },
  {
    element: "The raised hands",
    meaning: "Worship, speaking to the God-fearing environment the school cultivates.",
  },
  {
    element: "Two differently shaped children sharing hands",
    meaning: "Diversity, and teamwork as one of the school's core values.",
  },
  {
    element: "The rounded typeface",
    meaning: "Soft edges, again for the care, safety and nurturing role of the school.",
  },
] as const;

export const ADDRESS_LINES = [
  SCHOOL.contact.address.street,
  SCHOOL.contact.address.town,
  `${SCHOOL.contact.address.city}, ${SCHOOL.contact.address.country}`,
];
