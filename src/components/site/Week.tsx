"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photo, type PhotoKey } from "@/lib/photos";
import { Chip, Eyebrow, Icon, Reveal, EASE } from "./ui";

type Meal = { name: string; key: PhotoKey; mins: number; why: string[] };
type Slot = "Breakfast" | "Lunch" | "Dinner";
const SLOTS: Slot[] = ["Breakfast", "Lunch", "Dinner"];

const DAYS = [
  { day: "Mon", full: "Monday", date: 12 },
  { day: "Tue", full: "Tuesday", date: 13 },
  { day: "Wed", full: "Wednesday", date: 14 },
  { day: "Thu", full: "Thursday", date: 15 },
  { day: "Fri", full: "Friday", date: 16 },
  { day: "Sat", full: "Saturday", date: 17 },
  { day: "Sun", full: "Sunday", date: 18 },
];

const M = {
  ogi: { name: "Ogi with akara", key: "ogi", mins: 25, why: ["Beans at home", "Grandma's favourite"] },
  dodo: { name: "Dodo and eggs", key: "plantain", mins: 15, why: ["Ripe plantain · use first"] },
  yam: { name: "Roasted yam with egg sauce", key: "yam", mins: 25, why: ["Yam · use by Thu", "Steady energy"] },
  jollofLeft: { name: "Leftover jollof", key: "jollof", mins: 10, why: ["From Sunday", "No cooking"] },
  zurek: { name: "Żurek", key: "zurek", mins: 15, why: ["Batch from Saturday"] },
  pomidorowa: { name: "Zupa pomidorowa", key: "pomidorowa", mins: 30, why: ["Uses tomatoes · expire Wed", "Kids' favourite"] },
  friedRice: { name: "Rice with chicken skewers", key: "friedRice", mins: 40, why: ["Uses cooked rice", "Packs for lunch"] },
  egusi: { name: "Egusi with pounded yam", key: "egusi", mins: 45, why: ["Uses spinach · expires Tue", "Mum: iron + protein"] },
  pierogi: { name: "Pierogi ruskie", key: "pierogi", mins: 60, why: ["Twaróg expires Wed", "Freezes well"] },
  pepper: { name: "Catfish pepper soup", key: "pepperSoup", mins: 35, why: ["Light and warming", "Uses 3 items expiring"] },
  stew: { name: "Beef stew with rice", key: "beefStew", mins: 60, why: ["Batch-friendly", "Covers Friday lunch"] },
  suya: { name: "Suya with salad", key: "suya", mins: 30, why: ["Nut-free yaji for Tobi", "Dad's pick"] },
  jollof: { name: "Party jollof with plantain", key: "jollof", mins: 50, why: ["Feeds 4, plus lunch"] },
  ramen: { name: "Shoyu ramen", key: "ramen", mins: 30, why: ["Uses the eggs", "Kids' favourite"] },
  tacos: { name: "Chicken tacos", key: "tacos", mins: 30, why: ["Chicken thighs at home", "Build your own"] },
  spaghetti: { name: "Spaghetti al pomodoro", key: "spaghetti", mins: 20, why: ["Tomatoes need using", "One pot"] },
  biryani: { name: "Chicken biryani", key: "biryani", mins: 60, why: ["Batch-friendly", "Covers Friday lunch"] },
  padKraPao: { name: "Pad kra pao", key: "padKraPao", mins: 20, why: ["Quick weeknight", "Mild for Grandma"] },
} satisfies Record<string, Meal>;

const PLAN: Record<Slot, Meal>[] = [
  { Breakfast: M.ogi, Lunch: M.jollofLeft, Dinner: M.egusi },
  { Breakfast: M.yam, Lunch: M.zurek, Dinner: M.ramen },
  { Breakfast: M.dodo, Lunch: M.pomidorowa, Dinner: M.pepper },
  { Breakfast: M.ogi, Lunch: M.friedRice, Dinner: M.biryani },
  { Breakfast: M.dodo, Lunch: M.spaghetti, Dinner: M.tacos },
  { Breakfast: M.ogi, Lunch: M.friedRice, Dinner: M.jollof },
  { Breakfast: M.yam, Lunch: M.zurek, Dinner: M.pierogi },
];

const POOL: Record<Slot, Meal[]> = {
  Breakfast: [M.ogi, M.dodo, M.yam],
  Lunch: [M.jollofLeft, M.zurek, M.pomidorowa, M.friedRice, M.spaghetti],
  Dinner: [M.egusi, M.pierogi, M.pepper, M.stew, M.suya, M.jollof, M.ramen, M.tacos, M.biryani, M.padKraPao],
};

