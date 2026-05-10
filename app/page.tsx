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
          <div className="flex justify-center">
            <AnimatedSignature />
          </div>
        </main>
      </div>
    </>
  );
}
