"use client";

import { motion } from "framer-motion";
import StoreBadges from "./StoreBadges";

export default function CTA() {
  return (
    <section id="beta-signup" className="bg-black py-16 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-5 md:px-8 text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[1.75rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-white leading-[1.1]"
        >
          Tomorrow morning, breakfast will be waiting.
        </motion.p>

        <p className="mt-5 text-[15px] md:text-[16px] text-white/40 leading-[1.7] max-w-md mx-auto">
          Tell Nona what you like. It plans every meal, every day, from what&apos;s already in your kitchen.
        </p>

        <div className="mt-8 flex justify-center">
          <StoreBadges theme="dark" />
        </div>

        <p className="mt-4 text-[12px] text-white/20">
          Free to download. No credit card required.
        </p>

        <div className="mt-8 md:mt-14 flex items-center justify-center gap-4 md:gap-8 text-[11px] md:text-[12px] text-white/20">
          <span>End-to-end encrypted</span>
          <span className="w-px h-3 bg-white/10" />
