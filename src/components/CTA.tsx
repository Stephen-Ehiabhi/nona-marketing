"use client";

import { useReveal } from "@/hooks/useReveal";

export default function CTA() {
  useReveal();

  return (
    <section id="download" className="bg-black text-white py-24 md:py-36 relative overflow-hidden">
      {/* Large decorative circles */}
      <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full border border-white/[0.04]" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full border border-white/[0.04]" />
      <div className="absolute top-20 right-20 w-48 h-48 rounded-full border border-white/[0.03] hidden md:block" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border border-white/[0.03] hidden md:block" />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-white/10 animate-float" />
      <div className="absolute top-1/3 right-[20%] w-2 h-2 rounded-full bg-white/10 animate-float-slow delay-300" />
      <div className="absolute bottom-1/3 left-[25%] w-1 h-1 rounded-full bg-white/10 animate-float delay-500" />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
            <span className="w-8 h-px bg-gray-700" />
            Get Started
            <span className="w-8 h-px bg-gray-700" />
          </span>

          <h2 className="font-serif text-[36px] md:text-[56px] font-extrabold leading-[1.1]">
            Tonight could be
            <br />
            <span className="text-gray-500">the last night you wonder.</span>
          </h2>

