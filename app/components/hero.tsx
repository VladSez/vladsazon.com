import { BlurText } from "@/components/BlurText";
import { AnimatedDiv, AnimatedParagraph } from "../../components/motion";
import { ExternalLink } from "@/components/external-link";

export function Hero() {
  return (
    <section className="flex items-center justify-center px-6 lg:px-20 pt-18 pb-10 lg:py-20">
      <div className="max-w-5xl">
        <BlurText
          text="Vlad Sazonau"
          delay={150}
          stepDuration={0.3}
          animateBy="words"
          direction="bottom"
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance text-gray-950 leading-tight tracking-tight"
        />
        <div className="space-y-8 lg:px-8">
          <AnimatedParagraph
            transition={{
              duration: 0.3,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground leading-relaxed text-pretty"
          >
            Product Engineer & Design Enthusiast
          </AnimatedParagraph>

          <AnimatedDiv
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1,
              delay: 0.8,
              duration: 0.3,
            }}
          >
            <div className="space-y-8 max-w-3xl">
              <Intro />
              <Highlights />
              <CurrentProjects />
              <SocialLinks />
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
      I'm a product-minded generalist with <span className="text-primary font-semibold">8+ years of experience </span>
      building and shipping web products using <span className="text-primary font-semibold">React, Next.js, and TypeScript</span>. I like owning products end-to-end, bridging
      engineering, design, and product to ship things that are useful,
      usable, and well-crafted.
    </p>
  )
}


function Highlights() {
  return (
    <div className="border border-border bg-card p-6 md:p-8 rounded-lg shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-950 mb-6 tracking-tight">
        Highlights
      </h3>
      <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
        <li className="flex gap-3 p-3 -m-3 rounded-md transition-colors duration-200">
          <span className="flex-shrink-0 text-lg">-</span>
          <span className="text-pretty">
            Gained <span className="text-primary font-semibold">450+ GitHub stars</span> for my open-source <ExternalLink href="https://github.com/VladSez/easy-invoice-pdf">invoice
              generator app</ExternalLink> (<span className="text-primary font-semibold">7k visitors in 2025</span>, <span className="text-primary font-semibold">624 invoices generated</span> by users)
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 rounded-md transition-colors duration-200">
          <span className="flex-shrink-0 text-lg">-</span>
          <span className="text-pretty">
            Contributed to major OSS projects <span className="text-primary font-semibold">(zod, gumroad, cal.com,
              flexile)</span> and received bounties
          </span>
        </li>
        <li className="flex gap-3 p-3 -m-3 rounded-md transition-colors duration-200">
          <span className="flex-shrink-0 text-lg">-</span>
          <span className="text-pretty">
            Featured in a large IT Telegram channel <span className="text-primary font-semibold">(50k+ subscribers)</span>
          </span>
        </li>
      </ul>
    </div>
  )
}

function CurrentProjects() {
  return (
    <div className="mt-8">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-950 mb-4 tracking-tight">
        Current Projects
      </h3>
      <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
        <li className="flex gap-3">
          <span className="flex-shrink-0 text-lg">-</span>
          <span className="text-pretty">
            <ExternalLink href="https://easyinvoicepdf.com/?template=stripe&ref=vladsazon.com">
              EasyInvoicePDF
            </ExternalLink>{" "}
            - Free & Open-Source Invoice Generator
          </span>
        </li>
      </ul>
    </div>
  )
}

function SocialLinks() {
  return (
    <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty space-x-3">
      <ExternalLink href="https://git.new/vldzn">GitHub</ExternalLink>

      <ExternalLink href="https://www.linkedin.com/in/vlad-sazonau-22a9a9126">
        LinkedIn
      </ExternalLink>

      <ExternalLink href="https://dub.sh/vlad-cv">CV</ExternalLink>
    </p>
  )
}