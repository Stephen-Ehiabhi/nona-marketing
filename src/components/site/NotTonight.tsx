"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photo, type PhotoKey } from "@/lib/photos";
import { AccentDot, Eyebrow, Icon, Reveal, EASE } from "./ui";

type Dish = { name: string; key: PhotoKey; why: string; shop?: string };

const START: Dish = { name: "Egusi with pounded yam", key: "egusi", why: "" };

const REASONS: { label: string; alts: Dish[] }[] = [
  {
    label: "Too tired",
    alts: [
      { name: "Leftover jollof", key: "jollof", why: "Ready in 10 min · from Sunday" },
      { name: "Dodo and eggs", key: "plantain", why: "15 min · one pan" },
      { name: "Rice with chicken skewers", key: "friedRice", why: "Uses cooked rice" },
    ],
  },
  {
    label: "Something lighter",
    alts: [
      { name: "Catfish pepper soup", key: "pepperSoup", why: "Light and warming · 35 min" },
      { name: "Żurek", key: "zurek", why: "From Saturday's batch" },
      { name: "Zupa pomidorowa", key: "pomidorowa", why: "Light · uses the tomatoes" },
    ],
  },
  {
    label: "Not in the mood",
    alts: [
      { name: "Pierogi ruskie", key: "pierogi", why: "Comfort food · from the freezer" },
      { name: "Suya with salad", key: "suya", why: "Nut-free for Tobi · 30 min" },
      { name: "Beef stew with rice", key: "beefStew", why: "From Sunday's batch" },
    ],
  },
  {
    label: "Missing an item",
    alts: [
      { name: "Beef stew with rice", key: "beefStew", why: "Everything's at home" },
      { name: "Party jollof", key: "jollof", why: "Everything's at home" },
      { name: "Roasted yam with egg sauce", key: "yam", why: "Everything's at home" },
    ],
  },
  {
    label: "Craving something",
    alts: [
      { name: "Suya skewers", key: "suya", why: "Smoky and spicy", shop: "+1 item: red onions" },
      { name: "Party jollof", key: "jollof", why: "Saturday-night energy" },
      { name: "Dodo", key: "plantain", why: "Sweet, ripe plantain" },
    ],
  },
];

const UNDO_MS = 8000;

