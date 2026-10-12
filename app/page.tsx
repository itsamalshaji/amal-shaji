import {
  siClaude, siDjango, siGit, siGithub, siGoogleanalytics, siHubspot, siJavascript, siMeta, siNextdotjs, siPhp, siPostgresql,
  siRazorpay, siReact, siResend, siShopify, siSupabase, siTypescript, siVercel, siVite, siWhatsapp, siWordpress,
} from "simple-icons";
import Link from "next/link";
import Contact from "@/components/contact";
import Gallery from "@/components/gallery";
import Profile from "@/components/profile";
import { FadeUp, Reveal } from "@/components/reveal";
import Work from "@/components/work";

// Stand-in until the portrait is supplied: swap for an <Image> of a transparent-background cutout, bottom-aligned so the ring sits behind it.
const photo = (
  <div className="after-load absolute left-[17%] top-[21%] grid size-[70%] place-items-center rounded-full bg-ink-2" style={{ "--d": "900ms" } as React.CSSProperties}>
    <span className="display text-[clamp(4rem,10vw,9rem)] text-line">AS</span>
  </div>
);

const experience = [
  {
    when: "Dec 2022 — Present",
    role: "Co-Founder & Director",
    org: "CipherPeak Private Limited · Technical lead",
    points: [
      "Lead a cross-functional team of six, from requirements to handover.",
      "Own client delivery for India and the UAE: scope, proposals, stack and deadlines.",
    ],
  },
  {
    when: "Jun 2022 — Jan 2024",
    role: "Web / Software Developer",
    org: "EventGurus · Ernakulam",
    points: ["Client sites in WordPress, HubSpot, JavaScript and PHP, from design mockup to release."],
  },
  {
    when: "2020 — 2022",
    role: "Freelance Developer & IT Support",
    org: "Self-employed",
    points: ["HTML and PHP websites, plus IT support and software training for office teams."],
  },
];

type Icon = { title: string; path: string };
const tool = (icon: Icon, name = icon.title) => ({ icon, name });

const stack = [
  tool(siReact), tool(siNextdotjs), tool(siTypescript), tool(siJavascript), tool(siVite), tool(siSupabase), tool(siPostgresql),
  tool(siDjango), tool(siPhp), tool(siRazorpay), tool(siShopify), tool(siWordpress), tool(siHubspot), tool(siVercel),
  tool(siGit), tool(siGithub), tool(siResend), tool(siWhatsapp, "WhatsApp API"), tool(siGoogleanalytics, "Analytics 4"), tool(siMeta, "Meta Ads"), tool(siClaude, "Claude Code"),
];

const strip = [siReact, siNextdotjs, siTypescript, siJavascript, siSupabase, siVite, siGit];

function Logo({ icon, className = "" }: { icon: Icon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={icon.path} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative flex min-h-svh flex-col overflow-hidden">
          <div className="grid flex-1 items-center gap-12 px-5 pt-28 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pt-24">
            <div className="lg:pb-10">
              <p className="after-load text-4xl font-bold tracking-tight md:text-5xl">
                Hello<span className="text-accent">.</span>
              </p>
              <h1>
                <span className="after-load relative ml-14 mt-6 block w-fit text-3xl font-light tracking-tight md:ml-20 md:text-[2.75rem] md:leading-tight" style={{ "--d": "300ms" } as React.CSSProperties}>
                  <span aria-hidden className="absolute right-full top-1/2 mr-4 h-0.5 w-screen bg-accent" />
                  I&rsquo;m Amal<span className="sr-only"> Shaji,</span>
                </span>
                <span className="after-load mt-4 block text-[clamp(2.5rem,5.4vw,5.25rem)] font-bold leading-[1.05] tracking-[-0.03em]" style={{ "--d": "400ms" } as React.CSSProperties}>
                  Frontend Developer
                </span>
              </h1>
              <p className="after-load mt-6 max-w-[44ch] text-mute md:text-lg" style={{ "--d": "500ms" } as React.CSSProperties}>
                I build production web apps in React, Next.js and TypeScript — and lead the team that ships them.
              </p>
              <div className="after-load mt-10 flex flex-wrap gap-4" style={{ "--d": "600ms" } as React.CSSProperties}>
                <Link
                  href="/contact"
                  className="border border-volt bg-volt px-6 py-3.5 font-medium text-night transition-colors duration-150 hover:border-bone hover:bg-bone hover:text-ink active:bg-bone/80"
                >
                  Got a project?
                </Link>
                <a
                  href="/Amal-Shaji-CV.pdf"
                  download
                  className="border border-accent px-6 py-3.5 font-medium transition-colors duration-150 hover:bg-accent hover:text-ink active:bg-accent/80"
                >
                  My resume
                </a>
              </div>
              <p className="after-load label mt-8 text-mute" style={{ "--d": "700ms" } as React.CSSProperties}>
                <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
                Available now · Open to relocate to the UAE
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[36rem] self-end">
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
                <circle className="hero-ring" cx="52" cy="56" r="35" stroke="var(--volt)" strokeWidth="3" strokeLinecap="square" pathLength={1} transform="rotate(-90 52 56)" />
                <g className="after-load" stroke="var(--accent)" strokeWidth="0.45" strokeLinejoin="round" style={{ "--d": "1100ms" } as React.CSSProperties}>
                  <path d="M13 17 2 23.5 13 30v-3.6L8.2 23.5 13 20.6Z" />
                  <path d="M88 76 99 82.500 88 89v-3.6l4.8-2.9-4.8-2.9Z" />
                </g>
              </svg>
              {photo}
            </div>
          </div>

          <ul className="after-load flex flex-wrap justify-between gap-x-8 gap-y-3 bg-ink-2 px-5 py-6 text-lg text-mute md:px-8 md:text-xl" style={{ "--d": "800ms" } as React.CSSProperties}>
            {strip.map((icon) => (
              <li key={icon.title} className="flex items-center gap-2.5">
                <Logo icon={icon} className="size-5" />
                {icon.title}
              </li>
            ))}
          </ul>
        </section>

        <Gallery />
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
          <ul className="mt-16 grid grid-cols-3 border-l border-t border-line sm:grid-cols-4 md:mt-24 lg:grid-cols-7">
            {stack.map(({ icon, name }) => (
              <li
                key={name}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 border-b border-r border-line text-center transition-colors duration-150 hover:bg-volt hover:text-night"
              >
                <Logo icon={icon} className="size-7 md:size-8" />
                <span className="label">{name}</span>
              </li>
            ))}
          </ul>
          <FadeUp className="label mt-8 grid gap-4 text-mute lg:grid-cols-12">
            <p className="lg:col-span-3">Also</p>
            <p className="leading-relaxed lg:col-span-9">
              Zustand · HeroUI · PWA · Airpay · Google Ads · Codex · Antigravity · Team leadership · Technical proposals · Delivery planning
            </p>
          </FadeUp>
        </section>
      </main>

      <Contact />
    </>
  );
}
