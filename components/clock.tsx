"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { SlidingNumber } from "@/components/sliding-number";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            className="flex items-center gap-0.5 font-mono cursor-help"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
