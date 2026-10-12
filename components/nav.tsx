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

function ThemeToggle() {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const r = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--tx", `${r.left + r.width / 2}px`);
    root.style.setProperty("--ty", `${r.top + r.height / 2}px`);
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) apply();
    else document.startViewTransition(apply);
  };
  return (
    <button onClick={toggle} aria-label="Switch between dark and light theme" className="opacity-70 transition-opacity duration-150 hover:opacity-100">
      ◐ <span className="theme-dark-only">Light</span>
      <span className="theme-light-only">Dark</span>
    </button>
  );
}

export default function Nav() {
  // Step aside while reading down, return on the way up.
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 200);
  });

  // Over the inverted Experience section the nav takes the page colour instead of blending (blend modes are costly while scrolling).
  const [inverted, setInverted] = useState(false);
  useEffect(() => {
    const target = document.getElementById("experience");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setInverted(e.isIntersecting), { rootMargin: "-3% 0px -96% 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <header className={`after-load pointer-events-none fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${inverted ? "text-ink" : "text-bone"}`}>
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
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
