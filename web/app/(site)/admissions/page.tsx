import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pattern } from "@/components/brand/Pattern";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { cms } from "@/lib/cms";
import { SCHOOL } from "@/lib/brand/school";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply for a place at All Nations Prep School — Daycare, Kindergarten and Primary.",
};

export default async function AdmissionsPage() {
  const [{ admissions, termDates }, sections] = await Promise.all([
    cms.settings(), cms.sections(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="official" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>Admissions</Pill>
          <h1 className="type-display mt-6 max-w-[16ch] text-white">Join the school</h1>
          <p className="type-body mt-6 max-w-[56ch] text-white/80">
            We admit children into Daycare, Kindergarten and Primary. The steps
            below are the same for every section.
          </p>
        </div>
      </section>

      {/* ---- steps — a real sequence, so numbering is information -------- */}
      <Section ground="white">
        <SectionHead eyebrow="How to apply" title="Four steps" />
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {admissions.steps.map((step, i) => (
            <Reveal key={step.title} as="li" from="card" delay={i * 0.08}>
              <Card className="h-full">
                <span className="type-small inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] bg-gold font-bold tabular-nums text-ink">
                  {i + 1}
                </span>
                <h3 className="type-sub3 mt-4">{step.title}</h3>
                <p className="type-body mt-2 text-ink-t20">{step.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---- sections and fees ------------------------------------------ */}
      <Section ground="grey">
        <SectionHead eyebrow="Sections" title="Where your child would start" />
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {sections.map((s) => (
            <li key={s.slug}>
              <Card href={`/programmes/${s.slug}`}>
                <h3 className="type-sub3">{s.title}</h3>
                <p className="type-body mt-2 text-ink-t20">{s.summary}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- term dates -------------------------------------------------- */}
      <Section ground="white">
        <SectionHead eyebrow="The year" title="Term dates" />
        {termDates.length ? (
          <dl className="m-0 max-w-[48ch]">
            {termDates.map((t) => (
              <div key={t.label} className="flex justify-between border-b border-ink-t85 py-3">
                <dt className="type-body font-bold">{t.label}</dt>
                <dd className="type-body m-0 tabular-nums text-ink-t20">{t.starts} &ndash; {t.ends}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <EmptyState
            icon="school/numbers"
            title="Term dates not published yet"
            body="Call the school for this year's term dates and we will confirm them for you."
          />
        )}
      </Section>

      {/* ---- the form ---------------------------------------------------- */}
      <Section ground="gold" pattern="innovation" patternOpacity={0.06} id="enquire">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="Enquire"
              title="Tell us about your child"
              lead="Send us a few details and we will call you back. Nothing here commits you to anything."
            />
            <p className="type-body text-ink/80">
              You can also reach us directly:
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {SCHOOL.contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="type-body font-bold tabular-nums text-ink no-underline hover:underline">
                  {p}
                </a>
              ))}
              <a href={`mailto:${SCHOOL.contact.email}`} className="type-body font-bold text-ink no-underline hover:underline">
                {SCHOOL.contact.email}
              </a>
            </div>
            <div className="mt-7">
              <Button href="/contact" variant="secondary">Find the school</Button>
            </div>
          </div>

          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
