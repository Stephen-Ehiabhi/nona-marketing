"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chip, Eyebrow, Icon, type IconName, PhoneFrame, Reveal, EASE } from "./ui";

const STEPS: {
  title: string;
  body: string;
  screen: string;
  alt: string;
  tags: { icon: IconName; label: string }[];
  floating: ReactNode;
  /** Where the floating card sits, as a share of the phone's height. */
  floatTop?: string;
}[] = [
  {
    title: "Snap the receipt",
    body: "Biedronka, Lidl, Auchan or the African shop: photograph the receipt, forward the e-receipt, or snap the pantry shelf. Kusin fills your kitchen and flags anything it had to guess.",
    screen: "/app/kitchen.jpg",
    alt: "Kusin Kitchen screen: 19 items at home, 4 to use first",
    tags: [
      { icon: "receipt", label: "Receipt photo" },
      { icon: "mail", label: "E-receipt" },
      { icon: "camera", label: "Pantry photo" },
      { icon: "barcode", label: "Barcode" },
    ],
    floating: (
      <div className="rounded-[20px] border border-line bg-card p-3.5 shadow-[0_18px_40px_-18px_rgba(15,14,13,0.3)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink3">From your receipt</p>
        <div className="mt-2.5 space-y-2">
          <Row name="Twaróg półtłusty" sub="Fridge · 250 g" right={<Chip tone="forest">Added</Chip>} />
          <Row name="Spinach" sub="Fridge · use by Tue" right={<Chip tone="warn">estimated</Chip>} />
        </div>
      </div>
    ),
  },
  {
    title: "Get a week that fits everyone",
    body: "Breakfast, lunch and dinner for each person at the table, built around what's already at home and what's expiring first. Lock the meals you love and shuffle the rest.",
    screen: "/app/plan.jpg",
    alt: "Kusin weekly plan with a day strip and Sunday's meals",
    tags: [
      { icon: "calendar", label: "7 days, 3 meals" },
      { icon: "lock", label: "Lock favourites" },
      { icon: "shuffle", label: "Shuffle the rest" },
    ],
    floating: (
      <div className="flex items-center gap-3 rounded-full border border-line bg-card py-2 pl-2 pr-4 shadow-[0_18px_40px_-18px_rgba(15,14,13,0.3)]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-white">
          <Icon name="lock" size={16} />
        </span>
        <span className="text-[13px] font-semibold">Sunday jollof · locked</span>
      </div>
    ),
  },
  {
    title: "Cook tonight",
    body: "One suggestion when you open the app, with the reasons it fits. Cook it one step at a time with tap-to-start timers, or say not now and pick from three that do. Finishing a meal takes it out of stock.",
    screen: "/app/cookstep.jpg",
    floatTop: "45%",
    alt: "Kusin cooking mode: step 2 of 5 with a 15-minute timer running",
    tags: [
      { icon: "chefHat", label: "Step by step" },
      { icon: "timer", label: "Timers" },
      { icon: "volume", label: "Voice-guided" },
    ],
    floating: (
      <div className="rounded-[20px] border border-line bg-card p-3.5 shadow-[0_18px_40px_-18px_rgba(15,14,13,0.3)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink3">Finished cooking</p>
        <div className="mt-2.5 space-y-2">
          <Row name="Catfish" sub="800 g used" right={<Chip tone="forest">Kitchen updated</Chip>} />
          <Row name="Yam" sub="500 g used · 1 left" right={<Icon name="check" size={16} className="text-forest" />} />
        </div>
      </div>
    ),
  },
];

function Row({ name, sub, right }: { name: string; sub: string; right: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[13px] font-semibold leading-tight">{name}</p>
        <p className="text-[12px] text-ink3">{sub}</p>
      </div>
      {right}
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how" className="relative bg-card py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[760px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="display h-section mt-4 font-bold">
            From the shopping bag to the <span className="accent-word">table.</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky phone (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[88px] flex h-[calc(100svh-88px)] items-center justify-center">
              <div className="absolute h-[440px] w-[440px] rounded-full xl:h-[520px] xl:w-[520px] bg-[radial-gradient(circle,rgba(141,194,158,0.35)_0%,rgba(141,194,158,0)_68%)]" />
              <div className="relative" style={{ width: "min(320px, calc((100svh - 150px) / 2.113))" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <PhoneFrame src={STEPS[active].screen} alt={STEPS[active].alt} />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`f-${active}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                    className="absolute -right-14 w-max max-w-[260px] xl:-right-24"
                    style={{ top: STEPS[active].floatTop ?? "58%" }}
                  >
                    {STEPS[active].floating}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:-mt-[8vh] lg:pb-[12vh]">
            {STEPS.map((s, n) => (
              <div
                key={s.title}
                ref={(el) => {
                  refs.current[n] = el;
                }}
                data-step={n}
                className="flex flex-col justify-center py-10 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 lg:flex lg:min-h-[78vh] lg:py-0"
              >
                <motion.div
                  animate={{ opacity: active === n ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="max-lg:!opacity-100"
                >
                  <span className="display flex h-12 w-12 items-center justify-center rounded-full bg-forest text-[18px] font-bold text-white">
                    {n + 1}
                  </span>
                  <h3 className="display h-step mt-6 font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[480px] text-[17px] leading-[1.6] text-ink2">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <Chip key={t.label} tone="line">
                        <Icon name={t.icon} size={15} />
                        {t.label}
                      </Chip>
                    ))}
                  </div>
                </motion.div>

                {/* Inline phone (mobile, tablet) */}
                <div className="relative mt-10 flex justify-center md:mt-0 md:pr-6 lg:hidden">
                  <div className="absolute top-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(141,194,158,0.35)_0%,rgba(141,194,158,0)_68%)]" />
                  <div className="relative w-[260px] sm:w-[280px] md:w-[250px]">
                    <PhoneFrame src={s.screen} alt={s.alt} />
                    <div
                      className="absolute -right-6 w-max max-w-[260px] sm:-right-16 md:-right-6"
                      style={{ top: s.floatTop ?? "62%" }}
                    >
                      {s.floating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
