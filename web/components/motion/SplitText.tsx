"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "./easing";

/**
 * The template's headline reveal: the line is split and the pieces stagger in.
 *
 * The export achieved this by splitting every heading into per-character spans
 * at build time — and by emitting a full duplicate heading set per breakpoint,
 * which is why its homepage carries fourteen <h1> elements. Here the split is
 * presentational only: one semantic heading, with `aria-label` carrying the
 * real string and the pieces hidden from assistive technology.
 *
 * Splitting by word rather than character by default. Per-character staggering
 * on a long line reads as a novelty and slows the page down; words keep the
 * template's feel without either cost.
 */
export function SplitText({
  text,
  as: Tag = "h1",
  className,
  by = "word",
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const pieces = by === "word" ? text.split(/(\s+)/) : [...text];

  return (
    <Tag className={className} aria-label={text}>
      {pieces.map((piece, i) =>
        /^\s+$/.test(piece) ? (
          // Keep whitespace as plain text so words can wrap normally.
          <span key={i} aria-hidden="true">
            {piece}
          </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            initial={{ opacity: 0.001, y: "0.35em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: DURATION.standard,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {piece}
          </motion.span>
        ),
      )}
    </Tag>
  );
}
