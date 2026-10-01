"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, FROM, SPRING } from "./easing";

type RevealProps = {
  children: ReactNode;
  /** Which of the template's entrance offsets to use. */
  from?: keyof typeof FROM;
  /**
   * How the animation starts.
   *
   * The template only ever animates on page load: its export carries four
   * appear animations and not one scroll trigger. `load` is therefore the
   * faithful option and is what the hero uses. `scroll` is a deliberate
   * addition for content far below the fold, where a load animation would
   * have finished long before anyone saw it.
   */
  trigger?: "load" | "scroll";
  delay?: number;
  duration?: number;
  /** Use the template's spring instead of its tween. */
  spring?: boolean;
  as?: "div" | "section" | "li" | "span";
  className?: string;
};

export function Reveal({
  children,
  from = "section",
  trigger = "scroll",
  delay = 0,
  duration = DURATION.standard,
  spring = false,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const transition = spring ? { ...SPRING, delay } : { duration, delay, ease: EASE };

  // data-anim lets a static capture of the page replay the same motion in CSS.
  const marker = `${from}${spring ? "-spring" : ""}`;

  return (
    <MotionTag
      className={className}
      data-anim={marker}
      data-anim-delay={delay}
      initial={FROM[from]}
      {...(trigger === "load"
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-10% 0px" },
          })}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
