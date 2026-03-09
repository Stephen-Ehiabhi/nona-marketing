"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import StoreBadges from "./StoreBadges";

const wordReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const wordChild = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.1]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const line1Words = ["Tell", "it", "what"];
  const line2Words = ["you", "like."];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      {/* Landscape video (desktop) */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source src="/welcome_bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Portrait video (mobile) */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      >
        <source src="/welcome_bg_portrait.mp4" type="video/mp4" />
      </motion.video>

      {/* Multi-layer gradient */}
      <motion.div
        style={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <div className="h-20" />

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 pt-8 md:pt-16 lg:pt-20">
          {/* Copy */}
          <div className="flex-1 flex flex-col justify-center lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-[11px] font-semibold text-white/50 uppercase tracking-[0.15em]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                AI-Powered Kitchen Companion
              </span>
            </motion.div>

            {/* Word-by-word clip reveal */}
            <motion.h1
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="font-serif font-bold text-white text-[2.75rem] leading-[1] md:text-[4rem] lg:text-[5rem]"
            >
              <span className="block overflow-hidden">
                {line1Words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordChild}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {line2Words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordChild}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[16px] md:text-[17px] leading-[1.7] text-white/60 max-w-[440px]"
            >
              Pick your cuisines, set your diet, scan the kitchen. Nona plans
              every meal of the week — breakfast, lunch, dinner — and walks you through cooking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <StoreBadges theme="dark" />
              <p className="mt-4 text-[12px] text-white/30">
                Free to download. No credit card required.
              </p>
            </motion.div>
          </div>

          {/* Phone — floating with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 120, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: phoneY, scale: phoneScale, rotate: phoneRotate }}
            className="flex-shrink-0 flex justify-center lg:justify-end mt-12 lg:mt-0 pb-16 md:pb-20"
          >
            <div className="phone-float relative">
              <Image
                src="/mockups/iphone17-black-home.png"
                alt="Nona app — personalized meal planning"
                width={1350}
                height={2760}
                unoptimized
                className="w-[300px] md:w-[380px] lg:w-[420px] h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                priority
              />
              {/* Reflection glow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-white/[0.04] rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
