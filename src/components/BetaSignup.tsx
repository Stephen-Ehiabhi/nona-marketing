"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BetaSignupProps {
  theme?: "dark" | "light";
  onComplete?: () => void;
}

const PRICE_OPTIONS = [
  { label: "Free only", value: "free" },
  { label: "10–20 PLN", value: "10-20" },
  { label: "20–30 PLN", value: "20-30" },
  { label: "30–50 PLN", value: "30-50" },
  { label: "50+ PLN", value: "50+" },
];

const FEATURE_OPTIONS = [
  { label: "Meal planning", icon: "📅" },
  { label: "Kitchen scanning", icon: "📸" },
  { label: "Cooking mode", icon: "👨‍🍳" },
  { label: "Expiry alerts", icon: "⏰" },
  { label: "Family profiles", icon: "👨‍👩‍👧‍👦" },
  { label: "Shopping lists", icon: "🛒" },
];

const COOK_FREQUENCY = [
  { label: "Rarely", sub: "mostly delivery" },
  { label: "1–2x/week", sub: "getting started" },
  { label: "3–5x/week", sub: "regular cook" },
  { label: "Every day", sub: "home chef" },
];

export default function BetaSignup({ theme = "dark", onComplete }: BetaSignupProps) {
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

  const isDark = theme === "dark";

  useEffect(() => {
    getCountFromServer(collection(db, "beta_signups"))
      .then((snap) => setSignupCount(snap.data().count))
      .catch(() => {});
  }, []);

  // Auto-focus email input
  useEffect(() => {
    if (step === 0) setTimeout(() => inputRef.current?.focus(), 100);
  }, [step]);

  // Keep ref in sync with latest state
  useEffect(() => {
    pendingRef.current = {
      email, device, willingToPay, priceRange, topFeature, cookFrequency,
    };
  }, [email, device, willingToPay, priceRange, topFeature, cookFrequency]);

  const handleSubmit = useCallback(async (overrides?: Record<string, string>) => {
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
  }, [status, signupCount]);

  const totalSteps = 4;

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }

  function canProceed() {
    switch (step) {
      case 0: return email.includes("@") && email.includes(".");
      case 1: return willingToPay !== "";
      case 2: return topFeature !== "";
      case 3: return cookFrequency !== "";
      default: return false;
    }
  }

  // Auto-advance after chip selection (with slight delay for visual feedback)
  function selectAndAdvance(setter: () => void) {
    setter();
    setTimeout(() => {
      if (step < totalSteps - 1) setStep(step + 1);
    }, 300);
  }

  const chipInactive = isDark
    ? "bg-white/[0.05] text-white/70 border-white/[0.06] hover:bg-white/[0.09] hover:border-white/12"
    : "bg-black/[0.03] text-black/70 border-black/[0.06] hover:bg-black/[0.07]";
  const chipActive = isDark
    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    : "bg-black text-white border-black";

  const slideVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  const stepLabels = ["", "Quick question", "Almost there", "Last one"];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
            <div>
              <p className={`text-[20px] font-serif font-bold text-center ${isDark ? "text-white" : "text-black"}`}>
                You&apos;re in.
              </p>
              <p className={`text-[14px] leading-relaxed text-center mt-2 ${isDark ? "text-white/45" : "text-black/45"}`}>
                We&apos;ll email your invite when the next batch opens.
              </p>
            </div>
            {signupCount !== null && signupCount > 0 && (
              <p className={`text-[12px] ${isDark ? "text-white/25" : "text-black/25"}`}>
                {signupCount.toLocaleString()} people ahead of you
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-[20px] font-bold tracking-[-0.03em] text-white">
                  nona<span className="inline-block w-[4px] h-[4px] rounded-full bg-white/50 ml-[2px] mb-[4px]" />
                </span>
                {step > 0 && (
                  <span className={`text-[11px] uppercase tracking-widest font-semibold ${isDark ? "text-white/25" : "text-black/25"}`}>
                    {stepLabels[step]}
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="flex gap-1 mt-4">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden">
                    <motion.div
                      className={isDark ? "bg-white h-full" : "bg-black h-full"}
                      initial={false}
                      animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait">
                {/* Step 0: Email */}
                {step === 0 && (
                  <motion.div key="s0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className={`font-serif text-[22px] font-bold leading-tight mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      Get early access
                    </h3>
                    <p className={`text-[13px] mb-5 ${isDark ? "text-white/40" : "text-black/40"}`}>
                      Join the waitlist. We launch in batches.
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); canProceed() && next(); }} className="flex flex-col gap-3">
                      <input
                        ref={inputRef}
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full h-[52px] px-4 rounded-2xl text-[15px] outline-none transition-all ${
                          isDark
                            ? "bg-white/[0.07] text-white placeholder:text-white/25 border border-white/[0.06] focus:border-white/20 focus:bg-white/[0.09]"
                            : "bg-black/[0.04] text-black placeholder:text-black/30 border border-black/[0.06] focus:border-black/15"
                        }`}
                      />

                      {/* Device toggle */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[12px] ${isDark ? "text-white/30" : "text-black/30"}`}>
                          I use
                        </span>
                        {(["ios", "android"] as const).map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setDevice(device === d ? "" : d)}
                            className={`h-[32px] px-3 rounded-lg text-[12px] font-medium border transition-all cursor-pointer ${
                              device === d ? chipActive : chipInactive
                            }`}
                          >
                            {d === "ios" ? "iPhone" : "Android"}
                          </button>
                        ))}
                      </div>
                    </form>

                    {/* Social proof */}
                    {signupCount !== null && signupCount > 0 && (
                      <div className={`flex items-center gap-2 mt-4 ${isDark ? "text-white/25" : "text-black/25"}`}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400/60" />
                        </span>
                        <span className="text-[12px]">{signupCount.toLocaleString()} people joined this week</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 1: Willingness to pay */}
                {step === 1 && (
                  <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className={`font-serif text-[22px] font-bold leading-tight mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      Would you pay for this?
                    </h3>
                    <p className={`text-[13px] mb-5 ${isDark ? "text-white/40" : "text-black/40"}`}>
                      An app that plans every meal from what&apos;s in your kitchen.
                    </p>

                    <div className="flex flex-col gap-2">
                      {([
                        { value: "yes" as const, label: "Yes, I'd pay for this", sub: "Take my money" },
                        { value: "maybe" as const, label: "Depends on the price", sub: "Convince me" },
                        { value: "no" as const, label: "Only if it's free", sub: "I'm frugal" },
                      ]).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => selectAndAdvance(() => setWillingToPay(opt.value))}
                          className={`flex items-center justify-between h-[52px] px-4 rounded-2xl text-left border transition-all cursor-pointer ${
                            willingToPay === opt.value ? chipActive : chipInactive
                          }`}
                        >
                          <span className="text-[14px] font-medium">{opt.label}</span>
                          <span className={`text-[11px] ${willingToPay === opt.value ? "opacity-60" : "opacity-30"}`}>
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
                          <p className={`text-[13px] mt-4 mb-3 font-medium ${isDark ? "text-white/50" : "text-black/50"}`}>
                            Per month?
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {PRICE_OPTIONS.map((p) => (
                              <button
                                key={p.value}
                                type="button"
                                onClick={() => { setPriceRange(p.value); setTimeout(() => setStep(2), 300); }}
                                className={`h-[36px] px-3.5 rounded-xl text-[13px] font-medium border transition-all cursor-pointer ${
                                  priceRange === p.value ? chipActive : chipInactive
                                }`}
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

                {/* Step 2: Feature */}
                {step === 2 && (
                  <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className={`font-serif text-[22px] font-bold leading-tight mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      What excites you most?
                    </h3>
                    <p className={`text-[13px] mb-5 ${isDark ? "text-white/40" : "text-black/40"}`}>
                      Pick the feature you&apos;d use first.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {FEATURE_OPTIONS.map((f) => (
                        <button
                          key={f.label}
                          type="button"
                          onClick={() => selectAndAdvance(() => setTopFeature(f.label))}
                          className={`flex items-center gap-2.5 h-[52px] px-4 rounded-2xl text-left border transition-all cursor-pointer ${
                            topFeature === f.label ? chipActive : chipInactive
                          }`}
                        >
                          <span className="text-[16px]">{f.icon}</span>
                          <span className="text-[13px] font-medium">{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Cook frequency */}
                {step === 3 && (
                  <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <h3 className={`font-serif text-[22px] font-bold leading-tight mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      How often do you cook?
                    </h3>
                    <p className={`text-[13px] mb-5 ${isDark ? "text-white/40" : "text-black/40"}`}>
                      Last question, we promise.
                    </p>

                    <div className="flex flex-col gap-2">
                      {COOK_FREQUENCY.map((f) => (
                        <button
                          key={f.label}
                          type="button"
                          onClick={() => { setCookFrequency(f.label); setTimeout(() => handleSubmit({ cookFrequency: f.label }), 300); }}
                          className={`flex items-center justify-between h-[52px] px-4 rounded-2xl text-left border transition-all cursor-pointer ${
                            cookFrequency === f.label ? chipActive : chipInactive
                          }`}
                        >
                          <span className="text-[14px] font-medium">{f.label}</span>
                          <span className={`text-[11px] ${cookFrequency === f.label ? "opacity-60" : "opacity-30"}`}>
                            {f.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            <div className="flex items-center justify-between">
              <div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className={`text-[13px] font-medium transition-colors cursor-pointer ${
                      isDark ? "text-white/30 hover:text-white/60" : "text-black/30 hover:text-black/60"
                    }`}
                  >
                    Back
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className={`text-[11px] ${isDark ? "text-white/20" : "text-black/20"}`}>
                      We never share your email
                    </span>
                  </div>
                )}
              </div>

              {/* Only show Continue on step 0 — other steps auto-advance */}
              {step === 0 && (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed()}
                  className={`h-[44px] px-7 rounded-full font-semibold text-[14px] transition-all cursor-pointer ${
                    isDark
                      ? "bg-white text-black hover:bg-white/90 active:scale-[0.97]"
                      : "bg-black text-white hover:bg-black/90 active:scale-[0.97]"
                  } disabled:opacity-20 disabled:cursor-not-allowed`}
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              )}

              {step > 0 && (
                <button
                  type="button"
                  onClick={next}
                  className={`text-[12px] transition-colors cursor-pointer ${
                    isDark ? "text-white/20 hover:text-white/40" : "text-black/20 hover:text-black/40"
                  }`}
                >
                  Skip
                </button>
              )}
            </div>

            {status === "error" && (
              <p className={`text-[12px] text-center ${isDark ? "text-red-400" : "text-red-600"}`}>
                Something went wrong. Try again.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
