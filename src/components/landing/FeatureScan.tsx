"use client";

import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import ScanScreen from "./screens/ScanScreen";

export default function FeatureScan() {
  return (
    <section id="features" className="bg-cream-dark py-20 md:py-32 relative overflow-hidden">
      <div className="glow-green absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-lg order-2 md:order-1"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-forest bg-sage-light px-3 py-1.5 rounded-full">
              AI Scanning
            </span>
            <h2 className="mt-5 font-serif text-[1.75rem] md:text-[2.25rem] font-bold leading-[1.15] text-warm-dark">
              One photo.
              <br />
              <span className="text-warm-400">Your entire inventory.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-warm-500">
              Snap a photo of any shelf — fridge, pantry, countertop.
              Nona&apos;s AI identifies every ingredient, estimates quantities,
              and tracks expiry dates. Even the half-open bag hiding behind the milk.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Recognizes 2,000+ ingredients",
                "Auto-estimates quantities and freshness",
                "Learns your kitchen over time",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-warm-600">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2"
            style={{ transform: "perspective(1000px) rotateY(-8deg) rotateX(3deg)" }}
          >
            <PhoneMockup>
              <ScanScreen />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
