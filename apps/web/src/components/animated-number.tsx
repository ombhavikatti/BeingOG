"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedNumberProps {
  /** The final number to count up to */
  value: number;
  /** Duration of the count animation in milliseconds */
  duration?: number;
  /** Format function — defaults to comma-separated thousands */
  format?: (n: number) => string;
  className?: string;
}

/**
 * Animated number that counts from 0 to `value` when scrolled into view.
 * Runs only once per page load.
 */
export function AnimatedNumber({
  value,
  duration = 2000,
  format = (n) => Math.floor(n).toLocaleString("en-IN"),
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let rafId: number;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      // easeOutExpo — starts fast, decelerates dramatically at the end (feels premium)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayValue(eased * value);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(displayValue)}
    </span>
  );
}