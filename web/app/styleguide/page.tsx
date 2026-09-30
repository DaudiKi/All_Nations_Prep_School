import type { Metadata } from "next";
import { Logo, VARIANT_NOTES } from "@/components/brand/Logo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Pattern } from "@/components/brand/Pattern";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SCHOOL, LOGO_STORY, ADDRESS_LINES } from "@/lib/brand/school";
import {
  LOGOS, ICONS, PATTERNS, PREFERRED_COLOURWAYS,
  type Colourway, type IconName, type LogoName, type PatternName,
} from "@/lib/brand/assets";

export const metadata: Metadata = {
  title: "Style guide",
  description: "The design system, brand assets and motion primitives.",
};

/* -- contrast, computed rather than asserted -------------------------------- */
const srgb = (hex: string) =>
  [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
const luminance = (hex: string) => {
  const [r, g, b] = srgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const MAIN = [
  { name: "Inky Blue", token: "ink", hex: "#023266", role: "Main" },
  { name: "Yellow Banana", token: "gold", hex: "#F1A719", role: "Main" },
  { name: "Fruity Green", token: "green", hex: "#019042", role: "Accent" },
  { name: "Blue Sky", token: "sky", hex: "#028593", role: "Accent" },
  { name: "Cloudy Grey", token: "grey", hex: "#D6D6D6", role: "Accent" },
];

const RAMPS = [
  { name: "Inky Blue", steps: ["#023266", "#355B85", "#6784A3", "#9AADC2", "#D9E0E8", "#F0F3F6"] },
  { name: "Yellow Banana", steps: ["#F1A719", "#F4B947", "#F7CA75", "#F9DCA3", "#FDF2DC", "#FEFAF1"] },
  { name: "Fruity Green", steps: ["#019042", "#34A668", "#67BC8E", "#99D3B3", "#D9EEE3", "#F0F8F4"] },
  { name: "Blue Sky", steps: ["#028593", "#359DA9", "#67B6BE", "#9ACED4", "#D9EDEF", "#F0F8F9"] },
];

function Section({
  id, eyebrow, title, children,
}: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-ink-t85 py-14">
      <p className="type-small font-bold uppercase tracking-[0.16em] text-gold">{eyebrow}</p>
      <h2 className="type-sub1 mt-2 mb-7">{title}</h2>
      {children}
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-small mt-4 max-w-[70ch] rounded-[var(--radius-card)] border border-gold-t60 bg-gold-t94 p-4 text-ink">
      {children}
    </p>
  );
}

export default function StyleGuide() {
  const iconNames = Object.keys(ICONS) as IconName[];
  const logoNames = Object.keys(LOGOS) as LogoName[];
  const patternNames = Object.keys(PATTERNS) as PatternName[];

  return (
    <main className="container-site pb-24">
      {/* ---- header -------------------------------------------------- */}
      <header className="py-14">
        <Logo height={64} priority />
        <SplitText
          text="The design system"
          as="h1"
          className="type-display mt-6 text-ink"
        />
        <p className="type-body mt-4 max-w-[62ch] text-ink-t20">
          Every value on this page comes from{" "}
          <em>ALL NATIONS STYLE GUIDELINES.pdf</em> or from the brand pack&rsquo;s
          own artwork. Layout, radii and motion are inherited from the template
          export. Nothing here is invented.
        </p>
      </header>

      {/* ---- identity -------------------------------------------------- */}
      <Section id="identity" eyebrow="Who we are" title="Identity">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-ink p-6 text-white">
            <p className="type-small font-bold uppercase tracking-[0.14em] text-gold">Mission</p>
            <p className="type-body mt-2">{SCHOOL.mission}</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-ink-t94 p-6">
            <p className="type-small font-bold uppercase tracking-[0.14em] text-sky">Vision</p>
            <p className="type-body mt-2">{SCHOOL.vision}</p>
          </div>
        </div>

        <Note>
          The guidelines print these the other way round — &ldquo;We exist to&hellip;&rdquo;
          under <strong>Our Vision</strong> and &ldquo;To be the school that&hellip;&rdquo;
          under <strong>Our Mission</strong>. They are published here the right way
          round, as instructed. Both become CMS fields in Phase&nbsp;6, so flipping
          back is one edit.
        </Note>

        <h3 className="type-sub3 mt-10 mb-3">Values</h3>
        <ul className="flex flex-wrap gap-2 p-0">
          {SCHOOL.values.map((v) => (
            <li
              key={v}
              className="type-small list-none rounded-[var(--radius-pill)] border border-ink-t60 px-4 py-2 font-semibold"
            >
              {v}
            </li>
          ))}
        </ul>

        <h3 className="type-sub3 mt-10 mb-3">Sections</h3>
        <ul className="flex flex-wrap gap-2 p-0">
          {SCHOOL.sections.map((s) => (
            <li
              key={s}
              className="type-small list-none rounded-[var(--radius-pill)] bg-gold px-4 py-2 font-bold text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
        <Note>
          These three, not the template&rsquo;s six preschool programmes, are what the
          school actually runs — they appear on every piece of stationery in the pack.
          Rebuilding the information architecture around them is Phase&nbsp;5.
        </Note>

        <h3 className="type-sub3 mt-10 mb-3">Contact</h3>
        <p className="type-body">
          {ADDRESS_LINES.join(" · ")}
          <br />
          {SCHOOL.contact.email}
          <br />
          <span className="tabular-nums">{SCHOOL.contact.phones.join(" · ")}</span>
        </p>
      </Section>

      {/* ---- colour ---------------------------------------------------- */}
      <Section id="colour" eyebrow="Our colours" title="Palette">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {MAIN.map((c) => {
            const onWhite = contrast(c.hex, "#FFFFFF");
            const onInk = contrast(c.hex, "#023266");
            return (
              <div
                key={c.token}
                className="overflow-hidden rounded-[var(--radius-card)] border border-ink-t85"
              >
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="type-small font-bold">{c.name}</p>
                  <p className="type-small tabular-nums text-ink-t20">{c.hex}</p>
                  <p className="type-small mt-2 tabular-nums text-ink-t20">
                    on white {onWhite.toFixed(2)}:1
                    <br />
                    on ink {onInk.toFixed(2)}:1
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Note>
          <strong>Yellow Banana measures 2.04:1 on white</strong>, so it can never
          carry text there. The template&rsquo;s pattern — saturated accent button with
          white text — becomes a gold fill with <strong>Inky Blue</strong> text
          (6.23:1), which is also the pairing the guidelines name as first choice.
        </Note>

        <h3 className="type-sub3 mt-10 mb-3">Tints</h3>
        <p className="type-body mb-4 max-w-[64ch] text-ink-t20">
          Sanctioned by &ldquo;use lighter or darker tones of the brand colors as
          backgrounds&rdquo;. These carry the template&rsquo;s alternating section
          grounds without inventing a colour.
        </p>
        {RAMPS.map((r) => (
          <div key={r.name} className="mb-4">
            <p className="type-small mb-1 font-semibold">{r.name}</p>
            <div className="flex overflow-hidden rounded-[10px] border border-ink-t85">
              {r.steps.map((s) => (
                <div key={s} className="h-11 flex-1" style={{ background: s }} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* ---- typography ------------------------------------------------ */}
      <Section id="type" eyebrow="Our typography" title="Text hierarchy">
        <div className="space-y-5">
          <div><p className="type-small text-gold">Main heading · ExtraBold · UPPERCASE</p><p className="type-display">Train up a child in the way to go</p></div>
          <div><p className="type-small text-gold">Sub-heading 1 · Bold · UPPERCASE</p><p className="type-sub1">Train up a child in the way to go</p></div>
          <div><p className="type-small text-gold">Sub-heading 2 · Bold · Titlecase</p><p className="type-sub2">Train Up A Child In The Way To Go</p></div>
          <div><p className="type-small text-gold">Sub-heading 3 · Bold · Titlecase</p><p className="type-sub3">Train Up A Child In The Way To Go</p></div>
          <div><p className="type-small text-gold">Body · Regular</p><p className="type-body max-w-[62ch]">Train up a child in the way to go. The brand is characterised by one typeface used across six levels, stepping down in the proportions the guidelines set out.</p></div>
          <div><p className="type-small text-gold">Small · Regular</p><p className="type-small">Train up a child in the way to go.</p></div>
        </div>

        <Note>
          The brand typeface is <strong>Arial Rounded MT</strong>, supplied as
          desktop TTFs only. Serving those as webfonts needs a separate Monotype
          licence, so <strong>Nunito</strong> stands in — rounded, humanist, and it
          covers all three brand weights. Swapping in the licensed face is one line
          in <code>app/fonts.ts</code>.
        </Note>
      </Section>

      {/* ---- logo ------------------------------------------------------ */}
      <Section id="logo" eyebrow="Our logo" title="Variations">
        <div className="grid gap-4 md:grid-cols-2">
          {logoNames.map((name) => (
            <div key={name} className="rounded-[var(--radius-card)] border border-ink-t85 p-5">
              <div className="flex min-h-[120px] items-center justify-center">
                <Logo variant={name} height={name === "mark" ? 84 : 52} />
              </div>
              <p className="type-small font-bold capitalize">{name}</p>
              <p className="type-small text-ink-t20">{VARIANT_NOTES[name]}</p>
              <p className="type-small mt-2 text-ink-t40">
                {LOGOS[name].colourways.length} colourways ·{" "}
                {LOGOS[name].width}&times;{LOGOS[name].height}
              </p>
            </div>
          ))}
        </div>

        <h3 className="type-sub3 mt-10 mb-3">Approved colourways</h3>
        <div className="flex flex-wrap items-center gap-3">
          {(LOGOS.primary.colourways as readonly string[]).map((cw) => (
            <div
              key={cw}
              className="rounded-[var(--radius-card)] border border-ink-t85 p-4"
              style={{ background: cw === "white-gold" ? "#023266" : "#fff" }}
            >
              <Logo variant="primary" colourway={cw as Colourway} height={34} clearSpace={0.12} />
              <p
                className="type-small text-center font-semibold"
                style={{ color: cw === "white-gold" ? "#fff" : "#023266" }}
              >
                {cw}
                {PREFERRED_COLOURWAYS.includes(cw as never) ? " ★" : ""}
              </p>
            </div>
          ))}
        </div>
        <Note>
          ★ marks the colourways the guidelines name as first choice. The component
          takes <code>colourway</code> from a fixed union, sets width and height
          together so the logo can never be skewed, and bakes the protection area in
          as padding — three of the seven cautions enforced in code rather than in a
          PDF.
        </Note>

        <h3 className="type-sub3 mt-10 mb-3">What the badge means</h3>
        <dl className="grid gap-3 md:grid-cols-2">
          {LOGO_STORY.map((s) => (
            <div key={s.element} className="rounded-[var(--radius-card)] bg-ink-t94 p-4">
              <dt className="type-small font-bold">{s.element}</dt>
              <dd className="type-small mt-1 text-ink-t20">{s.meaning}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---- icons ----------------------------------------------------- */}
      <Section id="icons" eyebrow="Our icons" title={`${iconNames.length} icons across four sets`}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-ink-t85 p-4"
            >
              <div className="flex h-16 items-center">
                <BrandIcon name={name} alt="" size={56} />
              </div>
              <p className="type-small text-center font-semibold">{name}</p>
            </div>
          ))}
        </div>
        <Note>
          These replace every decorative illustration the Bloomy template shipped,
          which also removes its third-party artwork licence from the project.
          One gap found in the pack: <code>school/letters</code> ships a single
          colourway where the rest of its set ships five.
        </Note>
      </Section>

      {/* ---- patterns -------------------------------------------------- */}
      <Section id="patterns" eyebrow="Our patterns" title="Section grounds">
        <div className="grid gap-4 md:grid-cols-3">
          {patternNames.map((name) => (
            <div
              key={name}
              className="relative min-h-[170px] overflow-hidden rounded-[var(--radius-card)] bg-ink p-5"
            >
              <Pattern name={name} colourway="white-gold" opacity={0.22} size={220} />
              <p className="type-small relative font-bold capitalize text-white">{name}</p>
              <p className="type-small relative text-white/70">Mostly for official purposes</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- motion ---------------------------------------------------- */}
      <Section id="motion" eyebrow="Motion" title="The template's signature">
        <p className="type-body mb-6 max-w-[64ch] text-ink-t20">
          Easing <code>cubic-bezier(0.44, 0, 0.56, 1)</code>, 0.6s and 1s durations,
          staggered delays at 0 / 0.6 / 0.8 / 1.8s, and an initial opacity of 0.001
          rather than 0 so nothing flashes on first paint. Scroll to trigger; all of
          it stands still under <code>prefers-reduced-motion</code>.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {["Care", "Diversity", "Excellence"].map((label, i) => (
            <Reveal key={label} from="card" delay={i * 0.12}>
              <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-gold-t94 p-5">
                <BrandIcon name={iconNames[i] ?? iconNames[0]} alt="" size={40} />
                <span className="type-sub3">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="border-t border-ink-t85 py-10">
        <p className="type-small text-ink-t20">
          Phase 1 of the rebuild. Run <code>npm run brand</code> to regenerate the
          asset library from the brand pack.
        </p>
      </footer>
    </main>
  );
}
