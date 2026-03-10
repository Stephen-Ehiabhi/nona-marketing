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

      <p className={`mt-2 text-[13px] ${plan.dark ? "text-white/40" : "text-gray-400"}`}>
        {plan.desc}
      </p>

      <div className={`my-6 h-px ${plan.dark ? "bg-white/[0.06]" : "bg-gray-200"}`} />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className={`text-[13px] flex items-start gap-2.5 ${plan.dark ? "text-white/60" : "text-gray-600"}`}
          >
            <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.dark ? "text-white/30" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <motion.a
        href="#beta-signup"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`mt-8 inline-flex items-center justify-center h-12 rounded-full text-[13px] font-semibold transition-colors duration-200 ${
          plan.dark
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-14 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-black leading-[1.1]">
              Less than a takeaway.
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] text-gray-400 max-w-xs"
          >
            Nona pays for itself in the food you stop throwing away.
          </motion.p>
        </div>

