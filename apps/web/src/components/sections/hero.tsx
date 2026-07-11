"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";
import { AnimatedNumber } from "@/components/animated-number";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-28 md:pt-48 md:pb-40">
      <HeroBackground />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* ─── Announcement pill ─── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-pill border border-border bg-surface/70 backdrop-blur-xl px-4 py-1.5 text-xs font-medium text-text-secondary shadow-soft transition-all hover:border-primary-300 hover:bg-surface hover:shadow-elevated"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
            </span>
            <span>
              <span className="font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                Early access
              </span>{" "}
              · Join the first 5,000 builders
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* ─── Massive headline ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-display font-bold tracking-tighter leading-[0.95]"
          style={{
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            letterSpacing: "-0.04em",
          }}
        >
          <span className="block text-text-primary">The OS for</span>
          <span className="block mt-2 bg-linear-to-br from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-transparent">
            ambitious students.
          </span>
        </motion.h1>

        {/* ─── Subheading ─── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed"
        >
          Track habits, crush goals, hold friends accountable, and get{" "}
          <span className="text-text-primary font-medium">AI-powered coaching</span>{" "}
          — all in one obsessively-crafted platform built for the grind.
        </motion.p>

        {/* ─── CTAs ─── */}
        <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
  className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
>
 <Button
  asChild
  size="lg"
  className="min-w-[220px] h-14 text-base font-semibold shadow-elevated group relative overflow-hidden"
>
  <Link href="/signup">
    <span className="relative z-10 flex items-center">
      Join the waitlist
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </span>
    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  </Link>
</Button>

<Button
  asChild
  size="lg"
  variant="outline"
  className="min-w-[220px] h-14 text-base font-semibold backdrop-blur bg-surface/50 hover:bg-surface"
>
  <Link href="#how-it-works">
    <Sparkles className="mr-2 h-4 w-4" />
    See how it works
  </Link>
</Button>
</motion.div>
        {/* ─── Trust row ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-muted"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-3">
            {[
              "from-primary-400 to-secondary-500",
              "from-secondary-400 to-primary-600",
              "from-success-400 to-primary-500",
              "from-streak-400 to-secondary-500",
              "from-primary-500 to-success-400",
            ].map((gradient, i) => (
              <div
                key={i}
                className={`h-9 w-9 rounded-full border-2 border-background bg-linear-to-br ${gradient} shadow-soft`}
              />
            ))}
          </div>

         <span>
  Trusted by{" "}
  <AnimatedNumber
    value={2481}
    className="font-semibold text-text-primary tabular-nums"
  />
  <span className="font-semibold text-text-primary">+</span>{" "}
  ambitious students already grinding
</span>
        </motion.div>
      </div>
    </section>
  );
}