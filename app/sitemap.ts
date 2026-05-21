import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vladsazon.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://vladsazon.com/blog/easyinvoicepdf",
      lastModified: new Date("2026-05-21"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
