"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Is BeingOG free?",
    answer:
      "Yes — 100% free during early access. When we launch the Pro tier (later this year), all core features stay free forever. Pro will add AI Coach unlimited chats, deeper analytics, and priority support.",
  },
  {
    question: "How is this different from Notion or Todoist?",
    answer:
      "Notion and Todoist are blank canvases — you build your own system, and most people give up. BeingOG comes pre-built for the student journey: habits, goals, focus timer, DSA tracker, placement dashboard, and AI coaching — all designed to work together. Plus, you get real accountability from friends, which no productivity tool offers.",
  },
  {
    question: "Do I have to invite friends to use it?",
    answer:
      "No. BeingOG works perfectly as a solo tool — habits, goals, AI coach, analytics all work standalone. The social/accountability layer is opt-in. Most users invite friends once they see their own results.",
  },
  {
    question: "What's the AI Coach actually good at?",
    answer:
      "It's trained on patterns from top-performing students. It spots when you're avoiding hard subjects (like DP problems), predicts your placement readiness based on your habits, and generates weekly reports telling you exactly what to fix. It's not a chatbot — it's an analyst.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your habit data, notes, and personal metrics are 100% private by default. You choose what to share with friends (streaks, presence, activity feed). We never sell data, and we never train external AI models on your content. You can export or delete everything anytime.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "The web app works on any device — phone, tablet, laptop. Native iOS and Android apps are on our roadmap for Q2. Meanwhile, you can install the web version to your home screen as a PWA (Progressive Web App) — feels native.",
  },
  {
    question: "I'm a college freshman — is this for me?",
    answer:
      "Absolutely. In fact, freshers benefit the most — building consistent habits from year 1 compounds into unbelievable results by year 4. If you're serious about placements, GATE, GRE, or just becoming excellent, start now.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-surface/40 scroll-mt-16 border-y border-border/60"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Questions?
            <br />
            <span className="text-text-secondary">We've got answers.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.question}
                value={`item-${idx}`}
                className="border-none px-6 md:px-8"
              >
                <AccordionTrigger className="py-5 md:py-6 text-base md:text-lg font-semibold hover:no-underline hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left [&[data-state=open]]:text-primary-600 dark:[&[data-state=open]]:text-primary-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm md:text-base text-text-secondary leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-pill border border-border bg-surface px-5 py-2.5 shadow-soft">
            <MessageCircle className="h-4 w-4 text-primary-500" />
            <span className="text-sm text-text-secondary">
              Still have questions?{" "}
              <a
                href="mailto:hello@beingog.com"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-4"
              >
                hello@beingog.com
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}