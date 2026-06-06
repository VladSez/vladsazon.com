import type { Metadata } from "next";
import { PHOTOS_METADATA } from "@/scripts/image-metadata";
import { OG_IMAGE_URL } from "@/lib/config";
import { PhotoGallery } from "./components/photo-gallery";

const PHOTOS_URL = "https://vladsazon.com/photos";

export const metadata: Metadata = {
  title: "Vlad Sazonau | Photography",
  description:
    "Photography from travel around Europe. Curated collection of landscape, architecture, and street photography.",
  authors: [{ name: "Vlad Sazonau" }],
  keywords: [
    "photography",
    "travel photography",
    "landscape photography",
    "architecture photography",
    "Europe",
    "photo gallery",
    "vlad sazonau",
    "Vlad Sazonau",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: PHOTOS_URL,
  },
  openGraph: {
    title: "Vlad Sazonau | Photography",
    description:
      "Photography from travel around Europe. Curated collection of landscape, architecture, and street photography.",
    type: "website",
    url: PHOTOS_URL,
    siteName: "vladsazon.com",
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Vlad Sazonau | Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlad Sazonau | Photography",
    description:
      "Photography from travel around Europe. Curated collection of landscape, architecture, and street photography.",
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Vlad Sazonau | Photography",
      },
    ],
  },
};

export default function PhotosPage() {
  return (
    <>
      <h1 className="sr-only">Photography</h1>
      <PhotoGallery photos={PHOTOS_METADATA} />
    </>
  );
}
