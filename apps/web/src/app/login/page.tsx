"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, ApiRequestError } from "@/contexts/auth-context";
import { HeroBackground } from "@/components/sections/hero-background";
import { GoogleButton, GitHubButton } from "@/components/oauth-buttons";

// ─── Schema ───
const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setServerError(err.displayMessage);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <HeroBackground />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="relative w-full max-w-md z-10">
        {/* Brand */}
        <div className="flex justify-center mb-6">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br from-primary-500 to-secondary-500 text-white font-display font-bold text-lg shadow-elevated">
            B
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-xl p-8 shadow-elevated">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-pill bg-primary-500/10 px-3 py-1 mb-4">
              <LogIn className="h-3 w-3 text-primary-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                Welcome back
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Ready to grind?
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Log in to continue your streak.
            </p>
          </div>

          {/* OAuth buttons */}
<div className="space-y-2 mb-6">
  <GoogleButton />
  <GitHubButton />
</div>

{/* Divider */}
<div className="relative mb-6">
  <div className="absolute inset-0 flex items-center">
    <span className="w-full border-t border-border" />
  </div>
  <div className="relative flex justify-center text-xs uppercase tracking-widest">
    <span className="bg-surface px-2 text-text-muted font-mono">
      or with email
    </span>
  </div>
</div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@college.edu"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-danger-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs text-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-danger-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-3 py-2.5 text-xs text-danger-600 dark:text-danger-400">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}