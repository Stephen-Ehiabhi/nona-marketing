"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSignupModal } from "../SignupModal";
import { Eyebrow, Icon, Reveal, EASE } from "./ui";

const FAQS = [
  {
    q: "What does Kusin actually do?",
    a: "It keeps track of what's in your kitchen, plans breakfast, lunch and dinner for everyone at the table, and builds the shopping list from what's missing. When it's time to cook, it walks you through one step at a time.",
  },
  {
    q: "How does it know what I bought?",
    a: "Photograph your receipt, forward an e-receipt, snap the fridge or pantry, or scan a barcode. Kusin adds the items and asks you to confirm anything it isn't sure about. Dates it has to guess are marked as estimated.",
  },
  {
    q: "Which cuisines does it cook?",
    a: "Nigerian and Polish home cooking first, with Italian, Indian, Chinese, Ghanaian and more when you fancy a change. Everyone in the household can have their own favourites.",
  },
  {
    q: "Can the whole family use it?",
    a: "Yes. Add everyone who eats at home, each with their own tastes, allergies and needs. Mark who's eating each meal and the portions follow.",
  },
  {
    q: "Is it safe with allergies?",
    a: "Allergies are set per person and checked against every ingredient in every recipe, swap and suggestion. Keep reading labels too — Kusin helps, it doesn't replace your judgement.",
  },
  {
    q: "I've just had a baby. Is Kusin for me?",
    a: "If you opt in, Kusin plans gentle, nourishing meals for recovery and breastfeeding, based on published guidance. It never suggests weight loss in the first six weeks and isn't medical advice — your midwife or doctor comes first.",
  },
  {
    q: "How much does it cost?",
    a: "Kusin is free while we're in beta. When paid plans arrive, beta families hear about them first.",
  },
  {
    q: "When can I get it?",
    a: "We're opening the beta in small batches on iPhone and Android. Join the list and we'll email your invite.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { open } = useSignupModal();

  return (
    <section id="faq" className="bg-card py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display h-section mt-4 font-bold">
            Questions, <span className="accent-word">answered.</span>
          </h2>
          <p className="mt-5 max-w-[360px] text-[16px] leading-[1.6] text-ink2">
            Something else on your mind? Beta families get a direct line to the people building
            Kusin.
          </p>
          <button
            onClick={open}
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full border border-ink px-6 text-[14px] font-semibold tracking-[0.02em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Join the beta
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </button>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f, n) => {
            const isOpen = openIdx === n;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : n)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display text-[19px] font-semibold leading-snug tracking-[-0.01em] md:text-[21px]">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-forest text-white" : "bg-surface text-ink"
                    }`}
                  >
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }}>
                      <Icon name="plus" size={17} />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[620px] pb-6 text-[15.5px] leading-[1.7] text-ink2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
