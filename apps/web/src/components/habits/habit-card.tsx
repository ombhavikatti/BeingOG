"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  type Habit,
  useCompleteHabit,
  useUncompleteHabit,
} from "@/hooks/use-habits";

interface Props {
  habit: Habit;
}

export function HabitCard({ habit }: Props) {
  const completeHabit = useCompleteHabit();
  const uncompleteHabit = useUncompleteHabit();

  const isPending = completeHabit.isPending || uncompleteHabit.isPending;

  async function handleToggle() {
    if (isPending) return;
    try {
      if (habit.completedToday) {
        await uncompleteHabit.mutateAsync(habit.id);
        toast("Marked as incomplete", { description: habit.name });
      } else {
        await completeHabit.mutateAsync(habit.id);
        toast.success(`Nice! 🔥`, { description: `${habit.name} — done for today.` });
      }
    } catch {
      toast.error("Couldn't update habit. Please try again.");
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary-300/60 hover:shadow-soft",
        habit.completedToday && "opacity-70",
      )}
    >
      {/* Icon */}
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-lg transition-transform group-hover:scale-105"
        style={{
          backgroundColor: `${habit.color}1A`, // 10% opacity
          color: habit.color,
        }}
      >
        {habit.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium truncate transition-all",
            habit.completedToday && "line-through text-text-muted",
          )}
        >
          {habit.name}
        </p>
        {habit.description && (
          <p className="text-xs text-text-muted truncate">
            {habit.description}
          </p>
        )}
      </div>

      {/* Target badge */}
      <p className="hidden sm:block text-[10px] font-mono text-text-muted uppercase tracking-widest">
        Target: {habit.target}
      </p>

      {/* Check button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        aria-label={
          habit.completedToday ? "Mark as incomplete" : "Mark as done"
        }
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition-all active:scale-90 disabled:cursor-not-allowed",
          habit.completedToday
            ? "border-transparent text-white shadow-soft"
            : "border-border bg-surface hover:border-primary-500 hover:bg-primary-500/5",
        )}
        style={
          habit.completedToday
            ? {
                backgroundColor: habit.color,
                boxShadow: `0 0 20px ${habit.color}66`,
              }
            : undefined
        }
      >
        <Check
          className={cn(
            "h-4 w-4 transition-all",
            habit.completedToday
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0",
          )}
          strokeWidth={3}
        />
      </button>
    </div>
  );
}