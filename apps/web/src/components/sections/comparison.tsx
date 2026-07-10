"use client";

import { motion } from "motion/react";
import { Check, X, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Value = boolean | "partial";

type Feature = {
  label: string;
  beingog: Value;
  notion: Value;
  habitica: Value;
};

const features: Feature[] = [
  { label: "Habit & goal tracking",       beingog: true,      notion: "partial",  habitica: true },
  { label: "Pomodoro / focus timer",      beingog: true,      notion: false,      habitica: false },
  { label: "Streaks + XP + levels",       beingog: true,      notion: false,      habitica: true },
  { label: "Friends & accountability",    beingog: true,      notion: false,      habitica: "partial" },
  { label: "Live study rooms",            beingog: true,      notion: false,      habitica: false },
  { label: "Real-time chat + video",      beingog: true,      notion: false,      habitica: false },
  { label: "AI Coach + weekly reports",   beingog: true,      notion: false,      habitica: false },
  { label: "Placement / DSA dashboard",   beingog: true,      notion: false,      habitica: false },
  { label: "Weakness detection",          beingog: true,      notion: false,      habitica: false },
  { label: "Beautiful dark mode",         beingog: true,      notion: true,       habitica: false },
  { label: "Built for students",          beingog: true,      notion: false,      habitica: "partial" },
  { label: "Free forever core plan",      beingog: true,      notion: "partial",  habitica: true },
];

const columns = [
  { key: "beingog", label: "BeingOG", featured: true },
  { key: "notion", label: "Notion", featured: false },
  { key: "habitica", label: "Habitica", featured: false },
] as const;

function ValueCell({ value, featured }: { value: Value; featured: boolean }) {
  if (value === true) {
    return (
      <div
        className={cn(
          "mx-auto grid h-8 w-8 place-items-center rounded-full",
          featured
            ? "bg-white/20 text-white"
            : "bg-success-400/15 text-success-600 dark:text-success-400"
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div
        className={cn(
          "mx-auto grid h-8 w-8 place-items-center rounded-full",
          featured
            ? "bg-white/15 text-white/90"
            : "bg-streak-400/15 text-streak-600 dark:text-streak-400"
        )}
      >
        <Minus className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "mx-auto grid h-8 w-8 place-items-center rounded-full",
        featured
          ? "bg-white/10 text-white/60"
          : "bg-danger-400/10 text-danger-500 dark:text-danger-400"
      )}
    >
      <X className="h-4 w-4" strokeWidth={3} />
    </div>
  );
}

export function Comparison() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Why BeingOG
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            One app.
            <br />
            <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Replaces all of them.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            No more juggling Notion + Todoist + Habitica + Discord + LeetCode.
            Everything you need, purpose-built for students.
          </p>
        </motion.div>

        {/* ═══ DESKTOP TABLE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden md:block relative rounded-2xl border border-border bg-surface overflow-hidden shadow-soft"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border bg-surface-elevated">
            <div className="px-6 py-5" />
            {columns.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "relative px-6 py-5 text-center",
                  col.featured &&
                    "bg-linear-to-br from-primary-600 to-secondary-600"
                )}
              >
                {col.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-streak-500 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white shadow-soft flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" /> You
                  </div>
                )}
                <p
                  className={cn(
                    "font-display text-lg font-bold tracking-tight",
                    col.featured ? "text-white" : "text-text-primary"
                  )}
                >
                  {col.label}
                </p>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={cn(
                "grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center",
                i !== features.length - 1 && "border-b border-border/60"
              )}
            >
              <div className="px-6 py-4 text-sm font-medium text-text-primary">
                {feature.label}
              </div>
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "px-6 py-4",
                    col.featured &&
                      "bg-linear-to-br from-primary-600/95 to-secondary-600/95"
                  )}
                >
                  <ValueCell
                    value={feature[col.key]}
                    featured={col.featured}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* ═══ MOBILE STACKED CARDS ═══ */}
        <div className="md:hidden space-y-6">
          {columns.map((col, idx) => (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cn(
                "relative rounded-2xl border overflow-hidden shadow-soft",
                col.featured
                  ? "border-primary-500 bg-linear-to-br from-primary-600 to-secondary-600"
                  : "border-border bg-surface"
              )}
            >
              {col.featured && (
                <div className="absolute top-4 right-4 rounded-pill bg-streak-500 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white shadow-soft flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> You
                </div>
              )}
              <div className="p-6 border-b border-white/10">
                <p
                  className={cn(
                    "font-display text-xl font-bold tracking-tight",
                    col.featured ? "text-white" : "text-text-primary"
                  )}
                >
                  {col.label}
                </p>
              </div>
              <div className="divide-y divide-border/40">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <span
                      className={cn(
                        "text-sm",
                        col.featured
                          ? "text-white/90"
                          : "text-text-secondary"
                      )}
                    >
                      {feature.label}
                    </span>
                    <ValueCell
                      value={feature[col.key]}
                      featured={col.featured}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <div className="grid h-5 w-5 place-items-center rounded-full bg-success-400/15 text-success-600 dark:text-success-400">
              <Check className="h-3 w-3" strokeWidth={3} />
            </div>
            Full support
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-5 w-5 place-items-center rounded-full bg-streak-400/15 text-streak-600 dark:text-streak-400">
              <Minus className="h-3 w-3" strokeWidth={3} />
            </div>
            Partial / requires setup
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-5 w-5 place-items-center rounded-full bg-danger-400/10 text-danger-500 dark:text-danger-400">
              <X className="h-3 w-3" strokeWidth={3} />
            </div>
            Not available
          </div>
        </div>
      </div>
    </section>
  );
}