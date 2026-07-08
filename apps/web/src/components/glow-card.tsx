"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Glow color — CSS color value. Defaults to primary indigo. */
  glowColor?: string;
}

/**
 * A card that shows a soft light following the mouse on hover.
 * Used to make feature cards feel premium & interactive.
 */
export function GlowCard({
  children,
  className,
  glowColor = "rgba(99, 102, 241, 0.15)", // indigo-500 @ 15%
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group relative", className)}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {/* Glow layer — sits behind card content, revealed on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}