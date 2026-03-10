"use client";

import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import CookScreen from "./screens/CookScreen";

export default function FeatureCook() {
  return (
    <section id="how-it-works" className="bg-forest py-20 md:py-32 relative overflow-hidden grain">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-white/[0.03]" style={{ transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-white/[0.04]" style={{ transform: "translate(-30%, 30%)" }} />

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
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-sage-light bg-white/8 px-3 py-1.5 rounded-full">
              Guided Cooking
            </span>
            <h2 className="mt-5 font-serif text-[1.75rem] md:text-[2.25rem] font-bold leading-[1.15] text-cream">
              You cook.
              <br />
              <span className="text-sage">Nona guides.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-sage">
              Voice-guided step-by-step cooking. Hands covered in flour? Just say &ldquo;next step.&rdquo;
              Built-in timers, technique explainers, and real-time inventory updates.
              When you use an ingredient, your pantry decrements automatically.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Voice-controlled, totally hands-free",
                "Inventory auto-decrements as you cook",
                "Substitution suggestions when you\u2019re out of something",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-warm-gold flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-sage-light">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2"
            style={{ transform: "perspective(1000px) rotateY(-4deg) rotateX(5deg)" }}
          >
            <PhoneMockup>
              <CookScreen />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
