import { SCHOOL } from "@/lib/brand/school";
import { SECTION_LABELS, type Enquiry } from "@/lib/validation/enquiry";

/**
 * Transactional email.
 *
 * Sends through Resend when RESEND_API_KEY is set. Without it, logs what would
 * have been sent — so the flow is exercisable in development without silently
 * pretending mail went out.
 */

const FROM = process.env.MAIL_FROM ?? `${SCHOOL.name} <onboarding@resend.dev>`;
const TO_ADMISSIONS = process.env.ADMISSIONS_EMAIL ?? SCHOOL.contact.email;

async function deliver(payload: { to: string; subject: string; text: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(
      `[email] RESEND_API_KEY not set — not sending "${payload.subject}" to ${payload.to}`,
    );
    return { delivered: false as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: payload.to, subject: payload.subject, text: payload.text }),
  });

  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  return { delivered: true as const };
}

export async function sendAdmissionsAlert(enquiry: Enquiry & { id: string }) {
  const lines = [
    `New admissions enquiry from the website.`,
    ``,
    `Parent:   ${enquiry.parentName}`,
    `Phone:    ${enquiry.phone}`,
    `Email:    ${enquiry.email}`,
    `Child:    ${enquiry.childName}, age ${enquiry.childAge}`,
    `Section:  ${SECTION_LABELS[enquiry.section]}`,
    ``,
    enquiry.message ? `Message:\n${enquiry.message}` : `No message left.`,
    ``,
    `Reference: ${enquiry.id}`,
  ];
  return deliver({
    to: TO_ADMISSIONS,
    subject: `Enquiry — ${enquiry.childName} (${SECTION_LABELS[enquiry.section]})`,
    text: lines.join("\n"),
  });
}

export async function sendParentConfirmation(enquiry: Enquiry) {
  const lines = [
    `Dear ${enquiry.parentName},`,
    ``,
    `Thank you for your enquiry about a place for ${enquiry.childName} in ` +
      `${SECTION_LABELS[enquiry.section]} at ${SCHOOL.name}.`,
    ``,
    `We have your details and someone from the school will call you back.`,
    `If you would like to reach us first, our numbers are:`,
    ...SCHOOL.contact.phones.map((p) => `  ${p}`),
    ``,
    `"${SCHOOL.motto}"`,
    ``,
    SCHOOL.name,
    `Kasangati – Namugongo Road, Kiira Town, Kampala`,
  ];
  return deliver({
    to: enquiry.email,
    subject: `We have your enquiry — ${SCHOOL.name}`,
    text: lines.join("\n"),
  });
}
