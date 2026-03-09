"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    label: "SCANNING",
    title: "One photo.\nYour entire inventory.",
    description:
      "No more mental checklists of what you bought last Tuesday. Snap a photo of any shelf and Nona instantly knows you have 4 tomatoes, half a block of cheddar, and chicken that expires Thursday.",
    highlight: "Works on messy fridges too. We checked.",
    screenshot: "/screenshots/home.png",
    alt: "Nona kitchen scanning interface",
  },
  {
    label: "RECOMMENDATIONS",
    title: "\u201CWhat\u2019s for dinner?\u201D\nAnswered. Every night.",
    description:
      "Nona doesn\u2019t suggest random recipes from the internet. It looks at exactly what\u2019s in your kitchen, what\u2019s about to expire, what your family actually likes, and builds three meals you can start cooking right now.",
    highlight: "92% pantry match on average. No emergency grocery runs.",
    screenshot: "/screenshots/recipe.png",
    alt: "Nona meal recommendations with recipe details",
  },
  {
    label: "COOKING",
    title: "You cook.\nNona guides.",
    description:
      "Hands covered in flour? Just say \u201Cnext step.\u201D Timer running? Nona tracks it. Out of cream? It\u2019ll suggest yogurt instead. Every recipe becomes doable, even if you\u2019ve never made it before.",
    highlight: "Voice-controlled. Totally hands-free.",
    screenshot: "/screenshots/recipe.png",
    alt: "Nona voice-guided cooking mode",
  },
  {
    label: "INVENTORY",
    title: "Nothing expires.\nNothing gets forgotten.",
    description:
      "Nona knows the chicken expires tomorrow and the yogurt is running low. It nudges you to use them first, auto-updates quantities after you cook, and builds your shopping list from what\u2019s actually missing.",
    highlight: "The average household throws out \u00A3700 of food a year. Not yours.",
    screenshot: "/screenshots/home.png",
    alt: "Nona inventory tracking with expiry alerts",
  },
];

export default function Features() {
  useReveal();

  return (
    <section id="features" className="bg-gray-50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-28 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            Features
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1] max-w-lg mx-auto">
            One app replaces{" "}
            <span className="text-gray-300">the guesswork.</span>
          </h2>
        </div>

        {/* Alternating feature sections */}
        <div className="space-y-24 md:space-y-40">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-12 md:gap-16 lg:gap-20 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Phone mockup with real screenshot */}
              <div className={`flex-shrink-0 ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}>
                <div className="phone-frame w-[260px] md:w-[280px]">
                  <div className="phone-screen">
                    <Image
                      src={feature.screenshot}
                      alt={feature.alt}
                      width={500}
                      height={1088}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 max-w-lg ${i % 2 === 0 ? "reveal-right" : "reveal-left"}`}>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                  {feature.label}
                </span>
                <h3 className="mt-5 font-serif text-[28px] md:text-[36px] font-extrabold leading-[1.15] whitespace-pre-line">
                  {feature.title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.75] text-gray-500">
                  {feature.description}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-black">
                  <span className="inline-flex w-5 h-5 rounded-full bg-black items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {feature.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
