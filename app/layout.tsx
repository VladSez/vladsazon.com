import { MobileHeader } from "@/app/components/layout/mobile-header";
import { Sidebar } from "@/app/components/layout/sidebar";
import { Clock } from "@/components/clock";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";

import { OG_IMAGE_URL } from "@/lib/config";
import { layoutJsonLd } from "@/lib/json-ld";
import { DisableScrollRestoration } from "./scroll";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Vlad Sazonau | Software Engineer & Design Enthusiast",
  description:
    "Vlad Sazonau is a software engineer and design enthusiast. He is the founder of EasyInvoicePDF, a free, open-source invoice generator.",
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
    "Vlad Sazon",
    "Uladzislau Sazonanu",
    "Влад Сазонов",
    "Vlad Sazonov",
    "Владислав Сазонов",
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
    description: "Vlad Sazonau is a software engineer and design enthusiast.",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Vlad Sazonau is a software engineer and design enthusiast.",
      },
    ],
    siteName: "vladsazon.com",
    url: "https://vladsazon.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlad Sazonau",
    description: "Vlad Sazonau is a software engineer and design enthusiast.",
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Vlad Sazonau is a software engineer and design enthusiast.",
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
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(layoutJsonLd) }}
        />
        {/* Disable scroll restoration to prevent automatic scroll position restoration (especially on iOS chrome browser) */}
        <DisableScrollRestoration />
        <div className="fixed top-[26px] lg:top-4 right-14 md:right-6 lg:right-4 z-50 text-sm text-muted-foreground">
          <Clock />
        </div>

        <MobileHeader />
        <div className="mx-auto mt-20 flex w-full max-w-4xl flex-1 flex-col px-5 md:mt-20 md:flex-row lg:mt-32 lg:px-6">
          <Sidebar />
          <main className="flex w-full flex-col break-words mt-5 lg:mt-0">
            <div className="w-full flex-1">
              <section className="flex items-center justify-center mb-15">
                <div className="mx-auto w-full max-w-5xl">{children}</div>
              </section>
            </div>
          </main>
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
