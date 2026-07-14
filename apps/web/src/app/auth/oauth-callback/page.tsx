"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/sections/hero-background";

type Status = "loading" | "success" | "error";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthFromTokens } = useAuth();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const hasRun = useRef(false); // Prevent double-execution in React Strict Mode

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    // Backend can pass ?error=... if OAuth failed
    if (error) {
      setStatus("error");
      setErrorMsg(decodeURIComponent(error));
      return;
    }

    if (!accessToken || !refreshToken) {
      setStatus("error");
      setErrorMsg("Missing authentication tokens. Please try again.");
      return;
    }

    (async () => {
      try {
        await setAuthFromTokens({ accessToken, refreshToken });
        setStatus("success");
        // Small delay so user sees the success state briefly
        setTimeout(() => router.replace("/dashboard"), 600);
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    })();
  }, [searchParams, setAuthFromTokens, router]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-xl p-10 shadow-elevated text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary-500/10">
                <Loader2 className="h-7 w-7 text-primary-500 animate-spin" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight">
                Logging you in…
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Almost there. Setting up your session.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-success-500/10">
                <ShieldCheck className="h-7 w-7 text-success-500" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight">
                Welcome to BeingOG 🎉
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Redirecting you to your dashboard…
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-danger-500/10">
                <ShieldAlert className="h-7 w-7 text-danger-500" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight">
                Login failed
              </h1>
              <p className="mt-2 text-sm text-text-secondary">{errorMsg}</p>
              <div className="mt-6 flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                >
                  Back to login
                </Button>
                <Button onClick={() => router.push("/signup")}>
                  Sign up instead
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}