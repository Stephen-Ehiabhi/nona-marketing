"use client";

import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import ShoppingScreen from "./screens/ShoppingScreen";

export default function FeatureShoppingList() {
  return (
    <section className="bg-cream-dark py-20 md:py-32 relative overflow-hidden">
      <div className="glow-green absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: "perspective(1000px) rotateY(10deg) rotateX(-2deg)" }}
          >
            <PhoneMockup>
              <ShoppingScreen />
            </PhoneMockup>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-lg"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-forest bg-sage-light px-3 py-1.5 rounded-full">
              Smart Shopping
            </span>
            <h2 className="mt-5 font-serif text-[1.75rem] md:text-[2.25rem] font-bold leading-[1.15] text-warm-dark">
              The shopping list
              <br />
              <span className="text-warm-400">that writes itself.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-warm-500">
              When your inventory runs low, Nona generates a smart shopping list
              based on your upcoming meal plan. Organized by store aisle.
              Shared with your household automatically. No more forgotten ingredients.
            </p>
            <div className="mt-6 space-y-3">
