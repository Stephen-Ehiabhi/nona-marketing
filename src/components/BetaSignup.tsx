"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Icon, type IconName, KusinLogo, EASE } from "./site/ui";

interface BetaSignupProps {
  onComplete?: () => void;
}

const PRICE_OPTIONS = [
  { label: "Free only", value: "free" },
  { label: "10–20 zł", value: "10-20" },
  { label: "20–30 zł", value: "20-30" },
  { label: "30–50 zł", value: "30-50" },
  { label: "50+ zł", value: "50+" },
];

// `value` stays as it was stored before the rebrand so answers stay comparable.
const FEATURE_OPTIONS: { label: string; value: string; icon: IconName }[] = [
  { label: "Planning the week", value: "Meal planning", icon: "calendar" },
  { label: "Scanning receipts", value: "Kitchen scanning", icon: "receipt" },
  { label: "Cooking mode", value: "Cooking mode", icon: "chefHat" },
  { label: "Expiry reminders", value: "Expiry alerts", icon: "clock" },
  { label: "Family profiles", value: "Family profiles", icon: "users" },
  { label: "Shopping lists", value: "Shopping lists", icon: "bag" },
];

const COOK_FREQUENCY = [
  { label: "Rarely", sub: "mostly takeaway" },
  { label: "1–2x/week", sub: "getting started" },
  { label: "3–5x/week", sub: "regular cook" },
  { label: "Every day", sub: "home chef" },
];

const PAY_OPTIONS = [
  { value: "yes" as const, label: "Yes, I'd pay for this", sub: "Take my money" },
  { value: "maybe" as const, label: "Depends on the price", sub: "Convince me" },
  { value: "no" as const, label: "Only if it's free", sub: "Fair enough" },
];

