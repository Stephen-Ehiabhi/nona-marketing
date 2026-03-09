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

