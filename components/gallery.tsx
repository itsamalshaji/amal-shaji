"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const rows = [
  [
    ["ntbr-tickets", "Boat race ticket tiers page"],
    ["linen-shop", "Linen Centre shop listing"],
    ["erp-finance", "ERP finance dashboard"],
    ["buildcrest-products", "Build Crest product catalogue with filters"],
    ["imagecottons-shop", "Image Cottons archive listing"],
  ],
  [
    ["erp-crm", "ERP CRM pipeline dashboard"],
    ["ntbr-guide", "Boat race visitor guide"],
    ["linen-stores", "Linen Centre store locator"],
    ["buildcrest-brands", "Build Crest brands page"],
    ["erp-desktop", "ERP module launcher"],
  ],
];

/** Two bands of real screens that slide against each other as the page scrolls. */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = [useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]), useTransform(scrollYProgress, [0, 1], ["-24%", "0%"])];

  return (
    <section ref={ref} aria-label="Screens from shipped projects" className="overflow-hidden py-16 md:py-24">
      <p className="label mb-6 flex justify-between px-5 text-mute md:px-8">
        <span>Screens from shipped projects</span>
        <span>Not mockups</span>
      </p>
      <div className="space-y-3 md:space-y-4">
        {rows.map((row, r) => (
          <motion.div key={r} style={{ x: x[r] }} className="flex w-max gap-3 will-change-transform md:gap-4">
            {row.map(([file, alt]) => (
              <figure key={file} className="w-[68vw] shrink-0 overflow-hidden border border-line sm:w-[42vw] lg:w-[30vw]">
                <Image src={`/work/${file}.jpg`} alt={alt} width={1200} height={750} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 68vw" className="block h-auto w-full" />
              </figure>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
