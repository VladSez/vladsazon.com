import { ExternalLink } from "@/components/external-link";

export default function CVPage() {
  return (
    <section className="w-full">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-950 dark:text-gray-50 text-balance">
          CV / Resume
        </h1>

        <div className="mb-8 flex gap-4 flex-wrap">
          <ExternalLink
            href="/vlad-sazon-cv.pdf"
            className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Download PDF
          </ExternalLink>
          <ExternalLink
            href="https://www.linkedin.com/in/vlad-sazonau-22a9a9126"
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            LinkedIn Profile
          </ExternalLink>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-950 dark:text-gray-50">
              About
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Product engineer with 8+ years of experience building and shipping web
              products. Specialized in React, Next.js, TypeScript, and Node.js. Experienced
              in full-stack development, from UX decisions to production infrastructure.
              Proficient with modern AI tools and agentic development patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-950 dark:text-gray-50">
              Key Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Motion,
                  Apollo Client, tRPC
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Node.js, Express, GraphQL, REST APIs, Database design, PostgreSQL
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">DevOps & Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Vercel, Docker, Git, CI/CD, Cursor, Modern AI tools (Claude, ChatGPT)
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Design</h3>
                <p className="text-sm text-muted-foreground">
                  UI/UX Design, Web Performance, Accessibility, Responsive Design, Web Vitals
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-950 dark:text-gray-50">
              Featured Project
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-950 dark:text-gray-50">
                EasyInvoicePDF
              </h3>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Open-source invoice generator built with React, Next.js, and TypeScript.
                Features customizable templates, real-time preview, and PDF export.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium">
                  800+ GitHub stars
                </div>
                <div className="rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium">
                  2k monthly visitors
                </div>
                <div className="rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium">
                  1k+ invoices generated
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ExternalLink
                  href="https://easyinvoicepdf.com/?template=stripe&ref=vladsazon.com"
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Live Demo
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/VladSez/easy-invoice-pdf"
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  GitHub Repo
                </ExternalLink>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-950 dark:text-gray-50">
              Get in Touch
            </h2>
            <div className="flex flex-wrap gap-4">
              <ExternalLink
                href="https://github.com/VladSez"
                className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200"
              >
                GitHub
              </ExternalLink>
              <ExternalLink
                href="https://www.linkedin.com/in/vlad-sazonau-22a9a9126"
                className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200"
              >
                LinkedIn
              </ExternalLink>
              <ExternalLink
                href="https://twitter.com/VladSez"
                className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200"
              >
                Twitter
              </ExternalLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
