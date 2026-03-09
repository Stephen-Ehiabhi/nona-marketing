"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white hero-gradient">
      {/* Decorative elements */}
      <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-gray-300 animate-float-slow" />
      <div className="absolute top-40 right-[15%] w-1.5 h-1.5 rounded-full bg-gray-200 animate-float delay-300" />
      <div className="absolute top-60 left-[5%] w-3 h-3 rounded-full bg-gray-100 animate-float-slow delay-500" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-28 pb-12 md:pt-36 md:pb-20 lg:pt-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Left: Copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-xl lg:flex-shrink-0">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-500 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
              </span>
              Now in private beta
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 mt-8 font-serif text-[44px] leading-[1.08] font-extrabold tracking-tight md:text-[56px] lg:text-[64px]">
              Open the fridge.
              <br />
              <span className="text-gray-300">Know what to make.</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up delay-200 mt-7 max-w-md text-[15px] leading-[1.7] text-gray-500 md:text-base">
              Nona sees what&apos;s in your kitchen, plans your meals around it,
              and walks you through every step. Less waste. Better food. Zero guesswork.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-in-up delay-300 mt-9 flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
              <a
                href="#download"
                className="group inline-flex items-center justify-center h-[52px] px-8 bg-black text-white text-[14px] font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5"
              >
                Get Early Access
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-[52px] px-8 border border-gray-200 text-[14px] font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                Watch It Work
              </a>
            </div>

