"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stories = [
  {
    quote: "I wake up and breakfast is already planned. Nigerian eggs this morning, 15 minutes, 620 cal. I just tap Start cooking and follow the steps. I haven\u2019t thought about what to eat in weeks.",
    detail: "The weekly plan feature changed everything for me.",
    name: "Kasia M.",
    context: "Product manager, Warsaw",
  },
  {
    quote: "I set my cuisines to Polish and Mediterranean, my wife set hers to Asian. Nona finds meals we both love from the same fridge. We\u2019re on a 14-day cooking streak.",
    detail: "",
    name: "Tomek R.",
    context: "Father of two, Krak\u00f3w",
  },
  {
    quote: "I scan groceries as I unpack them. Nona knows exactly what I have and builds meals around what\u2019s expiring first. I haven\u2019t thrown food away in a month.",
    detail: "",
    name: "Marek S.",
    context: "Student, Wroc\u0142aw",
  },
  {
    quote: "The cooking mode is why I stopped ordering delivery. Step-by-step, with timers that just work. I made Pan-Seared Chicken last night and it came out perfect. Me! Cooking!",
    detail: "",
    name: "Ania K.",
    context: "Fitness coach, Gda\u0144sk",
  },
];

const stats = [
  { num: 21, suffix: "", label: "meals planned per week" },
  { num: 3, suffix: "", label: "scan modes" },
  { num: 7, suffix: "-day", label: "meal plans" },
  { num: 20, suffix: "+", label: "cuisines" },
];

function AnimatedStat({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) {
      animate(count, stat.num, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    }
  }, [isInView, count, stat.num]);

  useEffect(() => {
    const unsubscribe = springCount.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${stat.suffix}`;
      }
    });
    return unsubscribe;
  }, [springCount, stat.suffix]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-serif text-[2rem] md:text-[2.5rem] font-bold text-black tabular-nums block"
      >
        0{stat.suffix}
      </span>
      <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-1 block">
        {stat.label}
      </span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 py-8 md:py-14 border-b border-gray-100 mb-10 md:mb-20"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[1.5rem] md:text-[2.5rem] font-bold text-black leading-[1.1] mb-8 md:mb-16"
        >
          From people who stopped<br className="hidden md:block" /> guessing what&apos;s for dinner.
        </motion.p>

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <blockquote className="border-l-2 border-black pl-8 md:pl-10">
            <p className="font-serif text-[1.25rem] md:text-[1.75rem] font-bold text-black leading-[1.35]">
              &ldquo;{stories[0].quote}&rdquo;
            </p>
            {stories[0].detail && (
              <p className="mt-3 text-[15px] text-gray-400 leading-[1.7]">
                {stories[0].detail}
              </p>
            )}
            <footer className="mt-5 text-[13px] text-gray-400">
              {stories[0].name} &mdash; {stories[0].context}
            </footer>
          </blockquote>
        </motion.div>

        {/* Rest of quotes in grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {stories.slice(1).map((story, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-gray-50 rounded-2xl p-6 md:p-7 hover:bg-gray-100 transition-colors duration-300"
            >
              <p className="text-[14px] leading-[1.8] text-gray-600">
                &ldquo;{story.quote}&rdquo;
              </p>
              <footer className="mt-4 text-[12px] text-gray-400">
                {story.name} &mdash; {story.context}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
