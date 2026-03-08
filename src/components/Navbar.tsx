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

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-5 py-6 flex flex-col gap-1">
          {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center h-12 px-6 bg-black text-white text-base font-semibold rounded-full"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </nav>
  );
}
