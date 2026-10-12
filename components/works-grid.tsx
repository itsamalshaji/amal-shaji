"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { categories, domain, works, type Category } from "@/lib/works";

const ease = [0.16, 1, 0.3, 1] as const;
type Filter = Category | "all";

export default function WorksGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = works.filter((w) => filter === "all" || w.category === filter);
  const tabs: [Filter, string, number][] = [
    ["all", "All", works.length],
    ...(Object.entries(categories) as [Category, string][]).map(([k, label]): [Filter, string, number] => [k, label, works.filter((w) => w.category === k).length]),
  ];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="label flex flex-wrap gap-2">
        {tabs.map(([key, label, count]) => (
          <button
            key={key}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`border px-3.5 py-2.5 transition-colors duration-150 ${filter === key ? "border-bone bg-bone text-ink" : "border-line text-mute hover:border-mute hover:text-bone"}`}
          >
            {label} <span className="ml-1.5">{String(count).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-14 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((w, i) => (
            <motion.li
              key={w.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease }}
            >
              <a href={w.url} target="_blank" rel="noreferrer" className="group block">
                <div className="relative overflow-hidden border border-line bg-ink-2 transition-transform duration-700 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.025]">
                  <Image
                    src={`/works/${w.slug}.jpg`}
                    alt={`${w.name} website`}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1280px) 31vw, (min-width: 640px) 46vw, 92vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="block h-auto w-full"
                  />
                  <span className="label absolute bottom-3 right-3 translate-y-[160%] bg-volt px-3 py-2 text-night transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    Visit site ↗
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="display text-[1.75rem] transition-colors duration-150 group-hover:text-accent md:text-3xl">{w.name}</h2>
                  <span className="label shrink-0 text-mute">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-[0.9375rem] text-mute">{w.blurb}</p>
                <p className="label mt-4 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-mute">{domain(w.url)}</span>
                  {w.tech?.map((t) => (
                    <span key={t} className="border border-accent/50 px-2 py-1 text-accent">
                      {t}
                    </span>
                  ))}
                </p>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
