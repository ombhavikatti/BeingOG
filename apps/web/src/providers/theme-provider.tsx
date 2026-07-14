"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Wraps the app in next-themes' provider.
 * Renders as a client component so localStorage can be accessed.
 *
 * Note: `next-themes` injects an inline <script> to prevent flash-of-wrong-theme.
 * React 19 warns about this (which is a false positive here) — the script is
 * intentional and rendered by the library, not our code.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}