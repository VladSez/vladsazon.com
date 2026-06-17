import { ExternalLink } from "@/components/external-link";
import {
  AnimatedDiv,
  AnimatedHeading,
  AnimatedHeading2,
} from "@/components/motion";
import { Copyright } from "@/components/ui/copyright";
import { AVATAR_URL, SOCIAL_LINKS } from "@/lib/config";
import type { Transition } from "motion/react";
import Link from "next/link";

const blockEnterSpring = (delay: number): Transition => ({
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
  delay,
});

export default function AboutPage() {
  return (
    <div className="md:w-9/12 ">
      <AnimatedDiv
        transition={blockEnterSpring(0.06)}
        className="mb-5 sm:mb-7 flex justify-start md:hidden"
      >
        <img
          src={AVATAR_URL}
          alt="Portrait of Vlad Sazonau wearing glasses and a light shirt, outdoors in front of a sunlit glass building."
          width={128}
          height={128}
          loading="lazy"
          fetchPriority="high"
          decoding="async"
          className="size-32 rounded-full object-cover outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </AnimatedDiv>
      <AnimatedHeading
        transition={blockEnterSpring(0.18)}
        className="font-bold tracking-tight leading-none text-gray-950 dark:text-gray-50 text-balance mb-3 text-3xl md:text-4xl lg:text-5xl"
      >
        Vlad Sazonau
      </AnimatedHeading>
      <div className="space-y-10 lg:px-0">
        <AnimatedHeading2
          transition={blockEnterSpring(0.42)}
          className="font-medium text-muted-foreground leading-snug text-pretty tracking-tight"
        >
          Software Engineer & Design Enthusiast
        </AnimatedHeading2>

        <div className="mx-auto max-w-2xl space-y-7 md:space-y-9">
          <AnimatedDiv transition={blockEnterSpring(0.62)}>
            <Intro />
          </AnimatedDiv>
          <AnimatedDiv transition={blockEnterSpring(0.74)}>
            <Highlights />
          </AnimatedDiv>
          <AnimatedDiv transition={blockEnterSpring(0.86)}>
            <h3 className="mb-3 text-lg font-semibold tracking-tight text-balance text-gray-950 dark:text-gray-50 sm:mb-4 sm:text-xl">
              Open Source Contributions
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Contributed to major open-source projects including{" "}
              <span className="text-primary font-semibold">
                Zod, Gumroad, Cal.com, and Flexile
              </span>
              , with multiple contributions rewarded through bounty programs.
            </p>
          </AnimatedDiv>
          <AnimatedDiv transition={blockEnterSpring(0.92)}>
            <h3 className="mb-3 text-lg font-semibold tracking-tight text-balance text-gray-950 dark:text-gray-50 sm:mb-4 sm:text-xl">
              Explore My Projects
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Interested in what I've been building?{" "}
              <Link
                href="/projects"
                className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors active:opacity-70"
              >
                Check out my projects page
              </Link>
            </p>
          </AnimatedDiv>

          <AnimatedDiv transition={blockEnterSpring(0.98)}>
            <SocialLinks />
          </AnimatedDiv>
          <div className="mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground flex justify-between items-center">
            <ExternalLink
              href="/llms/home.md"
              className="text-xs text-muted-foreground hover:text-foreground no-underline decoration-0 hover:decoration-0 transition-colors"
            >
              View page as Markdown
            </ExternalLink>
            <div>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className="space-y-7">
      <p className="mx-auto max-w-prose text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
        I'm a pragmatic, product-focused software engineer with{" "}
        <span className="text-primary font-semibold">
          8.5+ years of experience
        </span>{" "}
        building and shipping web products with{" "}
        <span className="text-primary font-semibold">
          React, Next.js, TypeScript, Node.js and shadcn/ui
        </span>
        . I own products end-to-end, from ideation and prototyping through UX
        decisions to production infrastructure and scaling.
      </p>

      <p className="mx-auto max-w-prose text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
        I've deeply integrated AI into my engineering workflow using{" "}
        <span className="text-primary font-semibold">
          Cursor, Claude Code/OpenCode, and Codex
        </span>{" "}
        with modern{" "}
        <span className="text-primary font-semibold">
          agentic development patterns
        </span>
        .
      </p>
    </div>
  );
}
function Highlights() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-left sm:p-7 md:p-8">
      <h3 className="mb-4 text-lg font-semibold tracking-tight text-balance text-gray-950 dark:text-gray-50 sm:mb-5 sm:text-xl">
        Highlights
      </h3>
      <ul className="space-y-3 text-base text-muted-foreground leading-relaxed font-light sm:text-lg">
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            👉
          </span>
          <span className="text-pretty min-w-0">
            Built{" "}
            <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">
              EasyInvoicePDF
            </ExternalLink>
            , an open-source invoice generator with{" "}
            <span className="text-primary font-semibold">
              900+ GitHub stars
            </span>
            , averaging{" "}
            <span className="text-primary font-semibold">
              2k monthly visitors
            </span>
            , and{" "}
            <span className="text-primary font-semibold">
              2k+ total invoices
            </span>{" "}
            generated.
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            👉
          </span>
          <span className="text-pretty min-w-0">
            Contributed to major OSS projects{" "}
            <span className="text-primary font-semibold">
              (zod, gumroad, cal.com, flexile)
            </span>{" "}
            and received bounties.
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            👉
          </span>
          <span className="text-pretty min-w-0">
            Featured in a large IT-focused Telegram channel with{" "}
            <span className="text-primary font-semibold">
              (55k+ subscribers)
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap justify-start gap-x-5 gap-y-2 text-pretty text-base font-light leading-relaxed text-muted-foreground sm:text-lg mt-10">
      <Link
        href="/projects"
        className="text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-blue-500 dark:hover:decoration-blue-300 font-medium active:opacity-70"
      >
        Projects
      </Link>
      <ExternalLink href="/vlad-sazon-cv.pdf">CV</ExternalLink>
      <ExternalLink href={SOCIAL_LINKS.GITHUB}>GitHub</ExternalLink>
      <ExternalLink href={SOCIAL_LINKS.LINKEDIN}>LinkedIn</ExternalLink>
      <ExternalLink href={SOCIAL_LINKS.X}>X</ExternalLink>
    </div>
  );
}
