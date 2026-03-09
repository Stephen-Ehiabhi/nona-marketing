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

          <p className="mt-6 text-[15px] md:text-base text-gray-400 leading-[1.7] max-w-md mx-auto">
            No more staring at the fridge. No more wasted food. No more
            &ldquo;let&apos;s just order in.&rdquo; Nona makes home cooking
            the easy option again.
          </p>
        </div>

        {/* Email capture */}
        <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-[52px] flex-1 rounded-full border border-gray-700 bg-white/5 px-6 text-[14px] text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 focus:bg-white/10 transition-all duration-300"
          />
          <button className="h-[52px] rounded-full bg-white px-8 text-[14px] font-semibold text-black hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 whitespace-nowrap">
            Join Waitlist
          </button>
        </div>

        <p className="reveal mt-4 text-[12px] text-gray-600">
          Free forever on the starter plan. No credit card. Unsubscribe whenever.
        </p>

        {/* Trust indicators */}
        <div className="reveal mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
              text: "End-to-end encrypted",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              text: "GDPR compliant",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ),
              text: "Cancel anytime",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-gray-500">
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[12px] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
