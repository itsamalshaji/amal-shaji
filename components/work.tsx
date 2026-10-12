"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { works } from "@/lib/works";
import { Reveal } from "./reveal";

/* ── Frames ──────────────────────────────────────────────────────────────── */

function Browser({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`overflow-hidden border border-line bg-ink-2 ${className}`}>
      <figcaption className="label flex items-center gap-3 border-b border-line px-3 py-2 text-mute">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
          <i className="size-2 rounded-full bg-line" />
        </span>
        <span className="truncate">{url}</span>
      </figcaption>
      <div className="grid overflow-hidden">{children}</div>
    </figure>
  );
}

function Shot({ src, alt, show = true }: { src: string; alt: string; show?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      sizes="(min-width: 1024px) 56vw, 92vw"
      className={`col-start-1 row-start-1 block h-auto w-full transition-opacity duration-500 ease-out ${show ? "opacity-100" : "opacity-0"}`}
    />
  );
}

// Floating layers (phone, second window, ticket) are the only things that cast a shadow.
const float = "shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)]";

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className={`absolute -bottom-6 right-3 grid w-[23%] min-w-24 overflow-hidden rounded-[1.1rem] border-4 border-night bg-night md:-right-4 ${float} ${lift}`}>
      {children}
    </div>
  );
}

// Caps the composition by height as well as width so it always fits the sticky card.
const stage = "relative mx-auto w-full lg:max-w-[calc((min(78svh,43rem)-12.5rem)*1.6)]";

// On hover the whole composition grows as one piece (nothing is cropped) and its floating layer lifts a little further.
const visual = "group/visual relative transition-transform duration-700 ease-out will-change-transform hover:scale-[1.03]";
const lift = "transition-transform duration-700 ease-out group-hover/visual:-translate-y-2";

/* ── 01 · Boat race: site + a working model of the one-time-use scan ─────── */

// Decorative matrix (not a real QR), seeded so server and client agree.
const QR = (() => {
  const n = 25;
  let s = 20260808;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
  let d = "";
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const fx = x < 8 ? x : x >= n - 8 ? x - (n - 7) : -9;
      const fy = y < 8 ? y : y >= n - 8 ? y - (n - 7) : -9;
      const inFinder = fx > -9 && fy > -9 && !(x >= n - 8 && y >= n - 8);
      const on = inFinder
        ? fx >= 0 && fx <= 6 && fy >= 0 && fy <= 6 && (fx % 6 === 0 || fy % 6 === 0 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4))
        : rnd() > 0.52;
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  return { n, d };
})();

