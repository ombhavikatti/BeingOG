"use client";

import { motion } from "motion/react";
import { LineChart, Sparkles, Target, type LucideIcon } from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: Target,
    title: "Set your goals",
    description:
      "Tell BeingOG what you want to achieve — placement, GATE, IIT, side projects. Our AI builds a personalized roadmap for you.",
  },
  {
    number: "02",
    icon: LineChart,
    title: "Track daily",
    description:
      "Log study sessions, code hours, workouts, and habits. Watch your streaks grow and your friends cheer you on.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Level up",
    description:
      "Weekly AI reports show what's working, what's not, and exactly what to do next. Compound your wins into unstoppable momentum.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 bg-surface/40 scroll-mt-16 border-y border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* ─── Section header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            How it works
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Three steps to
            <br />
            <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              stop drifting
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            No 40-hour onboarding. No overwhelming dashboards. Just clarity,
            consistency, and results.
          </p>
        </motion.div>

        {/* ─── Steps ─── */}
        <div className="relative mt-16 md:mt-20">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-linear-to-r from-transparent via-border to-transparent"
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number badge with icon */}
                <div className="relative">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-primary-500 to-secondary-500 text-white shadow-elevated">
                    <step.icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <div className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-surface border border-border font-mono text-[10px] font-semibold text-text-primary shadow-soft">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-xl md:text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-xs text-sm md:text-base text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}