"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    question: "Does the scanning actually work on real, messy fridges?",
    answer:
      "Yes — that was the whole point. It handles half-open bags, stacked containers, and that jar of something behind the milk. You take a photo, Nona identifies what it sees and estimates quantities. It's not perfect 100% of the time, but you can tap to correct anything and it learns your kitchen over time.",
  },
  {
    question: "What if I'm vegan / keto / gluten-free / halal?",
    answer:
      "Nona asks about your dietary needs during setup and never forgets. It supports every major diet and 20+ cuisine types. If your household has mixed diets — say, one person is dairy-free and another is a picky omnivore — Nona handles that too, suggesting meals with smart variations.",
  },
  {
    question: "Can my partner / family use it too?",
    answer:
      "On the Family plan, up to 5 people share one kitchen with their own taste profiles and dietary needs. Everyone sees the same inventory, but gets recommendations tuned to their preferences. One person cooks, the whole household benefits.",
  },
  {
    question: "How much food waste will I actually save?",
    answer:
      "Our beta users report around 40% less food thrown away in the first month. The trick is simple: Nona knows what's expiring and builds meals around it. No more discovering a sad avocado you forgot about three weeks ago.",
  },
  {
    question: "I can barely boil an egg. Is this for me?",
    answer:
      "Especially for you. Cooking mode breaks every recipe into dead-simple steps, explains techniques as you go, handles timers automatically, and lets you ask questions by voice. Think of it as a patient friend who happens to be a great cook, standing in your kitchen.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted and stored securely. We don't sell it, share it, or use it for anything except making Nona better for you. We're fully GDPR compliant. You can export or delete your data at any time.",
  },
  {
    question: "When can I get it?",
    answer:
      "We're in private beta right now with 500+ users. Join the waitlist and we'll let you in as soon as a spot opens. Early members lock in a founding discount that never expires — even after we launch publicly.",
  },
];

export default function FAQ() {
  useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center mb-14 md:mb-20 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            FAQ
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1]">
            You&apos;re probably wondering.
          </h2>
          <p className="mt-4 text-[15px] text-gray-500">
            The honest answers.
          </p>
        </div>

        <div className="space-y-3 stagger-children">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`reveal rounded-[16px] border bg-white overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "border-gray-300 shadow-lg shadow-black/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 md:p-6 text-left group"
              >
                <span className="text-[15px] font-semibold pr-6 group-hover:text-black transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? "bg-black text-white rotate-180"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] text-gray-500 leading-[1.8]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
