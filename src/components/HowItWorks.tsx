"use client";

import { useReveal } from "@/hooks/useReveal";

export default function HowItWorks() {
  useReveal();

  return (
    <section id="how-it-works" className="bg-white py-20 md:py-32 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-16 md:mb-24 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            How It Works
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1] max-w-md mx-auto">
            Dinner in three{" "}
            <span className="text-gray-300">easy moves.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 stagger-children">
          {[
            {
              step: "01",
              icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              ),
              title: "Open the fridge. Take a photo.",
              description:
                "That\u2019s it. Nona\u2019s AI recognizes every item on the shelf \u2014 even the leftover takeout in the back \u2014 and builds your inventory automatically.",
