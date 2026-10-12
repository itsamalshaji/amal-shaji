"use client";

import Link from "next/link";
import { useState } from "react";
import ReactiveLine from "./reactive-line";
import { FadeUp } from "./reveal";

const email = "itsamalshaji@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${email}`;
    }
  };

  return (
    <footer id="contact" className="on-volt relative z-45 bg-volt gutter pb-6 pt-20 text-night md:pt-32">
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="label lg:col-span-3">Contact</p>
        <p className="max-w-[30ch] text-xl leading-snug md:text-2xl lg:col-span-6">
          Looking for a frontend or technical lead role in the UAE. Available to join immediately.
        </p>
        <p className="lg:col-span-3 lg:text-right">
          <Link href="/contact" className="inline-block border border-night bg-night px-6 py-3.5 font-medium text-volt transition-colors duration-150 hover:bg-volt hover:text-night active:bg-night/80">
            Send a message →
          </Link>
        </p>
      </div>

      <h2 className="mt-16 md:mt-24">
        <span className="sr-only">Let&rsquo;s talk</span>
        <ReactiveLine text="LET’S TALK" className="flex" fill={0.8} />
      </h2>

      <FadeUp className="mt-10 grid gap-px border border-night bg-night sm:grid-cols-2 xl:grid-cols-4">
        <button onClick={copy} className="group bg-volt p-5 text-left transition-colors duration-150 hover:bg-night hover:text-volt active:bg-night active:text-volt">
          <span className="label block opacity-60" aria-live="polite">{copied ? "Copied to clipboard" : "Email · click to copy"}</span>
          <span className="mt-6 block break-all text-lg">{email}</span>
        </button>
        {[
          ["LinkedIn ↗", "in/itsamalshaji", "https://linkedin.com/in/itsamalshaji"],
          ["Phone", "+91 97467 11096", "tel:+919746711096"],
          ["Résumé ↓", "Download PDF", "/Amal-Shaji-CV.pdf"],
        ].map(([label, text, href]) => (
          <a
            key={href}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : href.endsWith(".pdf") ? { download: true } : {})}
            className="bg-volt p-5 transition-colors duration-150 hover:bg-night hover:text-volt active:bg-night active:text-volt"
          >
            <span className="label block opacity-60">{label}</span>
            <span className="mt-6 block text-lg">{text}</span>
          </a>
        ))}
      </FadeUp>

      <div className="label mt-10 flex flex-wrap justify-between gap-3">
        <span>© 2026 Amal Shaji</span>
        <a href="#top" className="underline-offset-4 hover:underline">Back to top ↑</a>
      </div>
    </footer>
  );
}
