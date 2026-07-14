"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTA() {
  const [email, setEmail] = useState("");
  // Placeholder submit — real API wire-up in Phase 4
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!email) return;
  // Send them to signup with email prefilled via URL param
  const params = new URLSearchParams({ email });
  window.location.href = `/signup?${params.toString()}`;
};

  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-primary-200 dark:border-primary-800/50 bg-linear-to-br from-primary-600 via-primary-500 to-secondary-500 px-6 py-16 md:px-16 md:py-24 shadow-elevated"
        >
          {/* Ambient orbs inside the CTA card */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary-400/20 blur-3xl"
          />

          <div className="relative text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white/90 border border-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              Early access
            </div>

            {/* Headline */}
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Stop drifting.
              <br />
              Start becoming the OG.
            </h2>

            {/* Subheading */}
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
              Be among the first 5,000 students to shape BeingOG. Zero cost.
              Zero spam. Just early access to something great.
            </p>

            {/* Waitlist form */}
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex w-full max-w-md flex-col sm:flex-row items-center gap-2"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                aria-label="Email address"
                className="h-12 flex-1 bg-white/95 text-text-primary placeholder:text-text-muted border-0 focus-visible:ring-2 focus-visible:ring-white/50"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="h-12 w-full sm:w-auto bg-white text-primary-700 hover:bg-white/95 shadow-soft font-semibold"
              >
                Join waitlist
<ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            {/* Trust microcopy */}
            <p className="mt-5 text-xs text-white/60">
              No credit card required · No spam · Unsubscribe anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}