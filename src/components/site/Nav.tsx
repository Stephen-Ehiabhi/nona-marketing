"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSignupModal } from "../SignupModal";
import { Icon, KusinLogo, EASE } from "./ui";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The week", href: "#week" },
  { label: "Family", href: "#family" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const { open } = useSignupModal();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the hero photo the bar is white-on-photo; once scrolled it becomes
  // a floating paper capsule, like the app's tab bar.
  const solid = scrolled || menu;

  return (
    <header data-site-nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <motion.nav
        initial={false}
        animate={{
          maxWidth: solid ? 1120 : 1480,
          marginTop: solid ? 4 : 0,
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`mx-auto flex h-16 items-center justify-between rounded-full transition-[background,box-shadow,color,border,padding] duration-300 ${
          solid
            ? "glass-paper pl-5 pr-2 text-ink shadow-[0_12px_32px_-12px_rgba(15,14,13,0.18)] md:pl-7"
            : "border border-transparent pl-6 pr-3 text-white md:pl-12 md:pr-10 lg:pl-16 lg:pr-14"
        }`}
      >
        <a href="#top" className="flex items-center" aria-label="Kusin home">
          <KusinLogo height={20} />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[14px] font-medium tracking-[0.01em] transition-colors ${
                solid ? "text-ink2 hover:bg-surface hover:text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className={`hidden h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold tracking-[0.02em] transition-colors sm:inline-flex ${
              solid ? "bg-forest text-white hover:bg-forest-deep" : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Join the beta
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            className={`flex h-12 w-12 items-center justify-center rounded-full md:hidden ${
              solid ? "bg-surface text-ink" : "glass text-white"
            }`}
          >
            <Icon name={menu ? "x" : "menu"} size={20} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass-paper mx-auto mt-2 max-w-[1120px] rounded-[28px] p-3 shadow-[0_24px_48px_-16px_rgba(15,14,13,0.25)] md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-medium text-ink hover:bg-surface"
              >
                {l.label}
                <Icon name="arrowRight" size={16} className="text-ink3" />
              </a>
            ))}
            <button
              onClick={() => {
                setMenu(false);
                open();
              }}
              className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-forest text-[15px] font-semibold tracking-[0.02em] text-white"
            >
              Join the beta
              <Icon name="arrowRight" size={16} strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
