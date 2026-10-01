import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Admissions enquiries.
 *
 * Deliberately minimal. This table holds children's names and ages, so it
 * collects an age in years rather than a date of birth, and does not store the
 * submitter's IP address — the IP is used for rate limiting and then dropped.
 *
 * Set a retention policy before launch: enquiries that never convert should be
 * deleted on a schedule rather than accumulating indefinitely.
 */
export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentName: text("parent_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  childName: text("child_name").notNull(),
  childAge: integer("child_age").notNull(),
  section: text("section").notNull(),
  message: text("message"),
  consent: boolean("consent").notNull(),
  /** new | contacted | enrolled | closed */
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("website"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  contactedAt: timestamp("contacted_at", { withTimezone: true }),
});

export type EnquiryRow = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
