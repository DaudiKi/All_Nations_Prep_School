import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Enquiry } from "@/lib/validation/enquiry";
import type { EnquiryRow } from "./schema";

/**
 * Where enquiries go.
 *
 * With DATABASE_URL set, Postgres. Without it, a JSON file under .data/ so the
 * form is demonstrable in development before the database exists.
 *
 * The file store is development-only on purpose: it refuses to run in
 * production, because an enquiry landing in a container's filesystem would be
 * lost on the next deploy and nobody would notice.
 */

const DEV_FILE = join(process.cwd(), ".data", "enquiries.json");

export const usingDatabase = () => Boolean(process.env.DATABASE_URL);

async function dbClient() {
  const [{ drizzle }, postgres, schema] = await Promise.all([
    import("drizzle-orm/postgres-js"),
    import("postgres").then((m) => m.default),
    import("./schema"),
  ]);
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
  return { db: drizzle(sql, { schema }), schema };
}

async function readDevFile(): Promise<EnquiryRow[]> {
  try {
    return JSON.parse(await readFile(DEV_FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function saveEnquiry(input: Enquiry): Promise<{ id: string }> {
  const row = {
    parentName: input.parentName,
    phone: input.phone,
    email: input.email,
    childName: input.childName,
    childAge: input.childAge,
    section: input.section,
    message: input.message || null,
    consent: input.consent,
    status: "new" as const,
    source: "website" as const,
  };

  if (usingDatabase()) {
    const { db, schema } = await dbClient();
    const [saved] = await db.insert(schema.enquiries).values(row).returning({ id: schema.enquiries.id });
    return { id: saved.id };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "No DATABASE_URL is set. Refusing to accept an enquiry that would be written " +
        "to an ephemeral filesystem and lost on the next deploy.",
    );
  }

  const all = await readDevFile();
  const id = randomUUID();
  all.push({ ...row, id, notes: null, createdAt: new Date(), contactedAt: null } as EnquiryRow);
  await mkdir(dirname(DEV_FILE), { recursive: true });
  await writeFile(DEV_FILE, JSON.stringify(all, null, 2), "utf8");
  return { id };
}

export async function listEnquiries(): Promise<EnquiryRow[]> {
  if (usingDatabase()) {
    const { db, schema } = await dbClient();
    const { desc } = await import("drizzle-orm");
    return db.select().from(schema.enquiries).orderBy(desc(schema.enquiries.createdAt));
  }
  const all = await readDevFile();
  return all.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}
