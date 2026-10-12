"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── 01 · Gatepass: a working model of the one-time-use scan check ───────── */

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

function Gatepass() {
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
    <div ref={ref} className="flex h-full flex-col items-center justify-between gap-8 p-6 md:p-10">
      <div className="isolate relative w-full max-w-[min(17rem,32svh)] -rotate-3 bg-bone p-5 text-ink">
        <span className="absolute -left-2.5 top-[4.6rem] size-5 rounded-full bg-ink" />
        <span className="absolute -right-2.5 top-[4.6rem] size-5 rounded-full bg-ink" />
        <p className="label text-ink/60">Nehru Trophy Boat Race · 2026</p>
        <p className="display mt-2 text-4xl">Gatepass</p>
        <div className="my-4 border-t border-dashed border-ink/30" />
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
        <div className="label mt-4 flex justify-between text-ink/60">
          <span>Premium seat</span>
          <span>Single entry</span>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between border-t border-line pt-4">
          <p className={`label ${tone}`} role="status">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-current align-middle" />
            {status}
          </p>
          <div className="label flex gap-4">
            {scans > 1 && !busy && (
              <button onClick={() => setScans(0)} className="text-mute transition-colors duration-150 hover:text-bone">
                Reset
              </button>
            )}
            <button
              onClick={() => setBusy(true)}
              disabled={busy}
              className="border border-line px-3 py-2 text-bone transition-colors duration-150 hover:border-accent hover:text-accent active:border-volt active:bg-volt active:text-night disabled:pointer-events-none disabled:opacity-40"
            >
              {scans ? "Scan again" : "Scan"}
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-mute">
          Try it twice. The second scan is refused — the same atomic check that stopped duplicate entry on race day.
        </p>
      </div>
    </div>
  );
}

/* ── 02 · Order pipeline ─────────────────────────────────────────────────── */

const flows = {
  Checkout: [
    ["Payment webhook", "Signature verified"],
    ["Stock", "Reserved atomically"],
    ["Coupon", "Redeemed"],
    ["Shipping", "Priced by zone"],
    ["Invoice", "PDF generated"],
    ["Customer", "Email + WhatsApp sent"],
  ],
  Enquiry: [
    ["Catalogue", "Filtered by spec"],
    ["Mega-menu", "Category found"],
    ["Shortlist", "Products collected"],
    ["Enquiry", "Sent to WhatsApp"],
  ],
} as const;

function Pipeline() {
  const [tab, setTab] = useState<keyof typeof flows>("Checkout");
  return (
    <div className="flex h-full flex-col p-6 md:p-10">
      <div className="label flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Flow" className="flex">
          {(Object.keys(flows) as (keyof typeof flows)[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`border px-3 py-2 transition-colors duration-150 ${tab === t ? "border-bone bg-bone text-ink" : "border-line text-mute hover:text-bone"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-mute">{tab === "Checkout" ? "Linen Centre · Image Cottons" : "Build Crest · UAE"}</span>
      </div>

      <motion.ol
        key={tab}
        className="mt-6 flex-1"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.09 }}
      >
        {flows[tab].map(([step, result], i) => (
          <motion.li
            key={step}
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
            className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-2 border-b border-line py-3 text-sm"
          >
            <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
            <span className="label text-accent">✓ {result}</span>
          </motion.li>
        ))}
      </motion.ol>

      <p className="mt-6 flex items-end justify-between">
        <span className="display text-6xl md:text-7xl">200+</span>
        <span className="label pb-1 text-mute">Orders / month</span>
      </p>
    </div>
  );
}

/* ── 03 · ERP module grid ────────────────────────────────────────────────── */

const domains = ["Operations & supply chain", "Finance & tax", "Sales & CRM", "HR & governance", "Analytics"];

function Modules() {
  return (
    <div className="flex h-full flex-col justify-between gap-8 p-6 md:p-10">
      <motion.ul
        className="grid grid-cols-8 gap-1.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.025 }}
        aria-label="38 modules"
      >
        {Array.from({ length: 38 }, (_, i) => (
          <motion.li
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } } }}
            className="label flex aspect-square items-end border border-line p-1 text-[0.5625rem] text-mute transition-colors duration-150 hover:border-volt hover:bg-volt hover:text-night"
          >
            {String(i + 1).padStart(2, "0")}
          </motion.li>
        ))}
      </motion.ul>
      <div>
        <ul className="label flex flex-wrap gap-x-4 gap-y-1 text-mute">
          {domains.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <dl className="label mt-5 grid grid-cols-2 border-t border-line pt-4">
          <div>
            <dt className="text-mute">Frontend</dt>
            <dd className="mt-1 text-accent">Deployed · Vercel</dd>
          </div>
          <div>
            <dt className="text-mute">Django API</dt>
            <dd className="mt-1 text-bone">Integration in progress</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ── Cards ───────────────────────────────────────────────────────────────── */

const projects = [
  {
    title: "Nehru Trophy Boat Race",
    kind: "Event site & ticketing platform",
    year: "2026",
    stack: ["Next.js", "Supabase", "PWA", "Airpay"],
    points: [
      "Booking flow with quota-based tiers, temporary seat holds and a payment webhook safe against repeated calls.",
      "Role-based admin — dashboard, orders, attendee search, scan log — with 32,125 physical serials loaded for digital gatepasses.",
      "Installable scanner PWA used by gate volunteers to verify 500+ premium-seat attendees.",
    ],
    Visual: Gatepass,
  },
  {
    title: "Three live stores",
    kind: "Linen Centre · Image Cottons · Build Crest",
    year: "2025–26",
    stack: ["Next.js", "TypeScript", "Supabase", "Razorpay"],
    points: [
      "Each platform: a Next.js storefront, a custom React admin panel and Postgres with row-level security.",
      "Checkout with signature-verified webhooks, atomic stock reservation, coupons, zone shipping and invoice PDFs.",
      "Admin panels with role-based access for variants, orders, refunds, reporting and CSV export.",
    ],
    Visual: Pipeline,
  },
  {
    title: "CipherPeak ERP",
    kind: "38-module enterprise platform",
    year: "Ongoing",
    stack: ["React", "Vite", "Django"],
    points: [
      "Built the web frontend across operations, finance and tax, sales and CRM, HR and analytics.",
      "Directed the backend developer building the Django API and defined the integration contract between the two.",
    ],
    Visual: Modules,
  },
];

function Card({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const p = projects[i];
  const n = projects.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.04]);
  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
      <motion.article
        style={{ scale, top: `${i * 20}px` }}
        className="relative grid w-full origin-top border lg:will-change-transform border-line bg-ink-2 max-lg:transform-none! lg:h-[min(78svh,43rem)] lg:grid-cols-[1fr_1.05fr]"
      >
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
          <div className="label flex justify-between text-mute">
            <span>
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span>{p.year}</span>
          </div>
          <div>
            <h3 className="display text-[clamp(2.5rem,5vw,4.75rem)]">{p.title}</h3>
            <p className="mt-3 text-mute">{p.kind}</p>
            <ul className="mt-8 max-w-[52ch] space-y-3 text-[0.9375rem] text-bone/85">
              {p.points.map((pt) => (
                <li key={pt} className="grid grid-cols-[1.25rem_1fr]">
                  <span className="text-accent">—</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <ul className="label flex flex-wrap gap-x-5 gap-y-1 text-mute">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line bg-ink lg:border-l lg:border-t-0">
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
    </section>
  );
}
