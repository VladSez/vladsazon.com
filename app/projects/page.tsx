import { ExternalLink } from "@/components/external-link";
import { SOCIAL_LINKS } from "@/lib/config";
import { projectsJsonLd } from "@/lib/json-ld";

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-950 dark:text-gray-50 text-balance">
        Projects
      </h1>

      <h2 className="font-medium text-muted-foreground leading-snug text-pretty tracking-tight text-lg sm:text-xl md:text-xl lg:text-2xl mb-10">
        <span className="text-primary font-semibold bg-amber-300 px-1 rounded-md">
          EasyInvoicePDF
        </span>{" "}
        - a free and open-source invoice generator
      </h2>

      <p className="mb-8 leading-relaxed">
        I built{" "}
        <ExternalLink href="https://easyinvoicepdf.com">
          EasyInvoicePDF
        </ExternalLink>{" "}
        because I was tired of paying for bloated invoicing tools when all I
        needed was a simple way to generate and send professional invoices.
      </p>

      <ul>
        <li>
          <figure className="my-5 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            <a
              href="https://easyinvoicepdf.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Open EasyInvoicePDF in a new tab"
            >
              <img
                src="https://static.easyinvoicepdf.com/seo-content/default-template-v1.png"
                alt="EasyInvoicePDF default invoice template showing a professional invoice layout with seller and buyer details, line items, and VAT calculation."
                width={800}
                height={600}
                className="w-full h-auto aspect-[4/3]"
              />
            </a>
          </figure>
          <p className="text-base leading-relaxed mb-4 font-medium">
            Features:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-gray-950 dark:text-gray-50">
                No sign-up required & no ads
              </span>
            </li>
            <li>
              <span className="text-gray-950 dark:text-gray-50">
                Live PDF preview & instant download
              </span>
            </li>
            <li>
              <span className="text-gray-950 dark:text-gray-50">
                Flexible tax support and calculations (VAT, Sales Tax, etc.)
              </span>
            </li>
            <li>
              <span className="text-gray-950 dark:text-gray-50">
                Customizable invoice templates
              </span>
            </li>
            <li>
              <span className="text-gray-950 dark:text-gray-50">
                100+ currencies & multi-language support
              </span>
            </li>
          </ul>

          <div className="mt-4 flex gap-4">
            <ExternalLink
              href={SOCIAL_LINKS.EASYINVOICEPDF}
              className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-blue-500 dark:hover:decoration-blue-300 font-medium"
            >
              EasyInvoicePDF
            </ExternalLink>
            <ExternalLink
              href={SOCIAL_LINKS.GITHUB}
              className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-blue-500 dark:hover:decoration-blue-300 font-medium"
            >
              GitHub
            </ExternalLink>
          </div>
        </li>
      </ul>

      <div className="mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground">
        <ExternalLink
          href="/llms/projects.md"
          className="text-xs text-muted-foreground hover:text-foreground no-underline decoration-0 hover:decoration-0 transition-colors"
        >
          View page as Markdown
        </ExternalLink>
      </div>
    </>
  );
}
