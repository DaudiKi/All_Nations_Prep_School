/**
 * The Bloomy template's motion signature, extracted from its appear-animation
 * payload. These values are what make the rebuilt site feel like the template,
 * so they are defined once and never re-typed.
 *
 * The template's animations are Framer Motion under the hood, and Framer Motion
 * ships to npm as `motion` — so this is genuine parity rather than a CSS
 * approximation of a curve.
 */

/** Every tween in the template uses this curve. */
export const EASE = [0.44, 0, 0.56, 1] as const;

/** Durations, in seconds. */
export const DURATION = {
  hero: 1,
  standard: 0.6,
} as const;

/** The staggered entrance the template uses down a section. */
export const DELAY = {
  none: 0,
  second: 0.6,
  third: 0.8,
  last: 1.8,
} as const;

/** Used on late-sequence items instead of a tween. */
export const SPRING = { type: "spring", damping: 30, mass: 1, stiffness: 100 } as const;

/**
 * Starting offsets. Opacity starts at 0.001 rather than 0 — Framer's trick to
 * keep the element composited so it does not flash on first paint.
 */
export const FROM = {
  /** The hero drops in from above. */
  hero: { opacity: 0.001, y: -160 },
  /** Standard section reveal. */
  section: { opacity: 0.001, y: 30 },
  /** Cards and grid items. */
  card: { opacity: 0.001, y: 40 },
} as const;
