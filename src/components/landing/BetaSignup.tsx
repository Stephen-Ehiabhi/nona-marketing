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
