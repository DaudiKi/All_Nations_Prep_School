import Image from "next/image";
import { LOGOS, brandAsset, resolveColourway, type Colourway, type LogoName } from "@/lib/brand/assets";
import { SCHOOL } from "@/lib/brand/school";

/**
 * The school logo.
 *
 * The style guidelines list seven cautions, four of which a careless web
 * implementation breaks by accident. They are enforced here so no page can
 * break them:
 *
 *   - No new colours          -> `colourway` is a fixed union from the manifest
 *   - No skewing              -> intrinsic width/height always set together
 *   - No recolouring parts    -> the SVG ships as-is; nothing restyles internals
 *   - No rearranging or       -> each variation is one flat file
 *     resizing parts          -> the whole thing scales as one element
 *
 * The "protection area" from page 21 is baked in as padding, so other elements
 * cannot crowd the logo.
 */

const VARIANT_NOTES: Record<LogoName, string> = {
  primary: "Badge and full school name — the default for official use.",
  secondary: "Badge above the name — for narrow or tall spaces.",
  mark: "The badge alone — the official symbol of the school.",
  wordmark: "The name alone — only where the full logos cannot fit.",
};

type LogoProps = {
  /** Which approved variation. Defaults to the primary lockup. */
  variant?: LogoName;
  /** Which approved colourway. `mono` inherits the current text colour. */
  colourway?: Colourway;
  /** Rendered height in px. Width follows from the intrinsic aspect ratio. */
  height?: number;
  /**
   * Clear space reserved on all four sides, as a fraction of the rendered
   * height. The guidelines define it by the "Unity Icon" placed around the
   * logo; 0.3 is a conservative reading of that page and errs on the side of
   * more space. Confirm the exact measure with the designer before launch.
   */
  clearSpace?: number;
  /** Set on the one logo that appears above the fold. */
  priority?: boolean;
  className?: string;
};

export function Logo({
  variant = "primary",
  colourway = "ink-gold",
  height = 56,
  clearSpace = 0.3,
  priority = false,
  className,
}: LogoProps) {
  const entry = LOGOS[variant];

  // Fall back to a colourway this variation actually ships, rather than
  // rendering a broken image.
  const resolved = resolveColourway(entry, colourway);

  const width = Math.round((entry.width / entry.height) * height);
  const pad = Math.round(height * clearSpace);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", padding: pad, lineHeight: 0 }}
    >
      <Image
        src={brandAsset(entry, resolved)}
        alt={`${SCHOOL.name} — ${VARIANT_NOTES[variant]}`}
        width={width}
        height={height}
        priority={priority}
        style={{ width, height }}
      />
    </span>
  );
}

export { VARIANT_NOTES };
