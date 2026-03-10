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

