import type { Metadata } from "next";
import Contact from "@/components/contact";
import { Reveal } from "@/components/reveal";
import WorksGrid from "@/components/works-grid";
import JsonLd from "@/components/json-ld";
import { pageMeta, worksLd } from "@/lib/seo";
import { works } from "@/lib/works";

export const metadata: Metadata = pageMeta({
  title: `Works — ${works.length} Websites, Stores & Web Apps by Amal Shaji`,
  description: `${works.length} live client websites, online stores and web apps built or led by Amal Shaji with React, Next.js, Supabase, Shopify and WordPress.`,
  path: "/works",
});

export default function WorksPage() {
  return (
    <>
      <JsonLd data={worksLd()} />
      <main className="px-5 pb-24 pt-32 md:px-8 md:pb-40 md:pt-44">
        <p className="label flex justify-between text-mute">
          <span>(Works)</span>
          <span>{works.length} projects</span>
        </p>
        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
          <h1 className="display text-[clamp(4rem,13vw,12rem)] lg:col-span-8">
            <Reveal>My</Reveal>
            <Reveal delay={0.08}>
              <span className="mark">works</span>
            </Reveal>
          </h1>
          <p className="max-w-[34ch] text-lg text-mute md:text-xl lg:col-span-4 lg:pb-4">
            Client sites, online stores and platforms I&rsquo;ve built or led. Every card opens the real thing.
          </p>
        </div>
        <div className="mt-14 border-t border-line pt-8 md:mt-20">
          <WorksGrid />
        </div>
      </main>
      <Contact />
    </>
  );
}