function BoatRace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [scans, setScans] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setBusy(true), 500);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => {
      setScans((n) => n + 1);
      setBusy(false);
    }, 950);
    return () => clearTimeout(t);
  }, [busy]);

  const state = busy ? "scanning" : scans === 0 ? "idle" : scans === 1 ? "admitted" : "rejected";
  const status = { scanning: "Verifying…", idle: "Awaiting scan", admitted: "Admitted", rejected: "Rejected · already used" }[state];
  const tone = { scanning: "text-mute", idle: "text-mute", admitted: "text-accent", rejected: "text-warn" }[state];

  return (
    <div ref={ref} className={stage}>
      <div className={visual}>
        <Browser url="nehrutrophyboatrace.org">
          <Shot src="/work/ntbr-desktop.jpg" alt="Nehru Trophy Boat Race 2026 website home page" />
        </Browser>

        <div className={`isolate absolute -bottom-4 right-3 w-[27%] min-w-28 rotate-3 bg-bone p-[4.5%] text-ink md:-right-4 lg:p-3.5 ${float} ${lift}`}>
          <p className="display text-lg md:text-2xl">Gatepass</p>
          <div className="my-2 border-t border-dashed border-ink/30" />
          <div className="relative overflow-hidden">
            <svg viewBox={`0 0 ${QR.n} ${QR.n}`} className="block w-full" shapeRendering="crispEdges" aria-hidden>
              <path d={QR.d} fill="currentColor" />
            </svg>
            {busy && (
              <motion.span
                className="absolute inset-x-0 top-0 h-full origin-top border-b-2 border-ink bg-volt/70 mix-blend-multiply"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            )}
          </div>
          <p className="label mt-2 text-[0.5625rem] text-ink/60">Single entry</p>
        </div>
      </div>

      <div className="label mt-5 flex max-w-[68%] flex-wrap items-center gap-x-4 gap-y-2">
        <button
          onClick={() => setBusy(true)}
          disabled={busy}
          className="border border-line px-3 py-2 text-bone transition-colors duration-150 hover:border-accent hover:text-accent active:border-volt active:bg-volt active:text-night disabled:pointer-events-none disabled:opacity-40"
        >
          {scans ? "Scan again" : "Scan the pass"}
        </button>
        <p className={tone} role="status">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-current align-middle" />
          {status}
        </p>
        {scans > 1 && !busy && (
          <button onClick={() => setScans(0)} className="text-mute transition-colors duration-150 hover:text-bone">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

/* ── 02 · Three stores, switchable ───────────────────────────────────────── */

const stores = [
  { name: "Build Crest", url: "buildcrest.ae", slug: "buildcrest" },
  { name: "Image Cottons", url: "imagecottons.in", slug: "imagecottons" },
  { name: "Linen Centre", url: "linencentre.com", slug: "linen" },
];

function Stores() {
  const [active, setActive] = useState(0);
  return (
    <div className={stage}>
      <div role="tablist" aria-label="Store" className="label mb-4 flex">
        {stores.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`-ml-px border px-3 py-2 transition-colors duration-150 first:ml-0 ${active === i ? "relative border-bone bg-bone text-ink" : "border-line text-mute hover:text-bone"}`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className={visual}>
        <Browser url={stores[active].url}>
          {stores.map((s, i) => (
            <Shot key={s.slug} src={`/work/${s.slug}-desktop.jpg`} alt={`${s.name} storefront home page`} show={active === i} />
          ))}
        </Browser>
        <Phone>
          {stores.map((s, i) => (
            <Image
              key={s.slug}
              src={`/work/${s.slug}-mobile.jpg`}
              alt={`${s.name} on mobile`}
              width={520}
              height={1125}
              sizes="(min-width: 1024px) 14vw, 24vw"
              className={`col-start-1 row-start-1 block h-auto w-full transition-opacity duration-500 ease-out ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </Phone>
      </div>
    </div>
  );
}

/* ── 03 · ERP ────────────────────────────────────────────────────────────── */

function Erp() {
  return (
    <div className={stage}>
      <div className={visual}>
        <Browser url="CipherPeak ERP · Executive dashboard">
          <Shot src="/work/erp-exec.jpg" alt="CipherPeak ERP executive dashboard with revenue, cash and sales funnel widgets" />
        </Browser>
        <Browser url="Modules" className={`absolute -bottom-6 right-3 w-[46%] md:-right-4 ${float} ${lift}`}>
          <Image
            src="/work/erp-desktop.jpg"
            alt="CipherPeak ERP home screen listing the module groups"
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 26vw, 44vw"
            className="block h-auto w-full"
          />
        </Browser>
      </div>
    </div>
  );
}

/* ── Cards ───────────────────────────────────────────────────────────────── */

const projects = [
  {
    title: "Nehru Trophy Boat Race",
    kind: "Event site, online booking and the scanner used at the gates on race day.",
    year: "2026",
    stack: ["Next.js", "Supabase", "PWA", "Airpay"],
    facts: [
      ["32,125", "ticket serials loaded"],
      ["500+", "scanned at the gates"],
      ["1×", "entry per pass, enforced"],
    ],
    link: "https://www.nehrutrophyboatrace.org",
    Visual: BoatRace,
  },
  {
    title: "Three live stores",
    kind: "Storefront, custom admin panel and Supabase backend for each brand.",
    year: "2025–26",
    stack: ["Next.js", "TypeScript", "Supabase", "Razorpay"],
    facts: [
      ["3", "platforms launched"],
      ["200+", "orders a month"],
      ["RLS", "row-level security"],
    ],
    Visual: Stores,
  },
  {
    title: "CipherPeak ERP",
    kind: "Web frontend for an enterprise platform, with a Django API in integration.",
    year: "Ongoing",
    stack: ["React", "Vite", "Django"],
    facts: [
      ["38", "modules"],
      ["5", "business domains"],
    ],
    Visual: Erp,
  },
];

function Card({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const p = projects[i];
  const n = projects.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.04]);

  // Below lg a card is usually taller than the screen, so it pins by its bottom edge; .stack-card needs its height for that.
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current!;
    const ro = new ResizeObserver(() => el.style.setProperty("--h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ "--pin": `${12 + i * 10}px`, "--step": `${i * 20}px` } as React.CSSProperties} className="stack-card lg:flex lg:h-svh lg:items-center">
      <motion.article
        style={{ scale }}
        className="group/card relative grid w-full origin-bottom border border-line bg-ink-2 will-change-transform lg:top-[var(--step)] lg:h-[min(78svh,43rem)] lg:origin-top lg:grid-cols-[0.72fr_1.28fr]"
      >
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
          <div className="label flex justify-between text-mute">
            <span>
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span>{p.year}</span>
          </div>
          <div>
            <h3 className="display text-[clamp(2.5rem,4.4vw,4.25rem)]">{p.title}</h3>
            <p className="mt-4 max-w-[34ch] text-mute">{p.kind}</p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5">
              {p.facts.map(([n, label]) => (
                <div key={label}>
                  <dd className="display text-3xl text-accent md:text-4xl">{n}</dd>
                  <dt className="mt-1.5 text-xs leading-snug text-mute">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="label flex flex-wrap items-end justify-between gap-3 text-mute">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="border border-accent/50 px-2 py-1 text-accent">
                  {s}
                </li>
              ))}
            </ul>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="text-bone underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-accent">
                Visit site ↗
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center border-t border-line bg-ink px-6 pb-12 pt-6 md:px-10 lg:border-l lg:border-t-0 lg:py-8">
          <p.Visual />
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="work" className="px-5 md:px-8">
      <div className="grid items-end gap-6 border-t border-line pt-6 lg:grid-cols-12">
        <p className="label text-mute lg:col-span-3">(02) Selected work</p>
        <h2 className="display text-[clamp(3.5rem,11vw,10rem)] lg:col-span-9">
          <Reveal>Shipped,</Reveal>
          <Reveal delay={0.08}>
            <span className="mark">in production</span>
          </Reveal>
        </h2>
      </div>
      <div ref={ref} className="mt-12 space-y-5 lg:mt-0 lg:space-y-0">
        {projects.map((p, i) => (
          <Card key={p.title} i={i} progress={scrollYProgress} />
        ))}
      </div>
      <Link href="/works" className="group mt-6 flex items-center justify-between border border-line px-6 py-7 transition-colors duration-150 hover:border-volt hover:bg-volt hover:text-night md:px-10 lg:mt-0">
        <span className="display widen text-3xl md:text-5xl">See all {works.length} works</span>
        <span className="display text-3xl md:text-5xl" aria-hidden>→</span>
      </Link>
    </section>
  );
}
