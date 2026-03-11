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

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-[11px] text-white/15">
          &copy; {new Date().getFullYear()} Nona. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
