"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Flame,
  CheckCircle2,
  Circle,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  BookOpen,
  Code2,
  Dumbbell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const heatColors = [
  "bg-surface-elevated border-border/50", // 0 - empty
  "bg-primary-200 dark:bg-primary-900/40", // 1 - light
  "bg-primary-400 dark:bg-primary-700/60", // 2
  "bg-primary-500 dark:bg-primary-500/80", // 3
  "bg-primary-600 dark:bg-primary-400", // 4 - intense
];

const habits = [
  { icon: BookOpen, label: "Deep study — 2h", done: true, color: "primary" },
  { icon: Code2, label: "Code — 90 min", done: true, color: "secondary" },
  { icon: Dumbbell, label: "Workout — 45 min", done: true, color: "success" },
  { icon: Target, label: "Read 20 pages", done: false, color: "streak" },
];

const habitAccent: Record<string, string> = {
  primary: "text-primary-500 bg-primary-100 dark:bg-primary-900/40",
  secondary: "text-secondary-500 bg-secondary-400/20 dark:bg-secondary-500/20",
  success: "text-success-500 bg-success-400/20 dark:bg-success-500/20",
  streak: "text-streak-500 bg-streak-400/20 dark:bg-streak-500/20",
};

export function ProductPreview() {

    const [heatmapData, setHeatmapData] = useState<number[]>(() =>
    Array.from({ length: 140 }, () => 0)
  );

  useEffect(() => {
    setHeatmapData(
      Array.from({ length: 140 }, () =>
        Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4) + 1
      )
    );
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Ambient glow behind mockup */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-30 dark:opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ─── Section header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            A glimpse inside
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Beautifully simple.
            <br />
            <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Ruthlessly powerful.
            </span>
          </h2>
        </motion.div>

        {/* ─── Browser mockup ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow beneath the mockup */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -bottom-8 top-8 rounded-3xl bg-linear-to-r from-primary-500/20 via-secondary-500/20 to-primary-400/20 blur-2xl"
          />

          <div className="relative rounded-2xl border border-border/70 bg-surface shadow-elevated overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-3">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              {/* Fake URL bar */}
              <div className="ml-4 flex-1 max-w-md mx-auto">
                <div className="flex items-center gap-2 rounded-md bg-background border border-border px-3 py-1 text-xs text-text-muted font-mono">
                  <span className="text-success-500">●</span>
                  app.beingog.com/dashboard
                </div>
              </div>
              <div className="h-6 w-6" /> {/* spacer */}
            </div>

            {/* App content — 2 column layout */}
            <div className="grid grid-cols-12 min-h-[520px]">
              {/* ─── Sidebar ─── */}
              <aside className="hidden md:block col-span-3 border-r border-border bg-background/50 p-4 space-y-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-linear-to-br from-primary-500 to-secondary-500 text-white text-xs font-display font-bold">
                    B
                  </div>
                  <span className="font-display text-sm font-semibold">BeingOG</span>
                </div>

                {[
                  { icon: TrendingUp, label: "Dashboard", active: true },
                  { icon: Target, label: "Habits" },
                  { icon: Flame, label: "Streaks" },
                  { icon: Users, label: "Friends" },
                  { icon: Sparkles, label: "AI Coach" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium",
                      item.active
                        ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
                        : "text-text-secondary"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                ))}
              </aside>

              {/* ─── Main content ─── */}
              <main className="col-span-12 md:col-span-9 p-6 space-y-5">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">Good evening, Om 👋</h3>
                    <p className="text-xs text-text-muted mt-0.5">Wednesday, 8 July · 47 day streak</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-streak-400/20 px-3 py-1 text-xs font-medium text-streak-600 dark:text-streak-400">
                      <Flame className="h-3 w-3" />
                      47
                    </div>
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary-400 to-secondary-500" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "XP today", value: "+340", accent: "primary" },
                    { label: "Focus time", value: "4h 12m", accent: "secondary" },
                    { label: "Rank", value: "#12", accent: "success" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-border bg-surface p-3"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono">
                        {stat.label}
                      </p>
                      <p className={cn(
                        "mt-1 font-display text-xl font-bold",
                        stat.accent === "primary" && "text-primary-600 dark:text-primary-400",
                        stat.accent === "secondary" && "text-secondary-500",
                        stat.accent === "success" && "text-success-500"
                      )}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Habits list */}
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                      Today's habits
                    </h4>
                    <span className="text-xs text-text-muted">3 / 4 done</span>
                  </div>
                  <div className="space-y-2">
                    {habits.map((habit) => (
                      <div
                        key={habit.label}
                        className="flex items-center gap-3 py-1.5"
                      >
                        <div className={cn(
                          "grid h-7 w-7 place-items-center rounded-md",
                          habitAccent[habit.color]
                        )}>
                          <habit.icon className="h-3.5 w-3.5" />
                        </div>
                        <span className={cn(
                          "flex-1 text-xs",
                          habit.done
                            ? "text-text-muted line-through"
                            : "text-text-primary font-medium"
                        )}>
                          {habit.label}
                        </span>
                        {habit.done ? (
                          <CheckCircle2 className="h-4 w-4 text-success-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-text-muted" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmap */}
                <div className="rounded-lg border border-border bg-surface p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                      140-day activity
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted">
                      Less
                      {heatColors.map((c, i) => (
                        <span key={i} className={cn("h-2 w-2 rounded-sm border", c)} />
                      ))}
                      More
                    </div>
                  </div>
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {heatmapData.map((val, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-2.5 w-2.5 rounded-sm border",
                          heatColors[val]
                        )}
                      />
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}