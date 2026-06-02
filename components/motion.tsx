"use client";

import { cn } from "@/lib/utils";
import { motion, type Transition, type ViewportOptions } from "motion/react";

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
        "text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground leading-relaxed text-pretty",
        className
      )}
    >
      {children}
    </motion.h1>
  );
};

export const AnimatedHeading2 = ({
  children,
  className,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) => {
  return (
    <motion.h2
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
      className={cn("text-lg sm:text-xl md:text-xl lg:text-2xl", className)}
    >
      {children}
    </motion.h2>
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
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
    />
  );
};

export const AnimatedListItem = ({
  children,
  className,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) => {
  return (
    <motion.li
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
    >
      {children}
    </motion.li>
  );
};

export const AnimatedDiv = ({
  children,
  className,
  transition = {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
    delay: 0.06,
  },
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedInViewDiv = ({
  children,
  className,
  transition,
  viewport = { once: true },
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
  viewport?: ViewportOptions;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};
