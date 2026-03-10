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

