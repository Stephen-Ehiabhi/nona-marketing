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

            {/* Social proof */}
            <div className="animate-fade-in-up delay-400 mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["MK", "TW", "AS", "JN", "PD"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Trusted by 500+ early testers
                </p>
              </div>
            </div>
          </div>

          {/* Right: Phone mockups with real screenshots */}
          <div className="animate-fade-in-up delay-500 mt-14 lg:mt-0 flex justify-center lg:justify-end relative">
            {/* Floating badges around phone */}
            <div className="absolute -left-4 top-[15%] z-20 animate-float hidden md:block">
              <div className="glass-card rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-lg">
                  🥦
                </div>
                <div>
                  <p className="text-[11px] font-semibold">Broccoli detected</p>
                  <p className="text-[10px] text-gray-400">Fresh &bull; ~300g</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-[35%] z-20 animate-float delay-300 hidden md:block">
              <div className="glass-card rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-lg">
                  🧀
                </div>
                <div>
                  <p className="text-[11px] font-semibold">Cheddar cheese</p>
                  <p className="text-[10px] text-gray-400">Exp. in 5 days</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-[25%] z-20 animate-float delay-500 hidden md:block">
              <div className="glass-card rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-semibold">12 items scanned</p>
                </div>
              </div>
            </div>

            {/* iPhone 17 Pro with real screenshot */}
            <div className="phone-frame w-[280px] md:w-[300px]">
              <div className="phone-screen">
                <Image
                  src="/screenshots/home.png"
                  alt="Nona app home screen showing personalized meal recommendations"
                  width={500}
                  height={1088}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up delay-700 mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            { value: "3x", label: "meals planned daily" },
            { value: "40%", label: "less food thrown out" },
            { value: "<2min", label: "from scan to dinner plan" },
          ].map((stat, i) => (
            <div key={i} className="text-center py-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="font-serif text-2xl font-extrabold md:text-3xl">{stat.value}</p>
              <p className="mt-1.5 text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
    </section>
  );
}
