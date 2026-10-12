import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { Clock } from "@/components/nav";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact — Amal Shaji",
  description: "Hiring a frontend or technical lead, or have a project to build? Send Amal Shaji a message.",
};

const details = [
  ["Email", "itsamalshaji@gmail.com", "mailto:itsamalshaji@gmail.com"],
  ["Phone", "+91 97467 11096", "tel:+919746711096"],
  ["LinkedIn", "in/itsamalshaji ↗", "https://linkedin.com/in/itsamalshaji"],
  ["Résumé", "Download PDF ↓", "/Amal-Shaji-CV.pdf"],
];

export default function ContactPage() {
  return (
    <>
      <main className="px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44">
        <p className="label text-mute">(Contact)</p>
        <h1 className="display mt-6 text-[clamp(4rem,13vw,12rem)]">
          <Reveal>Let&rsquo;s</Reveal>
          <Reveal delay={0.08}>
            <span className="mark">talk</span>
          </Reveal>
        </h1>

        <div className="mt-16 grid gap-16 border-t border-line pt-10 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[30ch] text-xl leading-snug md:text-2xl">
              Hiring a frontend or technical lead, or have something to build? Tell me a little about it.
            </p>
            <dl className="label mt-10">
              {details.map(([k, v, href]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] border-b border-line py-3">
                  <dt className="text-mute">{k}</dt>
                  <dd>
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : href.endsWith(".pdf") ? { download: true } : {})}
                      className="normal-case tracking-normal underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-accent"
                    >
                      {v}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[6.5rem_1fr] border-b border-line py-3">
                <dt className="text-mute">Based</dt>
                <dd>
                  Alappuzha, Kerala · <Clock />
                </dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] border-b border-line py-3">
                <dt className="text-mute">Status</dt>
                <dd className="text-accent">Available now · Open to the UAE</dd>
              </div>
            </dl>
          </div>
          <div className="relative lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </main>
      <footer className="label flex flex-wrap justify-between gap-3 border-t border-line px-5 py-6 text-mute md:px-8">
        <span>© 2026 Amal Shaji</span>
        <a href="#top" className="underline-offset-4 hover:underline">Back to top ↑</a>
      </footer>
    </>
  );
}
