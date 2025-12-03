"use client";

import { useEffect, useId, useState } from "react";
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  motionValue,
  type Transition,
} from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

const TRANSITION = {
  type: "spring",
  stiffness: 280,
  damping: 18,
  mass: 0.3,
} as const satisfies Transition;

function Digit({ value, place }: { value: number; place: number }) {
  // Extract the digit at this place value (e.g., for value=123 and place=10, get 2)
  // Math.floor(123 / 10) = 12, then 12 % 10 = 2
  const valueRoundedToPlace = Math.floor(value / place) % 10;

  // Create a motion value initialized with the current digit
  const initial = motionValue(valueRoundedToPlace);

  // Create a spring-animated motion value that smoothly transitions between digit changes
  const animatedValue = useSpring(initial, TRANSITION);

  // Update the animated value whenever the digit at this place changes
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  // Transform the motion value to calculate the Y position for this digit
  const y = useTransform(mv, (latest) => {
    // Wait until we have measured the height of the digit
    if (!bounds.height) return 0;

    // Get the current digit value (0-9) from the motion value
    const placeValue = latest % 10;

    // Calculate how far this digit number is from the current value
    // Using modulo 10 to handle wrapping (e.g., 9 -> 0 transition)
    const offset = (10 + number - placeValue) % 10;

    // Convert offset to pixel position (each digit is bounds.height tall)
    let memo = offset * bounds.height;

    // Optimization: if offset > 5, it's shorter to animate backwards
    // (e.g., going from 1 to 9 is shorter as 1 -> 0 -> 9 than 1 -> 2 -> ... -> 9)
    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  // don't render the animated number until we know the height
  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className="absolute inset-0 flex items-center justify-center"
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
  className?: string;
};

/**
 * https://motion-primitives.com/docs/sliding-number
 */
export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = ".",
  className,
}: SlidingNumberProps) {
  const absValue = Math.abs(value);

  const [integerPart, decimalPart] = absValue.toString().split(".");

  // Parse the integer part of the number
  const integerValue = parseInt(integerPart, 10);

  // Add leading zero padding if requested and the integer value is less than 10
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;

  // Split the padded integer string into individual digit characters
  const integerDigits = paddedInteger.split("");

  // Calculate the place value (power of 10) for each digit position
  // For example, in "123": first digit has place value 100, second has 10, third has 1
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  return (
    <div className={cn("flex items-center", className)}>
      {value < 0 && "-"}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}
