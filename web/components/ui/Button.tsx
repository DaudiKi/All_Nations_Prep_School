import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Buttons.
 *
 * The template's primary call to action is a saturated accent pill with white
 * text. That exact pattern is unusable here: Yellow Banana on white measures
 * 2.04:1. So primary is a gold fill with Inky Blue text (6.23:1), which is
 * also the pairing the guidelines name as first choice.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] " +
  "px-7 py-3.5 font-bold no-underline transition-transform duration-200 " +
  "ease-[var(--ease-brand)] hover:-translate-y-0.5 active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  /** Gold fill, Inky Blue text — 6.23:1. */
  primary: "bg-gold text-ink hover:bg-gold-t20",
  /** Inky Blue fill, white text — 12.72:1. */
  secondary: "bg-ink text-white hover:bg-ink-t20",
  /** Outlined, for a second action beside a primary. */
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  /** On an Inky Blue ground. */
  onDark: "bg-white text-ink hover:bg-gold",
} as const;

type Variant = keyof typeof VARIANTS;

export function Button({
  href, variant = "primary", className = "", children, ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) return <a href={href} className={cls}>{children}</a>;
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button className={cls} {...rest}>{children}</button>;
}
