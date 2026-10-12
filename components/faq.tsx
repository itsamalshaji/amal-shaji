import { faq } from "@/lib/faq";
import { Reveal } from "./reveal";

/** Direct answers to the questions people (and answer engines) ask; mirrored in the FAQPage schema. */
export default function Faq() {
  return (
    <section id="faq" className="border-t border-line px-5 py-20 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-mute">(05) Quick answers</p>
          <h2 className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
            <Reveal>Asked</Reveal>
            <Reveal delay={0.08}>
              <span className="mark">often</span>
            </Reveal>
          </h2>
        </div>
        <div className="border-t border-line lg:col-span-7">
          {faq.map(({ q, a }, i) => (
            <details key={q} name="faq" open={i === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 text-lg font-medium transition-colors duration-150 hover:text-accent md:text-xl [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <span aria-hidden className="shrink-0 text-2xl font-light leading-none text-mute transition-transform duration-300 ease-out group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-mute">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
