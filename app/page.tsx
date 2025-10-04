import { ClickSpark } from "@/components/ClickSpark";
import { Cubes } from "@/components/Cubes";
import { Hero } from "@/app/components/hero";
import { AnimatedDiv, AnimatedImage } from "@/components/motion";

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
              <AnimatedImage
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
                  delay: 1.2,
                }}
              />
            </div>
          </main>
        </ClickSpark>
      </div>

      {/* Cubes Section */}
      <AnimatedDiv
        className="flex items-center justify-center min-h-[50vh] py-8 px-4"
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1,
          delay: 1.2,
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
            rippleSpeed={1.5}
            autoAnimate={true}
            autoAnimateDelay={2500}
            rippleOnClick={true}
          />
        </div>
      </AnimatedDiv>
    </>
  );
}
