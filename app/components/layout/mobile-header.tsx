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
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex-1">
            <TextEffect
              per="char"
              preset="fade"
              delay={1}
              className="text-lg font-semibold"
            >
              Vlad Sazonau
            </TextEffect>
          </Link>

          <div className="relative lg:hidden">
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
      </header>

      {isMobileMenuOpen ? (
        <MobileMenuPanel onOpenChange={setIsMobileMenuOpen} />
      ) : null}
    </>
  );
}
