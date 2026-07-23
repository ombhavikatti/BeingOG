"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { useAuth } from "@/contexts/auth-context";

// ─── Types ───
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
  completedToday: boolean;
}

export interface CreateHabitInput {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  frequency?: Frequency;
  target?: number;
}

// ─── Query Keys ───
export const habitKeys = {
  all: ["habits"] as const,
  lists: () => [...habitKeys.all, "list"] as const,
};

// ─── QUERIES ───
export function useHabits() {
  const { accessToken, isLoading: authLoading } = useAuth();

  return useQuery({
    queryKey: habitKeys.lists(),
    queryFn: () =>
      apiRequest<Habit[]>("/habits", { accessToken: accessToken! }),
    enabled: !!accessToken && !authLoading,
  });
}

// ─── MUTATIONS ───
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
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
}

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

/**
 * Optimistic complete — checkbox flips instantly, rolls back if backend fails.
 */
export function useCompleteHabit() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) =>
      apiRequest(`/habits/${habitId}/complete`, {
        method: "POST",
        accessToken: accessToken!,
      }),
    onMutate: async (habitId) => {
      await queryClient.cancelQueries({ queryKey: habitKeys.lists() });
      const previous = queryClient.getQueryData<Habit[]>(habitKeys.lists());
      queryClient.setQueryData<Habit[]>(habitKeys.lists(), (old) =>
        (old ?? []).map((h) =>
          h.id === habitId ? { ...h, completedToday: true } : h,
        ),
      );
      return { previous };
    },
    onError: (_err, _habitId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(habitKeys.lists(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
}

/**
 * Optimistic uncomplete — same pattern as complete.
 */
export function useUncompleteHabit() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) =>
      apiRequest(`/habits/${habitId}/complete`, {
        method: "DELETE",
        accessToken: accessToken!,
      }),
    onMutate: async (habitId) => {
      await queryClient.cancelQueries({ queryKey: habitKeys.lists() });
      const previous = queryClient.getQueryData<Habit[]>(habitKeys.lists());
      queryClient.setQueryData<Habit[]>(habitKeys.lists(), (old) =>
        (old ?? []).map((h) =>
          h.id === habitId ? { ...h, completedToday: false } : h,
        ),
      );
      return { previous };
    },
    onError: (_err, _habitId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(habitKeys.lists(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
}