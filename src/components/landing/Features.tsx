"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    title: "Your Week, Planned",
    body: "Open the app and breakfast is ready. So is lunch. And dinner. A full 7-day meal plan built from what\u2019s actually in your kitchen — matched to your diet, cuisines, and calorie goals.",
    mockup: "/mockups/iphone17-black-yourweek.png",
    alt: "Nona weekly meal plan with daily recommendations",
  },
  {
    title: "Scan Your Kitchen",
    body: "Point the camera at the fridge, scan a barcode, or snap a nutrition label. Nona identifies every item — names, quantities, categories, and when it expires. Your whole kitchen, catalogued in seconds.",
    mockup: "/mockups/iphone17-silver-recipe.png",
    alt: "Nona multi-mode kitchen scanner",
  },
  {
    title: "Start Cooking",
    body: "Tap a meal and Nona walks you through it. Step-by-step instructions with auto timers, technique explanations, and voice control. Rate it when you\u2019re done — Nona learns your taste.",
    mockup: "/mockups/iphone17-black-recipe.png",
    alt: "Nona step-by-step cooking mode",
  },
  {
    title: "Nothing Goes to Waste",
    body: "Nona tracks every item across your fridge, pantry, and freezer in real time. When something\u2019s about to expire, it builds tomorrow\u2019s meals around it first. Your shopping list writes itself.",
    mockup: "/mockups/iphone17-silver-home.png",
    alt: "Nona inventory and expiry tracking",
  },
];

function FeatureRow({ feat, index }: { feat: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 1]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
    >
      {/* Phone mockup */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
        <div className="relative w-[280px] md:w-[320px] lg:w-[360px] group">
          <Image
            src={feat.mockup}
            alt={feat.alt}
            width={1350}
            height={2760}
            unoptimized
            className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 md:max-w-md">
        <span className="text-[12px] font-semibold text-white/30 uppercase tracking-[0.15em]">
          0{index + 1}
        </span>
        <h3 className="mt-3 font-serif text-[1.5rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-white leading-[1.15]">
          {feat.title}
        </h3>
        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.8] text-white/50">
          {feat.body}
        </p>
      </div>
    </motion.div>
  );
}

