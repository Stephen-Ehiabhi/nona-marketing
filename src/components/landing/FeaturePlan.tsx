"use client";

import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import PlanScreen from "./screens/PlanScreen";

export default function FeaturePlan() {
  return (
    <section className="bg-cream py-20 md:py-32 relative overflow-hidden">
      <div className="glow-orange absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: "perspective(1000px) rotateY(6deg) rotateX(2deg)" }}
          >
            <PhoneMockup>
              <PlanScreen />
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
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-burnt-orange bg-burnt-orange/8 px-3 py-1.5 rounded-full">
              Smart Planning
            </span>
            <h2 className="mt-5 font-serif text-[1.75rem] md:text-[2.25rem] font-bold leading-[1.15] text-warm-dark">
              A week of meals.
              <br />
              <span className="text-warm-400">Planned in seconds.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-warm-500">
              Nona auto-generates a full weekly meal plan based on what&apos;s
              in your kitchen, your dietary preferences, and what needs to be
              used first. Swap any meal with a tap. Get notified when it&apos;s
              time to start cooking.
            </p>
            <div className="mt-6 space-y-3">
