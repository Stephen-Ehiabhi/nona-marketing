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

