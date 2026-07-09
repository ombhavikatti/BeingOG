"use client";

import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/animated-number";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  format?: (n: number) => string;
};

const stats: Stat[] = [
  {
    value: 2481,
    suffix: "+",
    label: "Ambitious students",
  },
  {
    value: 45000,
    suffix: "+",
    label: "Habits tracked",
    format: (n) =>
      Math.floor(n) >= 1000
        ? `${(Math.floor(n) / 1000).toFixed(1).replace(".0", "")}K`
        : `${Math.floor(n)}`,
  },
  {
    value: 98,
    suffix: "%",
    label: "Would recommend",
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Average rating",
    format: (n) => n.toFixed(1),
  },
];

export function Stats() {
  return (
    <section className="relative py-20 md:py-24 bg-background overflow-hidden">
      {/* Subtle gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, var(--color-primary-100) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            The receipts
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Numbers that
            <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              {" "}speak louder
            </span>{" "}
            than words.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className={`text-center relative ${
                idx < stats.length - 1
                  ? "md:border-r md:border-border/60"
                  : ""
              }`}
            >
              {/* Big number */}
              <div className="font-display font-bold tracking-tighter leading-none tabular-nums">
                <span
                  className="bg-linear-to-br from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-transparent"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {stat.prefix}
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    duration={2000}
                  />
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="mt-3 text-sm md:text-base text-text-secondary font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}