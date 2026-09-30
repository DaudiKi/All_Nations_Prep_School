"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, FROM } from "./easing";

type RevealProps = {
  children: ReactNode;
  /** Which of the template's entrance offsets to use. */
  from?: keyof typeof FROM;
  delay?: number;
  duration?: number;
  /** Render as something other than a div when the wrapper matters for layout. */
  as?: "div" | "section" | "li" | "span";
  className?: string;
};

/**
 * Reveals its children on scroll, using the template's easing and offsets.
 *
 * Honours `prefers-reduced-motion` by rendering the content immediately and
 * statically — never by animating faster.
 */
export function Reveal({
  children,
  from = "section",
  delay = 0,
  duration = DURATION.standard,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={FROM[from]}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
