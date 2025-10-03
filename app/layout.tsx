import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vlad Sazonau | About me",
  description:
    "Vlad Sazonau personal website and blog. Vlad Sazonau is a frontend/full-stack developer and enthusiast.",
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
  openGraph: {
    title: "About me",
    description: "Vlad Sazonau personal website and blog.",
    images: [
      {
        url: "/og-about-me.jpeg",
        alt: "Vlad Sazonau personal website and blog. About me.",
      },
    ],
    siteName: "Vlad Sazonau | About me",
    url: "https://vladsazon.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "About me",
    description: "Vlad Sazonau personal website and blog.",
    images: [
      {
        url: "/og-about-me.jpeg",
        alt: "Vlad Sazonau personal website and blog. About me.",
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
    title: "MyWebSite",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
