/**
 * HeroBackground — cinematic ambient background.
 * Aurora blobs + grid pattern + noise = premium depth.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Grid pattern with radial mask */}
      <div className="absolute inset-0 hero-grid opacity-60 dark:opacity-30" />

      {/* Aurora blob 1 — top-left, indigo */}
      <div
        className="aurora-blob absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full opacity-40 dark:opacity-30 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))",
        }}
      />

      {/* Aurora blob 2 — bottom-right, purple */}
      <div
        className="aurora-blob-slow absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full opacity-40 dark:opacity-30 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, var(--color-secondary-500), var(--color-primary-400), var(--color-secondary-500))",
        }}
      />

      {/* Aurora blob 3 — center, emerald accent (very subtle) */}
      <div
        className="aurora-blob absolute top-[30%] left-[40%] h-[400px] w-[400px] rounded-full opacity-20 dark:opacity-20 blur-3xl"
        style={{
          background:
            "conic-gradient(from 45deg at 50% 50%, var(--color-success-500), var(--color-primary-400), var(--color-success-500))",
          animationDelay: "-10s",
        }}
      />

      {/* Noise overlay — film-grain premium feel */}
      <div className="noise-overlay" />

      {/* Fade at bottom for smooth section transition */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-b from-transparent to-background z-10" />
    </div>
  );
}