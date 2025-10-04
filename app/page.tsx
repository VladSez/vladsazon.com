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
  );
}
