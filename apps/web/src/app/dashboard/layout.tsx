"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Target,
  Flame,
  Users,
  Sparkles,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/habits", label: "Habits", icon: Target },
  { href: "/dashboard/streaks", label: "Streaks", icon: Flame },
  { href: "/dashboard/friends", label: "Friends", icon: Users },
  { href: "/dashboard/ai-coach", label: "AI Coach", icon: Sparkles },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Guard: redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading state
  if (isLoading || !isAuthenticated || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-text-muted" />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* ─── SIDEBAR ─── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface/40 backdrop-blur-xl">
        {/* Brand */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-primary-500 to-secondary-500 text-white font-display font-bold text-sm shadow-soft">
            B
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            BeingOG
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface",
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User card */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface">
            {user.avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary-400 to-secondary-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-text-muted truncate">
                @{user.username}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 justify-start gap-2 text-text-secondary"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* ─── MAIN AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile-friendly) */}
        <header className="h-16 border-b border-border bg-surface/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-8">
          {/* Mobile brand (sidebar hidden on mobile) */}
          <div className="md:hidden flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-linear-to-br from-primary-500 to-secondary-500 text-white font-display font-bold text-xs">
              B
            </div>
            <span className="font-display text-base font-semibold">
              BeingOG
            </span>
          </div>

          {/* Desktop breadcrumb */}
          <div className="hidden md:flex items-center gap-1.5 text-sm text-text-secondary">
            <span>Home</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium capitalize">
              {pathname.split("/").pop() || "dashboard"}
            </span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}