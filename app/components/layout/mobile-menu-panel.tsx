"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { NAV_ITEMS } from "./navigation";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/config";

interface MobileMenuPanelProps {
  onOpenChange: (open: boolean) => void;
}

const panelTransition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const satisfies Transition;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
} as const satisfies Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: panelTransition,
  },
} as const satisfies Variants;

const MOBILE_NAV_ITEMS = [
  ...NAV_ITEMS,
  { label: "GitHub", href: SOCIAL_LINKS.GITHUB, isExternal: true },
  { label: "LinkedIn", href: SOCIAL_LINKS.LINKEDIN, isExternal: true },
] as const;

export function MobileMenuPanel({ onOpenChange }: MobileMenuPanelProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const transition = prefersReducedMotion ? { duration: 0 } : panelTransition;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;
      if (panelRef.current?.contains(target)) return;
      if (target.closest('[aria-controls="mobile-menu"]')) return;

      onOpenChange(false);
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [onOpenChange]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="false"
      className={cn(
        "fixed inset-x-0 top-[86px] z-40 mx-2 flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto rounded-3xl bg-background shadow-lg ring-1 ring-gray-300 md:mx-6"
      )}
      initial={{ opacity: 0, y: -8, filter: "blur(4px)", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={transition}
      style={{ transformOrigin: "top center" }}
    >
      <motion.nav
        aria-label="Mobile navigation"
        className="flex flex-col gap-2 px-4 pb-4 pt-4"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion ? "visible" : "visible"}
        variants={prefersReducedMotion ? undefined : listVariants}
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isExternal =
            "isExternal" in item && item.isExternal === true;

          return (
            <motion.div
              key={item.href}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <Link
                href={item.href}
                onClick={() => {
                  onOpenChange(false);
                }}
                className={cn(
                  "block px-4 py-2 rounded text-sm font-medium transition-colors hover:bg-primary/5 active:opacity-70",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>
    </motion.div>
  );
}
