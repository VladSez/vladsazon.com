"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock } from "@/components/clock";
import { TextEffect } from "@/components/ui/text-effect";
import { MorphingMenuIcon } from "@/app/components/morphing-menu-icon";
import { cn } from "@/lib/utils";
import { MobileMenuPanel } from "./mobile-menu-panel";

export function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isWidePage = pathname === "/photos";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background lg:pointer-events-none lg:border-b-0 lg:bg-transparent">
        <div className="mx-auto w-full max-w-4xl px-5 lg:max-w-none lg:px-0">
          <div
            className={cn(
              "flex items-center justify-between py-4 lg:block lg:w-auto lg:py-0",
              !isWidePage && "md:mx-auto md:w-9/12"
            )}
          >
            <Link
              href="/"
              className="flex-1 transition-opacity active:opacity-70 lg:hidden"
            >
              <TextEffect
                per="char"
                preset="fade"
                delay={1}
                className="text-lg font-semibold"
              >
                Vlad Sazonau
              </TextEffect>
            </Link>

            <div className="relative right-[-10px] flex shrink-0 items-center gap-1 lg:fixed lg:right-4 lg:top-4 lg:pointer-events-auto">
              <div className="text-sm text-muted-foreground">
                <Clock />
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full shadow-none active:opacity-70 cursor-pointer size-10 lg:hidden"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                {...(!isMobileMenuOpen
                  ? { "aria-haspopup": "dialog" as const }
                  : {})}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <MorphingMenuIcon
                  isOpen={isMobileMenuOpen}
                  aria-hidden
                  className="!size-5"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <MobileMenuPanel onOpenChange={setIsMobileMenuOpen} />
      ) : null}
    </>
  );
}
