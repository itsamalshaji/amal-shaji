import type { Metadata } from "next";
import Contact from "@/components/contact";
import { Reveal } from "@/components/reveal";
import WorksGrid from "@/components/works-grid";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "My works — Amal Shaji",
  description: `${works.length} client sites, online stores and web platforms built or led by Amal Shaji.`,
};

export default function WorksPage() {
  return (
    <>
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
