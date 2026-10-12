import { works } from "./works";

/** Plain-language answers about Amal. One source for the on-page FAQ, its FAQPage schema and llms.txt. */
export const faq: { q: string; a: string }[] = [
  {
    q: "Who is Amal Shaji?",
    a: "Amal Shaji is a frontend and full-stack developer and team lead from Alappuzha, Kerala, India. He is the co-founder and technical lead of CipherPeak Private Limited, where he leads a six-person team building production web applications in React, Next.js and TypeScript.",
  },
  {
    q: "What does Amal Shaji specialise in?",
    a: "Production frontends in React, Next.js and TypeScript, backed by Supabase (PostgreSQL, Auth, Storage and row-level security). He also builds e-commerce checkouts with Razorpay, installable progressive web apps, and Shopify and WordPress sites, and leads teams from requirements through to delivery.",
  },
  {
    q: "What has Amal Shaji built?",
    a: `The ticketing and gate-entry platform for the Nehru Trophy Boat Race 2026 (32,125 ticket serials loaded and 500+ attendees scanned at the gates), three live commerce platforms processing 200+ orders a month (Linen Centre, Image Cottons and Build Crest), and the frontend of a 38-module ERP. In total, ${works.length} client sites, stores and web apps are listed on the works page.`,
  },
  {
    q: "How much experience does Amal Shaji have?",
    a: "More than four years of professional experience, including over three years building production applications in React, Next.js and TypeScript. He has been co-founder and technical lead at CipherPeak since December 2022, was a web developer at EventGurus from 2022 to 2024, and freelanced from 2020 to 2022.",
  },
  {
    q: "Is Amal Shaji available for hire, and can he relocate to the UAE?",
    a: "Yes. He is looking for frontend developer or technical lead roles in the United Arab Emirates, is open to relocating, and can join immediately. He also takes on website, online store and web app projects.",
  },
  {
    q: "How can I contact Amal Shaji?",
    a: "Use the contact form on this site, email itsamalshaji@gmail.com, call +91 97467 11096, or message him on LinkedIn at linkedin.com/in/itsamalshaji.",
  },
];
