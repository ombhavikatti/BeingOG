"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gradient bar at the very top of the page that fills as user scrolls.
 * Uses spring physics for smooth, natural motion (not linear).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring wrapper makes the bar feel "buttery" instead of jerky
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-linear-to-r from-primary-500 via-secondary-500 to-primary-400"
      aria-hidden="true"
    />
  );
}