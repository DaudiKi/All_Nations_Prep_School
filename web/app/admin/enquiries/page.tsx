import type { Metadata } from "next";
import { headers } from "next/headers";
import { listEnquiries } from "@/lib/db/store";
import { usingDatabase } from "@/lib/db/store";
import { SECTION_LABELS } from "@/lib/validation/enquiry";

export const metadata: Metadata = {
  title: "Enquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Admissions enquiries, so the office is not doing email archaeology.
 *
 * Protected by HTTP Basic auth via ADMIN_USER / ADMIN_PASSWORD. That is a
 * deliberate floor, not a ceiling: it is enough to keep the list off the open
 * web, and it should be replaced with real accounts before more than a couple
 * of people need access.
 */
function unauthorised() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="All Nations admin"' },
  });
}

async function authorise() {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return { ok: false, reason: "unconfigured" as const };

  const header = (await headers()).get("authorization");
  if (!header?.startsWith("Basic ")) return { ok: false, reason: "missing" as const };

  const [u, p] = Buffer.from(header.slice(6), "base64").toString("utf8").split(":");
  if (u !== user || p !== password) return { ok: false, reason: "bad" as const };
  return { ok: true as const, reason: null };
}

export default async function EnquiriesPage() {
  const auth = await authorise();

  if (!auth.ok && auth.reason === "unconfigured") {
    return (
      <main className="container-site py-20">
        <h1 className="type-sub1">Enquiries</h1>
        <p className="type-body mt-4 max-w-[60ch] text-ink-t20">
          This page is disabled because <code>ADMIN_USER</code> and{" "}
          <code>ADMIN_PASSWORD</code> are not set. Set them in the environment to
          turn it on.
        </p>
      </main>
    );
  }

  if (!auth.ok) throw unauthorised();

  const rows = await listEnquiries();

  return (
    <main className="container-site py-14">
      <h1 className="type-sub1">Enquiries</h1>
      <p className="type-small mt-2 text-ink-t20">
        {rows.length} total ·{" "}
        {usingDatabase() ? "from the database" : "from the development file store"}
      </p>

      {rows.length === 0 ? (
        <p className="type-body mt-8 text-ink-t20">No enquiries yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[var(--radius-card)] border border-ink-t85">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink-t94">
                {["Received", "Parent", "Contact", "Child", "Section", "Message", "Status"].map((h) => (
                  <th key={h} className="type-small whitespace-nowrap p-3 font-bold uppercase tracking-wider text-ink-t20">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-ink-t85 align-top">
                  <td className="type-small whitespace-nowrap p-3 tabular-nums">
                    {new Date(r.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="type-small p-3 font-semibold">{r.parentName}</td>
                  <td className="type-small p-3">
                    <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="block tabular-nums text-sky-dark">{r.phone}</a>
                    <a href={`mailto:${r.email}`} className="block text-sky-dark">{r.email}</a>
                  </td>
                  <td className="type-small p-3">{r.childName}, {r.childAge}</td>
                  <td className="type-small p-3">
                    {SECTION_LABELS[r.section as keyof typeof SECTION_LABELS] ?? r.section}
                  </td>
                  <td className="type-small max-w-[40ch] p-3 text-ink-t20">{r.message ?? "—"}</td>
                  <td className="type-small p-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