export default function BetaSignup({ onComplete }: BetaSignupProps) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState<"ios" | "android" | "">("");
  const [willingToPay, setWillingToPay] = useState<"yes" | "maybe" | "no" | "">("");
  const [priceRange, setPriceRange] = useState("");
  const [topFeature, setTopFeature] = useState("");
  const [cookFrequency, setCookFrequency] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [signupCount, setSignupCount] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingRef = useRef<Record<string, string>>({});

  useEffect(() => {
    getCountFromServer(collection(db, "beta_signups"))
      .then((snap) => setSignupCount(snap.data().count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    pendingRef.current = { email, device, willingToPay, priceRange, topFeature, cookFrequency };
  }, [email, device, willingToPay, priceRange, topFeature, cookFrequency]);

  const handleSubmit = useCallback(
    async (overrides?: Record<string, string>) => {
      const data = { ...pendingRef.current, ...overrides };
      if (!data.email || status === "loading") return;

      setStatus("loading");
      try {
        await addDoc(collection(db, "beta_signups"), {
          email: data.email.trim().toLowerCase(),
          device: data.device || null,
          willingToPay: data.willingToPay || null,
          priceRange: data.priceRange || null,
          topFeature: data.topFeature || null,
          cookFrequency: data.cookFrequency || null,
          createdAt: serverTimestamp(),
          source: "marketing-site",
          referrer: typeof document !== "undefined" ? document.referrer || null : null,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        });
        setStatus("success");
        if (signupCount !== null) setSignupCount(signupCount + 1);
      } catch (err) {
        console.error("Signup error:", err);
        setStatus("error");
      }
    },
    [status, signupCount],
  );

  const totalSteps = 4;

  function next() {
    if (step < totalSteps - 1) setStep(step + 1);
    else handleSubmit();
  }

  function canProceed() {
    switch (step) {
      case 0:
        return /.+@.+\..+/.test(email.trim());
      case 1:
        return willingToPay !== "";
      case 2:
        return topFeature !== "";
      case 3:
        return cookFrequency !== "";
      default:
        return false;
    }
  }

  // Choices advance on their own after a beat, so the selection registers.
  function selectAndAdvance(setter: () => void) {
    setter();
    setTimeout(() => {
      if (step < totalSteps - 1) setStep(step + 1);
    }, 280);
  }

  const option = (active: boolean) =>
    `border transition-colors duration-200 cursor-pointer ${
      active
        ? "bg-forest text-white border-forest"
        : "bg-card text-ink border-line hover:border-ink/25"
    }`;

  const slide = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const stepLabels = ["Step 1 of 4", "Step 2 of 4", "Step 3 of 4", "Last one"];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-start gap-5 py-6"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-forest-soft text-forest">
              <Icon name="check" size={26} strokeWidth={2} />
            </span>
            <div>
              <h3 className="display text-[30px] font-bold leading-[1.05]">
                You&apos;re on the <span className="accent-word">list.</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink2">
                We&apos;ll email your invite when the next batch opens. Pull up a chair — it
                won&apos;t be long.
              </p>
            </div>
            {signupCount !== null && signupCount > 1 && (
              <p className="text-[13px] text-ink3">
                You and {(signupCount - 1).toLocaleString()} others are on the list.
              </p>
            )}
            <button
              type="button"
              onClick={onComplete}
              className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-semibold tracking-[0.02em] text-paper transition-opacity hover:opacity-85"
            >
              Back to the page
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between">
                <KusinLogo height={18} className="text-ink" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink3">
                  {stepLabels[step]}
                </span>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full bg-forest"
                      initial={false}
                      animate={{ width: i < step ? "100%" : i === step ? "45%" : "0%" }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[236px]">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className="display text-[30px] font-bold leading-[1.05]">
                      Join the <span className="accent-word">beta.</span>
                    </h3>
                    <p className="mb-5 mt-2 text-[14px] leading-relaxed text-ink2">
                      We&apos;re opening Kusin in small batches. Leave your email and we&apos;ll
                      send your invite.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (canProceed()) next();
                      }}
                      className="flex flex-col gap-3"
                    >
                      <label className="sr-only" htmlFor="beta-email">
                        Email
                      </label>
                      <input
                        id="beta-email"
                        ref={inputRef}
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-line bg-card px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink3 focus:border-forest focus:ring-4 focus:ring-forest/10"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-ink3">I use</span>
                        {(["ios", "android"] as const).map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setDevice(device === d ? "" : d)}
                            aria-pressed={device === d}
                            className={`h-9 rounded-full px-4 text-[13px] font-medium ${option(device === d)}`}
                          >
                            {d === "ios" ? "iPhone" : "Android"}
                          </button>
                        ))}
                      </div>
                      <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
                    </form>

                    {signupCount !== null && signupCount > 0 && (
                      <div className="mt-5 flex items-center gap-2 text-ink3">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
                        </span>
                        <span className="text-[13px]">
                          {signupCount.toLocaleString()} {signupCount === 1 ? "person" : "people"} on the list
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className="display text-[26px] font-bold leading-[1.1]">Would you pay for Kusin?</h3>
                    <p className="mb-5 mt-2 text-[14px] text-ink2">
                      A friend that plans every meal from what&apos;s in your kitchen.
                    </p>
                    <div className="flex flex-col gap-2">
                      {PAY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            opt.value === "no"
                              ? selectAndAdvance(() => setWillingToPay(opt.value))
                              : setWillingToPay(opt.value)
                          }
                          className={`flex h-[52px] items-center justify-between rounded-2xl px-4 text-left ${option(willingToPay === opt.value)}`}
                        >
                          <span className="text-[14px] font-medium">{opt.label}</span>
                          <span className={`text-[12px] ${willingToPay === opt.value ? "text-white/70" : "text-ink3"}`}>
                            {opt.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                    <AnimatePresence>
                      {(willingToPay === "yes" || willingToPay === "maybe") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="mb-2.5 mt-4 text-[13px] font-medium text-ink2">Per month?</p>
                          <div className="flex flex-wrap gap-1.5">
                            {PRICE_OPTIONS.map((p) => (
                              <button
                                key={p.value}
                                type="button"
                                onClick={() => {
                                  setPriceRange(p.value);
                                  setTimeout(() => setStep(2), 280);
                                }}
                                className={`h-9 rounded-full px-3.5 text-[13px] font-medium ${option(priceRange === p.value)}`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className="display text-[26px] font-bold leading-[1.1]">What would you use first?</h3>
                    <p className="mb-5 mt-2 text-[14px] text-ink2">Pick one. You&apos;ll get all of it.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURE_OPTIONS.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => selectAndAdvance(() => setTopFeature(f.value))}
                          className={`flex h-[52px] items-center gap-2.5 rounded-2xl px-3.5 text-left ${option(topFeature === f.value)}`}
                        >
                          <Icon name={f.icon} size={18} />
                          <span className="text-[13px] font-medium leading-tight">{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className="display text-[26px] font-bold leading-[1.1]">How often do you cook at home?</h3>
                    <p className="mb-5 mt-2 text-[14px] text-ink2">Last question, promise.</p>
                    <div className="flex flex-col gap-2">
                      {COOK_FREQUENCY.map((f) => (
                        <button
                          key={f.label}
                          type="button"
                          disabled={status === "loading"}
                          onClick={() => {
                            setCookFrequency(f.label);
                            setTimeout(() => handleSubmit({ cookFrequency: f.label }), 280);
                          }}
                          className={`flex h-[52px] items-center justify-between rounded-2xl px-4 text-left ${option(cookFrequency === f.label)}`}
                        >
                          <span className="text-[14px] font-medium">{f.label}</span>
                          <span className={`text-[12px] ${cookFrequency === f.label ? "text-white/70" : "text-ink3"}`}>
                            {status === "loading" && cookFrequency === f.label ? "Saving…" : f.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-[13px] font-medium text-ink3 transition-colors hover:text-ink"
                >
                  Back
                </button>
              ) : (
                <span className="flex items-center gap-1.5 text-[12px] text-ink3">
                  <Icon name="lock" size={13} />
                  Only used for Kusin updates
                </span>
              )}

              {step === 0 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed()}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-[14px] font-semibold tracking-[0.02em] text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink3"
                >
                  Continue
                  <Icon name="arrowRight" size={16} strokeWidth={2} />
                </button>
              ) : step === 1 && willingToPay !== "" && willingToPay !== "no" ? (
                <button
                  type="button"
                  onClick={next}
                  className="text-[13px] font-medium text-ink3 transition-colors hover:text-ink"
                >
                  Skip price
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="text-[13px] font-medium text-ink3 transition-colors hover:text-ink"
                >
                  Skip
                </button>
              )}
            </div>

            {status === "error" && (
              <p className="text-center text-[13px] text-risk">
                That didn&apos;t go through. Check your connection and try again.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
