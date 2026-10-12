"use client";

import { useState } from "react";
import { Clock } from "./nav";
import ReactiveLine from "./reactive-line";

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
    <footer id="contact" className="on-volt relative z-45 bg-volt px-5 pb-6 pt-20 text-night md:px-8 md:pt-32">
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="label lg:col-span-3">(05) Contact</p>
        <p className="max-w-[30ch] text-xl leading-snug md:text-2xl lg:col-span-6">
          Looking for a frontend or technical lead role in the UAE. Available to join immediately.
        </p>
      </div>

      <h2 className="mt-16 md:mt-24">
        <span className="sr-only">Let&rsquo;s talk</span>
        <ReactiveLine text="LET’S TALK" className="flex" fill={0.8} />
      </h2>

      <div className="mt-10 grid gap-px border border-night bg-night sm:grid-cols-2 lg:grid-cols-4">
        <button onClick={copy} className="group bg-volt p-5 text-left transition-colors duration-150 hover:bg-night hover:text-volt active:bg-night">
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
            className="bg-volt p-5 transition-colors duration-150 hover:bg-night hover:text-volt active:bg-night"
          >
            <span className="label block opacity-60">{label}</span>
            <span className="mt-6 block text-lg">{text}</span>
          </a>
        ))}
      </div>

      <div className="label mt-10 flex flex-wrap justify-between gap-3">
        <span>© 2026 Amal Shaji</span>
        <span>
          Alappuzha, Kerala · <Clock />
        </span>
        <a href="#top" className="underline-offset-4 hover:underline">Back to top ↑</a>
      </div>
    </footer>
  );
}