export default function NotTonight() {
  const [dish, setDish] = useState<Dish>(START);
  const [sheet, setSheet] = useState(false);
  const [reason, setReason] = useState<number | null>(null);
  const [pick, setPick] = useState(0);
  const [scope, setScope] = useState<"tonight" | "weekly">("tonight");
  const [toast, setToast] = useState<{ from: Dish; to: Dish } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const alts = reason === null ? [] : REASONS[reason].alts;
  const chosen = alts[pick];

  const confirm = () => {
    if (!chosen) return;
    const from = dish;
    setDish(chosen);
    setSheet(false);
    setReason(null);
    setPick(0);
    setToast({ from, to: chosen });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), UNDO_MS);
  };

  const undo = () => {
    if (!toast) return;
    setDish(toast.from);
    setToast(null);
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <section id="not-tonight" className="bg-card py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>Plans change</Eyebrow>
          <h2 className="display h-section mt-4 font-bold">
            Not tonight? <span className="accent-word">No problem.</span>
          </h2>
          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-ink2">
            Tired, craving something, or out of onions — tell Kusin why and it offers three dishes
            that fit, using what&apos;s already at home. Nothing changes until you say so, and you
            can always undo.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Reasons, not rules — no judgement, ever",
              "Three alternatives that use what you have",
              "Just tonight, or every week from now on",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-ink">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-soft text-forest">
                  <Icon name="check" size={15} strokeWidth={2} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] text-ink3">Try it — this one works.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto h-[680px] w-full max-w-[460px] overflow-hidden rounded-[32px] bg-ink shadow-[0_40px_80px_-30px_rgba(15,14,13,0.45)]">
            <AnimatePresence initial={false}>
              <motion.img
                key={dish.name}
                src={photo(dish.key, 1000)}
                alt={dish.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,14,13,0.75)_0%,rgba(15,14,13,0.1)_55%,rgba(15,14,13,0.3)_100%)]" />

            {/* Suggestion card */}
            <div className="absolute inset-x-4 bottom-4">
              <div className="glass-dark rounded-[26px] p-5 text-white">
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                  <AccentDot /> Tonight&apos;s dinner · for 4
                </span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={dish.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="display mt-2.5 text-[22px] font-semibold leading-tight tracking-[-0.01em]"
                  >
                    {dish.name}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-4 flex gap-2">
                  <span className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-forest text-[14px] font-semibold tracking-[0.02em]">
                    <Icon name="chefHat" size={18} /> Cook now
                  </span>
                  <button
                    onClick={() => setSheet(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 text-[14px] font-semibold tracking-[0.02em] transition-colors hover:bg-white/20"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>

            {/* Undo toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-x-4 top-4 overflow-hidden rounded-[18px] bg-ink text-white shadow-[0_12px_30px_rgba(15,14,13,0.35)]"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-[13.5px] font-medium">Swapped to {toast.to.name}</span>
                    <button
                      onClick={undo}
                      className="flex items-center gap-1.5 text-[13.5px] font-semibold text-sage"
                    >
                      <Icon name="undo" size={15} /> Undo
                    </button>
                  </div>
                  <motion.div
                    className="h-[3px] origin-left bg-sage"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: UNDO_MS / 1000, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Not-now sheet */}
            <AnimatePresence>
              {sheet && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSheet(false)}
                    className="absolute inset-0 bg-ink/40"
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 32, stiffness: 300 }}
                    className="absolute inset-x-0 bottom-0 max-h-[92%] overflow-y-auto rounded-t-[28px] bg-paper p-5 pb-6"
                  >
                    <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="display text-[22px] font-bold leading-tight">Not tonight? No problem.</p>
                        <p className="mt-1 text-[13.5px] text-ink2">What&apos;s up?</p>
                      </div>
                      <button
                        onClick={() => setSheet(false)}
                        aria-label="Close"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink"
                      >
                        <Icon name="x" size={16} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {REASONS.map((r, n) => (
                        <button
                          key={r.label}
                          onClick={() => {
                            setReason(n);
                            setPick(0);
                          }}
                          className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                            reason === n
                              ? "border-forest bg-forest text-white"
                              : "border-line bg-card text-ink hover:border-ink/25"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {reason !== null && (
                        <motion.div
                          key={reason}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <div className="mt-4 overflow-hidden rounded-[20px] border border-line bg-card">
                            {alts.map((a, n) => (
                              <button
                                key={a.name}
                                onClick={() => setPick(n)}
                                className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors ${
                                  n > 0 ? "border-t border-line" : ""
                                } ${pick === n ? "bg-forest-soft/60" : "hover:bg-paper"}`}
                              >
                                <img
                                  src={photo(a.key, 200)}
                                  alt=""
                                  className="h-12 w-12 shrink-0 rounded-[14px] object-cover"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[14px] font-semibold leading-tight">{a.name}</span>
                                  <span className="block truncate text-[12.5px] text-ink3">{a.why}</span>
                                </span>
                                <span
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                    pick === n ? "border-forest bg-forest text-white" : "border-line"
                                  }`}
                                >
                                  {pick === n && <Icon name="check" size={13} strokeWidth={2.4} />}
                                </span>
                              </button>
                            ))}
                          </div>

                          <div className="mt-4 flex rounded-full bg-surface p-1">
                            {(
                              [
                                ["tonight", "Just tonight"],
                                ["weekly", "Every Wednesday"],
                              ] as const
                            ).map(([v, l]) => (
                              <button
                                key={v}
                                onClick={() => setScope(v)}
                                className={`h-9 flex-1 rounded-full text-[13px] font-medium transition-all ${
                                  scope === v ? "bg-card text-ink shadow-[0_2px_8px_rgba(15,14,13,0.08)]" : "text-ink2"
                                }`}
                              >
                                {l}
                              </button>
                            ))}
                          </div>

                          <p className="mt-3 flex items-center gap-2 text-[12.5px] text-ink2">
                            <Icon name="bag" size={14} className="text-forest" />
                            {chosen?.shop ?? "Nothing to buy — it's all at home"}
                          </p>

                          <div className="sticky -bottom-6 -mx-5 -mb-6 mt-2 bg-[linear-gradient(0deg,#f7f5f2_75%,rgba(247,245,242,0))] px-5 pb-6 pt-4">
                            <button
                              onClick={confirm}
                              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-[14px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-forest-deep"
                            >
                              Swap to {chosen?.name}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
