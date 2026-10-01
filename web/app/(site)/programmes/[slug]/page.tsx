import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Pattern } from "@/components/brand/Pattern";
import { Reveal } from "@/components/motion/Reveal";
import { cms } from "@/lib/cms";
import { SECTIONS } from "@/content/sections";
import { isPending } from "@/content/types";
import type { IconName } from "@/lib/brand/assets";

/** Next 16: params is async. */
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = await cms.section(slug);
  if (!section) return {};
  return { title: section.title, description: section.summary };
}

/** A fact row that stays honest when the school has not confirmed the value. */
function Fact({ label, value }: { label: string; value: string | { TODO: string } }) {
  const pending = isPending(value);
  return (
    <div className="border-b border-ink-t85 py-3 last:border-0">
      <dt className="type-small font-bold uppercase tracking-[0.1em] text-ink-t20">{label}</dt>
      <dd className={`type-body m-0 mt-1 ${pending ? "text-ink-t20 italic" : "text-ink"}`}>
        {pending ? "To be confirmed — please call the school" : (value as string)}
      </dd>
    </div>
  );
}

export default async function SectionPage({ params }: Props) {
  const { slug } = await params;
  const section = await cms.section(slug);
  if (!section) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name={section.pattern} colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>{section.title}</Pill>
          <h1 className="type-display mt-6 max-w-[16ch] text-white">{section.title}</h1>
          <p className="type-body mt-6 max-w-[56ch] text-white/80">{section.summary}</p>
        </div>
      </section>

      <Section ground="white">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <BrandIcon name={section.icon as IconName} alt="" size={64} colourway="ink-gold" />
            {section.intro.map((p) => (
              <p key={p} className="type-body mt-5 max-w-[58ch] text-ink-t20">{p}</p>
            ))}

            {section.yearGroups ? (
              <>
                <h2 className="type-sub3 mt-10">Year groups</h2>
                <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                  {section.yearGroups.map((y) => (
                    <li key={y}><Pill tone="outline">{y}</Pill></li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Fact panel — the template's programme sidebar. */}
          <Reveal from="card">
            <div className="rounded-[var(--radius-card)] border border-ink-t85 bg-ink-t94 p-6">
              <h2 className="type-sub3 mb-3">At a glance</h2>
              <dl className="m-0">
                <Fact label="Ages" value={section.ageRange} />
                <Fact label="Hours" value={section.dailyHours} />
                <Fact label="Fees" value={section.fees} />
              </dl>
              <div className="mt-6">
                <Button href="/admissions" variant="primary" className="w-full">
                  Apply for a place
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section ground={section.tint === "gold" ? "gold" : section.tint === "sky" ? "sky" : "green"}>
        <SectionHead
          eyebrow="What we work on"
          title={`Learning in ${section.title}`}
          lead="These are the areas a child's progress is reported against each term."
        />
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {section.learningAreas.map((area, i) => (
            <Reveal key={area.title} as="li" from="card" delay={i * 0.08}>
              <Card>
                <h3 className="type-sub3">{area.title}</h3>
                <ul className="m-0 mt-3 list-none p-0">
                  {area.items.map((item) => (
                    <li key={item} className="type-body flex gap-2 text-ink-t20">
                      <span aria-hidden="true" className="text-gold">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
