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

