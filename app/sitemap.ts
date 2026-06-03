import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vladsazon.com",
      lastModified: "2026-06-01",
      priority: 1,
    },
    {
      url: "https://vladsazon.com/projects",
      lastModified: "2026-06-01",
      priority: 1,
    },
    {
      url: "https://vladsazon.com/blog/easyinvoicepdf",
      lastModified: "2026-05-21",
      priority: 1,
    },
  ];
}
