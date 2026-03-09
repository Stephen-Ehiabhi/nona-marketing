"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    label: "SCANNING",
    title: "One photo.\nYour entire inventory.",
    description:
      "No more mental checklists of what you bought last Tuesday. Snap a photo of any shelf and Nona instantly knows you have 4 tomatoes, half a block of cheddar, and chicken that expires Thursday.",
    highlight: "Works on messy fridges too. We checked.",
    screenshot: "/screenshots/home.png",
    alt: "Nona kitchen scanning interface",
  },
  {
    label: "RECOMMENDATIONS",
    title: "\u201CWhat\u2019s for dinner?\u201D\nAnswered. Every night.",
    description:
      "Nona doesn\u2019t suggest random recipes from the internet. It looks at exactly what\u2019s in your kitchen, what\u2019s about to expire, what your family actually likes, and builds three meals you can start cooking right now.",
    highlight: "92% pantry match on average. No emergency grocery runs.",
    screenshot: "/screenshots/recipe.png",
    alt: "Nona meal recommendations with recipe details",
  },
  {
    label: "COOKING",
    title: "You cook.\nNona guides.",
    description:
      "Hands covered in flour? Just say \u201Cnext step.\u201D Timer running? Nona tracks it. Out of cream? It\u2019ll suggest yogurt instead. Every recipe becomes doable, even if you\u2019ve never made it before.",
    highlight: "Voice-controlled. Totally hands-free.",
    screenshot: "/screenshots/recipe.png",
    alt: "Nona voice-guided cooking mode",
  },
  {
    label: "INVENTORY",
    title: "Nothing expires.\nNothing gets forgotten.",
    description:
      "Nona knows the chicken expires tomorrow and the yogurt is running low. It nudges you to use them first, auto-updates quantities after you cook, and builds your shopping list from what\u2019s actually missing.",
    highlight: "The average household throws out \u00A3700 of food a year. Not yours.",
    screenshot: "/screenshots/home.png",
    alt: "Nona inventory tracking with expiry alerts",
  },
];

