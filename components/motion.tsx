"use client";

import { cn } from "@/lib/utils";
import { motion, type Transition } from "motion/react";

export const AnimatedParagraph = ({
  children,
  className,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
      className={cn(
        "text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground leading-relaxed text-pretty",
        className
      )}
    >
      {children}
    </motion.p>
  );
};

export const AnimatedHeading = ({
  children,
  className,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
      className={cn(
        "text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance text-gray-950 leading-tight tracking-tight",
        className
      )}
    >
      {children}
    </motion.h1>
  );
};

export const AnimatedImage = ({
  src,
  alt,
  className,
  transition,
  height,
  width,
}: {
  src: string;
  alt: string;
  className?: string;
  transition?: Transition;
  height: number;
  width: number;
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={transition}
    />
  );
};
