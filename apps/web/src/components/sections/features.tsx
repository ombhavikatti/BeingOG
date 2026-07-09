"use client";

import { motion } from "motion/react";
import {
  Target,
  Users,
  Brain,
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32 bg-background scroll-mt-16"
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
            What's inside
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Everything you need.
            <br />
            <span className="text-text-secondary">Nothing you don't.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            Four powerful pillars, one obsessively-crafted platform.
          </p>
        </motion.div>

        {/* ─── BENTO GRID ─── */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(240px,auto)]">
          {/* ═══ CARD 1 — Productivity (Large Hero, spans 4 cols) ═══ */}
          <BentoCard
            colSpan="md:col-span-4"
            rowSpan="md:row-span-2"
            delay={0}
            glowColor="rgba(99, 102, 241, 0.15)"
          >
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                  <Target className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Productivity
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-lg">
                Build the systems that
                <br />
                <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  compound into greatness.
                </span>
              </h3>

              <p className="mt-3 max-w-md text-sm md:text-base text-text-secondary leading-relaxed">
                Track habits, hit pomodoros, log study sessions. Watch your streaks grow into unstoppable momentum.
              </p>

              {/* Visual: Mock streak progression */}
              <div className="mt-auto pt-8">
                <div className="rounded-xl border border-border bg-surface/60 backdrop-blur p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-streak-500" />
                      <span className="text-sm font-semibold">47-day streak</span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      +12% vs last week
                    </span>
                  </div>
                  {/* Streak bars */}
                  <div className="flex items-end gap-1 h-16">
                    {[40, 55, 45, 70, 60, 85, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-linear-to-t from-primary-500 to-secondary-400"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-mono text-text-muted uppercase tracking-widest">
                    <span>Mon</span><span>Tue</span><span>Wed</span>
                    <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ═══ CARD 2 — AI Coach (Tall, spans 2 cols x 2 rows) ═══ */}
          <BentoCard
            colSpan="md:col-span-2"
            rowSpan="md:row-span-2"
            delay={0.1}
            glowColor="rgba(16, 185, 129, 0.15)"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-success-400/20 dark:bg-success-500/20 text-success-600 dark:text-success-400">
                  <Brain className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  AI Coach
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                Your personal mentor
              </h3>

              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                Weekly reports, weakness detection, personalized roadmaps. AI trained on top performers.
              </p>

              {/* Visual: Chat-like AI message */}
              <div className="mt-auto pt-6 space-y-2.5">
                <div className="flex items-start gap-2">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-success-400 to-primary-500 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-surface border border-border px-3 py-2 text-xs leading-relaxed">
                    You're 23% behind your DSA goal. Focus on graphs this week — 4 problems/day.
                  </div>
                </div>
                <div className="flex items-center gap-2 px-9 text-[10px] font-mono text-text-muted">
                  <span className="h-1 w-1 rounded-full bg-success-500 animate-pulse" />
                  AI is typing...
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ═══ CARD 3 — Social (2 cols wide) ═══ */}
          <BentoCard
            colSpan="md:col-span-2"
            delay={0.2}
            glowColor="rgba(139, 92, 246, 0.15)"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary-400/20 dark:bg-secondary-500/20 text-secondary-500 dark:text-secondary-400">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Social
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                Grind with friends.
              </h3>

              {/* Visual: Avatar stack + live indicator */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[
                    "from-primary-400 to-secondary-500",
                    "from-secondary-400 to-primary-500",
                    "from-success-400 to-secondary-500",
                    "from-streak-400 to-primary-500",
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 border-surface bg-linear-to-br",
                        g
                      )}
                    />
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-surface bg-surface-elevated grid place-items-center text-[10px] font-mono font-semibold text-text-secondary">
                    +12
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse" />
                  <span className="text-text-secondary">Studying now</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ═══ CARD 4 — Placement (2 cols wide) ═══ */}
          <BentoCard
            colSpan="md:col-span-2"
            delay={0.3}
            glowColor="rgba(245, 158, 11, 0.15)"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-streak-400/20 dark:bg-streak-500/20 text-streak-600 dark:text-streak-400">
                  <Trophy className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Placement
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                Placement-ready score.
              </h3>

              {/* Visual: Circular progress + score */}
              <div className="mt-auto pt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="url(#trophy-gradient)"
                      strokeWidth="3"
                      strokeDasharray="94 100"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="trophy-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--color-streak-500)" />
                        <stop offset="100%" stopColor="var(--color-primary-500)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-lg font-bold">94</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-text-primary flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-success-500" />
                    Top 6%
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">of your batch</p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ═══ CARD 5 — Habits/Achievement (spans 2 cols, full width visual) ═══ */}
          <BentoCard
            colSpan="md:col-span-2"
            delay={0.4}
            glowColor="rgba(99, 102, 241, 0.15)"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                  <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Habits
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                Track anything.
              </h3>

              {/* Visual: Achievement badges */}
              <div className="mt-auto pt-4 grid grid-cols-4 gap-2">
                {["🔥", "⚡", "🎯", "💎"].map((emoji, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl border border-border bg-surface grid place-items-center text-2xl"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

/**
 * BentoCard — glow-effect wrapper with staggered entrance animation.
 */
function BentoCard({
  children,
  colSpan = "",
  rowSpan = "",
  delay = 0,
  glowColor,
}: {
  children: React.ReactNode;
  colSpan?: string;
  rowSpan?: string;
  delay?: number;
  glowColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(colSpan, rowSpan)}
    >
      <GlowCard glowColor={glowColor} className="h-full">
        <div className="relative h-full rounded-2xl border border-border/70 bg-surface transition-all duration-300 hover:border-primary-300/60 hover:shadow-elevated hover:-translate-y-1 overflow-hidden">
          {children}
        </div>
      </GlowCard>
    </motion.div>
  );
}