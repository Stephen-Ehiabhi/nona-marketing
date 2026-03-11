"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  householdSize: string;
  frustration: string;
  willingnessToPay: string;
  interests: string[];
}

const interestOptions = [
  { id: "meal-planning", label: "Meal Planning" },
  { id: "inventory", label: "Inventory Tracking" },
  { id: "shopping", label: "Shopping List" },
  { id: "recipes", label: "Recipe Suggestions" },
];

const priceOptions = [
  { value: "free", label: "Free only" },
  { value: "2.99", label: "\u20AC2.99/mo" },
  { value: "4.99", label: "\u20AC4.99/mo" },
  { value: "9.99", label: "\u20AC9.99/mo" },
];

export default function BetaSignup() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    householdSize: "2",
    frustration: "",
    willingnessToPay: "free",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (id: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    console.log("Beta signup payload:", form);
    setSubmitted(true);
  };

  return (
    <section id="beta-signup" className="bg-warm-dark py-20 md:py-32 relative overflow-hidden grain">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-burnt-orange/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-forest/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-warm-gold mb-5">
            <span className="w-8 h-px bg-warm-gold/40 inline-block" />
            Join the Beta
            <span className="w-8 h-px bg-warm-gold/40 inline-block" />
          </span>
          <h2 className="font-serif text-[2rem] md:text-[2.75rem] font-bold leading-[1.1] text-cream">
            Be one of the first
            <br />
            <span className="text-warm-gold">to cook smarter.</span>
          </h2>
          <p className="mt-4 text-[15px] text-warm-500 max-w-md mx-auto leading-relaxed">
            Join 500+ testers shaping the future of home cooking.
            Early access. Founding member pricing. Your feedback matters.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-forest mx-auto flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream">You&apos;re in!</h3>
            <p className="mt-3 text-warm-400 text-[15px]">
              We&apos;ll send you an invite as soon as a spot opens.
              <br />Check your email for next steps.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-warm-400 mb-1.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-[14px] text-cream placeholder:text-warm-600 focus:outline-none focus:border-burnt-orange/50 focus:bg-white/8 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-warm-400 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-[14px] text-cream placeholder:text-warm-600 focus:outline-none focus:border-burnt-orange/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Household size */}
            <div>
              <label className="block text-[11px] font-semibold text-warm-400 mb-1.5 uppercase tracking-wider">
                Household size
              </label>
              <select
                value={form.householdSize}
                onChange={(e) => setForm({ ...form, householdSize: e.target.value })}
                className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-[14px] text-cream focus:outline-none focus:border-burnt-orange/50 transition-all appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4A574' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
              >
                <option value="1">1 — Just me</option>
                <option value="2">2 — Couple</option>
                <option value="3-4">3-4 — Small family</option>
                <option value="5+">5+ — Big household</option>
              </select>
            </div>

            {/* Frustration */}
            <div>
              <label className="block text-[11px] font-semibold text-warm-400 mb-1.5 uppercase tracking-wider">
                Biggest kitchen frustration
              </label>
              <textarea
                value={form.frustration}
                onChange={(e) => setForm({ ...form, frustration: e.target.value })}
                placeholder="What drives you crazy about cooking at home?"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-cream placeholder:text-warm-600 focus:outline-none focus:border-burnt-orange/50 focus:bg-white/8 transition-all resize-none"
              />
            </div>

            {/* Willingness to pay */}
            <div>
              <label className="block text-[11px] font-semibold text-warm-400 mb-2.5 uppercase tracking-wider">
                What would you pay for this?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {priceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, willingnessToPay: opt.value })}
                    className={`h-11 rounded-xl text-[13px] font-semibold transition-all ${
                      form.willingnessToPay === opt.value
                        ? "bg-burnt-orange text-white border border-burnt-orange"
                        : "border border-white/10 text-warm-400 hover:border-white/20 hover:text-cream"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-[11px] font-semibold text-warm-400 mb-2.5 uppercase tracking-wider">
                What excites you most? (pick all)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={`h-11 rounded-xl text-[13px] font-medium transition-all ${
                      form.interests.includes(opt.id)
                        ? "bg-forest text-white border border-forest"
                        : "border border-white/10 text-warm-400 hover:border-white/20 hover:text-cream"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-shimmer w-full h-14 rounded-full bg-burnt-orange text-white text-[15px] font-bold hover:bg-burnt-orange-dark transition-all duration-300 hover:shadow-xl hover:shadow-burnt-orange/20 hover:-translate-y-0.5 mt-2"
            >
              Join the Beta — It&apos;s Free
            </button>

            <p className="text-center text-[12px] text-warm-600">
              No credit card required. We&apos;ll never spam you.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
