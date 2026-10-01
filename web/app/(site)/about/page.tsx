import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { CtaBand } from "@/components/site/CtaBand";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Pattern } from "@/components/brand/Pattern";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SCHOOL, LOGO_STORY } from "@/lib/brand/school";

export const metadata: Metadata = {
  title: "About us",
  description: SCHOOL.mission,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="diversity" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>About us</Pill>
          <h1 className="type-display mt-6 max-w-[18ch] text-white">
            A place where every child is known
          </h1>
          <p className="type-body mt-6 max-w-[56ch] text-white/80">
            {SCHOOL.name} teaches children from Daycare through to the end of
            Primary, on Kasangati&ndash;Namugongo Road in Kiira Town, Kampala.
          </p>
        </div>
      </section>

      {/* ---- mission and vision ----------------------------------------- */}
      <Section ground="white">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal from="card">
            <div className="h-full rounded-[var(--radius-card)] bg-ink p-8 text-white">
              <p className="type-small font-bold uppercase tracking-[0.14em] text-gold">Our mission</p>
              <p className="type-sub3 mt-3 font-normal">{SCHOOL.mission}</p>
            </div>
          </Reveal>
          <Reveal from="card" delay={0.1}>
            <div className="h-full rounded-[var(--radius-card)] bg-gold-t85 p-8">
              <p className="type-small font-bold uppercase tracking-[0.14em] text-sky-dark">Our vision</p>
              <p className="type-sub3 mt-3 font-normal">{SCHOOL.vision}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- values ------------------------------------------------------ */}
      <Section ground="grey">
        <SectionHead eyebrow="Our values" title="What we hold to" />
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {SCHOOL.values.map((v) => <li key={v}><Pill tone="ink">{v}</Pill></li>)}
        </ul>
      </Section>

      {/* ---- the badge --------------------------------------------------- */}
      <Section ground="white">
        <SectionHead
          eyebrow="Our badge"
          title="Every part of it means something"
          lead="The school badge was drawn to say what the school is. Nothing in it is decoration."
        />
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <Logo variant="mark" height={200} clearSpace={0.1} />
          </div>
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {LOGO_STORY.map((s, i) => (
              <Reveal key={s.element} as="li" from="card" delay={i * 0.06}>
                <Card>
                  <h3 className="type-sub3">{s.element}</h3>
                  <p className="type-body mt-2 text-ink-t20">{s.meaning}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- motto ------------------------------------------------------- */}
      <Section ground="gold" pattern="official" patternOpacity={0.08}>
        <div className="text-center">
          <BrandIcon name="primary/badge" alt="" size={64} colourway="ink-gold" />
          <p className="type-sub2 mx-auto mt-6 max-w-[22ch] text-ink">
            &ldquo;{SCHOOL.motto}&rdquo;
          </p>
          <p className="type-small mt-4 font-bold uppercase tracking-[0.16em] text-ink/70">
            Our motto
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
