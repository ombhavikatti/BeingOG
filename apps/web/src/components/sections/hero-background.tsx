/**
 * HeroBackground — premium ambient background for the hero section.
 * Composed of a soft grid + two floating gradient orbs.
 * Purely decorative — no interactivity, no accessibility label needed.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: "var(--text-muted)",
        }}
      />

      {/* Top-left indigo orb */}
      <div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 dark:opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-right purple orb */}
      <div
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-40 dark:opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary-500) 0%, transparent 70%)",
        }}
      />

      {/* Fade at bottom for smooth section transition */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}