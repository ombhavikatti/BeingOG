"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Add scrolled state after 12px scroll — enables glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ─── Left: Logo ─── */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="BeingOG home"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-primary-500 to-secondary-500 text-white font-display font-bold text-sm shadow-soft transition-transform group-hover:scale-105">
              B
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              BeingOG
            </span>
          </Link>

          {/* ─── Center: Desktop nav links ─── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ─── Right: Actions ─── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button size="sm">Join waitlist</Button>
            </div>

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm p-0">
                <div className="flex h-16 items-center justify-between border-b border-border px-6">
                  <SheetTitle className="font-display text-base font-semibold">
                    BeingOG
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col p-6 gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-3 text-base font-medium text-text-primary hover:bg-surface-elevated rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-2 border-t border-border p-6">
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                  <Button className="w-full">Join waitlist</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}