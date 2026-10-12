"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function Clock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

const links = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
];

export default function Nav() {
  // Step aside while reading down, return on the way up.
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 200);
  });

  return (
    <header className="after-load pointer-events-none fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <div
        className={`label pointer-events-auto flex items-center justify-between px-5 py-5 transition-transform duration-300 ease-out focus-within:translate-y-0 md:px-8 ${hidden ? "-translate-y-full" : ""}`}
      >
        <a href="#top" className="font-medium">Amal Shaji</a>
        <span className="hidden opacity-70 md:block">
          Alappuzha, IN · <Clock />
        </span>
        <nav className="flex gap-5">
          {links.map(([label, href], i) => (
            <a key={href} href={href} className={`opacity-70 transition-opacity duration-150 hover:opacity-100 ${i && i < 3 ? "hidden sm:block" : ""}`}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
