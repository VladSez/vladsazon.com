"use client";

import { useEffect } from "react";
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

export function MobileMenuPanel({ onOpenChange }: MobileMenuPanelProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion ? { duration: 0 } : panelTransition;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onOpenChange]);

  return (
    <motion.div
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
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <Link
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={`block px-4 py-2 rounded text-sm font-medium transition-colors  hover:bg-primary/5 ${
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
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
