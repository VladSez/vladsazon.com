import { ExternalLink } from "@/components/external-link";
import { SOCIAL_LINKS } from "@/lib/config";

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-950 dark:text-gray-50 text-balance">
        Projects
      </h1>

      <ul>
        <li>
          <div>
            <ExternalLink href="https://easyinvoicepdf.com">
              EasyInvoicePDF
            </ExternalLink>{" "}
            - a free & open-source invoice generator
          </div>
          <figure className="my-5 rounded-xl overflow-hidden border border-border bg-gray-100 shadow-sm">
            <img
              src="https://static.easyinvoicepdf.com/seo-content/default-template-v1.png"
              alt="EasyInvoicePDF default invoice template showing a professional invoice layout with seller and buyer details, line items, and VAT calculation."
              width={800}
              height={600}
              className="w-full h-auto aspect-[4/3]"
            />
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
                Flexible tax support (VAT, Sales Tax, etc.)
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
              App
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
    </>
  );
}
