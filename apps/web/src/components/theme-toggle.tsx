"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Small, elegant theme toggle button.
 * Cycles: light → dark → system → light...
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after client mounts
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-button border border-border bg-surface" />
    );
  }

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const label =
    theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🖥️";

  return (
    <button
      onClick={cycle}
      aria-label="Toggle theme"
      title={`Current: ${theme}`}
      className="w-9 h-9 rounded-button border border-border bg-surface hover:bg-surface-elevated transition-colors flex items-center justify-center text-base"
    >
      {label}
    </button>
  );
}