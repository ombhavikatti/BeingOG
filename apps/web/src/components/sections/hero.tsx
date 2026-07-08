"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <HeroBackground />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* ─── Announcement pill ─── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-pill border border-border bg-surface/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-text-secondary shadow-soft transition-all hover:border-primary-300 hover:bg-surface"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-500" />
            <span>
              <span className="font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                v0.1
              </span>{" "}
              · Early access is open
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* ─── Headline ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          The operating system
          <br />
          for{" "}
          <span className="bg-linear-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-transparent">
            ambitious students
          </span>
        </motion.h1>

        {/* ─── Subheading ─── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-text-secondary leading-relaxed"
        >
          Track habits, crush goals, hold friends accountable, and get AI-powered
          coaching — all in one beautifully-designed platform built for the grind.
        </motion.p>

        {/* ─── CTAs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" className="min-w-[200px] h-12 text-base shadow-soft">
            Join the waitlist
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] h-12 text-base"
          >
            See how it works
          </Button>
        </motion.div>

        {/* ─── Trust signals ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex items-center justify-center gap-3 text-sm text-text-muted"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-background bg-linear-to-br from-primary-400 to-secondary-500"
                style={{
                  transform: `translateX(${i * 0}px)`,
                }}
              />
            ))}
          </div>
          <span>
            Trusted by{" "}
            <span className="font-semibold text-text-primary">2,481+</span>{" "}
            ambitious students
          </span>
        </motion.div>
      </div>
    </section>
  );
}