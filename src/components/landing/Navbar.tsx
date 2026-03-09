"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-8 h-16">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/app-icon-512.png"
            alt="Nona"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span
            className="font-serif text-lg font-bold tracking-tight text-white"
          >
            nona
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#beta-signup"
            className="inline-flex items-center justify-center h-9 px-5 text-[13px] font-semibold rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

