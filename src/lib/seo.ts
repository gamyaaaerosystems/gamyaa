import type { Metadata } from "next";
import { absoluteUrl, aero, aeroLegalName, BRAND, CONTACT, parent, PRIMARY_ORIGIN } from "./site";

type PageMetaInput = {
  /** Full, unique <title>. */
  title: string;
  description: string;
  /** href produced by aero() or parent(). */
  href: string;
  siteName?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  /** True when the route segment has its own opengraph-image file. */
  hasOwnOgImage?: boolean;
};

export function pageMetadata({
  title,
  description,
  href,
  siteName,
  type = "website",
  noIndex = false,
  hasOwnOgImage = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(href);
  const isAero = href.includes("aerosystems");
  // Section-level fallback image. Segments with their own opengraph-image file
  // (DAQIP, AirCert AI, Ventures) override this automatically.
  const image = {
    url: isAero ? "/aerosystems/opengraph-image" : "/opengraph-image",
    width: 1200,
    height: 630,
    alt: isAero ? "Gamyaa AeroSystems — Intelligence for Aerospace & Defence Manufacturing" : "GAMYAA — Aerospace & Defence Engineering Intelligence. Building the Future.",
  };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteName ?? (isAero ? BRAND.aero : BRAND.parent),
      type,
      locale: "en_IN",
      ...(hasOwnOgImage ? {} : { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/* ------------------------------------------------------------ JSON-LD */

/** Company-level category (positioning, not a product name). Use sparingly. */
export const ENGINEERING_ASSURANCE_DEFINITION =
  "Gamyaa AeroSystems builds engineering assurance intelligence platforms for aerospace and defence — connecting airworthiness, manufacturing quality, inspection, evidence and approval.";

export const ORG_ID = `${PRIMARY_ORIGIN}/#organization`;
export const AERO_ORG_ID = `${absoluteUrl(aero())}#organization`;
export const WEBSITE_ID = `${PRIMARY_ORIGIN}/#website`;

const LOGO = `${PRIMARY_ORIGIN}/brand/gamyaa-logo.png`;

export function parentOrganizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.parent,
    url: PRIMARY_ORIGIN,
    logo: LOGO,
    description:
      "GAMYAA builds and supports engineering technologies across aerospace, defence, space, manufacturing intelligence and deep tech.",
    subOrganization: [{ "@id": AERO_ORG_ID }],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND.parent,
    url: PRIMARY_ORIGIN,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function aeroOrganizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": AERO_ORG_ID,
    name: BRAND.aero,
    legalName: BRAND.aeroIncorporated ? aeroLegalName : undefined,
    url: absoluteUrl(aero()),
    logo: LOGO,
    description: ENGINEERING_ASSURANCE_DEFINITION,
    slogan: "Intelligence for Aerospace & Defence Manufacturing",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    knowsAbout: [
      "First Article Inspection",
      "AS9102",
      "Aerospace quality management",
      "Defence manufacturing quality",
      "Airworthiness certification engineering",
      "Engineering traceability",
    ],
    founder: [
      { "@type": "Person", name: "Purushothama Padmanabha" },
      { "@type": "Person", name: "Manjunatha G" },
      { "@type": "Person", name: "Sudarshana Karkala" },
    ],
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function softwareLd(input: {
  name: string;
  alternateName: string;
  href: string;
  description: string;
  status: string;
  featureList: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    alternateName: input.alternateName,
    url: absoluteUrl(input.href),
    description: input.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Engineering quality and assurance software",
    operatingSystem: "Web",
    creativeWorkStatus: input.status,
    featureList: input.featureList,
    publisher: { "@id": AERO_ORG_ID },
    creator: { "@id": AERO_ORG_ID },
  };
}

export function faqLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceLd(items: Array<{ name: string; description: string }>, href: string) {
  return {
    "@context": "https://schema.org",
    "@graph": items.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@id": AERO_ORG_ID },
      areaServed: "IN",
      url: absoluteUrl(href),
    })),
  };
}

export function personLd(people: Array<{ name: string; role: string; linkedin?: string }>) {
  return {
    "@context": "https://schema.org",
    "@graph": people.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      worksFor: { "@id": AERO_ORG_ID },
      sameAs: p.linkedin ? [p.linkedin] : undefined,
    })),
  };
}

export function techArticleLd(input: { headline: string; description: string; href: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.href),
    author: { "@id": AERO_ORG_ID },
    publisher: { "@id": AERO_ORG_ID },
    inLanguage: "en-IN",
  };
}

export const HOME_HREF = parent("/");
