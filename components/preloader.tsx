"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"count" | "lift" | "done">("count");
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, 100, {
      duration: reduce ? 0 : 1.25,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (num.current) num.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        document.documentElement.dataset.loaded = "true";
        setPhase("lift");
      },
    });
    return () => controls.stop();
  }, []);

  if (phase === "done") return null;
  return (
    <div
      aria-hidden
      data-phase={phase}
      onTransitionEnd={(e) => e.target === e.currentTarget && setPhase("done")}
      className="preloader fixed inset-0 z-70 flex flex-col justify-between bg-ink p-5 md:p-8"
    >
      <span ref={bar} className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-volt" />
      <span className="label text-mute">Amal Shaji — Portfolio 2026</span>
      <span ref={num} className="display self-end text-[clamp(6rem,22vw,18rem)] tabular-nums text-bone">
        000
      </span>
    </div>
  );
}
