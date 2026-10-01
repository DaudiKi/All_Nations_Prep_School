import type { ReactNode } from "react";
import { Pattern } from "@/components/brand/Pattern";
import type { PatternName } from "@/lib/brand/assets";

/**
 * A page section.
 *
 * `ground` carries the template's alternating section rhythm using brand
 * tints, which the guidelines sanction: "use lighter or darker tones of the
 * brand colors as backgrounds".
 */
const GROUNDS = {
  white: "bg-white text-ink",
  gold: "bg-gold-t94 text-ink",
  goldStrong: "bg-gold-t85 text-ink",
  sky: "bg-sky-t94 text-ink",
  green: "bg-green-t94 text-ink",
  grey: "bg-ink-t94 text-ink",
  ink: "bg-ink text-white",
} as const;

export function Section({
  ground = "white", pattern, patternOpacity = 0.1, id, className = "", children,
}: {
  ground?: keyof typeof GROUNDS;
  pattern?: PatternName;
  patternOpacity?: number;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${GROUNDS[ground]} ${className}`}>
      {pattern ? (
        <Pattern
          name={pattern}
          colourway={ground === "ink" ? "white-gold" : "ink-gold"}
          opacity={patternOpacity}
          size={260}
        />
      ) : null}
      <div className="container-site relative py-16 md:py-20 lg:py-24">{children}</div>
    </section>
  );
}

/** Section heading block — eyebrow, title, optional standfirst. */
export function SectionHead({
  eyebrow, title, lead, onDark = false, align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <header className={`mb-10 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow ? (
        <p className={`type-small font-bold uppercase tracking-[0.16em] ${onDark ? "text-gold" : "text-sky-dark"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`type-sub1 mt-2 ${onDark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p
          className={`type-body mt-4 max-w-[58ch] ${align === "center" ? "mx-auto" : ""} ${
            onDark ? "text-white/80" : "text-ink-t20"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
