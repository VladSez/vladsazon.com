"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { NAV_ITEMS } from "./navigation";
import { AnimatedSignature } from "../animated-signature";

const AVATAR_SRC =
  "https://ik.imagekit.io/fl2lbswwo/avatar.jpeg?updatedAt=1757456439459";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[200px] flex-shrink-0 md:block">
      <div className="sticky top-20">
        <div className="mb-8 pl-6">
          <Link
            href="/"
            className="transition-all hover:brightness-95"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <img
              alt="Portrait of Vlad Sazonau wearing glasses and a light shirt, outdoors in front of a sunlit glass building."
              height={48}
              width={48}
              fetchPriority="high"
              className="size-14 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
              src={AVATAR_SRC}
            />
          </Link>
        </div>

        <nav aria-label="Main navigation">
          <ul className="flex flex-col items-start gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isExternal =
                "isExternal" in item && item?.isExternal === true;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center pl-7 text-sm font-medium whitespace-nowrap transition-opacity active:opacity-70 hover:opacity-90"
                    aria-current={isActive ? "page" : undefined}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span
                      className={
                        isActive
                          ? "relative text-blue-600"
                          : "relative text-gray-700 dark:text-gray-300"
                      }
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-blue-600"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1, originX: 0 }}
                          exit={{ scaleX: 0, originX: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <AnimatedSignature
          className="mt-5 size-[4.5rem] relative left-7"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  type: "spring",
                  duration: 3,
                  bounce: 0,
                  delay: 1.0, // Increased delay
                },
                opacity: {
                  duration: 0.1,
                  delay: 1.0, // Increased delay
                },
              },
            },
          }}
        />
      </div>
    </aside>
  );
}
