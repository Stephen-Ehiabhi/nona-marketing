"use client";

import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "",
    badge: null,
    description: "See if the hype is real. No card needed.",
    features: [
      "5 kitchen scans / month",
      "1 meal recommendation / day",
      "Basic inventory tracking",
      "Step-by-step cooking mode",
      "Single user",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "29",
    period: "PLN / mo",
    badge: "Most Popular",
    description: "For people who are done wondering what\u2019s for dinner.",
    features: [
      "Unlimited kitchen scans",
      "3 meals / day with AI matching",
      "Full inventory + expiry tracking",
      "Voice-guided cooking mode",
      "Smart shopping lists",
      "Meal history + ratings",
      "Priority support",
    ],
    cta: "Join Waitlist",
    highlighted: true,
  },
  {
    name: "Family",
    price: "49",
    period: "PLN / mo",
    badge: null,
    description: "One subscription, every mouth in the house fed.",
    features: [
      "Everything in Plus",
      "Up to 5 family members",
      "Multi-diet meal planning",
      "Shared inventory sync",
      "Auto portion scaling",
      "Weekly meal reports",
      "Family shopping lists",
    ],
    cta: "Join Waitlist",
    highlighted: false,
  },
];

