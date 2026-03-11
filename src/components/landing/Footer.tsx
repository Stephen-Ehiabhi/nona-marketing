"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.04] py-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/app-icon-512.png"
              alt="Nona"
              width={22}
              height={22}
              className="rounded-md"
            />
            <span className="font-serif text-[15px] font-bold text-white/60">nona</span>
          </div>

