"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.04] py-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <a href="#" className="group">
            <span className="font-serif text-[18px] font-bold tracking-[-0.03em] text-white/80 group-hover:text-white transition-colors duration-300">
              nona<span className="inline-block w-[4px] h-[4px] rounded-full bg-white/50 ml-[2px] mb-[4px] group-hover:bg-white/70 transition-colors duration-300" />
            </span>
          </a>

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
                className="text-[12px] text-white/50 hover:text-white/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} Nona. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
