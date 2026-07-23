"use client";

import { useAuth } from "@/contexts/auth-context";
import { useHabits } from "@/hooks/use-habits";
import { Loader2, Target, Flame, TrendingUp } from "lucide-react";
import { CreateHabitDialog } from "@/components/habits/create-habit-dialog";
import { HabitCard } from "@/components/habits/habit-card";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: habits, isLoading, isError } = useHabits();

  const firstName = user?.name?.split(" ")[0] ?? "OG";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const completedCount = habits?.filter((h) => h.completedToday).length ?? 0;
  const totalCount = habits?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ─── Greeting ─── */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          {greeting}, {firstName} 👋
        </h1>
        <p className="mt-2 text-text-secondary">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* ─── Stats row ─── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={Target}
          label="Done today"
          value={`${completedCount} / ${totalCount}`}
          accent="primary"
        />
        <StatCard icon={Flame} label="Current streak" value={0} accent="streak" />
        <StatCard
          icon={TrendingUp}
          label="XP this week"
          value={0}
          accent="success"
        />
      </div>

      {/* ─── Habits section ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">
            Today&apos;s habits
          </h2>
          <CreateHabitDialog />
        </div>

        {isLoading && (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-text-muted" />
            <p className="mt-2 text-sm text-text-secondary">
              Loading your habits...
            </p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-danger-500/30 bg-danger-500/5 p-6 text-center">
            <p className="text-sm text-danger-600 dark:text-danger-400">
              Failed to load habits. Try refreshing.
            </p>
          </div>
        )}

        {habits && habits.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-primary-500/10">
              <Target className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="font-display text-lg font-semibold">
              No habits yet
            </h3>
            <p className="mt-2 mb-6 text-sm text-text-secondary max-w-sm mx-auto">
              Create your first habit and start compounding daily wins.
            </p>
            <CreateHabitDialog />
          </div>
        )}

        {habits && habits.length > 0 && (
          <div className="space-y-2">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Stat card sub-component ───
function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number | string;
  accent: "primary" | "streak" | "success";
}) {
  const accentClasses = {
    primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
    streak: "bg-streak-500/10 text-streak-600 dark:text-streak-400",
    success: "bg-success-500/10 text-success-600 dark:text-success-400",
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <div
          className={`grid h-9 w-9 place-items-center rounded-lg ${accentClasses[accent]}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
            {label}
          </p>
          <p className="font-display text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}