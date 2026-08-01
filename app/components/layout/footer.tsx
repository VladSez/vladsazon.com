"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Copyright } from "@/components/ui/copyright";
import { SOCIAL_LINKS } from "@/lib/config";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navigation";

const SOCIAL_ITEMS = [
  { label: "LinkedIn", href: SOCIAL_LINKS.LINKEDIN },
  { label: "GitHub", href: SOCIAL_LINKS.GITHUB },
  { label: "X", href: SOCIAL_LINKS.X },
] as const;

const footerLinkClass =
  "inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground active:opacity-70";

export function Footer() {
  const pathname = usePathname();
  const isWidePage = pathname === "/photos";

  return (
    <footer
      className={cn(
        "mt-auto border-t border-border/50 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 lg:hidden",
        !isWidePage && "md:mx-auto md:w-9/12 lg:mx-0"
      )}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:block">
        <nav aria-label="Footer navigation" className="lg:hidden">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Navigate
          </p>
          <ul className="flex flex-col items-start">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={footerLinkClass}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social links">
          <p className="mb-1 text-xs font-medium text-muted-foreground lg:sr-only">
            Connect
          </p>
          <ul className="flex flex-col items-start lg:flex-row lg:flex-wrap lg:gap-x-5">
            {SOCIAL_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-border/40 pt-5">
        <span className="ml-auto">
          <Copyright />
        </span>
      </div>
    </footer>
  );
}
