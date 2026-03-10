"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  {
    text: "Three times a day, the same question: what should I eat? You open the fridge, stare for a minute, close it, open a delivery app. ",
    bold: "Every. Single. Day.",
  },
  {
    text: "You have food. You just don\u2019t know what to make with it. Googling recipes doesn\u2019t help because none of them match what\u2019s actually in your kitchen. ",
    bold: "Exhausting.",
  },
  {
    text: "Meanwhile, that chicken you bought Monday is going bad. The avocado you forgot. The yogurt pushed to the back. Nobody planned a meal around them. ",
    bold: "Wasted.",
  },
];

function PainLine({ line, index }: { line: typeof lines[0]; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity }}
      className="text-[17px] md:text-[26px] lg:text-[30px] leading-[1.5] text-gray-500 font-serif"
    >
      {line.text}
      <span className="text-black font-bold">{line.bold}</span>
    </motion.p>
  );
}

export default function PainPoints() {
  return (
    <section className="bg-white py-16 md:py-40">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="space-y-8 md:space-y-16">
          {lines.map((line, i) => (
            <PainLine key={i} line={line} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-20 h-px bg-gray-200 origin-left"
        />

