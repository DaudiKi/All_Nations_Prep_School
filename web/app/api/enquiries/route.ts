import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/enquiry";
import { rateLimit, turnstileConfigured, verifyTurnstile } from "@/lib/validation/guards";
import { saveEnquiry, usingDatabase } from "@/lib/db/store";
import { sendAdmissionsAlert, sendParentConfirmation } from "@/lib/email/send";

export const runtime = "nodejs";

/**
 * Admissions enquiries.
 *
 * Replaces the template's form, which had no action and no method and so
 * discarded every submission it ever took.
 *
 * The IP is read for rate limiting only and is never written to the record —
 * a deliberate choice given this endpoint handles children's data.
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  const { turnstileToken, ...rest } = (payload ?? {}) as Record<string, unknown>;

  const parsed = enquirySchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (turnstileConfigured()) {
    const human = await verifyTurnstile(turnstileToken as string | undefined, ip);
    if (!human) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[enquiries] TURNSTILE_SECRET_KEY is not set — the form is unprotected.");
  }

  let id: string;
  try {
    ({ id } = await saveEnquiry(parsed.data));
  } catch (err) {
    console.error("[enquiries] could not save:", err);
    return NextResponse.json(
      { error: "We could not save your enquiry. Please call the school instead." },
      { status: 500 },
    );
  }

  // The row is already committed, so a mail outage must not fail the parent's
  // submission or cause them to send it twice.
  const results = await Promise.allSettled([
    sendAdmissionsAlert({ ...parsed.data, id }),
    sendParentConfirmation(parsed.data),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[enquiries] email failed:", r.reason);
  }

  if (!usingDatabase()) {
    console.warn("[enquiries] saved to the development file store, not a database.");
  }

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
