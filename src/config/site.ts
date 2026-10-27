/**
 * SriAero — single source of truth for business details and every placeholder.
 *
 * Anything marked `// PLACEHOLDER – replace with real data` is invented sample
 * content. Replace it (or delete it) before launch. Once all placeholders are
 * real, set `showPlaceholderBadges` to false to remove the on-page "Sample" tags.
 */

export type Airport = {
  code: string;
  name: string;
  short: string;
  /** Decimal degrees, used to place pins on the service-area map */
  lat: number;
  lon: number;
};

export const site = {
  name: "SriAero",
  legalName: "SriAero Aircraft Detailing", // PLACEHOLDER – replace with real data (registered business name)
  tagline: "Aviation-grade detailing, delivered to your hangar.",
  description:
    "Mobile aircraft detailing in Calgary and Southern Alberta. Exterior wash, brightwork, paint correction, ceramic coatings and full cabin detailing, done at your hangar or FBO.",

  // PLACEHOLDER – replace with real data (your production domain, no trailing slash)
  url: "https://www.sriaero.ca",

  /** While true, sample testimonials, stats and certifications show a small "Sample" tag. */
  showPlaceholderBadges: true, // PLACEHOLDER – set to false once everything below is real

  contact: {
    phoneDisplay: "(403) 464-8302",
    phoneHref: "tel:+14034648302",
    email: "info@sriaero.ca",
    hours: "Mon–Sat · 07:00–19:00 MT · Overnight and weekend slots by arrangement", // PLACEHOLDER – replace with real data
    responseTime: "usually within one business day", // PLACEHOLDER – replace with real data
  },

  address: {
    // PLACEHOLDER – replace with real data. Leave street blank if you are mobile-only.
    street: "",
    city: "Calgary",
    region: "AB",
    regionName: "Alberta",
    postalCode: "", // PLACEHOLDER – replace with real data
    country: "CA",
    lat: 51.0447,
    lon: -114.0719,
  },

  social: {
    instagram: "https://www.instagram.com/sriaero", // PLACEHOLDER – replace with real data
    instagramHandle: "@sriaero", // PLACEHOLDER – replace with real data
    facebook: "https://www.facebook.com/sriaero", // PLACEHOLDER – replace with real data
    linkedin: "https://www.linkedin.com/company/sriaero", // PLACEHOLDER – replace with real data
  },

  founder: {
    name: "[Founder Name]", // PLACEHOLDER – replace with real data
    role: "Founder & Lead Detailer", // PLACEHOLDER – replace with real data
    // PLACEHOLDER – replace with real data
    bio: "[Founder bio — two or three sentences on your aviation background, how you got into detailing, and what you hold yourself to on every aircraft.]",
  },

  /** Year the business started — used for "Est." label. */
  established: "2024", // PLACEHOLDER – replace with real data

  /**
   * Quote form. The endpoint comes from NEXT_PUBLIC_FORM_ENDPOINT (see .env.example).
   * TODO: create a Formspree form (https://formspree.io), copy its endpoint into .env.local
   * and into your host's environment variables. Or set NEXT_PUBLIC_FORM_PROVIDER=netlify.
   */
  form: {
    endpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
    provider: (process.env.NEXT_PUBLIC_FORM_PROVIDER ?? "formspree") as "formspree" | "netlify",
  },
};

/* ------------------------------------------------------------------ */
/* Airports                                                            */
/* ------------------------------------------------------------------ */
export const airports: Airport[] = [
  { code: "CYYC", short: "Calgary Intl", name: "Calgary International Airport", lat: 51.1139, lon: -114.0203 },
  { code: "CYBW", short: "Springbank", name: "Springbank Airport", lat: 51.1031, lon: -114.3742 },
  { code: "CFX2", short: "Okotoks", name: "Okotoks Air Ranch", lat: 50.735, lon: -113.9336 },
  { code: "CEN4", short: "High River", name: "High River Airport", lat: 50.5339, lon: -113.8414 },
  { code: "CYQF", short: "Red Deer", name: "Red Deer Regional Airport", lat: 52.1822, lon: -113.8944 },
  { code: "CEA3", short: "Olds-Didsbury", name: "Olds-Didsbury Airport", lat: 51.7119, lon: -114.1072 },
];

/* ------------------------------------------------------------------ */
/* Stats — animated altimeter counters on the home page                */
/* ------------------------------------------------------------------ */
// PLACEHOLDER – replace with real data. Do not publish numbers you cannot stand behind.
export const stats = [
  { value: 120, suffix: "+", label: "Aircraft detailed", readout: "ACFT" },
  { value: 8, suffix: "", label: "Years in aviation", readout: "YRS" },
  { value: 6, suffix: "", label: "Airports served", readout: "APTS" },
  { value: 100, suffix: "%", label: "Hangar-side service", readout: "MOB" },
];

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */
export const trustItems = [
  { label: "Mobile hangar service", readout: "MOBILE", placeholder: false },
  // PLACEHOLDER – replace with real data: name the product lines / approvals you actually use
  { label: "Aviation-approved products", readout: "AMM-SAFE", placeholder: true },
  // PLACEHOLDER – replace with real data: confirm your liability coverage before claiming it
  { label: "Fully insured", readout: "INSURED", placeholder: true },
  { label: "Calgary-based", readout: "CYYC", placeholder: false },
];

/**
 * Certifications / memberships shown on the About page.
 * PLACEHOLDER – replace with real data. Leave the array empty to hide the block.
 */
export const certifications: { name: string; detail: string }[] = [
  { name: "[Insurance provider]", detail: "Aviation ground-operations liability — $[X]M" },
  { name: "[Product certification]", detail: "Manufacturer training, e.g. coating installer certification" },
  { name: "[Association membership]", detail: "e.g. regional aviation or business-aviation association" },
];

/* ------------------------------------------------------------------ */
/* Testimonials — PLACEHOLDER entries only                             */
/* ------------------------------------------------------------------ */
// PLACEHOLDER – replace with real data. Use only genuine feedback, with the client's permission.
export const testimonials = [
  {
    quote:
      "[Sample testimonial] Placeholder text — replace with a real quote from a client describing the result, the communication, and how the work fitted around their schedule.",
    name: "[Client name]",
    role: "[Role, e.g. Chief Pilot]",
    aircraft: "[Aircraft type]",
  },
  {
    quote:
      "[Sample testimonial] Placeholder text — replace with a real quote from an operator about turnaround times or fleet consistency.",
    name: "[Client name]",
    role: "[Role, e.g. Director of Maintenance]",
    aircraft: "[Aircraft type]",
  },
  {
    quote:
      "[Sample testimonial] Placeholder text — replace with a real quote from an owner-pilot about the finish or the interior.",
    name: "[Client name]",
    role: "[Role, e.g. Owner-pilot]",
    aircraft: "[Aircraft type]",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/fleet-operators/", label: "Fleet & Operators" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];
