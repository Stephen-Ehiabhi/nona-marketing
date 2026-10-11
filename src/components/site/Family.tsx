"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { motion } from "framer-motion";
import { photo } from "@/lib/photos";
import { Eyebrow, Icon, type IconName, Reveal } from "./ui";

const PEOPLE = [
  { name: "Ada", role: "Mum" },
  { name: "Alex", role: "Dad" },
  { name: "Grandma", role: "Low salt" },
  { name: "Tobi", role: "No nuts" },
];

const POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Portions that add up",
    body: "Kusin scales every recipe to who's actually eating, and saves the rest for tomorrow's lunch.",
  },
  {
    icon: "shield",
    title: "Allergies, enforced",
    body: "Set once per person. Every recipe, swap and suggestion is checked, ingredient by ingredient.",
  },
  {
    icon: "heart",
    title: "Gentle care for new mums",
    body: "Opt in for postpartum and breastfeeding support: steady energy, iron and protein, private to her.",
  },
];

export default function Family() {
  const [eating, setEating] = useState([true, true, true, true]);
  const count = eating.filter(Boolean).length;
  const out = PEOPLE.filter((_, n) => !eating[n]).map((p) => p.name);

  return (
    <section id="family" className="px-3 md:px-4">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-ink">
        <img
          src={photo("tableSpread", 2200)}
          alt="A table laid with several home-cooked dishes"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,14,13,0.86)_0%,rgba(15,14,13,0.66)_50%,rgba(15,14,13,0.5)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(15,14,13,0.85)_0%,rgba(15,14,13,0)_50%)]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-20 md:px-12 md:pb-14 md:pt-28">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <Reveal>
              <Eyebrow tone="light">Everyone at the table</Eyebrow>
              <h2 className="display h-feature mt-4 font-bold text-white">
                One kitchen. <span className="accent-word-light">Every</span> plate.
              </h2>
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-white/80">
                Add who eats at home once. Kusin plans for each of them — tastes, allergies, stage of
                life — and knows when someone&apos;s not eating tonight.
              </p>
            </Reveal>

            {/* Who's eating — tap to try */}
            <Reveal delay={0.1}>
              <div className="glass-dark rounded-[28px] bg-[rgba(15,14,13,0.55)] p-5 text-white md:p-6">
                <div className="flex items-center justify-between">
                  <p className="display text-[18px] font-semibold">Who&apos;s eating tonight</p>
                  <span className="rounded-full bg-white/12 px-3 py-1 text-[12.5px] font-medium text-white/85">
                    {count} of 4
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-4 gap-3">
                  {PEOPLE.map((p, n) => {
                    const on = eating[n];
                    return (
                      <button
                        key={p.name}
                        onClick={() => setEating((e) => e.map((v, k) => (k === n ? !v : v)))}
                        aria-pressed={on}
                        className="group flex flex-col items-center gap-2"
                      >
                        <motion.span
                          animate={{ opacity: on ? 1 : 0.35 }}
                          transition={{ duration: 0.3 }}
                          className={`relative flex aspect-square w-full max-w-[64px] items-center justify-center rounded-[18px] bg-[linear-gradient(160deg,#3a3734,#1f1d1b)] text-[22px] font-semibold ${
                            on ? "ring-2 ring-sage ring-offset-2 ring-offset-[#1b1a18]" : ""
                          }`}
                        >
                          {p.name[0]}
                          <span
                            className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1b1a18] ${
                              on ? "bg-forest" : "bg-[#55514d]"
                            }`}
                          >
                            {on ? <Icon name="check" size={11} strokeWidth={3} /> : <Icon name="x" size={10} strokeWidth={3} />}
                          </span>
                        </motion.span>
                        <span className="text-center leading-tight">
                          <span className="block text-[13px] font-medium text-white/90">{p.name}</span>
                          <span className="block text-[11px] text-white/50">{p.role}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-[18px] bg-white/8 px-4 py-3 text-[13.5px] leading-relaxed text-white/85">
                  {count === 0 ? (
                    "Nobody home tonight? Kusin moves dinner to tomorrow."
                  ) : (
                    <>
                      Portions for {count}
                      {out.length > 0 && <> · {out.join(" and ")} {out.length > 1 ? "are" : "is"} out — leftovers saved</>}
                      {eating[3] && <> · nut-free for Tobi</>}
                      {eating[0] && <> · iron + protein for Ada</>}
                    </>
                  )}
                </div>
                <p className="mt-3 text-[12px] text-white/50">Tap a person to mark them out.</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {POINTS.map((p, n) => (
              <Reveal key={p.title} delay={n * 0.1} className={n === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10 text-white">
                  <Icon name={p.icon} size={20} />
                </span>
                <p className="display mt-4 text-[20px] font-semibold text-white">{p.title}</p>
                <p className="mt-2 max-w-[340px] text-[14.5px] leading-[1.6] text-white/70">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
