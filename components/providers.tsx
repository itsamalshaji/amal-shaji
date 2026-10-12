"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {reduce ? children : <ReactLenis root options={{ lerp: 0.1, anchors: true }}>{children}</ReactLenis>}
    </MotionConfig>
  );
}
