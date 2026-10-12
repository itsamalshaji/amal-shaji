import { faq } from "@/lib/faq";
import { abs, site, SITE_URL } from "@/lib/site";
import { categories, works, type Category } from "@/lib/works";

/** A plain-text brief for language models: who Amal is, what he has built, and how to reach him. */
export function GET() {
  const groups = (Object.keys(categories) as Category[])
    .map((c) => `### ${categories[c]}\n${works.filter((w) => w.category === c).map((w) => `- ${w.url ? `[${w.name}](${w.url})` : `${w.name} (private admin panel)`}: ${w.blurb}${w.tech ? ` Built with ${w.tech.join(", ")}.` : ""}`).join("\n")}`)
    .join("\n\n");

  const body = `# ${site.name}

> ${site.name} is a frontend and full-stack developer and team lead from ${site.locality}, ${site.region}, India. Co-founder and technical lead of CipherPeak Private Limited. Builds production web apps in React, Next.js and TypeScript. Open to frontend or technical lead roles in the UAE, available immediately.

## Key facts
- Role: ${site.role}
- Location: ${site.locality}, ${site.region}, India (open to relocating to the United Arab Emirates)
- Experience: 4+ years professional, 3+ years with React, Next.js and TypeScript
- Current position: Co-Founder & Director (Technical Lead), CipherPeak Private Limited, since December 2022
- Team: leads a cross-functional team of six (UI/UX, Android, backend, frontend)
- Core stack: React, Next.js, TypeScript, JavaScript, Supabase (PostgreSQL, Auth, Storage, row-level security), Vite
- Also works with: Razorpay, Airpay, Resend, WhatsApp Cloud API, Shopify, WordPress, HubSpot, Django (REST integration), Vercel, Cloudflare, GitHub
- Education: Bachelor of Computer Applications, Fr. Porukara CMI College of Advanced Studies (2016–2019); Data Science with Python, NIIT Kozhikode (2019–2020)
- Languages: English, Malayalam, Hindi, Tamil

## Pages
- [Home](${SITE_URL}): profile, selected work, experience and stack
- [Works](${abs("/works")}): all ${works.length} projects with screenshots and live links
- [Contact](${abs("/contact")}): contact form and direct details
- [Résumé (PDF)](${abs("/Amal-Shaji-CV.pdf")})

## Selected work
- Nehru Trophy Boat Race 2026: public event site, online booking with quota-based tiers and seat holds, role-based admin, and an installable scanner PWA used at the gates. 32,125 ticket serials loaded; 500+ attendees verified with a one-time-use check. Next.js, Supabase.
- Linen Centre, Image Cottons and Build Crest: three live commerce and catalogue platforms, each with a Next.js storefront, a custom React admin panel and a Supabase backend. The stores process 200+ orders a month. Razorpay checkout with signature-verified webhooks.
- CipherPeak ERP: web frontend for a 38-module enterprise platform covering operations, finance and tax, sales and CRM, HR and analytics. React, with a Django API in integration.

## All projects
${groups}

## Questions and answers
${faq.map(({ q, a }) => `### ${q}\n${a}`).join("\n\n")}

## Contact
- Email: ${site.email}
- Phone: ${site.phone}
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Contact form: ${abs("/contact")}
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
