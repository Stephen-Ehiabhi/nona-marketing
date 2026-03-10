"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const scenarios = [
  {
    mockup: "/mockups/iphone17-black-home.png",
    title: "Monday Morning",
    body: "Open the app. Breakfast is waiting: Nigerian Scrambled Eggs, 15 min, 620 cal. Tap Start cooking. Done before the coffee\u2019s cold.",
    badge: "Breakfast ready",
  },
  {
    mockup: "/mockups/iphone17-silver-home.png",
    title: "Grocery Day",
    body: "Scan barcodes as you unpack. Snap the fridge when you\u2019re done. Nona rebuilds the week\u2019s meals around everything new.",
    badge: "Scan & plan",
  },
  {
    mockup: "/mockups/iphone17-silver-recipe.png",
    title: "First Time Cooking This",
    body: "Nigerian Scrambled Eggs with Tomato Toast. Tap the recipe, see the macros, check the ingredients. Everything\u2019s measured for you.",
    badge: "Recipe detail",
  },
  {
    mockup: "/mockups/iphone17-black-yourweek.png",
    title: "Sunday Evening",
    body: "View the full week plan. Swap Thursday\u2019s dinner for something lighter. Generate the shopping list. Week sorted.",
    badge: "Weekly plan",
  },
];

function ScenarioCard({ scenario, index }: { scenario: typeof scenarios[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 + index * 10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="flex flex-col">
      {/* Card with phone */}
      <div className="relative bg-gray-900 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] group">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

        {/* Phone mockup centered */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pt-10">
          <div className="w-[65%] max-w-[220px] transform group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src={scenario.mockup}
              alt={scenario.title}
              width={1350}
              height={2760}
              unoptimized
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Badge floating top */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-[11px] font-semibold text-black shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            {scenario.badge}
          </span>
        </div>
      </div>

      {/* Text below */}
      <div className="mt-5">
        <h3 className="font-serif text-[1.1rem] md:text-[1.2rem] font-bold text-white leading-[1.2]">
          {scenario.title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.7] text-white/45">
          {scenario.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function EverydayLives() {
  return (
    <section className="bg-black py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-white leading-[1.1]">
            A day with Nona.
          </p>
          <p className="mt-3 text-[15px] text-white/40 max-w-lg mx-auto">
            From the moment you wake up to the last dish of the day — every meal is handled.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 md:gap-5">
          {scenarios.map((scenario, i) => (
            <ScenarioCard key={i} scenario={scenario} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
