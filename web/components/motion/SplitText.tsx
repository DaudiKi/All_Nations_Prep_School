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
 * `by="char"` matches the template exactly and is what the hero uses. `word` is
 * available for long lines, where per-character staggering reads as a novelty
 * and takes too long to finish.
 */
export function SplitText({
  text,
  as: Tag = "h1",
  className,
  by = "char",
  trigger = "load",
  delay = 0,
  stagger,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  by?: "word" | "char";
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Per character needs a much tighter step, or a long headline takes seconds.
  const step = stagger ?? (by === "char" ? 0.018 : 0.04);
  const pieces = by === "word" ? text.split(/(\s+)/) : [...text];

  return (
    <Tag className={className} aria-label={text} data-anim="split">
      {pieces.map((piece, i) =>
        /^\s+$/.test(piece) ? (
          // Whitespace stays plain text so words still wrap normally.
          <span key={i} aria-hidden="true">
            {piece}
          </span>
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            data-anim-delay={(delay + i * step).toFixed(3)}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            initial={{ opacity: 0.001, y: "0.4em" }}
            {...(trigger === "load"
              ? { animate: { opacity: 1, y: 0 } }
              : {
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-10% 0px" },
                })}
            transition={{ duration: DURATION.standard, delay: delay + i * step, ease: EASE }}
          >
            {piece}
          </motion.span>
        ),
      )}
    </Tag>
  );
}
