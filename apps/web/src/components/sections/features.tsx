"use client";

import { motion } from "motion/react";
import {
  Target,
  Users,
  Brain,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  accent: "primary" | "secondary" | "success" | "streak";
};

const features: Feature[] = [
  {
    icon: Target,
    title: "Productivity & Habits",
    description:
      "Build the systems that compound into greatness. Track everything that matters.",
    bullets: [
      "Habit & goal tracking (daily → yearly)",
      "Pomodoro timer with focus mode",
      "Streaks, XP, levels, achievements",
      "Beautiful analytics & heatmaps",
    ],
    accent: "primary",
  },
  {
    icon: Users,
    title: "Social & Accountability",
    description:
      "Grind alone, stay average. Grind with friends, become the OG.",
    bullets: [
      "Friends, followers, study partners",
      "Live 'study together' rooms",
      "Group challenges & leaderboards",
      "Real-time chat with voice & video",
    ],
    accent: "secondary",
  },
  {
    icon: Brain,
    title: "AI Coaching",
    description:
      "Your personal mentor that never sleeps. Trained on top performers.",
    bullets: [
      "Personalized study plans",
      "Weekly AI-generated reports",
      "Weakness detection & fixes",
      "24/7 motivation & guidance",
    ],
    accent: "success",
  },
  {
    icon: Trophy,
    title: "Placement Dashboard",
    description:
      "Know exactly how ready you are. Close every gap before campus season.",
    bullets: [
      "DSA tracker (LeetCode-style)",
      "Resume tracker with AI feedback",
      "Mock-interview logs",
      "Company-specific prep roadmaps",
    ],
    accent: "streak",
  },
];

const accentStyles: Record<Feature["accent"], string> = {
  primary:
    "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
  secondary:
    "bg-secondary-400/10 text-secondary-500 dark:bg-secondary-500/20 dark:text-secondary-400",
  success:
    "bg-success-400/10 text-success-600 dark:bg-success-500/20 dark:text-success-400",
  streak:
    "bg-streak-400/10 text-streak-600 dark:bg-streak-500/20 dark:text-streak-400",
};

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
            Four powerful pillars, one obsessively-crafted platform. Built for
            students who take their future seriously.
          </p>
        </motion.div>

        {/* ─── Feature grid ─── */}
        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
            >
              <Card className="group h-full border-border/70 bg-surface transition-all duration-300 hover:border-primary-300 hover:shadow-elevated hover:-translate-y-1">
                <CardHeader>
                  <div
                    className={cn(
                      "mb-4 grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-110",
                      accentStyles[feature.accent]
                    )}
                  >
                    <feature.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <CardTitle className="font-display text-2xl font-semibold tracking-tight">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed pt-1">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                            accentStyles[feature.accent].split(" ")[1]
                          )}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}