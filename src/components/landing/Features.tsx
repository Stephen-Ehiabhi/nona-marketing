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

