import { SCHOOL } from "@/lib/brand/school";
import { abs, siteUrl } from "./site";

/**
 * Structured data.
 *
 * A school benefits from this more than most sites: it is what drives the local
 * knowledge panel and the map result a parent in Kampala actually sees. The
 * template shipped none.
 */
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL.name,
    alternateName: SCHOOL.shortName,
    slogan: SCHOOL.motto,
    description: SCHOOL.mission,
    url: siteUrl(),
    logo: abs("/brand/logos/primary/primary-ink-gold.svg"),
    image: abs("/opengraph-image"),
    email: SCHOOL.contact.email,
    telephone: SCHOOL.contact.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL.contact.address.street,
      addressLocality: SCHOOL.contact.address.town,
      addressRegion: SCHOOL.contact.address.city,
      addressCountry: "UG",
    },
    areaServed: { "@type": "City", name: SCHOOL.contact.address.city },
    contactPoint: SCHOOL.contact.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "admissions",
      areaServed: "UG",
      availableLanguage: "en",
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
