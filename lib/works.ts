export const categories = {
  apps: "Web apps",
  shop: "Stores & catalogues",
  business: "Business sites",
  stay: "Hospitality & events",
} as const;

export type Category = keyof typeof categories;

export type Work = {
  slug: string; // also the screenshot: /works/<slug>.jpg
  name: string;
  blurb: string;
  url: string;
  category: Category;
  tech?: string[]; // only where it's known, never guessed
};

export const works: Work[] = [
  { slug: "ntbr", name: "Nehru Trophy Boat Race", blurb: "Event site, online booking and gate scanning for the 72nd race.", url: "https://www.nehrutrophyboatrace.org", category: "apps", tech: ["Next.js", "Supabase"] },
  { slug: "linen", name: "Linen Centre", blurb: "Online store for a Kerala linen apparel and fabric brand.", url: "https://www.linencentre.com", category: "shop", tech: ["Next.js", "Supabase"] },
  { slug: "erp", name: "CipherPeak ERP", blurb: "Enterprise platform frontend spanning 38 modules.", url: "https://ciphererp.vercel.app", category: "apps", tech: ["React"] },
  { slug: "buildcrest", name: "Build Crest", blurb: "Building-materials catalogue for a UAE trading company.", url: "https://buildcrest.ae", category: "shop", tech: ["Next.js", "Supabase"] },
  { slug: "imagecottons", name: "Image Cottons", blurb: "Handloom and hand-block textile store.", url: "https://www.imagecottons.in", category: "shop", tech: ["Next.js", "Supabase"] },
  { slug: "setrix", name: "Setrix Logistics", blurb: "Dubai customs clearance and shipping agency.", url: "https://www.setrix.me", category: "business", tech: ["Next.js"] },
  { slug: "erreka", name: "Erreka Doors", blurb: "Automatic entrance solutions in the UAE.", url: "https://errekadoors.com", category: "business", tech: ["Next.js"] },
  { slug: "weinber", name: "Weinber Inc.", blurb: "Product catalogue for an automotive detailing brand.", url: "https://weinberinc.com", category: "shop" },
  { slug: "velux", name: "VE LUX", blurb: "Luxury car detailing studio and franchise.", url: "https://veluxinc.com", category: "business" },
  { slug: "drshinys", name: "Dr. Shiny's", blurb: "Career counselling and psychometric assessment.", url: "https://www.drshinys.com", category: "business", tech: ["Next.js"] },
  { slug: "elora", name: "Elora Matrimony", blurb: "Matrimony platform with member registration.", url: "https://eloramatrimony.com", category: "apps" },
  { slug: "aavishkar", name: "Aavishkar Architects", blurb: "Architecture studio portfolio.", url: "https://aavishkararchitects.com", category: "business" },
  { slug: "lankavalley", name: "Lanka Valley", blurb: "Lakeside resort and events venue.", url: "https://www.lankavalley.in", category: "stay" },
  { slug: "mallika", name: "Mallika Boutique", blurb: "Online store for a ladies' boutique.", url: "https://mallikaboutique.com", category: "shop", tech: ["Shopify"] },
  { slug: "kaaryasthan", name: "My Case Kaaryasthan", blurb: "Legal and property services for NRIs.", url: "https://www.mycasekaaryasthan.in", category: "business" },
  { slug: "stellaz", name: "Stellaz", blurb: "Women's clothing boutique in Alappuzha.", url: "https://www.stellazwoman.com", category: "shop", tech: ["Shopify"] },
  { slug: "boundless", name: "Boundless Kochi", blurb: "German language institute and ÖSD exam centre.", url: "https://boundlesskochi.com", category: "business", tech: ["WordPress"] },
  { slug: "image-boutique", name: "Image Designer Boutique", blurb: "Handcrafted fabrics, direct from weavers.", url: "https://imagecottons.com", category: "shop", tech: ["Shopify"] },
  { slug: "diligent", name: "Diligent Dental Studio", blurb: "Dental clinic site with appointment booking.", url: "https://www.diligentdentalstudio.com", category: "business" },
  { slug: "aamys", name: "Aamy's Homestay", blurb: "Homestay site with direct booking.", url: "https://www.aamyshomestay.com", category: "stay" },
  { slug: "avees", name: "Avees Foods", blurb: "Kuttanadan food products brand.", url: "https://aveesfoods.com", category: "business" },
  { slug: "linen-showrooms", name: "Linen Centre Showrooms", blurb: "Brand and showroom site.", url: "https://linencentre.in", category: "business", tech: ["WordPress"] },
  { slug: "familysupermarket", name: "Family Super Market", blurb: "Grocery planning and household budgeting guides.", url: "https://www.familysupermarket.store", category: "business" },
  { slug: "jacob-maria", name: "Jacob & Maria", blurb: "Digital wedding invitation.", url: "https://jacob-maria.vercel.app", category: "stay" },
];

export const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");
