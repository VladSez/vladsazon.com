import { ClickSpark } from "@/components/ClickSpark";
import { Cubes } from "@/components/Cubes";
import { Hero } from "@/app/components/hero";
import { AnimatedImage, AnimatedInViewDiv } from "@/components/motion";
import { Arrow } from "./components/arrow";
import { Signature } from "./components/signature";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <ClickSpark
          sparkColor="#ffd700"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <main className="">
            <Hero />
            <div className="flex justify-center mb-16">
              <Signature />
              {/* <AnimatedImage
                src="/signature.webp"
                alt="Vlad Sazonau signature"
                height={92}
                width={133}
                className="dark:invert dark:hue-rotate-180"
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  mass: 1,
                  delay: 1,
                }}
              /> */}
            </div>
          </main>
        </ClickSpark>
      </div>

      <AnimatedInViewDiv
        className="flex justify-center items-center gap-10 flex-col mt-20"
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1,
        }}
      >
        <p className="font-mono text-sm text-muted-foreground">
          Hover over the cubes
        </p>

        <Arrow className="text-gray-400" />
      </AnimatedInViewDiv>
      {/* Cubes Section */}
      <div className="min-h-[50vh]">
        <AnimatedInViewDiv
          className="flex items-center justify-center my-12"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
            delay: 1.3,
          }}
        >
          <div className="w-full max-w-screen-lg flex justify-center">
            <Cubes
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="1px solid rgba(0, 0, 0, 0.15)"
              faceColor="#f8f9fa"
              rippleColor="#e9ecef"
              rippleSpeed={3}
              autoAnimate={true}
              autoAnimateDelay={6000}
              rippleOnClick={true}
            />
          </div>
        </AnimatedInViewDiv>
      </div>
    </>
  );
}
