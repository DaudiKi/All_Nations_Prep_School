import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Pattern } from "@/components/brand/Pattern";
import { SCHOOL, ADDRESS_LINES } from "@/lib/brand/school";
import { SECTIONS } from "@/content/sections";

const COLUMNS = [
  {
    heading: "School",
    links: [
      { href: "/about", label: "About us" },
      { href: "/staff", label: "Our staff" },
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "News" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { href: "/admissions", label: "How to apply" },
      { href: "/contact", label: "Book a visit" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Pattern name="official" colourway="white-gold" opacity={0.08} size={240} />

      <div className="container-site relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="primary" colourway="white-gold" height={46} clearSpace={0.08} />
            <p className="type-small mt-4 max-w-[34ch] text-white/75">{SCHOOL.motto}</p>
          </div>

          <div>
            <h2 className="type-small font-bold uppercase tracking-[0.14em] text-gold">Programmes</h2>
            <ul className="m-0 mt-3 list-none p-0">
              {SECTIONS.map((s) => (
                <li key={s.slug} className="mb-2">
                  <Link href={`/programmes/${s.slug}`} className="type-small text-white/85 no-underline hover:text-gold">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="type-small font-bold uppercase tracking-[0.14em] text-gold">{col.heading}</h2>
              <ul className="m-0 mt-3 list-none p-0">
                {col.links.map((l) => (
                  <li key={l.label} className="mb-2">
                    <Link href={l.href} className="type-small text-white/85 no-underline hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-2">
          <address className="type-small not-italic text-white/85">
            {ADDRESS_LINES.map((line) => <span key={line} className="block">{line}</span>)}
            <a href={`mailto:${SCHOOL.contact.email}`} className="mt-2 block text-white no-underline hover:text-gold">
              {SCHOOL.contact.email}
            </a>
          </address>
          <div className="type-small text-white/85 md:text-right">
            {SCHOOL.contact.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="block tabular-nums text-white no-underline hover:text-gold"
              >
                {p}
              </a>
            ))}
          </div>
        </div>

        {/* The three sections, as they appear on every piece of school stationery. */}
        <p className="type-small mt-10 flex flex-wrap gap-x-6 gap-y-1 font-bold uppercase tracking-[0.2em] text-gold">
          {SCHOOL.sections.map((s) => <span key={s}>{s}</span>)}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <p className="type-small m-0 text-white/60">
            &copy; {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="m-0 flex list-none gap-5 p-0">
              <li>
                <Link href="/legal/privacy-policy" className="type-small text-white/75 no-underline hover:text-gold">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="type-small text-white/75 no-underline hover:text-gold">
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
