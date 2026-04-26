import { AnimatedDiv, AnimatedParagraph } from "../../components/motion";
import { ExternalLink } from "@/components/external-link";
import type { Transition } from "motion/react";

const AVATAR_SRC =
  "https://ik.imagekit.io/fl2lbswwo/avatar.jpeg?updatedAt=1757456439459";

const blockEnterSpring = (delay: number): Transition => ({
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
  bounce: 0,
  duration: 0.3,
  delay,
});

export function Hero() {
  return (
    <section className="flex items-center justify-center px-6 lg:px-20 pt-18 pb-10 lg:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <AnimatedDiv
          transition={blockEnterSpring(0.06)}
          className="mb-5 sm:mb-7 flex justify-center"
        >
          <img
            src={AVATAR_SRC}
            alt="Portrait of Vlad Sazonau wearing glasses and a light shirt, outdoors in front of a sunlit glass building."
            width={128}
            height={128}
            loading="lazy"
            fetchPriority="high"
            decoding="async"
            className="size-32 rounded-full object-cover outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        </AnimatedDiv>
        <AnimatedParagraph
          transition={blockEnterSpring(0.18)}
          className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-7 text-balance text-gray-950 leading-[1.05] tracking-tight sm:leading-[1.02]"
        >
          Vlad Sazonau
        </AnimatedParagraph>
        <div className="space-y-7 text-center md:space-y-9 lg:px-8">
          <AnimatedParagraph
            transition={blockEnterSpring(0.42)}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground leading-snug text-pretty tracking-tight"
          >
            Product Engineer & Design Enthusiast
          </AnimatedParagraph>

          <div className="mx-auto max-w-2xl space-y-7 text-center md:space-y-9">
            <AnimatedDiv transition={blockEnterSpring(0.62)}>
              <Intro />
            </AnimatedDiv>
            <AnimatedDiv transition={blockEnterSpring(0.74)}>
              <Highlights />
            </AnimatedDiv>
            <AnimatedDiv transition={blockEnterSpring(0.86)}>
              <CurrentProjects />
            </AnimatedDiv>
            <AnimatedDiv transition={blockEnterSpring(0.98)}>
              <SocialLinks />
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <p className="mx-auto max-w-prose text-pretty text-center text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
      I'm a product-minded generalist with{" "}
      <span className="text-primary font-semibold">
        8+ years of experience{" "}
      </span>
      building and shipping web products using{" "}
      <span className="text-primary font-semibold">
        React, Next.js, and TypeScript
      </span>
      . I like owning products end-to-end, bridging engineering, design, and
      product to ship things that are useful, usable, and well-crafted.
    </p>
  );
}

function Highlights() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-left sm:p-7 md:p-8">
      <h3 className="mb-4 text-lg font-semibold tracking-tight text-balance text-gray-950 sm:mb-5 sm:text-xl">
        Highlights
      </h3>
      <ul className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            –
          </span>
          <span className="text-pretty min-w-0">
            Built{" "}
            <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">
              EasyInvoicePDF
            </ExternalLink>
            , an open-source invoice generator with{" "}
            <span className="text-primary font-semibold">
              750+ GitHub stars
            </span>
            , averaging{" "}
            <span className="text-primary font-semibold">
              2k monthly visitors
            </span>
            , and{" "}
            <span className="text-primary font-semibold">1k+ invoices</span>{" "}
            generated.
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            –
          </span>
          <span className="text-pretty min-w-0">
            Contributed to major OSS projects{" "}
            <span className="text-primary font-semibold">
              (zod, gumroad, cal.com, flexile)
            </span>{" "}
            and received bounties
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 items-start">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            –
          </span>
          <span className="text-pretty min-w-0">
            Featured in a large IT Telegram channel{" "}
            <span className="text-primary font-semibold">
              (50k+ subscribers)
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function CurrentProjects() {
  return (
    <div className="text-left">
      <h3 className="mb-3 text-lg font-semibold tracking-tight text-balance text-gray-950 sm:mb-4 sm:text-xl">
        Current Projects
      </h3>
      <ul className="space-y-2 text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 pt-0.5 text-muted-foreground/70 select-none">
            –
          </span>
          <span className="text-pretty min-w-0">
            <ExternalLink href="https://easyinvoicepdf.com/?template=stripe&ref=vladsazon.com">
              EasyInvoicePDF
            </ExternalLink>{" "}
            - Free & Open-Source Invoice Generator
          </span>
        </li>
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-pretty text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
      <ExternalLink href="https://git.new/vldzn">GitHub</ExternalLink>

      <ExternalLink href="https://www.linkedin.com/in/vlad-sazonau-22a9a9126">
        LinkedIn
      </ExternalLink>

      <ExternalLink href="/vlad-sazon-cv.pdf">CV</ExternalLink>
    </div>
  );
}
