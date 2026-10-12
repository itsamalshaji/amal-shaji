import type { Metadata } from "next";
import { faq } from "./faq";
import { abs, site, SITE_URL } from "./site";
import { categories, works } from "./works";

/** Per-page metadata: canonical URL plus matching Open Graph and Twitter cards. */
export function pageMeta({ title, description, path, profile }: { title: string; description: string; path: string; profile?: boolean }): Metadata {
  const url = abs(path);
  const images = [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: profile
      ? { type: "profile", firstName: "Amal", lastName: "Shaji", username: "itsamalshaji", url, title, description, siteName: site.name, locale: "en_US", images }
      : { type: "website", url, title, description, siteName: site.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}

const PERSON = `${SITE_URL}/#person`;
const WEBSITE = `${SITE_URL}/#website`;
const EMPLOYER = `${SITE_URL}/#cipherpeak`;

// Other people share this name, so the entity is pinned down by employer, place and profiles.
const employer = {
  "@type": "Organization",
  "@id": EMPLOYER,
  name: "CipherPeak Private Limited",
  url: "https://www.cipher-peak.com",
  address: { "@type": "PostalAddress", addressLocality: "Cherthala", addressRegion: site.region, addressCountry: site.country },
  founder: { "@id": PERSON },
};

const person = {
  "@type": "Person",
  "@id": PERSON,
  name: site.name,
  givenName: "Amal",
  familyName: "Shaji",
  alternateName: "itsamalshaji",
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  image: abs("/og.jpg"),
  jobTitle: site.role,
  description: faq[0].a,
  disambiguatingDescription: "Frontend and full-stack developer, co-founder and technical lead of CipherPeak Private Limited, based in Alappuzha, Kerala, India.",
  hasOccupation: { "@type": "Occupation", name: "Frontend Developer", occupationLocation: { "@type": "Country", name: "India" }, skills: "React, Next.js, TypeScript, Supabase, team leadership" },
  homeLocation: { "@type": "Place", name: "Alappuzha, Kerala, India" },
  email: `mailto:${site.email}`,
  telephone: site.phone.replace(/\s/g, ""),
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
  worksFor: { "@id": EMPLOYER },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Fr. Porukara CMI College of Advanced Studies" },
  knowsLanguage: ["English", "Malayalam", "Hindi", "Tamil"],
  knowsAbout: [
    "Frontend development", "React", "Next.js", "TypeScript", "JavaScript", "Supabase", "PostgreSQL", "Progressive web apps",
    "E-commerce development", "Razorpay integration", "Shopify", "WordPress", "Technical SEO", "Team leadership",
  ],
  sameAs: [site.linkedin, site.github],
};

const website = { "@type": "WebSite", "@id": WEBSITE, url: SITE_URL, name: site.name, description: site.description, inLanguage: "en", publisher: { "@id": PERSON } };

const crumbs = (...items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export const homeLd = () =>
  graph(
    person,
    employer,
    website,
    { "@type": "ProfilePage", "@id": `${SITE_URL}/#profile-page`, url: SITE_URL, name: site.title, isPartOf: { "@id": WEBSITE }, about: { "@id": PERSON }, mainEntity: { "@id": PERSON } },
    { "@type": "FAQPage", "@id": `${SITE_URL}/#faq`, mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  );

export const worksLd = () =>
  graph(
    person,
    employer,
    website,
    crumbs(["Home", "/"], ["Works", "/works"]),
    {
      "@type": "CollectionPage",
      "@id": `${abs("/works")}#page`,
      url: abs("/works"),
      name: `Works by ${site.name}`,
      isPartOf: { "@id": WEBSITE },
      author: { "@id": PERSON },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: works.length,
        itemListElement: works.map((w, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": w.url ? "WebSite" : "SoftwareApplication", name: w.name, ...(w.url && { url: w.url }), description: w.blurb, genre: categories[w.category], image: abs(`/works/${w.slug}.jpg`), creator: { "@id": PERSON } },
        })),
      },
    },
  );

export const contactLd = () =>
  graph(person, employer, website, crumbs(["Home", "/"], ["Contact", "/contact"]), {
    "@type": "ContactPage",
    "@id": `${abs("/contact")}#page`,
    url: abs("/contact"),
    name: `Contact ${site.name}`,
    isPartOf: { "@id": WEBSITE },
    mainEntity: { "@id": PERSON },
  });
