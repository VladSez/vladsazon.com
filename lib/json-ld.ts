import {
  AVATAR_URL,
  OG_IMAGE_URL,
  PERSON,
  SITE_DATES,
  SITE_URL,
  SOCIAL_LINKS,
} from "./config";

const IDS = {
  website: `${SITE_URL}/#website`,
  person: `${SITE_URL}/#person`,
  personImage: `${SITE_URL}/#person-image`,
  websiteImage: `${SITE_URL}/#website-image`,
  homePage: `${SITE_URL}/#webpage`,
  projectsPage: `${SITE_URL}/projects#webpage`,
  projectsBreadcrumb: `${SITE_URL}/projects#breadcrumb`,
  easyInvoicePdf: `${SITE_URL}/projects#project-easyinvoicepdf`,
} as const;

const SITE_DESCRIPTION =
  "Vlad Sazonau is a software engineer and design enthusiast. He is the founder of EasyInvoicePDF, a free, open-source invoice generator.";

const PROJECTS_DESCRIPTION =
  "Portfolio of projects built by Vlad Sazonau. EasyInvoicePDF - a free and open-source invoice generator.";

const EASYINVOICEPDF_DESCRIPTION =
  "A free & open-source invoice generator with no sign-up required, live PDF preview, 100+ currencies, multi-language support, and customizable templates.";

const EASYINVOICEPDF_IMAGE =
  "https://static.easyinvoicepdf.com/seo-content/default-template-v1.png";

function buildGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

const websiteNodeSlim = {
  "@type": "WebSite",
  "@id": IDS.website,
  url: SITE_URL,
  name: PERSON.name,
  publisher: { "@id": IDS.person },
};

export const websiteNodeFull = {
  "@type": "WebSite",
  "@id": IDS.website,
  url: SITE_URL,
  name: PERSON.name,
  alternateName: ["vladsazon.com", "Vlad Sazon"],
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": IDS.person },
  image: {
    "@type": "ImageObject",
    "@id": IDS.websiteImage,
    url: OG_IMAGE_URL,
    caption: PERSON.name,
  },
};

const personNode = {
  "@type": "Person",
  "@id": IDS.person,
  url: SITE_URL,
  name: PERSON.name,
  givenName: "Vlad",
  familyName: "Sazonau",
  alternateName: ["Vlad Sazon", "Uladzislau Sazonanu", "Vlad Sazonov"],
  description: SITE_DESCRIPTION,
  jobTitle: PERSON.jobTitle,
  knowsLanguage: "en",
  image: {
    "@type": "ImageObject",
    "@id": IDS.personImage,
    url: AVATAR_URL,
    caption: PERSON.name,
    width: 128,
    height: 128,
  },
  sameAs: [SOCIAL_LINKS.GITHUB, SOCIAL_LINKS.LINKEDIN, SOCIAL_LINKS.X],
};

const homeProfilePage = {
  "@type": "ProfilePage",
  "@id": IDS.homePage,
  url: SITE_URL,
  name: PERSON.name,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  isPartOf: { "@id": IDS.website },
  about: { "@id": IDS.person },
  mainEntity: { "@id": IDS.person },
  primaryImageOfPage: { "@id": IDS.personImage },
  dateCreated: SITE_DATES.published,
  datePublished: SITE_DATES.published,
  dateModified: SITE_DATES.modified,
};

const projectsCollectionPage = {
  "@type": "CollectionPage",
  "@id": IDS.projectsPage,
  url: `${SITE_URL}/projects`,
  isPartOf: { "@id": IDS.website },
  name: "Projects",
  description: PROJECTS_DESCRIPTION,
  inLanguage: "en",
  about: { "@id": IDS.person },
  breadcrumb: { "@id": IDS.projectsBreadcrumb },
};

const projectsBreadcrumbList = {
  "@type": "BreadcrumbList",
  "@id": IDS.projectsBreadcrumb,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${SITE_URL}/projects`,
    },
  ],
};

const easyInvoicePdfApp = {
  "@type": "SoftwareApplication",
  "@id": IDS.easyInvoicePdf,
  url: SOCIAL_LINKS.EASYINVOICEPDF,
  name: "EasyInvoicePDF",
  description: EASYINVOICEPDF_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  creator: { "@id": IDS.person },
  sameAs: [SOCIAL_LINKS.EASYINVOICEPDF_GITHUB],
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
  },
  image: {
    "@type": "ImageObject",
    url: EASYINVOICEPDF_IMAGE,
    caption: "EasyInvoicePDF default invoice template",
    width: 800,
    height: 600,
  },
};

export const layoutJsonLd = buildGraph([websiteNodeSlim, personNode]);

export const homeJsonLd = buildGraph([
  websiteNodeFull,
  personNode,
  homeProfilePage,
]);

export const projectsJsonLd = buildGraph([
  websiteNodeSlim,
  personNode,
  projectsCollectionPage,
  projectsBreadcrumbList,
  easyInvoicePdfApp,
]);
