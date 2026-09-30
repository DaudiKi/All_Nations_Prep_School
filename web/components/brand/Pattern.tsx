import { PATTERNS, brandAsset, resolveColourway, type Colourway, type PatternName } from "@/lib/brand/assets";

/**
 * A brand pattern used as a section ground.
 *
 * The guidelines describe the patterns as "mostly for official purposes", so
 * these are for the bands that carry weight — the hero backdrop, the CTA band,
 * programme headers — rather than as a general-purpose texture.
 *
 * Rendered as a CSS background so it tiles and never becomes a foreground
 * element competing with content. Always decorative, so it is hidden from
 * assistive technology.
 */
export function Pattern({
  name,
  colourway = "ink-gold",
  size = 320,
  opacity = 0.12,
  className,
}: {
  name: PatternName;
  colourway?: Colourway;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const entry = PATTERNS[name];
  const resolved = resolveColourway(entry, colourway);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `url(${brandAsset(entry, resolved)})`,
        backgroundRepeat: "repeat",
        backgroundSize: `${size}px auto`,
        pointerEvents: "none",
      }}
    />
  );
}
