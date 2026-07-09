"use client";

import { motion } from "motion/react";

// Tech stack — displayed as pill badges
const stack = [
  { name: "Next.js" },
  { name: "React 19" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "shadcn/ui" },
  { name: "Framer Motion" },
  { name: "NestJS" },
  { name: "PostgreSQL" },
  { name: "Prisma" },
  { name: "Redis" },
  { name: "Vercel" },
  { name: "GitHub Actions" },
  { name: "Docker" },
  { name: "FastAPI" },
  { name: "Python 3.12" },
];

// Render twice for seamless loop
const doubled = [...stack, ...stack];

export function TechMarquee() {
  return (
    <section className="relative py-16 md:py-20 bg-background border-y border-border/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-mono text-xs uppercase tracking-widest text-text-muted mb-10"
        >
          Built with world-class tools
        </motion.p>

        {/* Marquee container with edge fades */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex gap-3 animate-marquee">
            {doubled.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-pill border border-border bg-surface text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary-300 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-linear-to-br from-primary-500 to-secondary-500" />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}