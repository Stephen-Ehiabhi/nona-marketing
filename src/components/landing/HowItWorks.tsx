"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Set your taste.\nScan the kitchen.",
    detail: "Pick your favourite cuisines, set dietary needs, then snap a photo of your fridge. Nona catalogues everything and learns what you like.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Wake up to\na meal plan.",
    detail: "Every morning, breakfast, lunch, and dinner are waiting — built from what\u2019s in your kitchen, your diet, and your calorie goals.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Tap Start cooking.\nNona guides you.",
    detail: "Step-by-step instructions, auto timers, voice control. When you\u2019re done, rate the meal — Nona learns and gets better.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40 + index * 15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative bg-black rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[340px] overflow-hidden"
    >
      {/* Large bg number */}
      <div className="absolute top-6 right-8 font-serif text-[5rem] md:text-[6rem] font-bold text-white/[0.04] leading-none select-none">
        {step.num}
      </div>

      <div className="relative z-10">
        <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white/60 group-hover:bg-white/15 transition-colors duration-300">
          {step.icon}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="font-serif text-[1.25rem] md:text-[1.4rem] font-bold text-white leading-[1.25] whitespace-pre-line">
          {step.title}
        </h3>
        <p className="mt-3 text-[14px] text-white/50 leading-[1.7]">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-black leading-[1.1]"
          >
            Set up once. Eat well forever.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] text-gray-400 max-w-xs"
          >
            Takes 2 minutes to set up. Plans meals for life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
