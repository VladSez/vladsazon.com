import { PERSON, SITE_URL, SOCIAL_LINKS } from "./config";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  url: SITE_URL,
  jobTitle: PERSON.jobTitle,
  image: PERSON.avatar,
  sameAs: [SOCIAL_LINKS.GITHUB, SOCIAL_LINKS.LINKEDIN, SOCIAL_LINKS.X],
} as const;

export const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EasyInvoicePDF",
  description:
    "A free & open-source invoice generator with no sign-up required, live PDF preview, 100+ currencies, multi-language support, and customizable templates.",
  url: SOCIAL_LINKS.EASYINVOICEPDF,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
  image:
    "https://static.easyinvoicepdf.com/seo-content/default-template-v1.png",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/projects`,
  },
} as const;
