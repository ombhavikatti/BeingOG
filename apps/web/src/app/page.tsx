import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-text-primary relative">
      {/* Theme toggle — top right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="text-center px-6 max-w-3xl">
        {/* Brand mark */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-pill border border-border bg-surface text-xs font-mono uppercase tracking-widest text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          In development · v0.1
        </div>

        {/* Hero heading */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
          <span className="bg-linear-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-transparent">
            BeingOG
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 font-body text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          The operating system for ambitious students.
          <br />
          <span className="text-text-primary font-medium">
            Level up. Stay OG.
          </span>
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="px-6 py-3 rounded-button bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-soft">
            Join the waitlist
          </button>
          <button className="px-6 py-3 rounded-button border border-border bg-surface text-text-primary font-medium hover:bg-surface-elevated transition-colors">
            Learn more
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-16 font-mono text-xs text-text-muted uppercase tracking-widest">
          Landing page · phase 2 · coming soon
        </p>
      </div>
    </main>
  );
}