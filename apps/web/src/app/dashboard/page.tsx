"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="text-center max-w-lg">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] ?? "OG"} 👋
        </h1>
        <p className="mt-3 text-text-secondary">
          Your dashboard is coming in Phase 5.
        </p>

        {user && (
          <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-left space-y-2 font-mono text-xs">
            <div>
              <span className="text-text-muted">id: </span>
              <span>{user.id}</span>
            </div>
            <div>
              <span className="text-text-muted">email: </span>
              <span>{user.email}</span>
            </div>
            <div>
              <span className="text-text-muted">username: </span>
              <span>@{user.username}</span>
            </div>
            <div>
              <span className="text-text-muted">name: </span>
              <span>{user.name}</span>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={logout}
        >
          Log out
        </Button>
      </div>
    </main>
  );
}