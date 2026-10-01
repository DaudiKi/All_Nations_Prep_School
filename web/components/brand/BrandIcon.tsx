import Image from "next/image";
import { ICONS, brandAsset, resolveColourway, type Colourway, type IconName } from "@/lib/brand/assets";

/**
 * One icon from the school's four brand icon sets.
 *
 * The sets exist to "enhance the brand in different artworks", and between
 * them they replace every decorative illustration the Bloomy template shipped
 * — which is also what removes the template's third-party artwork licence
 * from the project.
 *
 * `alt` is required. The template shipped 805 images with no meaningful alt
 * text and we are not repeating that; pass "" explicitly for a purely
 * decorative icon so the choice is visible in the code.
 */
export function BrandIcon({
  name,
  alt,
  colourway = "ink-gold",
  size = 48,
  className,
}: {
  name: IconName;
  alt: string;
  colourway?: Colourway;
  size?: number;
  className?: string;
}) {
  const entry = ICONS[name];
  const resolved = resolveColourway(entry, colourway);

  // The icons are not square and their aspect ratios differ widely, so fitting
  // each one to `size` on its long edge leaves a row of them with different
  // heights — which pushes the heading under a wide icon out of line with its
  // neighbours. Each icon is scaled to fit and then centred in a `size` box, so
  // a row of cards keeps one baseline whatever icons it happens to use.
  const ratio = entry.width / entry.height;
  const width = ratio >= 1 ? size : Math.round(size * ratio);
  const height = ratio >= 1 ? Math.round(size / ratio) : size;

  return (
    <span
      className={className}
      style={{ display: "flex", alignItems: "center", height: size, lineHeight: 0 }}
    >
      <Image
        src={brandAsset(entry, resolved)}
        alt={alt}
        width={width}
        height={height}
        aria-hidden={alt === "" || undefined}
        style={{ width, height }}
      />
    </span>
  );
}
