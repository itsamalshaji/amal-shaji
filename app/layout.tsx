import type { Metadata, Viewport } from "next";
import { Anybody, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Anybody({ variable: "--f-display", subsets: ["latin"], axes: ["wdth"] });
const body = Instrument_Sans({ variable: "--f-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amal Shaji — Frontend Developer & Technical Lead",
  description:
    "Frontend and full-stack developer, co-founder and technical lead at CipherPeak. React, Next.js, TypeScript, Supabase. Based in Kerala, open to relocate to the UAE.",
};

export const viewport: Viewport = { themeColor: "#0d0d0b" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body>
        {/* Apply a saved theme before first paint. */}
        <Script id="theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`}
        </Script>
        <noscript>
          <style>{`.preloader{display:none}.hero-letter,.after-load{transform:none!important;opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
