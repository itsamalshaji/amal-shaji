"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const rows = [
  [
    ["/work/ntbr-tickets.jpg", "Boat race ticket tiers page"],
    ["/works/setrix.jpg", "Setrix Logistics home page"],
    ["/work/linen-shop.jpg", "Linen Centre shop listing"],
    ["/work/erp-finance.jpg", "ERP finance dashboard"],
    ["/works/velux.jpg", "VE LUX car detailing home page"],
    ["/work/buildcrest-products.jpg", "Build Crest product catalogue with filters"],
    ["/works/aavishkar.jpg", "Aavishkar Architects portfolio"],
    ["/work/imagecottons-shop.jpg", "Image Cottons archive listing"],
  ],
  [
    ["/work/erp-crm.jpg", "ERP CRM pipeline dashboard"],
    ["/works/erreka.jpg", "Erreka Doors home page"],
    ["/work/ntbr-guide.jpg", "Boat race visitor guide"],
    ["/work/linen-stores.jpg", "Linen Centre store locator"],
    ["/works/drshinys.jpg", "Dr. Shiny's career counselling home page"],
    ["/work/buildcrest-brands.jpg", "Build Crest brands page"],
    ["/works/weinber.jpg", "Weinber Inc. product site"],
    ["/work/erp-desktop.jpg", "ERP module launcher"],
  ],
];

/** Two bands of real screens that slide against each other as the page scrolls. */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Each band travels its full overflow (own width minus the viewport), so every screen passes through.
  const out = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const back = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const x = [useMotionTemplate`translateX(calc(-${out}% + ${out}vw))`, useMotionTemplate`translateX(calc(-${back}% + ${back}vw))`];

  return (
    <section ref={ref} aria-label="Screens from shipped projects" className="overflow-hidden py-16 md:py-24">
      <p className="label mb-6 flex justify-between px-5 text-mute md:px-8">
        <span>Screens from shipped projects</span>
        <span>Not mockups</span>
      </p>
      <div className="space-y-3 md:space-y-4">
        {rows.map((row, r) => (
          <motion.div key={r} style={{ transform: x[r] }} className="flex w-max gap-3 will-change-transform md:gap-4">
            {row.map(([src, alt]) => (
              <figure key={src} className="w-[68vw] shrink-0 overflow-hidden border border-line sm:w-[42vw] lg:w-[30vw]">
                <Image src={src} alt={alt} width={1200} height={750} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 68vw" className="block h-auto w-full" />
              </figure>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
