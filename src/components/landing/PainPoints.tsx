"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  {
    text: "Three times a day, the same question: what should I eat? You open the fridge, stare for a minute, close it, open a delivery app. ",
    bold: "Every. Single. Day.",
  },
  {
    text: "You have food. You just don\u2019t know what to make with it. Googling recipes doesn\u2019t help because none of them match what\u2019s actually in your kitchen. ",
    bold: "Exhausting.",
  },
  {
    text: "Meanwhile, that chicken you bought Monday is going bad. The avocado you forgot. The yogurt pushed to the back. Nobody planned a meal around them. ",
    bold: "Wasted.",
  },
];

function PainLine({ line, index }: { line: typeof lines[0]; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

