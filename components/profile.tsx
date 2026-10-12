"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

const statement =
  "Co-founder and technical lead at CipherPeak. I take products from the first client meeting to launch day — the ticketing platform used at the gates of the Nehru Trophy Boat Race, stores processing 200+ orders a month, and a 38-module ERP.";

const stats: [number, string, string][] = [
  [4, "+", "Years building for the web"],
  [6, "", "People on the team I lead"],
  [200, "+", "Orders a month on live stores"],
  [32125, "", "Ticket serials loaded for race day"],
];

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-US") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      {to.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function Profile() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section id="profile" className="px-5 pb-24 pt-28 md:px-8 md:pb-40 md:pt-48">
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="label text-mute lg:col-span-3">(01) Profile</p>
        <p
          ref={ref}
          className="text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.025em] lg:col-span-9"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-line md:mt-36 lg:grid-cols-4">
        {stats.map(([n, suffix, label], i) => (
          <div key={label} className={`border-b border-line py-8 pr-4 lg:border-b-0 ${i % 2 ? "pl-5" : ""} ${i ? "lg:border-l lg:pl-6" : "lg:pl-0"} ${i % 2 ? "border-l" : ""}`}>
            <dd className="display text-[clamp(3rem,7vw,6.5rem)]">
              <Count to={n} suffix={suffix} />
            </dd>
            <dt className="mt-3 max-w-[18ch] text-sm text-mute">{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
