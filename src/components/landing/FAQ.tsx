"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does it plan my meals?",
    a: "Nona looks at everything in your kitchen, your cuisine preferences, dietary restrictions, calorie goals, cooking skill, and what you've rated before. It generates breakfast, lunch, and dinner every day — a full 7-day plan you can swap and adjust.",
  },
  {
    q: "What if I don't like a suggestion?",
    a: "Swap it. Nona generates an alternative instantly. You can also rate every meal you cook (1-5 stars) and it learns your taste over time. The more you use it, the better the recommendations get.",
  },
  {
    q: "How does scanning work?",
    a: "Three modes: point the camera at your fridge and AI identifies everything. Scan barcodes on packaged goods. Or snap a nutrition label. You review and confirm what Nona found, then it updates your inventory and rebuilds your meal plan.",
  },
  {
    q: "I'm a beginner cook. Will I keep up?",
    a: "Cooking mode is built for exactly this. Large step-by-step text, auto timers, technique explanations, and voice control so your hands stay free. You set your skill level and Nona adapts the recipes accordingly.",
  },
  {
    q: "Can my family use it too?",
    a: "On the Family plan, up to 5 people share one kitchen with their own taste profiles, dietary needs, and calorie goals. Everyone sees the same inventory. Portions scale automatically.",
  },
  {
    q: "Is my data safe?",
    a: "End-to-end encrypted and GDPR compliant. We never sell or share your data. You can export or delete everything at any time from settings.",
  },
];

