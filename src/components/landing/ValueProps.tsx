"use client";

import { motion } from "framer-motion";

const props = [
  {
    stat: "40%",
    statLabel: "less waste",
    title: "Throw out less",
    description:
      "Nona uses what\u2019s expiring first, so your money stops ending up in the bin. That sad bag of spinach? Gone era.",
  },
  {
    stat: "30",
    statLabel: "min saved / day",
    title: "Skip the mental load",
    description:
      "\u201CWhat should we eat?\u201D is the most exhausting daily question. Nona answers it before you even ask.",
  },
  {
    stat: "\u221E",
    statLabel: "improving",
    title: "Learns what you love",
    description:
      "Hated the curry? Loved the stir fry? Nona remembers. Every thumbs up reshapes tomorrow\u2019s suggestions. It gets eerily good.",
  },
  {
    stat: "5",
    statLabel: "profiles",
    title: "One kitchen, many diets",
    description:
      "Vegan wife. Gluten-free kid. Husband who eats everything. Nona finds meals for the whole table.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ValueProps() {
  return (
    <section className="bg-black py-24 md:py-36 relative overflow-hidden">
      {/* Subtle geometric decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-white/[0.03]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-white/[0.03]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
            Why Nona
          </span>
          <h2 className="font-serif text-[1.85rem] md:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] max-w-lg mx-auto text-white">
            The stuff you actually care about.
          </h2>
        </motion.div>

