"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, ApiRequestError } from "@/contexts/auth-context";
import { HeroBackground } from "@/components/sections/hero-background";
import { GoogleButton, GitHubButton } from "@/components/oauth-buttons";

// ─── Schema (matches backend RegisterDto) ───
const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name must be at most 60 characters"),
  email: z.string().email("Please provide a valid email"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores allowed",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", username: "", password: "" },
  });

  async function onSubmit(values: SignupFormValues) {
    setServerError(null);
    try {
      await signup(values);
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

      {/* Back to home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="relative w-full max-w-md z-10">
        {/* Brand mark */}
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
              <Sparkles className="h-3 w-3 text-primary-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                Early access · v0.1
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Become an OG
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Create your account and start compounding.
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
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Om Bhavikatti"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-danger-500">{errors.name.message}</p>
              )}
            </div>

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

            {/* Username */}
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="og_grinder"
                autoComplete="username"
                {...register("username")}
                aria-invalid={!!errors.username}
              />
              {errors.username && (
                <p className="text-xs text-danger-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 8 characters"
                autoComplete="new-password"
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
                  Creating account...
                </>
              ) : (
                "Create my account"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Legal microcopy */}
        <p className="mt-6 text-center text-xs text-text-muted">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-text-secondary">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-text-secondary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}