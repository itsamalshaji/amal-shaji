"use client";

import { useEffect, useRef } from "react";

const REST = { wdth: 56, wght: 760 };
const NEAR = { wdth: 150, wght: 900 };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A line of display type that fits its container and whose letters
 * widen toward the cursor, driven by the font's width/weight axes.
 */
export default function ReactiveLine({
  text,
  fill = 0.76,
  start = 0,
  intro = false,
  className = "",
}: {
  text: string;
  fill?: number; // share of the container the letters occupy at rest; the remainder is tracking the wide letters eat into
  start?: number; // stagger offset for the intro
  intro?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const cur = letters.map(() => 0);
    let mouse: { x: number; y: number } | null = null;
    let raf = 0;

    const apply = (i: number) => {
      letters[i].style.fontVariationSettings = `"wdth" ${mix(REST.wdth, NEAR.wdth, cur[i]).toFixed(1)}, "wght" ${mix(REST.wght, NEAR.wght, cur[i]).toFixed(0)}`;
    };

    const fit = () => {
      const width = el.clientWidth;
      if (!width) return;
      cur.fill(0);
      letters.forEach((_, i) => apply(i));
      el.style.fontSize = "100px";
      let natural = 0;
      for (const child of el.children) natural += child.getBoundingClientRect().width;
      if (natural) el.style.fontSize = `${(100 * width * fill) / natural}px`;
    };

    const tick = () => {
      raf = 0;
      const rects = letters.map((l) => l.getBoundingClientRect());
      const radius = Math.max(el.clientWidth * 0.2, 160);
      let moving = false;
      letters.forEach((_, i) => {
        let target = 0;
        if (mouse) {
          const r = rects[i];
          const d = Math.hypot(mouse.x - (r.left + r.width / 2), (mouse.y - (r.top + r.height / 2)) * 0.55);
          const t = Math.max(0, 1 - d / radius);
          target = t * t * (3 - 2 * t);
        }
        if (Math.abs(target - cur[i]) > 0.003) {
          cur[i] += (target - cur[i]) * 0.13;
          moving = true;
        } else cur[i] = target;
        apply(i);
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse = { x: e.clientX, y: e.clientY };
      kick();
    };
    const onLeave = () => {
      mouse = null;
      kick();
    };

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts.ready.then(fit);

    const live = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (live) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fill]);

  return (
    <span
      ref={root}
      aria-hidden
      className={`display w-full justify-between overflow-x-visible overflow-y-clip whitespace-nowrap pt-[0.04em] text-[18vw] leading-[0.8] ${className}`}
    >
      {[...text].map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.14em] shrink-0" />
        ) : (
          <span key={i} data-l className={intro ? "hero-letter" : "inline-block shrink-0"} style={{ "--i": start + i } as React.CSSProperties}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
