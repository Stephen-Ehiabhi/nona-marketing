"use client";

import { useReveal } from "@/hooks/useReveal";

const props = [
  {
    icon: "🗑️",
    title: "Throw out less",
    stat: "40%",
    statLabel: "less waste",
    description:
      "That sad bag of spinach decomposing in the back of the fridge? Gone era. Nona uses what's expiring first, so your money stops ending up in the bin.",
  },
  {
    icon: "⏱️",
    title: "Skip the mental load",
    stat: "30",
    statLabel: "min saved / day",
    description:
      "\"What should we eat?\" is the most exhausting daily question. Nona answers it before you even ask — with meals you can actually make tonight.",
  },
  {
    icon: "🧠",
    title: "Learns what you love",
    stat: "∞",
    statLabel: "improving",
    description:
      "Hated the curry? Loved the stir fry? Nona remembers. Every thumbs up and thumbs down reshapes tomorrow's suggestions. It gets eerily good.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "One kitchen, many diets",
    stat: "5",
    statLabel: "profiles",
    description:
      "Vegan wife. Gluten-free kid. Husband who eats everything. Nona finds meals that work for the whole table — or suggests smart variations.",
  },
];

export default function ValueProps() {
  useReveal();

  return (
    <section className="bg-black text-white py-20 md:py-32 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/[0.02]" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-white/[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.01]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
            Why Nona
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1] max-w-lg mx-auto">
            The stuff you actually{" "}
            <span className="text-gray-600">care about.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 stagger-children">
          {props.map((prop, i) => (
            <div
              key={i}
              className="reveal group rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-7 md:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15]"
            >
              <span className="text-3xl">{prop.icon}</span>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-serif text-[36px] font-extrabold leading-none">
                  {prop.stat}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {prop.statLabel}
                </span>
              </div>

