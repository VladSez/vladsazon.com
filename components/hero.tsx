import BlurText from "./BlurText";
import { AnimatedListItem, AnimatedParagraph } from "./motion";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-20">
      <div className="max-w-5xl">
        <BlurText
          text="Vlad Sazonau"
          delay={200}
          animateBy="words"
          direction="bottom"
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance text-gray-950 leading-tight tracking-tight"
        />
        <div className="space-y-8">
          <AnimatedParagraph
            transition={{
              duration: 0.5,
              delay: 0.75,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground leading-relaxed text-pretty"
          >
            Product Engineer & Design Enthusiast
          </AnimatedParagraph>
          <AnimatedParagraph
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty"
          >
            I craft exceptional web experiences with 8+ years of expertise in
            React, Next.js, and TypeScript. Passionate about thoughtful design,
            seamless user experiences, accessibility, and contributing to
            open-source projects.
          </AnimatedParagraph>
          <AnimatedParagraph
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty"
          >
            For more information please check my{" "}
            <a
              href="https://dub.sh/vlad-cv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium"
            >
              CV
            </a>
            ,{" "}
            <a
              href="https://dub.sh/vladsazon-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium"
            >
              LinkedIn
            </a>
            , or{" "}
            <a
              href="https://git.new/vldzn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium"
            >
              GitHub
            </a>
            .
          </AnimatedParagraph>
        </div>

        <AnimatedParagraph
          transition={{
            duration: 0.5,
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-8 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl font-light text-pretty"
        >
          Check out some of my projects:
        </AnimatedParagraph>
        <ul className="mt-4 space-y-3">
          <AnimatedListItem
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center gap-3 text-base md:text-lg lg:text-xl text-muted-foreground font-light"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></span>
            <a
              href="https://dub.sh/invoice-stripe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium"
            >
              EasyInvoicePDF.com
            </a>
          </AnimatedListItem>
          <AnimatedListItem
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center gap-3 text-base md:text-lg lg:text-xl text-muted-foreground font-light"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></span>
            <a
              href="https://dub.sh/role-fit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-primary/60 font-medium"
            >
              RoleFitAI.com
            </a>
          </AnimatedListItem>
        </ul>
      </div>
    </section>
  );
}
