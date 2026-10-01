import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pattern } from "@/components/brand/Pattern";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SCHOOL, ADDRESS_LINES } from "@/lib/brand/school";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Find All Nations Prep School on Kasangati–Namugongo Road, Kiira Town, Kampala — phone numbers, email and directions.",
};

/** Maps are embedded as a link, not an iframe: the template's map pointed at
 *  Framer's own office, and a link avoids loading a third-party tracker on a
 *  page parents use. */
const MAP_QUERY = encodeURIComponent(
  `${SCHOOL.name}, Kasangati-Namugongo Road, Kiira, Kampala, Uganda`,
);

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="official" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>Contact</Pill>
          <h1 className="type-display mt-6 max-w-[16ch] text-white">Come and see us</h1>
          <p className="type-body mt-6 max-w-[54ch] text-white/80">
            Call, write, or simply visit. We are happy to show any parent around
            the school.
          </p>
        </div>
      </section>

      <Section ground="white">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <h2 className="type-sub3">Call us</h2>
            <div className="mt-3 flex flex-col gap-1">
              {SCHOOL.contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="type-body tabular-nums font-bold text-ink no-underline hover:text-sky-dark"
                >
                  {p}
                </a>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="type-sub3">Email us</h2>
            <a
              href={`mailto:${SCHOOL.contact.email}`}
              className="type-body mt-3 block font-bold text-ink no-underline hover:text-sky-dark"
            >
              {SCHOOL.contact.email}
            </a>
          </Card>

          <Card>
            <h2 className="type-sub3">Visit us</h2>
            <address className="type-body mt-3 not-italic text-ink-t20">
              {ADDRESS_LINES.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              className="type-small mt-3 inline-block font-bold text-sky-dark"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open in Google Maps &rarr;
            </a>
          </Card>
        </div>
      </Section>

      <Section ground="gold" pattern="innovation" patternOpacity={0.06}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="Book a visit"
              title="Send us a message"
              lead="Tell us a little about your child and we will call you back to arrange a time."
            />
            <Button href="/admissions" variant="secondary">How admissions work</Button>
          </div>
          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
