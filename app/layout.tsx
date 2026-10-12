import type { Metadata, Viewport } from "next";
import { Anybody, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/nav";
import Preloader from "@/components/preloader";
import Providers from "@/components/providers";
import "./globals.css";

const display = Anybody({ variable: "--f-display", subsets: ["latin"], axes: ["wdth"] });
const body = Instrument_Sans({ variable: "--f-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amal Shaji — Frontend Developer & Technical Lead",
  description:
    "Frontend and full-stack developer, co-founder and technical lead at CipherPeak. React, Next.js, TypeScript, Supabase. Based in Kerala, open to relocate to the UAE.",
};

export const viewport: Viewport = { themeColor: "#eeebe2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body id="top">
        {/* Light is the default (set on <html>); a saved choice is applied before first paint. */}
        <Script id="theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`}
        </Script>
        <noscript>
          <style>{`.preloader{display:none}.hero-letter,.after-load{transform:none!important;opacity:1!important}.hero-ring{stroke-dashoffset:0!important}`}</style>
        </noscript>
        <Providers>
          <Preloader />
          <Nav />
          {children}
          <div className="grain" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
