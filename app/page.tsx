import ClickSpark from "@/components/ClickSpark";
import { Hero } from "@/components/hero";
import { AnimatedImage } from "@/components/motion";

export default function Home() {
  return (
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
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </div>
        </main>
      </ClickSpark>
    </div>
  );
}
