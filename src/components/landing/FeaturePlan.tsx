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