export default function Week() {
  const [day, setDay] = useState(2);
  const [plan, setPlan] = useState(PLAN);
  const [locked, setLocked] = useState<Record<string, boolean>>({ "6-Dinner": true });

  const isLocked = (d: number, s: Slot) => !!locked[`${d}-${s}`];
  const toggleLock = (s: Slot) =>
    setLocked((l) => ({ ...l, [`${day}-${s}`]: !l[`${day}-${s}`] }));

  const shuffle = () =>
    setPlan((p) =>
      p.map((meals, d) => {
        if (d !== day) return meals;
        const next = { ...meals };
        SLOTS.forEach((s) => {
          if (isLocked(d, s)) return;
          const pool = POOL[s].filter((m) => m.name !== meals[s].name);
          next[s] = pool[Math.floor(Math.random() * pool.length)];
        });
        return next;
      }),
    );

  const allLocked = SLOTS.every((s) => isLocked(day, s));

  return (
    <section id="week" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>The week</Eyebrow>
            <h2 className="display h-section mt-4 max-w-[720px] font-bold">
              Seven days, <span className="accent-word">planned</span> around what you have.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[340px] text-[16px] leading-[1.6] text-ink2">
              Tap a day. Lock what you love, then shuffle the rest — every change shows before it
              happens.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-12">
          <div className="rounded-[32px] border border-line bg-card p-4 md:p-7">
            {/* Day strip + shuffle */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:flex">
                {DAYS.map((d, n) => {
                  const on = n === day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => setDay(n)}
                      aria-pressed={on}
                      className={`relative flex h-[68px] w-full max-w-[52px] shrink-0 flex-col items-center justify-center justify-self-center rounded-[23px] transition-colors lg:w-[52px] ${
                        on ? "text-white" : "text-ink3 hover:bg-surface"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="day-capsule"
                          className="absolute inset-0 rounded-[23px] bg-[linear-gradient(180deg,#3e6e4b_0%,#2f5a3c_55%,#1f4029_100%)] shadow-[0_10px_22px_-8px_rgba(47,90,60,0.6)]"
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}
                      <span className="relative text-[12px] font-medium">{d.day}</span>
                      <span className={`tabular relative text-[18px] font-semibold ${on ? "" : "text-ink2"}`}>
                        {d.date}
                      </span>
                      <span className={`relative mt-0.5 h-1 w-1 rounded-full ${on ? "bg-white" : "bg-transparent"}`} />
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between gap-3 lg:justify-end">
                <span className="truncate text-[13px] text-ink3">
                  {DAYS[day].full}
                  <span className="hidden sm:inline"> · for 4</span>
                </span>
                <button
                  onClick={shuffle}
                  disabled={allLocked}
                  className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-surface px-5 text-[14px] font-semibold tracking-[0.02em] text-ink transition-colors hover:bg-[#e6e2dd] disabled:opacity-40"
                >
                  <Icon name="shuffle" size={17} />
                  Shuffle unlocked
                </button>
              </div>
            </div>

            {/* Meals */}
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {SLOTS.map((s) => {
                const meal = plan[day][s];
                const lock = isLocked(day, s);
                return (
                  <div key={s} className="overflow-hidden rounded-[24px] border border-line bg-paper md:flex lg:block">
                    <div className="relative h-56 overflow-hidden md:h-auto md:min-h-[210px] md:w-[44%] md:shrink-0 lg:h-60 lg:w-auto">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.img
                          key={meal.name + day}
                          src={photo(meal.key, 800)}
                          alt={meal.name}
                          loading="lazy"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(15,14,13,0.35),rgba(15,14,13,0))]" />
                      <span className="glass absolute left-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                        {s}
                      </span>
                      <button
                        onClick={() => toggleLock(s)}
                        aria-pressed={lock}
                        aria-label={lock ? `Unlock ${s.toLowerCase()}` : `Lock ${s.toLowerCase()}`}
                        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                          lock ? "bg-forest text-white" : "glass text-white hover:bg-white/30"
                        }`}
                      >
                        <Icon name={lock ? "lock" : "unlock"} size={17} />
                      </button>
                    </div>
                    <div className="p-4 md:flex md:flex-1 md:flex-col md:justify-center md:p-6 lg:block lg:p-5">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={meal.name + day}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <p className="display text-[19px] font-semibold leading-tight tracking-[-0.01em]">
                            {meal.name}
                          </p>
                          <div className="mt-2 flex items-center gap-3 text-[13px] text-ink3">
                            <span className="flex items-center gap-1.5">
                              <Icon name="clock" size={14} />
                              {meal.mins} min
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Icon name="users" size={14} />
                              For 4
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {meal.why.map((w) => (
                              <Chip key={w} tone={w.startsWith("Uses") || w.includes("use") ? "forest" : "surface"}>
                                {w}
                              </Chip>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-[13px] text-ink2 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <Icon name="fridge" size={16} className="text-forest" />
                Built from what&apos;s at home first, expiring items before anything else.
              </span>
              <span className="flex items-center gap-2">
                <Icon name="bag" size={16} className="text-forest" />
                What&apos;s missing goes on the shopping list, by store.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
