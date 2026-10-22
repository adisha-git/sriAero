import type { Metadata } from "next";
import { airports, site } from "@/config/site";

const OG_IMAGE = { url: "/brand/og-image.png", width: 1200, height: 630, alt: "SriAero — aviation-grade detailing, delivered to your hangar" };

/** Builds per-page metadata with canonical URL, Open Graph and Twitter card. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const businessId = `${site.url}/#business`;

export function localBusinessSchema() {
  const sameAs = Object.values(site.social).filter((v) => v.startsWith("http"));
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/icon-512.png`,
    image: `${site.url}/brand/og-image.png`,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    email: site.contact.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      ...(site.address.street && { streetAddress: site.address.street }),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      ...(site.address.postalCode && { postalCode: site.address.postalCode }),
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lon },
    areaServed: [
      ...airports.map((a) => ({
        "@type": "Airport",
        name: a.name,
        icaoCode: a.code,
        geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lon },
      })),
      { "@type": "AdministrativeArea", name: "Southern Alberta" },
      { "@type": "AdministrativeArea", name: "Western Canada" },
    ],
    knowsAbout: [
      "Aircraft detailing",
      "Aircraft paint correction",
      "Aircraft ceramic coating",
      "Aircraft brightwork polishing",
      "Aircraft interior detailing",
    ],
    sameAs,
  };
}
