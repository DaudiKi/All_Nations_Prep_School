import { z } from "zod";

/**
 * The admissions enquiry, validated identically on the client and the server.
 *
 * The template's form had no endpoint at all, so every enquiry it collected was
 * silently discarded. This schema is the contract that replaces it.
 */
export const SECTION_VALUES = ["daycare", "kindergarten", "primary"] as const;

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Please give your full name").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please give a phone number we can reach you on")
    .max(25)
    .regex(/^[+\d][\d\s()-]*$/, "Use digits, spaces and + only"),
  email: z.email("Please check this email address").max(160),
  childName: z.string().trim().min(1, "Please give your child's name").max(120),
  /**
   * An age in years, not a date of birth. Collecting less about a child is a
   * deliberate choice, not an oversight.
   */
  childAge: z.coerce
    .number()
    .int("Please give the age in whole years")
    .min(0, "Please check the age")
    .max(14, "Please check the age"),
  section: z.enum(SECTION_VALUES, "Please choose a section"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Must be ticked. A false value is a validation failure, not a stored record. */
  consent: z.literal(true, "Please agree to the privacy notice"),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export const SECTION_LABELS: Record<(typeof SECTION_VALUES)[number], string> = {
  daycare: "Daycare",
  kindergarten: "Kindergarten",
  primary: "Primary",
};
