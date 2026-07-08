import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}