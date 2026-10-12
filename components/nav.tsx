"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

// [label, route, same-page anchor used when already on the home page]
const links = [
  ["Home", "/", "#top"],
  ["About", "/#profile", "#profile"],
  ["Works", "/works"],
  ["Contact", "/contact"],
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
  // A switch whose knob slides and swaps sun for moon; position and icon follow [data-theme] in CSS, so there is no state to hydrate.
  return (
    <button
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className="relative h-6 w-12 shrink-0 border border-current/40 transition-colors duration-150 hover:border-current active:bg-current/10"
    >
      <span className="absolute left-0.5 top-0.5 grid size-[1.125rem] place-items-center bg-volt text-night transition-transform duration-300 ease-out [[data-theme=dark]_&]:translate-x-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden className="theme-light-only size-3">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="theme-dark-only size-3">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </svg>
      </span>
    </button>
  );
}

export default function Nav() {
  // Step aside while reading down, return on the way up.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 200);
    setScrolled(y > 8);
  });

  const pathname = usePathname();
  const home = pathname === "/";
  const item = "transition-opacity duration-150 hover:opacity-100";

  // The bar is a solid strip in the page colour, so content scrolling underneath never shows through the links.
  // At the very top it is indistinguishable from the page; once scrolled it gains a hairline to sit above the content.
  return (
    <header className="after-load pointer-events-none fixed inset-x-0 top-0 z-40 text-bone">
      <div
        className={`pointer-events-auto flex items-center justify-between border-b bg-ink gutter py-4 transition-[transform,border-color] duration-300 ease-out focus-within:translate-y-0 md:py-5 ${scrolled ? "border-line" : "border-transparent"} ${hidden ? "-translate-y-full" : ""}`}
      >
        {home ? (
          <a href="#top" className="whitespace-nowrap text-lg font-bold tracking-tight">Amal Shaji</a>
        ) : (
          <Link href="/" className="whitespace-nowrap text-lg font-bold tracking-tight">Amal Shaji</Link>
        )}
        <nav className="flex items-center gap-4 text-[0.9375rem] font-medium min-[380px]:gap-6 md:gap-10">
          {links.map(([label, href, anchor], i) => {
            const current = anchor ? home && href === "/" : pathname === href;
            const cls = `${item} ${current ? "opacity-100 underline decoration-accent decoration-2 underline-offset-8" : "opacity-80"} ${i < 2 ? "hidden sm:block" : ""}`;
            // On the home page, in-page links stay plain anchors so the smooth scroll handles them.
            return home && anchor ? (
              <a key={label} href={anchor} className={cls} aria-current={current ? "page" : undefined}>
                {label}
              </a>
            ) : (
              <Link key={label} href={href} className={cls} aria-current={current ? "page" : undefined}>
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
