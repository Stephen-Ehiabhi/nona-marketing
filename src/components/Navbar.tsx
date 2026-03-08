"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-extrabold tracking-tight">
          nona
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] font-medium text-gray-500 hover:text-black transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a
            href="#download"
            className="inline-flex items-center justify-center h-10 px-6 bg-black text-white text-[13px] font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5"
          >
            Get Early Access
          </a>
        </div>

