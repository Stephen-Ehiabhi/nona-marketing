"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stories = [
  {
    quote: "I wake up and breakfast is already planned. Nigerian eggs this morning, 15 minutes, 620 cal. I just tap Start cooking and follow the steps. I haven\u2019t thought about what to eat in weeks.",
    detail: "The weekly plan feature changed everything for me.",
    name: "Kasia M.",
    context: "Product manager, Warsaw",
  },
  {
    quote: "I set my cuisines to Polish and Mediterranean, my wife set hers to Asian. Nona finds meals we both love from the same fridge. We\u2019re on a 14-day cooking streak.",
    detail: "",
    name: "Tomek R.",
    context: "Father of two, Krak\u00f3w",
  },
  {
    quote: "I scan groceries as I unpack them. Nona knows exactly what I have and builds meals around what\u2019s expiring first. I haven\u2019t thrown food away in a month.",
    detail: "",
    name: "Marek S.",
    context: "Student, Wroc\u0142aw",
  },
  {
    quote: "The cooking mode is why I stopped ordering delivery. Step-by-step, with timers that just work. I made Pan-Seared Chicken last night and it came out perfect. Me! Cooking!",
    detail: "",
    name: "Ania K.",
    context: "Fitness coach, Gda\u0144sk",
  },
];

const stats = [
  { num: 21, suffix: "", label: "meals planned per week" },
  { num: 3, suffix: "", label: "scan modes" },
  { num: 7, suffix: "-day", label: "meal plans" },
  { num: 20, suffix: "+", label: "cuisines" },
];

