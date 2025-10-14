import { BlurText } from "@/components/BlurText";
import {
  AnimatedDiv,
  AnimatedListItem,
  AnimatedParagraph,
} from "../../components/motion";
import { ExternalLink } from "@/components/external-link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-20">
      <div className="max-w-5xl">
        <BlurText
          text="Vlad Sazonau"
          delay={200}
          stepDuration={0.3}
          animateBy="words"
          direction="bottom"
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance text-gray-950 leading-tight tracking-tight"
        />
        <div className="space-y-8">
          <AnimatedParagraph
            transition={{
              duration: 0.4,
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
              delay: 1,
            }}
          >
            <div className="space-y-8">
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
                I craft exceptional web experiences with over 8 years of
                expertise in React, Next.js, and TypeScript. I’m passionate
                about design, accessibility, user experience, and contributing
                to open-source projects.
              </p>

              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
                For more information please check my{" "}
                <ExternalLink href="https://dub.sh/vlad-cv">CV</ExternalLink>,{" "}
                <ExternalLink href="https://dub.sh/vladsazon-linkedin">
                  LinkedIn
                </ExternalLink>
                , or{" "}
                <ExternalLink href="https://git.new/vldzn">GitHub</ExternalLink>
                .
              </p>
            </div>

            <p className="mt-8 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
              Check out some of my projects:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-base md:text-lg lg:text-xl text-muted-foreground font-light">
                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                <ExternalLink href="https://dub.sh/invoice-stripe">
                  EasyInvoicePDF.com
                </ExternalLink>
              </li>
              <li className="flex items-center gap-3 text-base md:text-lg lg:text-xl text-muted-foreground font-light">
                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                <ExternalLink href="https://dub.sh/role-fit">
                  RoleFitAI.com
                </ExternalLink>
              </li>
            </ul>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
