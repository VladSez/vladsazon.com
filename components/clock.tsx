"use client";

import { useEffect, useState } from "react";

import { SlidingNumber } from "@/components/sliding-number";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";

/**
 * A live-updating digital clock component displaying the current local time (hours, minutes, seconds).
 * Includes a tooltip showing the full date and timezone offset.
 * Runs only on the client side to prevent hydration issues.
 */
export function Clock() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client side to avoid hydration mismatch
    setDate(new Date());

    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render anything until we have the time (avoid empty clock)
  if (!date) {
    return null;
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const timeZoneOffset = date.getTimezoneOffset();
  const timeZoneOffsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
  const timeZoneOffsetMinutes = Math.abs(timeZoneOffset % 60);

  const timeZoneOffsetString = `${timeZoneOffsetHours
    .toString()
    .padStart(2, "0")}:${timeZoneOffsetMinutes.toString().padStart(2, "0")}`;

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center gap-0.5 font-mono cursor-help hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
            initial={initial}
            animate={animate}
            transition={transition}
          >
            <SlidingNumber value={hours} padStart={true} />
            <span className="text-zinc-500">:</span>
            <SlidingNumber value={minutes} padStart={true} />
            <span className="text-zinc-500">:</span>
            <SlidingNumber value={seconds} padStart={true} />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono tabular-nums">
            {date.toLocaleDateString(navigator?.language || "en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            <span className="tabular-nums">{date.toLocaleTimeString()}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {Intl.DateTimeFormat().resolvedOptions().timeZone} (GMT
            {timeZoneOffset <= 0 ? "+" : "-"}
            {timeZoneOffsetString}){" "}
          </p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

const transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
  delay: 0.06,
} as const satisfies Transition;

const initial = {
  opacity: 0,
  filter: "blur(10px)",
  y: 20,
} as const satisfies TargetAndTransition;

const animate = {
  opacity: 1,
  filter: "blur(0px)",
  y: 0,
} as const satisfies TargetAndTransition;
