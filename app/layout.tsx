import type { Metadata, Viewport } from "next";
import { Anybody, Manrope } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/nav";
import Preloader from "@/components/preloader";
import Providers from "@/components/providers";
import { site, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Anybody({ variable: "--f-display", subsets: ["latin"], axes: ["wdth"] });
const body = Manrope({ variable: "--f-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: ["Amal Shaji", "frontend developer", "React developer", "Next.js developer", "TypeScript", "team lead", "technical lead", "Kerala", "UAE", "Dubai", "CipherPeak"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Paste the token from Google Search Console into this env var on Vercel to verify ownership.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#eeebe2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${display.variable} ${body.variable} antialiased`}>
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
