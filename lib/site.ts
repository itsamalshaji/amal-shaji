// Canonical origin. On Vercel this follows the project's production domain automatically,
// so adding a custom domain needs no code change; NEXT_PUBLIC_SITE_URL overrides it.
const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? (production ? `https://${production}` : "https://amalshaji.vercel.app")).replace(/\/$/, "");

export const site = {
  name: "Amal Shaji",
  role: "Frontend Developer & Team Lead",
  title: "Amal Shaji — Frontend Developer & Team Lead (React, Next.js)",
  description:
    "Frontend and full-stack developer and team lead from Kerala, India. I build production web apps in React, Next.js and TypeScript. Open to roles in the UAE.",
  email: "itsamalshaji@gmail.com",
  phone: "+91 97467 11096",
  linkedin: "https://linkedin.com/in/itsamalshaji",
  github: "https://github.com/itsamalshaji",
  locality: "Alappuzha",
  region: "Kerala",
  country: "IN",
} as const;

export const abs = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
