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
        <div className="space-y-8">
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
            <div className="space-y-8" style={{ WebkitTextSizeAdjust: "none" }}>
              <p className="text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
                I craft exceptional web experiences with over 8 years of
                expertise in React, Next.js, and TypeScript. I'm passionate
                about design, accessibility, user experience, and contributing
                to open-source projects.
              </p>

              <p className="mt-8 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty">
                Currently building{" "}
                <ExternalLink href="https://dub.sh/invoice-stripe">
                  EasyInvoicePDF
                </ExternalLink>{" "}
                and{" "}
                <ExternalLink href="https://dub.sh/role-fit">
                  RoleFitAI
                </ExternalLink>
              </p>

              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty space-x-3">
                <ExternalLink href="https://git.new/vldzn">GitHub</ExternalLink>

                <ExternalLink href="https://dub.sh/vladsazon-linkedin">
                  LinkedIn
                </ExternalLink>

                <ExternalLink href="https://dub.sh/vlad-cv">CV</ExternalLink>
              </p>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
