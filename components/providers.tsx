"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, MotionConfig, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lenis = useRef<LenisRef>(null);

  // One frame loop: Lenis steps inside Motion's, so scroll and scroll-linked values never drift a frame apart.
  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => lenis.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis root ref={lenis} options={{ lerp: 0.1, anchors: true, autoRaf: false }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
