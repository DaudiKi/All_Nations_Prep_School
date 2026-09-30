// GENERATED FILE — do not edit by hand.
// Run `npm run brand` to rebuild from the brand pack.

/** Approved colourways. `mono` inherits `currentColor`. */
export type Colourway =
  | "ink-gold"
  | "ink-sky"
  | "green-gold"
  | "sky-gold"
  | "white-gold"
  | "mono";

/** Colourways the style guidelines name as first choice. */
export const PREFERRED_COLOURWAYS = ["ink-gold","white-gold","mono"] as const;

export const LOGOS = {
  "mark": {"dir":"logos/mark","stem":"mark","width":131,"height":155,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
  "primary": {"dir":"logos/primary","stem":"primary","width":617,"height":173,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
  "secondary": {"dir":"logos/secondary","stem":"secondary","width":362,"height":370,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
  "wordmark": {"dir":"logos/wordmark","stem":"wordmark","width":467,"height":151,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
} as const;

export const ICONS = {
  "diverse/child-circle": {"dir":"icons/diverse","stem":"child-circle","width":186,"height":236,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "diverse/child-triangle": {"dir":"icons/diverse","stem":"child-triangle","width":155,"height":231,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "diverse/shapes": {"dir":"icons/diverse","stem":"shapes","width":255,"height":236,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "innovative/cloud": {"dir":"icons/innovative","stem":"cloud","width":284,"height":232,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "innovative/lightbulb": {"dir":"icons/innovative","stem":"lightbulb","width":133,"height":234,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "innovative/puzzle": {"dir":"icons/innovative","stem":"puzzle","width":326,"height":169,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "primary/badge": {"dir":"icons/primary","stem":"badge","width":131,"height":155,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "primary/children": {"dir":"icons/primary","stem":"children","width":269,"height":147,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "primary/smile": {"dir":"icons/primary","stem":"smile","width":133,"height":129,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "school/letters": {"dir":"icons/school","stem":"letters","width":214,"height":183,"colourways":["mono"]},
  "school/letters-lowercase": {"dir":"icons/school","stem":"letters-lowercase","width":201,"height":194,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "school/numbers": {"dir":"icons/school","stem":"numbers","width":179,"height":185,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
  "school/punctuation": {"dir":"icons/school","stem":"punctuation","width":258,"height":188,"colourways":["green-gold","ink-gold","mono","sky-gold","white-gold"]},
} as const;

export const PATTERNS = {
  "diversity": {"dir":"patterns/diversity","stem":"diversity","width":1013,"height":1005,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
  "innovation": {"dir":"patterns/innovation","stem":"innovation","width":1044,"height":48,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
  "official": {"dir":"patterns/official","stem":"official","width":994,"height":968,"colourways":["green-gold","ink-gold","ink-sky","mono","sky-gold","white-gold"]},
} as const;

export type LogoName = keyof typeof LOGOS;
export type IconName = keyof typeof ICONS;
export type PatternName = keyof typeof PATTERNS;

export type BrandAsset = {
  dir: string; stem: string;
  /** Intrinsic viewBox size — use it to hold the aspect ratio. */
  width: number; height: number;
  colourways: readonly string[];
};

/** Public path for one asset, e.g. brandAsset(ICONS['primary/badge'], 'ink-gold') */
export function brandAsset(
  entry: BrandAsset,
  colourway: Colourway,
): string {
  return `/brand/${entry.dir}/${entry.stem}-${colourway}.svg`;
}

/**
 * The nearest approved colourway an asset actually ships.
 *
 * Not every artwork in the brand pack ships every colourway, so asking for one
 * it lacks must fall back to something approved rather than 404.
 */
export function resolveColourway(entry: BrandAsset, wanted: Colourway): Colourway {
  const available = entry.colourways as readonly Colourway[];
  if (available.includes(wanted)) return wanted;
  for (const preferred of PREFERRED_COLOURWAYS) {
    if (available.includes(preferred as Colourway)) return preferred as Colourway;
  }
  return available[0];
}
