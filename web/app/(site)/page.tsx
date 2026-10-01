import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/site/CtaBand";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Pattern } from "@/components/brand/Pattern";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SCHOOL } from "@/lib/brand/school";
import { cms } from "@/lib/cms";
import type { IconName } from "@/lib/brand/assets";

export const metadata: Metadata = {
  title: SCHOOL.motto,
  description: SCHOOL.mission,
};

/** The five values, each fronted by an icon from the brand's own sets. */
const VALUE_ICONS: Record<string, IconName> = {
  "Christian character": "primary/children",
  Accountability: "innovative/puzzle",
  Innovativeness: "innovative/lightbulb",
  Teamwork: "diverse/child-circle",
  Excellence: "primary/badge",
};

const VALUE_COPY: Record<string, string> = {
  "Christian character": "Children grow in a God-fearing environment, where character is taught as carefully as any subject.",
  Accountability: "Teachers, children and parents each know what they are responsible for, and report on it honestly.",
  Innovativeness: "Solutions and creative thinking — the quality the puzzle in our badge was drawn for.",
  Teamwork: "Children of different backgrounds learning side by side, and getting further together than alone.",
  Excellence: "Doing ordinary work carefully and well, every term, in every year group.",
};

export default async function Home() {
  const [sections, posts, testimonials] = await Promise.all([
    cms.sections(), cms.posts(), cms.testimonials(),
  ]);

  return (
    <>
      {/* ---- hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="official" colourway="white-gold" opacity={0.1} size={300} />
        <div className="container-site relative py-20 md:py-28 lg:py-32">
          <Reveal from="hero" duration={1}>
            <Pill tone="gold" tilt>Daycare &middot; Kindergarten &middot; Primary</Pill>
          </Reveal>

          <SplitText
            text="Train up a child in the way to go"
            as="h1"
            className="type-display mt-6 max-w-[16ch] text-white"
            delay={0.2}
          />

          <Reveal delay={0.6}>
            <p className="type-body mt-6 max-w-[54ch] text-white/80">{SCHOOL.mission}</p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/admissions" variant="primary">Apply for a place</Button>
              <Button href="/programmes" variant="onDark">Explore our programmes</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- intro ------------------------------------------------------ */}
      <Section ground="white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="Who we are"
              title="A school for children of every background"
            />
            <p className="type-body max-w-[58ch] text-ink-t20">
              {SCHOOL.name} is a day school on Kasangati&ndash;Namugongo Road in
              Kiira Town, teaching children from their earliest years through to
              the end of Primary. Our badge carries two differently shaped
              children sharing hands, and that is the plainest statement of what
              the school is for.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/about" variant="outline">More about the school</Button>
            </div>
          </div>

          <Reveal from="card">
            <div className="rounded-[var(--radius-card)] bg-ink p-7 text-white">
              <p className="type-small font-bold uppercase tracking-[0.14em] text-gold">Our vision</p>
              <p className="type-body mt-2">{SCHOOL.vision}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- values ----------------------------------------------------- */}
      <Section ground="gold" pattern="diversity" patternOpacity={0.07}>
        <SectionHead
          eyebrow="What we value"
          title="Five things we hold to"
          lead="Our values are not a poster in the corridor. They decide how lessons are taught, how children are spoken to, and what we report to parents."
        />
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {SCHOOL.values.map((value, i) => (
            <Reveal key={value} as="li" from="card" delay={i * 0.08}>
              <Card>
                <BrandIcon name={VALUE_ICONS[value]} alt="" size={44} colourway="ink-gold" />
                <h3 className="type-sub3 mt-4">{value}</h3>
                <p className="type-body mt-2 text-ink-t20">{VALUE_COPY[value]}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---- sections --------------------------------------------------- */}
      <Section ground="white">
        <SectionHead
          eyebrow="Our programmes"
          title="Three sections, one school"
          lead="A child can join us at any stage and stay through to the end of Primary."
        />
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {sections.map((s, i) => (
            <Reveal key={s.slug} as="li" from="card" delay={i * 0.1}>
              <Card href={`/programmes/${s.slug}`}>
                <BrandIcon name={s.icon as IconName} alt="" size={48} colourway="ink-gold" />
                <h3 className="type-sub3 mt-4">{s.title}</h3>
                <p className="type-body mt-2 text-ink-t20">{s.summary}</p>
                <p className="type-small mt-4 font-bold text-sky-dark group-hover:underline">
                  Discover more &rarr;
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---- what a day holds ------------------------------------------- */}
      <Section ground="sky">
        <SectionHead eyebrow="Every day" title="What a day here holds" />
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {["Reading", "Number work", "Story time", "Games", "Helping", "Outdoor play", "Music", "Health and hygiene"].map(
            (t, i) => (
              <Reveal key={t} as="li" from="card" delay={i * 0.04}>
                <Pill tone="outline">{t}</Pill>
              </Reveal>
            ),
          )}
        </ul>
      </Section>

      {/* ---- testimonials ----------------------------------------------- */}
      <Section ground="white">
        <SectionHead eyebrow="From parents" title="What families say" />
        {testimonials.length ? (
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.parentName}>
                <Card>
                  <p className="type-body">&ldquo;{t.quote}&rdquo;</p>
                  <p className="type-small mt-4 font-bold">{t.parentName}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="primary/smile"
            title="Parent voices coming soon"
            body="We are collecting quotes from families, with their permission, before publishing them here."
          />
        )}
      </Section>

      {/* ---- news -------------------------------------------------------- */}
      <Section ground="grey">
        <SectionHead eyebrow="News" title="From the school" />
        {posts.length ? (
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Card href={`/blog/${p.slug}`}>
                  <h3 className="type-sub3">{p.title}</h3>
                  <p className="type-body mt-2 text-ink-t20">{p.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No news posted yet"
            body="Term letters, circulars and school news will appear here once the first post is published."
          />
        )}
        <div className="mt-8">
          <Link href="/blog" className="type-small font-bold text-sky-dark">All news &rarr;</Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
