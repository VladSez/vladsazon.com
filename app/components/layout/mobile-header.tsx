"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { MorphingMenuIcon } from "@/app/components/morphing-menu-icon";
import { MobileMenuPanel } from "./mobile-menu-panel";

export function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background lg:hidden">
        <div className="mx-auto w-full max-w-4xl px-5 lg:px-6">
          <div className="flex items-center justify-between py-4 md:mx-auto md:w-9/12">
            <Link href="/" className="flex-1 active:opacity-70 transition-all">
              <TextEffect
                per="char"
                preset="fade"
                delay={1}
                className="text-lg font-semibold"
              >
                Vlad Sazonau
              </TextEffect>
            </Link>

            <div className="relative lg:hidden right-[-10px] lg:right-0">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full shadow-none active:opacity-70 cursor-pointer size-10"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
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
