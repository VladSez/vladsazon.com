import { Hero } from "@/app/components/hero";
import { Clock } from "@/components/clock";
import { AnimatedSignature } from "./components/animated-signature";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50 text-sm text-muted-foreground">
          <Clock />
        </div>
        <main className="mb-20">
          <Hero />
          <div className="flex justify-center mt-14 mb-4 lg:mb-8 lg:mt-4">
            <AnimatedSignature />
          </div>
          {/* <div className="flex justify-center mt-14 mb-4">
            <AnimatedArrow />
          </div>

          <div className="flex justify-center mx-8 sm:mx-0">
            <WantaToPlayGameAnimatedSvgText />
          </div>
          <div className="px-3 sm:px-6 pb-4 sm:pb-10 pt-6">
            <SnakeGame />
          </div> */}
        </main>
      </div>
    </>
  );
}
