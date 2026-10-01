import type { Section } from "./types";

/**
 * The school's three sections, from the brand pack.
 *
 * The learning areas for Kindergarten and Primary are real: they are the
 * assessment areas printed on the school's own report card templates in
 * "SCHOOL DOCUMENTS/TEMPLATES". Ages, hours and fees are marked TODO because
 * nothing in the pack states them — and inventing them would put wrong
 * information in front of parents.
 */
export const SECTIONS: Section[] = [
  {
    slug: "daycare",
    title: "Daycare",
    order: 1,
    summary:
      "A safe, warm first step away from home, where the youngest children are cared for and begin to play alongside others.",
    intro: [
      "Daycare is where a child's time at All Nations begins. The day is built around care, routine and play, in a space where every child is known by name.",
      "Our aim at this stage is simple: that a child feels safe, settles happily, and starts to discover what they enjoy.",
    ],
    ageRange: { TODO: "Confirm the age range the school admits into Daycare." },
    dailyHours: { TODO: "Confirm Daycare hours, and whether a half-day option exists." },
    learningAreas: [
      {
        title: "Care and routine",
        items: ["Settling and separation", "Rest and feeding routines", "Toilet habits", "Health and hygiene"],
      },
      {
        title: "Early play",
        items: ["Sensory play", "Songs and rhymes", "Stories", "Playing alongside others"],
      },
    ],
    icon: "primary/smile",
    pattern: "official",
    tint: "gold",
    fees: { TODO: "Confirm Daycare fees per term, and what they include." },
  },
  {
    slug: "kindergarten",
    title: "Kindergarten",
    order: 2,
    summary:
      "Where play becomes learning — language, early number, and the social confidence that makes a child ready for Primary.",
    intro: [
      "Kindergarten builds on everything a child brings from home and Daycare. Learning here is active and spoken aloud: counting things that can be held, reading stories together, naming the world.",
      "Progress is reported against the areas below, so parents can see exactly where a child is growing and where they need a hand.",
    ],
    ageRange: { TODO: "Confirm the Kindergarten age range (and the classes within it, e.g. Top/Middle/Baby)." },
    dailyHours: { TODO: "Confirm Kindergarten hours." },
    // These six areas are taken from the school's own Kindergarten report card.
    learningAreas: [
      {
        title: "Developing and using mathematical concepts",
        items: ["Number conservation", "Addition concept"],
      },
      { title: "Developing and using my language", items: ["Reading"] },
      { title: "Classroom progress", items: ["Attendance"] },
      { title: "Social development", items: ["Games", "Helping", "Social interaction"] },
      { title: "The environment", items: ["Caring for our surroundings"] },
      { title: "Health and hygiene", items: ["Body hygiene", "Health habits", "Toilet habits"] },
    ],
    icon: "diverse/shapes",
    pattern: "diversity",
    tint: "sky",
    fees: { TODO: "Confirm Kindergarten fees per term, and what they include." },
  },
  {
    slug: "primary",
    title: "Primary",
    order: 3,
    summary:
      "The full primary course, taught to the national curriculum and reported on in aggregates and divisions.",
    intro: [
      "Primary at All Nations follows the Ugandan national curriculum. Children are taught in year groups from P.1, and their work is reported each term by subject, aggregate and division.",
      "Alongside the examined subjects, this is where the school's values do their clearest work — accountability for one's own learning, teamwork, and the habit of excellence.",
    ],
    ageRange: { TODO: "Confirm the Primary age range." },
    dailyHours: { TODO: "Confirm Primary hours, and whether boarding or after-school care is offered." },
    // Subjects as they appear on the school's own P.1 report card.
    learningAreas: [
      {
        title: "Examined subjects",
        items: ["English", "Mathematics", "Literacy I", "Literacy II", "Religious Education"],
      },
      {
        title: "How progress is reported",
        items: ["Marks out of 100 per subject", "Subject aggregates", "Division at end of term", "Class teacher and head teacher comments"],
      },
    ],
    yearGroups: ["P.1", "P.2", "P.3", "P.4", "P.5", "P.6", "P.7"],
    icon: "school/letters-lowercase",
    pattern: "innovation",
    tint: "green",
    fees: { TODO: "Confirm Primary fees per term and per year group." },
  },
];

export const getSection = (slug: string) => SECTIONS.find((s) => s.slug === slug);
