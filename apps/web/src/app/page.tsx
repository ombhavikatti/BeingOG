import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />

        {/* Placeholder for next sections */}
        <section className="py-24 text-center">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Features section coming next
          </p>
        </section>
      </main>
    </>
  );
}