"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Masked line reveal for display type. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    // The wrapper is observed, not the line: a fully clipped child never intersects.
    <motion.span
      className={`block overflow-hidden pt-[0.06em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 1, ease, delay } } }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
