"use client";

import { useAuth } from "@/contexts/auth-context";
import { useHabits } from "@/hooks/use-habits";
import { Loader2, Target, Flame, TrendingUp } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { CreateHabitDialog } from "@/components/habits/create-habit-dialog";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: habits, isLoading, isError } = useHabits();

  const firstName = user?.name?.split(" ")[0] ?? "OG";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

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

      {/* ─── Stats row (placeholders — real numbers come in Phase 5.7/5.8) ─── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={Target}
          label="Active habits"
          value={habits?.length ?? 0}
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
          <h2 className="font-display text-xl font-semibold">Today's habits</h2>
          <div className="flex items-center justify-between mb-4">
  <h2 className="font-display text-xl font-semibold">Today's habits</h2>
  <CreateHabitDialog />
</div>
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
            <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
              Create your first habit and start compounding daily wins. Add
              habit UI coming in the next step.
            </p>
          </div>
        )}

        {habits && habits.length > 0 && (
          <div className="space-y-2">
            {habits.map((habit: { id: Key | null | undefined; color: any; icon: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; target: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <div
                key={habit.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary-300/60 hover:shadow-soft"
              >
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-lg"
                  style={{
                    backgroundColor: `${habit.color}1A`, // 10% opacity
                    color: habit.color,
                  }}
                >
                  {habit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{habit.name}</p>
                  {habit.description && (
                    <p className="text-xs text-text-muted truncate">
                      {habit.description}
                    </p>
                  )}
                </div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
                  Target: {habit.target}
                </p>
              </div>
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
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${accentClasses[accent]}`}>
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