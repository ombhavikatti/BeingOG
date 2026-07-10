"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  college: string;
  gradient: string; // for avatar
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I went from grinding alone at 2 AM to actually shipping consistent work. The streaks kept me honest — my friends could literally see if I skipped a day. Game changer.",
    name: "Ananya Sharma",
    role: "3rd year, CSE",
    college: "IIT Bombay",
    gradient: "from-primary-400 to-secondary-500",
    featured: true,
  },
  {
    quote:
      "The AI weekly report caught that I was avoiding DP problems. Fixed my weakness before campus season. Cracked Uber's interview.",
    name: "Rohan Patel",
    role: "Final year, IT",
    college: "NIT Trichy",
    gradient: "from-secondary-400 to-primary-500",
  },
  {
    quote:
      "Study rooms with my roommate = accountability we never had. We both hit 100-day streaks. This shouldn't be this fun.",
    name: "Priya Reddy",
    role: "2nd year, ECE",
    college: "BITS Pilani",
    gradient: "from-success-400 to-primary-500",
  },
  {
    quote:
      "The placement dashboard showed me exactly where I was weak. No more guessing. Cleared my first Amazon OA in months.",
    name: "Arjun Mehta",
    role: "Final year, CSE",
    college: "IIIT Hyderabad",
    gradient: "from-streak-400 to-secondary-500",
  },
  {
    quote:
      "Finally deleted 6 other apps. Habits, DSA, focus timer, notes — everything in one place, and it doesn't feel bloated.",
    name: "Karthik Iyer",
    role: "3rd year, EE",
    college: "IIT Madras",
    gradient: "from-primary-500 to-secondary-400",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Loved by students
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Don't take our word for it.
            <br />
            <span className="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Take theirs.
            </span>
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className={cn(
                t.featured && "lg:col-span-2 lg:row-span-1"
              )}
            >
              <div
                className={cn(
                  "group h-full relative rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1",
                  t.featured
                    ? "bg-linear-to-br from-primary-600 to-secondary-600 border-primary-500 text-white shadow-elevated"
                    : "bg-surface border-border/70 hover:border-primary-300/60 hover:shadow-elevated"
                )}
              >
                {/* Decorative quote mark */}
                <Quote
                  className={cn(
                    "absolute top-6 right-6 h-8 w-8",
                    t.featured
                      ? "text-white/20"
                      : "text-primary-500/20"
                  )}
                />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        t.featured
                          ? "fill-white text-white"
                          : "fill-streak-500 text-streak-500"
                      )}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={cn(
                    "leading-relaxed",
                    t.featured
                      ? "text-lg md:text-xl font-medium text-white"
                      : "text-base text-text-primary"
                  )}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={cn(
                      "h-11 w-11 shrink-0 rounded-full bg-linear-to-br shadow-soft",
                      t.gradient,
                      t.featured && "ring-2 ring-white/30"
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "font-semibold text-sm",
                        t.featured ? "text-white" : "text-text-primary"
                      )}
                    >
                      {t.name}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-0.5",
                        t.featured ? "text-white/70" : "text-text-muted"
                      )}
                    >
                      {t.role} · {t.college}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}