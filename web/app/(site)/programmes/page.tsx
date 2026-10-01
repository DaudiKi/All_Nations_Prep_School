import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { CtaBand } from "@/components/site/CtaBand";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Pattern } from "@/components/brand/Pattern";
import { Reveal } from "@/components/motion/Reveal";
import { cms } from "@/lib/cms";
import { isPending } from "@/content/types";
import type { IconName } from "@/lib/brand/assets";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Daycare, Kindergarten and Primary at All Nations Prep School — what each section teaches and how progress is reported.",
};

export default async function ProgrammesPage() {
  const sections = await cms.sections();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="innovation" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>Programmes</Pill>
          <h1 className="type-display mt-6 max-w-[18ch] text-white">Three sections, one school</h1>
          <p className="type-body mt-6 max-w-[56ch] text-white/80">
            A child can join at any stage and stay with us through to the end of
            Primary, taught by people who already know them.
          </p>
        </div>
      </section>

      <Section ground="white">
        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
          {sections.map((s, i) => (
            <Reveal key={s.slug} as="li" from="card" delay={i * 0.1}>
              <Card href={`/programmes/${s.slug}`}>
                <BrandIcon name={s.icon as IconName} alt="" size={52} colourway="ink-gold" />
                <h2 className="type-sub3 mt-4">{s.title}</h2>
                <p className="type-body mt-2 text-ink-t20">{s.summary}</p>
                {!isPending(s.ageRange) ? (
                  <p className="type-small mt-4 font-bold text-ink">{s.ageRange}</p>
                ) : null}
                <p className="type-small mt-4 font-bold text-sky-dark group-hover:underline">
                  Discover more &rarr;
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section ground="grey">
        <SectionHead
          eyebrow="Reporting"
          title="How you hear about your child"
          lead="Every section reports to parents each term, against the areas the class actually works on."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="type-sub3">Kindergarten</h3>
            <p className="type-body mt-2 text-ink-t20">
              A colourful report card covering language, early number, social
              development, the environment, and health and hygiene — rated from
              &ldquo;needs improvement&rdquo; through to &ldquo;very good&rdquo;.
            </p>
          </Card>
          <Card>
            <h3 className="type-sub3">Primary</h3>
            <p className="type-body mt-2 text-ink-t20">
              A subject report card with marks out of 100, aggregates, a division,
              and written comments from the class teacher and the head teacher.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
