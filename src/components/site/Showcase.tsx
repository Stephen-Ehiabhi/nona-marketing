"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { photo, type PhotoKey } from "@/lib/photos";
import { Eyebrow, Icon, KusinMark, PhoneFrame, Reveal } from "./ui";

const STORES: { store: string; items: { name: string; qty: string; home?: boolean }[] }[] = [
  {
    store: "Biedronka",
    items: [
      { name: "Twaróg półtłusty", qty: "250 g" },
      { name: "Red onions", qty: "×3" },
      { name: "Milk 3.2%", qty: "1 L", home: true },
    ],
  },
  {
    store: "African shop",
    items: [
      { name: "Ground egusi", qty: "500 g" },
      { name: "Plantain", qty: "×4" },
      { name: "Palm oil", qty: "1 L", home: true },
    ],
  },
];

const EXPIRING: { name: string; when: string; key: PhotoKey }[] = [
  { name: "Spinach", when: "Today", key: "greens" },
  { name: "Plantain", when: "Tomorrow", key: "plantain" },
  { name: "Tomatoes", when: "Wed", key: "handsChopping" },
];

const RECEIPT: { raw: string; name: string; price: string; estimated?: boolean }[] = [
  { raw: "MLEKO 3,2% 1L", name: "Milk · 1 L", price: "3,49" },
  { raw: "JAJA L 10SZT", name: "Eggs · 10", price: "12,99" },
  { raw: "SZPINAK 300G", name: "Spinach · use by Tue", price: "6,99", estimated: true },
  { raw: "TWAROG POLTL.", name: "Twaróg · 250 g", price: "4,29" },
];

function Tile({
  icon,
  title,
  body,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[28px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-white">
          <Icon name={icon} size={19} />
        </span>
        <p className="display text-[19px] font-semibold text-white">{title}</p>
      </div>
      <p className="mt-3 text-[14px] leading-[1.6] text-white/65">{body}</p>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sideY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -60]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section className="px-3 py-24 md:px-4 md:py-32">
      <div
        ref={ref}
        className="relative isolate overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#1e3219_0%,#132210_100%)] px-5 pb-6 pt-20 md:px-10 md:pb-10 md:pt-28"
      >
        <KusinMark
          className="pointer-events-none absolute -right-[12%] -top-[10%] -z-10 h-[90%] w-auto rotate-[-5deg] text-mark md:h-[110%]"
          style={{ aspectRatio: "1" }}
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(141,194,158,0.14),transparent_70%)]" />

        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow tone="sage">The app</Eyebrow>
          <h2 className="display h-feature mt-4 font-bold text-white">
            Your kitchen, <span className="accent-word-light">sorted.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-white/70">
            What you have, what to cook, what to buy. One calm place for the whole family.
          </p>
        </Reveal>

        {/* Phones: one in front, two angled behind it */}
        <div
          className="relative mx-auto mt-16 flex max-w-[1000px] items-center justify-center md:mt-20"
          style={{ perspective: "2400px" }}
        >
          <motion.div style={{ y: sideY }} className="relative z-0 -mr-[8%] hidden w-[31%] max-w-[290px] sm:block">
            <div style={{ transform: "rotateY(24deg) rotateZ(-1.5deg)" }}>
              <PhoneFrame tone="silver" src="/app/recipes.jpg" alt="Kusin Recipes: the family cookbook" />
            </div>
          </motion.div>
          <motion.div style={{ y: midY }} className="relative z-10 w-[72%] max-w-[330px] sm:w-[36%]">
            <PhoneFrame src="/app/today.jpg" alt="Kusin Today: tonight's dinner suggestion" />
          </motion.div>
          <motion.div style={{ y: sideY }} className="relative z-0 -ml-[8%] hidden w-[31%] max-w-[290px] sm:block">
            <div style={{ transform: "rotateY(-24deg) rotateZ(1.5deg)" }}>
              <PhoneFrame tone="silver" src="/app/plan.jpg" alt="Kusin week plan: seven days planned" />
            </div>
          </motion.div>
        </div>

        {/* What's inside */}
        <div className="relative mt-16 grid gap-3 md:mt-24 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          <Reveal className="h-full">
            <Tile
              icon="bag"
              title="Shopping, by store"
              body="Lists split by where you actually shop. Things already at home are crossed off for you."
            >
              <div className="space-y-4">
                {STORES.map((s) => (
                  <div key={s.store}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sage">{s.store}</p>
                    <div className="mt-2 overflow-hidden rounded-[16px] bg-white/[0.06]">
                      {s.items.map((it, n) => (
                        <div
                          key={it.name}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-[13.5px] ${n ? "border-t border-white/10" : ""}`}
                        >
                          <span className={it.home ? "text-white/45 line-through" : "text-white"}>{it.name}</span>
                          <span className={`tabular font-medium ${it.home ? "text-sage" : "text-white/70"}`}>
                            {it.home ? "at home" : it.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={0.05} className="h-full">
            <Tile
              icon="clock"
              title="Use these first"
              body="What's about to turn goes into tomorrow's plan before anything new gets bought."
            >
              <div className="grid grid-cols-3 gap-2">
                {EXPIRING.map((e) => (
                  <div key={e.name} className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
                    <img src={photo(e.key, 400)} alt={e.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,14,13,0.7),rgba(15,14,13,0)_60%)]" />
                    <span className="glass-dark absolute left-1.5 top-1.5 rounded-full px-2 py-1 text-[11px] font-semibold text-white">
                      {e.when}
                    </span>
                    <span className="absolute inset-x-2 bottom-2 text-[12.5px] font-semibold text-white">{e.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-[16px] bg-white/[0.06] px-3.5 py-3 text-[13px] text-white/80">
                <Icon name="chefHat" size={16} className="text-sage" />
                Efo riro with dodo tomorrow uses all three.
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={0.1} className="h-full md:col-span-2 lg:col-span-1">
            <Tile
              icon="receipt"
              title="Receipts, read for you"
              body="Polish receipt shorthand becomes real food. Anything Kusin had to guess is marked for you to check."
            >
              <div className="overflow-hidden rounded-[16px] bg-white/[0.06]">
                {RECEIPT.map((r, n) => (
                  <div
                    key={r.raw}
                    className={`px-3.5 py-2.5 ${n ? "border-t border-white/10" : ""} ${r.estimated ? "bg-[rgba(227,160,74,0.12)]" : ""}`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11.5px] text-white/45">
                      <span>{r.raw}</span>
                      <span className="tabular">{r.price}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-[13.5px] text-white">{r.name}</span>
                      {r.estimated ? (
                        <span className="rounded-full bg-[rgba(227,160,74,0.2)] px-2 py-0.5 text-[11px] font-semibold text-[#E3A04A]">
                          estimated
                        </span>
                      ) : (
                        <Icon name="check" size={14} className="text-sage" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
