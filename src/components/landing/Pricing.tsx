"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "See how Nona plans your meals.",
    features: [
      "3 kitchen scans per day",
      "1 meal recommendation / day",
      "Basic cooking mode",
      "Single user",
    ],
    cta: "Get Started",
    dark: false,
  },
  {
    name: "Premium",
    price: "29",
    desc: "Every meal, every day, handled.",
    features: [
      "Unlimited scans (camera, barcode, label)",
      "Full 7-day meal plans",
      "Voice-guided cooking + Live Chef",
      "Expiry alerts & smart shopping lists",
      "Nutrition & calorie tracking",
      "Cooking streaks & meal history",
    ],
    cta: "Try Free for 7 Days",
    dark: true,
  },
  {
    name: "Family",
    price: "49",
    desc: "One kitchen. Everyone\u2019s taste covered.",
    features: [
      "Everything in Premium",
      "Up to 5 family members",
      "Individual diet & cuisine profiles",
      "Shared inventory & shopping lists",
      "Automatic portion scaling",
      "Weekly family meal reports",
    ],
    cta: "Try Free for 7 Days",
    dark: false,
  },
];

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 + index * 15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`rounded-3xl p-7 md:p-8 flex flex-col transition-shadow duration-500 ${
        plan.dark
          ? "bg-black text-white ring-1 ring-white/[0.08]"
          : "bg-gray-50 hover:bg-gray-100 transition-colors duration-500"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`text-[13px] font-bold uppercase tracking-wide ${plan.dark ? "text-white/70" : "text-gray-500"}`}>
          {plan.name}
        </span>
        {plan.dark && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-white/60">
            Popular
          </span>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-1.5">
        {plan.price === "0" ? (
          <span className="font-serif text-[2.75rem] font-bold leading-none">Free</span>
        ) : (
          <>
            <span className="font-serif text-[2.75rem] font-bold leading-none">{plan.price}</span>
            <span className={`text-[13px] ${plan.dark ? "text-white/30" : "text-gray-400"}`}>
              PLN/mo
            </span>
          </>
        )}
      </div>

