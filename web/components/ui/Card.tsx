import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The shared card shell. Every card on the site uses it so edges, radius and
 * inner padding stay identical across programme, post, staff and facility
 * cards — one of the template's quieter strengths.
 */
export function Card({
  href, className = "", children,
}: { href?: string; className?: string; children: ReactNode }) {
  const cls =
    "group block h-full rounded-[var(--radius-card)] border border-ink-t85 bg-white p-6 " +
    "no-underline transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] " +
    (href ? "hover:-translate-y-1 hover:shadow-[0_10px_26px_-4px_rgba(2,50,102,0.14)] " : "") +
    className;
  return href ? <Link href={href} className={cls}>{children}</Link> : <div className={cls}>{children}</div>;
}

/** A pill label. `tilt` applies the template's -4deg sticker rotation. */
export function Pill({
  children, tone = "gold", tilt = false,
}: { children: ReactNode; tone?: "gold" | "ink" | "outline" | "sky"; tilt?: boolean }) {
  const tones = {
    gold: "bg-gold text-ink",
    ink: "bg-ink text-white",
    sky: "bg-sky text-white",
    outline: "border border-ink-t60 text-ink",
  } as const;
  return (
    <span
      className={`type-small inline-flex rounded-[var(--radius-pill)] px-4 py-1.5 font-bold ${tones[tone]} ${
        tilt ? "tilt" : ""
      }`}
    >
      {children}
    </span>
  );
}
