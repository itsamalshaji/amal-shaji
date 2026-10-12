import Contact from "@/components/contact";
import Nav from "@/components/nav";
import Preloader from "@/components/preloader";
import Profile from "@/components/profile";
import Providers from "@/components/providers";
import ReactiveLine from "@/components/reactive-line";
import { FadeUp, Reveal } from "@/components/reveal";
import Work from "@/components/work";

const facts = [
  ["Role", "Frontend & full-stack · Team lead"],
  ["Based", "Alappuzha, Kerala"],
  ["Relocating", "United Arab Emirates"],
  ["Status", "Available · immediate joining"],
];

const experience = [
  {
    when: "Dec 2022 — Present",
    role: "Co-Founder & Director",
    org: "CipherPeak Private Limited · Technical lead",
    points: [
      "Lead a cross-functional team of six — UI/UX, Android, backend, frontend — from requirements to handover.",
      "Own the client relationship end to end: requirement meetings, scope, proposals and sign-off, for clients in India and the UAE including Weinber Inc. and VE LUX.",
      "Choose the stack per project and plan delivery around fixed dates — including a gate-entry system that had to be live on race day.",
      "Delivered 3–4 Shopify stores end to end, from theme and payment integration to staff training.",
    ],
  },
  {
    when: "Jun 2022 — Jan 2024",
    role: "Web / Software Developer",
    org: "EventGurus · Ernakulam",
    points: [
      "Built and customised client sites in WordPress, HubSpot, JavaScript and jQuery, with PHP on the back end.",
      "Turned design mockups into responsive pages; debugged and tested with in-house designers before release.",
    ],
  },
  {
    when: "2020 — 2022",
    role: "Freelance Developer & IT Support",
    org: "Self-employed",
    points: ["HTML and PHP websites for individual clients; IT support and software training for office teams."],
  },
];

const stack = [
  ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Vite", "Zustand", "HeroUI", "PWA", "On-page SEO"]],
  ["Backend & data", ["Supabase — Postgres, Auth, Storage, RLS", "Route handlers & server actions", "REST with Django", "PHP"]],
  ["Integrations", ["Razorpay", "Airpay", "Resend", "WhatsApp Cloud API", "Google Analytics 4", "Meta Pixel", "Meta & Google Ads"]],
  ["Platforms", ["Shopify", "WordPress", "HubSpot", "Vercel", "Git & GitHub"]],
  ["AI-assisted development", ["Claude Code", "Codex", "Antigravity"]],
  ["Leadership", ["Team leadership", "Requirement gathering", "Technical proposals", "Stack selection", "Delivery planning"]],
] as const;

export default function Home() {
  return (
    <Providers>
      <Preloader />
      <Nav />

      <main id="top">
        {/* Hero */}
        <section className="flex min-h-svh flex-col justify-between px-5 pb-5 pt-24 md:px-8 md:pb-6 md:pt-36">
          <div className="after-load grid gap-8 lg:grid-cols-12">
            <p className="max-w-[26ch] text-[1.375rem] leading-[1.2] md:text-[2rem] lg:col-span-6">
              I build production web apps in React, Next.js and TypeScript — and lead the team that ships them.
            </p>
            <dl className="label grid content-start gap-y-2.5 lg:col-span-4 lg:col-start-9">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] border-b border-line pb-2.5">
                  <dt className="text-mute">{k}</dt>
                  <dd className={k === "Status" ? "text-volt" : ""}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 md:mt-16">
            <div className="after-load label mb-3 flex justify-between text-mute">
              <span>Scroll ↓</span>
              <span className="hidden sm:block">9.4981° N 76.3388° E → 25.2048° N 55.2708° E</span>
              <span>Portfolio · 2026</span>
            </div>
            <h1>
              <span className="sr-only">Amal Shaji</span>
              <ReactiveLine text="AMAL SHAJI" intro className="hidden sm:flex" />
              <ReactiveLine text="AMAL" intro fill={0.86} className="flex sm:hidden" />
              <ReactiveLine text="SHAJI" intro fill={0.86} start={4} className="mt-2 flex sm:hidden" />
            </h1>
          </div>
        </section>

        <Profile />
        <Work />

        {/* Experience */}
        <section id="experience" className="on-bone mt-24 bg-bone px-5 py-20 text-ink lg:mt-8 md:px-8 md:py-32">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <p className="label text-ink/60 lg:col-span-3">(03) Experience</p>
            <h2 className="display text-[clamp(3.5rem,11vw,10rem)] lg:col-span-9">
              <Reveal>Four years,</Reveal>
              <Reveal delay={0.08}>three seats</Reveal>
            </h2>
          </div>

          <ol className="mt-16 md:mt-24">
            {experience.map((e) => (
              <li key={e.role} className="group grid gap-4 border-t border-ink/20 py-8 lg:grid-cols-12 lg:py-10">
                <p className="label pt-1.5 text-ink/60 lg:col-span-3">{e.when}</p>
                <div className="lg:col-span-4">
                  <h3 className="display widen text-3xl md:text-4xl">{e.role}</h3>
                  <p className="mt-2 text-sm text-ink/60">{e.org}</p>
                </div>
                <ul className="max-w-[60ch] space-y-3 text-[0.9375rem] lg:col-span-5">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <FadeUp className="label grid gap-6 border-t border-ink/20 pt-8 lg:grid-cols-12">
            <p className="text-ink/60 lg:col-span-3">Education</p>
            <p className="leading-relaxed lg:col-span-4">
              Bachelor of Computer Applications
              <br />
              <span className="text-ink/60">Fr. Porukara CMI College · 2016–19</span>
            </p>
            <p className="leading-relaxed lg:col-span-3">
              Data Science with Python
              <br />
              <span className="text-ink/60">NIIT Kozhikode · 2019–20</span>
            </p>
            <p className="leading-relaxed lg:col-span-2">
              Languages
              <br />
              <span className="text-ink/60">English, Malayalam, Hindi, Tamil</span>
            </p>
          </FadeUp>
        </section>

        {/* Stack */}
        <section id="stack" className="px-5 py-20 md:px-8 md:py-32">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <p className="label text-mute lg:col-span-3">(04) Stack</p>
            <h2 className="display text-[clamp(3.5rem,11vw,10rem)] lg:col-span-9">
              <Reveal>Tools I</Reveal>
              <Reveal delay={0.08}>reach for</Reveal>
            </h2>
          </div>
          <div className="mt-16 grid border-t border-line sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
            {stack.map(([group, items], i) => (
              <FadeUp key={group} delay={(i % 3) * 0.06} className={`border-b border-line py-8 sm:pr-6 ${i % 3 ? "lg:border-l lg:pl-6" : ""} ${i % 2 ? "sm:max-lg:border-l sm:max-lg:pl-6" : ""}`}>
                <h3 className="label text-volt">{group}</h3>
                <ul className="mt-5 space-y-1.5 text-lg leading-snug">
                  {items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </section>
      </main>

      <Contact />
      <div className="grain" aria-hidden />
    </Providers>
  );
}
