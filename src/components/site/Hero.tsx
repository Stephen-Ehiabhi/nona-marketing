"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSignupModal } from "../SignupModal";
import { photo, type PhotoKey } from "@/lib/photos";
import { AccentDot, Icon, EASE } from "./ui";

const SLIDES: {
  key: PhotoKey;
  dish: string;
  cuisine: string;
  why: string[];
  position?: string;
}[] = [
  {
    key: "pepperSoup",
    dish: "Catfish pepper soup with boiled yam",
    cuisine: "Nigerian",
    why: ["Uses 3 items expiring Tue", "Mum: iron + protein", "35 min"],
    position: "center 60%",
  },
  {
    key: "ramen",
    dish: "Shoyu ramen with soft eggs",
    cuisine: "Japanese",
    why: ["Eggs + spring onions at home", "Kids' favourite", "30 min"],
  },
  {
    key: "spaghetti",
    dish: "Spaghetti al pomodoro",
    cuisine: "Italian",
    why: ["Tomatoes need using", "One pot", "20 min"],
  },
  {
    key: "tacos",
    dish: "Chicken tacos with pickled onion",
    cuisine: "Mexican",
    why: ["Chicken thighs at home", "Build your own", "30 min"],
  },
];

const SLIDE_MS = 7000;

export default function Hero() {
  const { open } = useSignupModal();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, tick, reduce]);

  const go = (n: number) => {
    setI(n);
    setTick((t) => t + 1);
  };

  const s = SLIDES[i];

  return (
    <section id="top" className="px-3 pt-3 md:px-4 md:pt-4">
      <div className="relative isolate flex min-h-[calc(100svh-24px)] flex-col overflow-hidden rounded-[32px] bg-ink md:min-h-[min(calc(100svh-32px),1120px)]">
        {/* Photos */}
        <AnimatePresence initial={false}>
          <motion.div
            key={s.key}
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <img
              src={photo(s.key, 2000)}
              alt=""
              className="kenburns h-full w-full object-cover"
              style={{ objectPosition: s.position ?? "center" }}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
        {/* Preload the other slides */}
        <div className="hidden">
          {SLIDES.map((x) => (
            <img key={x.key} src={photo(x.key, 2000)} alt="" loading="lazy" />
          ))}
        </div>

        {/* Scrims: top for the nav, left and bottom for the copy */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,14,13,0.55)_0%,rgba(15,14,13,0)_22%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,14,13,0.78)_0%,rgba(15,14,13,0.45)_42%,rgba(15,14,13,0.05)_78%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(15,14,13,0.75)_0%,rgba(15,14,13,0)_45%)]" />
        <div className="absolute inset-0 -z-10 bg-ink/30 lg:hidden" />

        <div className="h-24 md:h-28" />

        <div className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-end gap-10 px-6 pb-6 md:px-12 md:pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:pb-14">
          {/* Copy */}
          <div className="max-w-[640px]">
            <span
              className="fade-up glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
              style={{ animationDelay: "0.1s" }}
            >
              <AccentDot />
              Free during the beta
            </span>

            {/* CSS-driven entrance so the headline shows before hydration. */}
            <h1 className="display h-hero mt-6 font-bold text-white">
              {["A friend", "in the"].map((line, n) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <span className="rise block" style={{ animationDelay: `${0.15 + n * 0.08}s` }}>
                    {line}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="rise accent-word-light block" style={{ animationDelay: "0.31s" }}>
                  kitchen.
                </span>
              </span>
            </h1>

            <p
              className="fade-up mt-6 max-w-[520px] text-[17px] leading-[1.55] text-white/80 md:text-[19px]"
              style={{ animationDelay: "0.5s" }}
            >
              Tell Kusin what your family loves, from jollof to ramen. It plans every meal
              around what&apos;s already at home and changes course when someone says not
              tonight.
            </p>

            <div
              className="fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.62s" }}
            >
              <button
                onClick={open}
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-forest px-7 text-[15px] font-semibold tracking-[0.02em] text-white shadow-[0_12px_30px_-10px_rgba(47,90,60,0.7)] transition-colors hover:bg-forest-deep sm:w-auto"
              >
                Join the beta
                <Icon name="arrowRight" size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#how"
                className="glass inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-white/25 sm:w-auto"
              >
                See how it works
              </a>
            </div>
            <p className="fade-up mt-4 text-[13px] text-white/55" style={{ animationDelay: "0.8s" }}>
              iPhone and Android · Cooking ideas, not medical advice
            </p>
          </div>

          {/* Tonight's suggestion, as the app shows it */}
          <div
            className="fade-up w-full max-w-[400px] shrink-0 md:self-end lg:self-auto"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="glass-dark rounded-[28px] p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                  <AccentDot />
                  Tonight&apos;s dinner
                </span>
                <span className="text-[12px] font-medium text-white/60">For 4 · {s.cuisine}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="display mt-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
                    {s.dish}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.why.map((w) => (
                      <span
                        key={w}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12.5px] font-medium leading-none"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex gap-2">
                <a
                  href="#how"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-forest text-[14px] font-semibold tracking-[0.02em] text-white"
                >
                  <Icon name="chefHat" size={18} />
                  Cook now
                </a>
                <a
                  href="#not-tonight"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 text-[14px] font-semibold tracking-[0.02em] text-white"
                >
                  Not now
                </a>
              </div>
            </div>

            {/* Slide picker */}
            <div className="mt-3 flex items-center justify-end">
              <div className="glass flex items-center gap-1.5 rounded-full p-1.5">
                {SLIDES.map((x, n) => (
                  <button
                    key={x.key}
                    onClick={() => go(n)}
                    aria-label={`Show ${x.dish}`}
                    aria-current={n === i}
                    className={`relative h-11 w-11 overflow-hidden rounded-full transition-[box-shadow,opacity] duration-300 ${
                      n === i ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={photo(x.key, 200)} alt="" className="h-full w-full object-cover" />
                    {n === i && !reduce && (
                      <motion.span
                        key={`${i}-${tick}`}
                        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
