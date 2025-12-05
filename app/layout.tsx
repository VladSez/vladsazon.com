import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vlad Sazonau",
  description:
    "Vlad Sazonau personal website. Vlad Sazonau is a product engineer and design enthusiast.",
  authors: [{ name: "Vlad Sazonau" }],
  keywords: [
    "frontend development",
    "full stack development",
    "web development",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "software engineering",
    "web performance",
    "UI/UX",
    "technical blog",
    "personal website",
    "vlad sazonau",
    "Vlad Sazonau",
    "Uladzislau Sazonanu",
    "personal website",
    "porfolio",
    "CV",
    "resume",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `https://vladsazon.com`,
  },
  openGraph: {
    title: "Vlad Sazonau",
    description: "Vlad Sazonau personal website.",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/fl2lbswwo/vladsazon-og-1.png?updatedAt=1759593592814",
        alt: "Vlad Sazonau personal website.",
      },
    ],
    siteName: "vladsazon.com",
    url: "https://vladsazon.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlad Sazonau",
    description: "Vlad Sazonau personal website.",
    images: [
      {
        url: "https://ik.imagekit.io/fl2lbswwo/vladsazon-og-1.png?updatedAt=1759593592814",
        alt: "Vlad Sazonau personal website.",
      },
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicons/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicons/favicon.svg",
    },
    {
      rel: "shortcut icon",
      url: "/favicons/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicons/apple-touch-icon.png",
    },
  ],
  appleWebApp: {
    title: "Vlad Sazonau",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
