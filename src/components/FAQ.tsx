"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    question: "Does the scanning actually work on real, messy fridges?",
    answer:
      "Yes — that was the whole point. It handles half-open bags, stacked containers, and that jar of something behind the milk. You take a photo, Nona identifies what it sees and estimates quantities. It's not perfect 100% of the time, but you can tap to correct anything and it learns your kitchen over time.",
  },
  {
    question: "What if I'm vegan / keto / gluten-free / halal?",
    answer:
      "Nona asks about your dietary needs during setup and never forgets. It supports every major diet and 20+ cuisine types. If your household has mixed diets — say, one person is dairy-free and another is a picky omnivore — Nona handles that too, suggesting meals with smart variations.",
  },
  {
    question: "Can my partner / family use it too?",
    answer:
      "On the Family plan, up to 5 people share one kitchen with their own taste profiles and dietary needs. Everyone sees the same inventory, but gets recommendations tuned to their preferences. One person cooks, the whole household benefits.",
  },
  {
    question: "How much food waste will I actually save?",
    answer:
      "Our beta users report around 40% less food thrown away in the first month. The trick is simple: Nona knows what's expiring and builds meals around it. No more discovering a sad avocado you forgot about three weeks ago.",
  },
  {
    question: "I can barely boil an egg. Is this for me?",
    answer:
      "Especially for you. Cooking mode breaks every recipe into dead-simple steps, explains techniques as you go, handles timers automatically, and lets you ask questions by voice. Think of it as a patient friend who happens to be a great cook, standing in your kitchen.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted and stored securely. We don't sell it, share it, or use it for anything except making Nona better for you. We're fully GDPR compliant. You can export or delete your data at any time.",
  },
  {
    question: "When can I get it?",
    answer:
      "We're in private beta right now with 500+ users. Join the waitlist and we'll let you in as soon as a spot opens. Early members lock in a founding discount that never expires — even after we launch publicly.",
  },
];

