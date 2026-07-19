"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

/**
 * TanStack Query — the industry-standard data-fetching layer.
 * Provides caching, deduplication, background refetch, optimistic updates.
 *
 * The queryClient is created in state so it's stable across re-renders
 * but never shared between users (SSR-safe pattern).
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute — don't refetch if data is < 1min old
            gcTime: 5 * 60 * 1000, // 5 minutes — keep unused data cached this long
            retry: 1, // retry failed requests once
            refetchOnWindowFocus: true, // refetch when user tabs back
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}