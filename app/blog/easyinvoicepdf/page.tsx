import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";

const ARTICLE_URL = "https://vladsazon.com/blog/easyinvoicepdf";
const PUBLISHED_DATE = "2026-05-21";

export const metadata: Metadata = {
  title: "EasyInvoicePDF: Free, Open-Source Invoice Generator",
  description:
    "EasyInvoicePDF is a completely free, open-source invoice generator. No sign-up required. Live PDF preview, 10 languages, 120+ currencies, and custom branding.",
  authors: [{ name: "Vlad Sazonau" }],
  keywords: [
    "free invoice generator",
    "open source invoice generator",
    "pdf invoice online",
    "free pdf invoice maker",
    "invoice generator no sign up",
    "live pdf preview invoice",
    "easyinvoicepdf",
    "easy invoice pdf",
    "free invoice template",
    "vat invoice generator",
    "gst invoice generator",
    "sales tax invoice",
    "multi currency invoice",
    "multi language invoice",
    "shareable invoice link",
    "stripe invoice alternative",
    "freelance invoice tool",
    "self hosted invoice generator",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: ARTICLE_URL,
  },
  openGraph: {
    title: "EasyInvoicePDF: Free, Open-Source Invoice Generator",
    description:
      "Completely free, no sign-up invoice generator with live PDF preview, 10 languages, 120+ currencies, and flexible tax support. Open-source and 100% in-browser.",
    type: "article",
    url: ARTICLE_URL,
    siteName: "vladsazon.com",
    publishedTime: PUBLISHED_DATE,
    authors: ["Vlad Sazonau"],
    images: [
      {
        url: "https://ik.imagekit.io/fl2lbswwo/vladsazon-og-1.png?updatedAt=1759593592814",
        alt: "EasyInvoicePDF - Free & Open-Source Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyInvoicePDF: Free, Open-Source Invoice Generator",
    description:
      "Completely free, no sign-up invoice generator with live PDF preview, 10 languages, 120+ currencies, and flexible tax support.",
    images: [
      {
        url: "https://ik.imagekit.io/fl2lbswwo/vladsazon-og-1.png?updatedAt=1759593592814",
        alt: "EasyInvoicePDF - Free & Open-Source Invoice Generator",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EasyInvoicePDF: Free, Open-Source Invoice Generator",
  description:
    "EasyInvoicePDF is a completely free, open-source invoice generator. No sign-up required. Live PDF preview, 10 languages, 120+ currencies, flexible tax support, shareable links, and custom branding - all in your browser.",
  author: {
    "@type": "Person",
    name: "Vlad Sazonau",
    url: "https://vladsazon.com",
  },
  datePublished: PUBLISHED_DATE,
  dateModified: PUBLISHED_DATE,
  url: ARTICLE_URL,
  publisher: {
    "@type": "Person",
    name: "Vlad Sazonau",
    url: "https://vladsazon.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_URL,
  },
  about: {
    "@type": "SoftwareApplication",
    name: "EasyInvoicePDF",
    url: "https://easyinvoicepdf.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

export default function EasyInvoicePDFArticle() {
  return (
    <main className="min-h-screen px-6 py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-block mb-10 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          ← Back
        </Link>

        <article>
          <header className="mb-10">
            <p className="text-sm text-muted-foreground font-light mb-4">
              May 21, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-[1.1] text-balance mb-6">
              EasyInvoicePDF: The Free, Open-Source Invoice Generator
              You&apos;ve Been Looking For
            </h1>
            <p className="text-xl sm:text-2xl font-light text-muted-foreground leading-snug text-pretty tracking-tight">
              No account. No subscription. No server. Just open the app, fill in
              your details, and download a professional PDF invoice in seconds.
            </p>
          </header>

          <figure className="mb-10 rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src="https://static.easyinvoicepdf.com/seo-content/default-template-v1.png"
              alt="EasyInvoicePDF default invoice template showing a professional invoice layout with seller and buyer details, line items, and VAT calculation."
              width={800}
              height={600}
              className="w-full h-auto"
              loading="eager"
            />
            <figcaption className="px-6 py-4 text-sm text-gray-700 bg-card">
              EasyInvoicePDF default template - clean, professional, ready to
              download as PDF
            </figcaption>
          </figure>

          <div className="space-y-8 text-base sm:text-lg font-light leading-relaxed text-muted-foreground">
            <p className="text-pretty">
              I built{" "}
              <ExternalLink href="https://easyinvoicepdf.com">
                EasyInvoicePDF
              </ExternalLink>{" "}
              two years ago because I was tired of bloated software just to send
              an invoice to a client or accountant. Most tools lock good
              features behind a paywall, force you to create an account before
              doing anything useful. I wanted something fast, clean, and out of
              the way - so I built it myself, released it free, and kept it
              open-source.
            </p>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Completely Free. No Catch.
              </h2>
              <p className="text-pretty">
                EasyInvoicePDF is{" "}
                <span className="text-primary font-semibold">
                  100% free to use
                </span>{" "}
                - there is no paid tier, no trial period that expires, and no
                feature gated behind a subscription. The core invoicing, live
                preview, and PDF download all work without paying anything. The
                project is{" "}
                <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">
                  fully open-source on GitHub
                </ExternalLink>{" "}
                under the AGPL v3 license, which means you can inspect every
                line of code, run it yourself, or fork it if you need something
                custom. It has picked up{" "}
                <span className="text-primary font-semibold">
                  800+ GitHub stars
                </span>{" "}
                since launch, with over 200 invoices generated monthly by users.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Live PDF Preview While You Type
              </h2>
              <p className="text-pretty">
                The feature that makes EasyInvoicePDF feel genuinely different
                is the{" "}
                <span className="text-primary font-semibold">
                  real-time PDF preview
                </span>
                . As you fill in your seller details, add line items, or switch
                the currency, the PDF on the right-hand side updates instantly.
                You see exactly what your client will receive before you ever
                download or share anything. There is no &quot;preview&quot;
                button to click, no waiting for a server to render - the PDF
                lives in the browser alongside your form, updating on every
                keystroke. For anyone who has ever downloaded a PDF only to
                discover a formatting issue and had to start over, this alone is
                worth the switch.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                No Account. No Upload. No Trace.
              </h2>
              <p className="text-pretty">
                Everything happens{" "}
                <span className="text-primary font-semibold">
                  entirely in your browser
                </span>
                . No data is sent to a server when you are editing or
                downloading. Your invoice details - client names, amounts, bank
                details - never leave your machine unless you explicitly
                generate a shareable link. For professionals handling sensitive
                billing information, this is not a minor point. Most web-based
                invoice tools upload your data to process it. EasyInvoicePDF
                does not. The PDF is generated client-side using{" "}
                <ExternalLink href="https://react-pdf.org">
                  @react-pdf/renderer
                </ExternalLink>
                , which means the privacy guarantee is structural, not a policy
                promise.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Tax Done Your Way
              </h2>
              <p className="text-pretty">
                Tax requirements vary enormously by country and industry.
                EasyInvoicePDF supports{" "}
                <span className="text-primary font-semibold">
                  VAT, GST, Sales Tax, and any custom label
                </span>{" "}
                you need. You can change the tax label to match your local
                requirements - IVA for Spain and Italy, TVA for France, MwSt for
                Germany - and the invoice will display it correctly. Tax amounts
                calculate automatically as you enter line items.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                120+ Currencies. 10 Languages.
              </h2>
              <p className="text-pretty">
                EasyInvoicePDF supports{" "}
                <span className="text-primary font-semibold">
                  120+ currencies
                </span>{" "}
                searchable by code, symbol, or name, and{" "}
                <span className="text-primary font-semibold">10 languages</span>{" "}
                for invoice labels and dates: English, Polish, German, Spanish,
                Portuguese, Russian, Ukrainian, French, Italian, and Dutch.
                Switch the language and the entire invoice - column headers,
                date formats, tax labels - updates immediately in the live
                preview. Currency and language are independent, so you can
                invoice a German client in EUR with labels in English, or bill a
                US client in USD with a fully Spanish document. The combination
                covers the overwhelming majority of international freelance and
                small business invoicing scenarios without any configuration.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Custom Branding & Stripe-Style Templates
              </h2>
              <p className="text-pretty">
                Professional invoices should look like they came from a
                professional business. EasyInvoicePDF includes two templates: a
                clean default layout and a{" "}
                <span className="text-primary font-semibold">
                  Stripe-style design
                </span>{" "}
                modeled after the invoices Stripe sends to its users - minimal,
                structured, and immediately recognizable as high quality. Both
                templates support{" "}
                <span className="text-primary font-semibold">
                  custom logo upload
                </span>
                , so your company branding appears on the invoice.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Send Invoices Without Attachments
              </h2>
              <p className="text-pretty">
                Instead of downloading and attaching a PDF to an email,
                EasyInvoicePDF lets you generate a{" "}
                <span className="text-primary font-semibold">
                  shareable link
                </span>{" "}
                directly. The invoice data is encoded into the URL - no server
                storage, no account required on either end. Your client receives
                the link, opens it in their browser, reviews the invoice, and
                downloads the PDF themselves. It works equally well for sending
                via email, Slack, or any messaging app. The link carries
                everything, so if the client needs to reference it later, the
                URL is the invoice.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 mb-3">
                Built in the Open
              </h2>
              <p className="text-pretty">
                EasyInvoicePDF is built with React, Next.js, TypeScript,
                TailwindCSS, and shadcn/ui. The PDF rendering uses{" "}
                <ExternalLink href="https://react-pdf.org">
                  @react-pdf/renderer
                </ExternalLink>
                , which gives precise control over the PDF layout without
                relying on a headless browser or a server-side render. The
                entire stack is familiar to any modern web developer, which
                makes contributing straightforward. If you want to run your own
                instance - self-hosted, or customized - the{" "}
                <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">
                  repository
                </ExternalLink>{" "}
                includes setup instructions and takes minutes to get running
                locally.
              </p>
            </section>

            <p className="text-pretty">
              If you invoice clients - as a freelancer, a consultant, or a small
              business - EasyInvoicePDF is worth a look. It is fast, private,
              globally capable, and costs nothing. You can try it without
              signing up and decide in under a minute whether it fits your
              workflow.{" "}
              <ExternalLink href="https://easyinvoicepdf.com">
                Open the app at easyinvoicepdf.com
              </ExternalLink>{" "}
              or browse the{" "}
              <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">
                source on GitHub
              </ExternalLink>
              .
            </p>
          </div>

          <footer className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-light">
              Written by{" "}
              <Link
                href="/"
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                Vlad Sazonau
              </Link>
              , the creator of EasyInvoicePDF.
            </p>
          </footer>
          <Link
            href="/"
            className="inline-block mt-10 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            ← Back
          </Link>
        </article>
      </div>
    </main>
  );
}
