"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { apiRequest, ApiRequestError } from "@/lib/api/client";
import { Button } from "@/components/ui/button";

interface MeResponse {
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
}

export default function DashboardPage() {
  const { user, accessToken, logout } = useAuth();
  const [serverUser, setServerUser] = useState<MeResponse["user"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!accessToken) return;

  let cancelled = false;
  setLoading(true);

  apiRequest<MeResponse>("/auth/me", { accessToken })
    .then((res) => {
      if (cancelled) return;
      setServerUser(res.user);
      setError(null);
    })
    .catch((err) => {
      if (cancelled) return;
      if (err instanceof ApiRequestError) {
        setError(`${err.status}: ${err.displayMessage}`);
      } else {
        setError("Unknown error");
      }
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });

  return () => {
    cancelled = true;
  };
}, [accessToken]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="text-center max-w-lg w-full">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] ?? "OG"} 👋
        </h1>
        <p className="mt-3 text-text-secondary">
          Your dashboard is coming in Phase 5.
        </p>

        {/* Local (from context / localStorage) */}
        {user && (
          <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-left space-y-2 font-mono text-xs">
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">
              From LocalStorage
            </p>
            <div><span className="text-text-muted">id: </span>{user.id}</div>
            <div><span className="text-text-muted">email: </span>{user.email}</div>
            <div><span className="text-text-muted">username: </span>@{user.username}</div>
            <div><span className="text-text-muted">name: </span>{user.name}</div>
          </div>
        )}

        {/* Live (from /auth/me via API — proves auth works end-to-end) */}
        <div className="mt-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20 p-6 text-left space-y-2 font-mono text-xs">
          <p className="text-[10px] uppercase tracking-widest text-primary-700 dark:text-primary-300 mb-2">
            From GET /api/auth/me (live)
          </p>
          {loading && <div>Loading...</div>}
          {error && <div className="text-danger-500">Error → {error}</div>}
          {serverUser && (
            <>
              <div><span className="text-text-muted">id: </span>{serverUser.id}</div>
              <div><span className="text-text-muted">email: </span>{serverUser.email}</div>
              <div><span className="text-text-muted">username: </span>@{serverUser.username}</div>
              <div><span className="text-text-muted">name: </span>{serverUser.name}</div>
            </>
          )}
        </div>

        <Button variant="outline" className="mt-6" onClick={logout}>
          Log out
        </Button>
      </div>
    </main>
  );
}