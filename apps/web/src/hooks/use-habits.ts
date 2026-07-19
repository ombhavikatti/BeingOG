"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";

// ─── Types (mirror backend Prisma model) ───
export type Frequency = "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM";

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  frequency: Frequency;
  target: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitInput {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  frequency?: Frequency;
  target?: number;
}

// ─── Query Keys (centralized to prevent typos) ───
export const habitKeys = {
  all: ["habits"] as const,
  lists: () => [...habitKeys.all, "list"] as const,
};

/**
 * useHabits() — fetches the current user's habits with caching.
 *
 * Auto-refetches when window is focused. Returns undefined until access token loads.
 */
export function useHabits() {
  const { accessToken, isLoading: authLoading } = useAuth();

  return useQuery({
    queryKey: habitKeys.lists(),
    queryFn: () => apiRequest<Habit[]>("/habits", { accessToken: accessToken! }),
    enabled: !!accessToken && !authLoading, // only fetch when logged in
  });
}

/**
 * useCreateHabit() — mutation to create a new habit.
 * Auto-invalidates the habits list on success (triggers refetch).
 */
export function useCreateHabit() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateHabitInput) =>
      apiRequest<Habit>("/habits", {
        method: "POST",
        body: input,
        accessToken: accessToken!,
      }),
    onSuccess: () => {
      // Refetch the habits list so the new one appears
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
}

/**
 * useDeleteHabit() — mutation to delete a habit.
 */
export function useDeleteHabit() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) =>
      apiRequest<{ id: string }>(`/habits/${habitId}`, {
        method: "DELETE",
        accessToken: accessToken!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
}