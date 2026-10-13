"use client";

import { useInView, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { type RefObject, useRef, useSyncExternalStore } from "react";

const rows = [
  [
    ["/work/ntbr-tickets.jpg", "Boat race ticket tiers page"],
    ["/works/setrix.jpg", "Setrix Logistics home page"],
    ["/work/linen-shop.jpg", "Linen Centre shop listing"],
    ["/work/erp-login.jpg", "CipherPeak ERP sign-in screen"],
    ["/works/velux.jpg", "VE LUX car detailing home page"],
    ["/work/buildcrest-products.jpg", "Build Crest product catalogue with filters"],
    ["/works/aavishkar.jpg", "Aavishkar Architects portfolio"],
    ["/work/imagecottons-shop.jpg", "Image Cottons archive listing"],
  ],
  [
    ["/work/erp-home.jpg", "CipherPeak ERP home with alerts and module groups"],
    ["/works/erreka.jpg", "Erreka Doors home page"],
    ["/work/ntbr-guide.jpg", "Boat race visitor guide"],
    ["/work/linen-stores.jpg", "Linen Centre store locator"],
    ["/works/drshinys.jpg", "Dr. Shiny's career counselling home page"],
    ["/work/buildcrest-brands.jpg", "Build Crest brands page"],
    ["/works/weinber.jpg", "Weinber Inc. product site"],
    ["/works/lankavalley.jpg", "Lanka Valley resort home page"],
  ],
];

const noSubscribe = () => () => {};

/** Browsers without scroll timelines: the same slide, written from the scroll position. */
function JsBands({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    target.current?.querySelectorAll<HTMLElement>(".band").forEach((band, i) => {
      const t = ((i ? 1 - p : p) * 100).toFixed(3);
      band.style.transform = `translateX(calc(${t}vw - ${t}%))`;
    });
  });
  return null;
}

/**
 * Two bands of real screens that slide against each other as the page scrolls. Each travels its full overflow
 * (own width minus the viewport), so every screen passes through. The movement itself lives in globals.css (`.band`).
 */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const js = useSyncExternalStore(noSubscribe, () => !CSS.supports("animation-timeline: view()"), () => false);
  // Screens parked far off to the side would otherwise start loading and decoding mid-slide.
  const near = useInView(ref, { once: true, margin: "100% 0px" });

  return (
    <section ref={ref} aria-label="Screens from shipped projects" className="gallery overflow-hidden py-16 md:py-24">
      {js && <JsBands target={ref} />}
      <p className="label mb-6 flex justify-between gutter text-mute">
        <span>Screens from shipped projects</span>
        <span>Not mockups</span>
      </p>
      <div className="space-y-3 md:space-y-4">
        {rows.map((row, r) => (
          <div key={r} className="band flex w-max gap-3 will-change-transform md:gap-4">
            {row.map(([src, alt]) => (
              <figure key={src} className="w-[68vw] shrink-0 overflow-hidden border border-line sm:w-[42vw] lg:w-[30vw]">
                <Image src={src} alt={alt} width={1200} height={750} loading={near ? "eager" : "lazy"} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 68vw" className="block h-auto w-full" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
