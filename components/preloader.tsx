"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { siCloudflare, siGithub, siJavascript, siNextdotjs, siReact, siSupabase, siTypescript, siVercel, siVite } from "simple-icons";

const NAME = "AMAL SHAJI";
const STACK = [siReact, siNextdotjs, siTypescript, siJavascript, siSupabase, siVite, siGithub, siVercel, siCloudflare];
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Opening curtain. A ring draws itself as the count runs to 100; each time the stroke reaches a station,
 * that technology's logo shoots out from the centre and docks on the ring, while the whole orbit slowly turns.
 * Underneath, the name stretches from condensed to wide. Then the panel lifts off the page.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"count" | "lift" | "done">("count");
  const orbit = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const stack = useRef<HTMLUListElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const tech = useRef<HTMLSpanElement>(null);
  const name = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = Array.from(name.current?.querySelectorAll<HTMLElement>("[data-l]") ?? []);
    const logos = Array.from(stack.current?.children ?? []) as HTMLElement[];
    let docked = 0;
    const controls = animate(0, 100, {
      duration: reduce ? 0 : 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        const p = v / 100;
        if (num.current) num.current.textContent = String(Math.round(v));
        if (ring.current) ring.current.style.strokeDashoffset = String(1 - p);
        orbit.current?.style.setProperty("--phi", `${(p * 80).toFixed(2)}deg`);
        // Logo i sits i/n of the way round, so it launches the moment the stroke arrives there.
        const upTo = Math.min(logos.length, Math.ceil(p * logos.length));
        for (; docked < upTo; docked++) {
          logos[docked].dataset.on = "";
          if (tech.current) tech.current.textContent = STACK[docked].title;
        }
        // A wave of width runs through the name: each letter starts a beat after the one before it.
        letters.forEach((l, i) => {
          const t = smooth(Math.min(1, Math.max(0, p * 1.55 - i * 0.065)));
          l.style.fontVariationSettings = `"wdth" ${(50 + 75 * t).toFixed(1)}, "wght" 800`;
        });
      },
      onComplete: () => {
        document.documentElement.dataset.loaded = "true";
        setPhase("lift");
      },
    });
    return () => controls.stop();
  }, []);

  if (phase === "done") return null;
  const leaving = phase === "lift";
  return (
    <div
      aria-hidden
      data-phase={phase}
      onTransitionEnd={(e) => e.target === e.currentTarget && e.propertyName === "transform" && setPhase("done")}
      className="preloader fixed inset-0 z-70 flex flex-col justify-between overflow-hidden bg-volt p-5 text-night md:p-8"
    >
      <div className="label flex justify-between">
        <span className="whitespace-nowrap">Portfolio · 2026</span>
        <span className="max-sm:hidden">Frontend Developer &amp; Team Lead</span>
      </div>

      {/* Sized by whichever of width or height is tighter; everything inside is in container units so it scales as one. */}
      <div className={`@container relative mx-auto aspect-square w-[min(66vw,44svh)] transition-[scale,opacity] duration-500 ease-out ${leaving ? "scale-125 opacity-0" : ""}`}>
        <div ref={orbit} className="absolute inset-0" style={{ transform: "rotate(var(--phi, 0deg))" }}>
          <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 size-full -rotate-90">
            <circle cx="100" cy="100" r="88" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
            <circle ref={ring} cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="3" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          </svg>
          <ul ref={stack}>
            {STACK.map((icon, i) => {
              const a = (i * 360) / STACK.length;
              return (
                <li
                  key={icon.title}
                  // `scale` is applied around the ring's centre, before this transform carries the logo out to its station:
                  // at scale 0 it sits in the middle, so switching on makes it fly outward as it grows. The last rotate keeps it upright.
                  style={{ transform: `rotate(${a}deg) translateY(-44cqw) rotate(calc(${-a}deg - var(--phi, 0deg)))` }}
                  className="absolute left-1/2 top-1/2 -ml-[7cqw] -mt-[7cqw] grid size-[14cqw] scale-0 place-items-center rounded-full bg-night text-volt transition-[scale] duration-700 ease-out data-on:scale-100"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-[50%]">
                    <path d={icon.path} />
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute inset-0 grid place-content-center justify-items-center">
          <span className="display text-[26cqw] leading-[0.9] tabular-nums">
            <span ref={num}>0</span>
          </span>
          <span ref={tech} className="label mt-[3cqw]">
            Loading
          </span>
        </div>
      </div>

      {/* The name drifts up a little ahead of the panel, so the exit has some depth. */}
      <p
        ref={name}
        className={`display flex justify-center whitespace-nowrap text-[min(9.8vw,9rem)] leading-none transition-[transform,opacity] duration-500 ease-out ${leaving ? "-translate-y-10 opacity-0" : ""}`}
      >
        {[...NAME].map((ch, i) =>
          ch === " " ? (
            <span key={i} className="w-[0.3em]" />
          ) : (
            <span key={i} data-l style={{ fontVariationSettings: '"wdth" 50, "wght" 800' }}>
              {ch}
            </span>
          ),
        )}
      </p>
    </div>
  );
}
