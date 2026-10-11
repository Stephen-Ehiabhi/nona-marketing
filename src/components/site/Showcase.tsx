"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { photo, type PhotoKey } from "@/lib/photos";
import { Eyebrow, Icon, type IconName, KusinMark, PhoneFrame, Reveal } from "./ui";

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

/** Small white card that pops in once the phones have fanned out, then
 *  drifts gently. Static when the reader prefers less motion. */
function FloatCard({
  icon,
  title,
  sub,
  delay,
  drift,
  show,
  className,
}: {
  icon: IconName;
  title: string;
  sub: string;
  delay: number;
  drift: number;
  show: boolean;
  className: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.9 }}
      animate={show || reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: show ? delay : 0 }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: drift, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
        className="flex items-center gap-3 rounded-[18px] border border-black/5 bg-card py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-14px_rgba(0,0,0,0.45),0_4px_10px_-4px_rgba(0,0,0,0.2)]"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-forest-soft text-forest">
          <Icon name={icon} size={18} />
        </span>
        <span className="leading-tight">
          <span className="block whitespace-nowrap text-[13.5px] font-semibold text-ink">{title}</span>
          <span className="block whitespace-nowrap text-[12px] text-ink3">{sub}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/** A soft band of light that crosses the glass, then again every few
 *  seconds, once the phones have settled. */
function Sheen({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-y-[-10%] left-0 w-[45%] -skew-x-12 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0)_100%)]"
      initial={{ x: "-140%" }}
      animate={active ? { x: ["-140%", "340%"] } : { x: "-140%" }}
      transition={
        active
          ? { duration: 1.6, delay: 0.5, ease: [0.45, 0, 0.2, 1], repeat: Infinity, repeatDelay: 6.5 }
          : { duration: 0 }
      }
    />
  );
}

function SidePhone({
  side,
  x,
  rotate,
  scale,
  opacity,
  children,
}: {
  side: "left" | "right";
  x: MotionValue<string>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{ x, rotate, scale, opacity, transformOrigin: side === "left" ? "100% 100%" : "0% 100%" }}
      className={`relative z-0 mt-[9%] hidden w-[29%] max-w-[270px] sm:block ${side === "left" ? "-mr-[6%]" : "-ml-[6%]"}`}
    >
      {children}
    </motion.div>
  );
}

export default function Showcase() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 → 1 as the phones scroll up into view; springy so it feels physical.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.95", "start 0.3"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.5 });
  const k = (from: number, to: number) => (reduce ? [to, to] : [from, to]);

  // Side phones start tucked behind the centre phone and fan out.
  const leftX = useTransform(p, [0, 1], k(78, 0), { clamp: true });
  const leftXPct = useTransform(leftX, (v) => `${v}%`);
  const rightXPct = useTransform(leftX, (v) => `${-v}%`);
  const leftRotate = useTransform(p, [0, 1], k(7, 0));
  const rightRotate = useTransform(p, [0, 1], k(-7, 0));
  const sideScale = useTransform(p, [0, 1], k(0.86, 1));
  const sideOpacity = useTransform(p, [0, 0.3, 1], reduce ? [1, 1, 1] : [0, 0.7, 1]);

  // Centre phone rises into place.
  const midY = useTransform(p, [0, 1], k(110, 0));
  const midScale = useTransform(p, [0, 1], k(0.9, 1));
  const glowOpacity = useTransform(p, [0, 1], k(0, 1));
  const glowScale = useTransform(p, [0, 1], k(0.6, 1));

  // Cards and the light sweep start once the phones have (nearly) fanned
  // out, and step back if the reader scrolls the phones away again. The
  // gap between the two thresholds stops them flickering at the edge.
  const [settled, setSettled] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.85 && !settled) setSettled(true);
    else if (v < 0.4 && settled) setSettled(false);
  });

  return (
    <section className="px-3 py-24 md:px-4 md:py-32">
      <div
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

        {/* Phones: the side ones fan out from behind the centre phone as it
            rises, then three small cards pop in around them. */}
        <div ref={stage} className="relative mx-auto mt-16 max-w-[1000px] md:mt-20">
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity, scale: glowScale }}
            className="absolute left-1/2 top-[38%] h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(141,194,158,0.38),rgba(141,194,158,0))]"
          />
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity }}
            className="absolute -bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl"
          />

          <div className="relative flex items-start justify-center">
            <SidePhone side="left" x={leftXPct} rotate={leftRotate} scale={sideScale} opacity={sideOpacity}>
              <PhoneFrame src="/app/recipes.jpg" alt="Kusin Recipes: the family cookbook" />
            </SidePhone>
            <motion.div style={{ y: midY, scale: midScale }} className="relative z-10 w-[72%] max-w-[330px] sm:w-[35%]">
              <PhoneFrame src="/app/today.jpg" alt="Kusin Today: tonight's dinner suggestion" overlay={<Sheen active={settled} />} />
            </motion.div>
            <SidePhone side="right" x={rightXPct} rotate={rightRotate} scale={sideScale} opacity={sideOpacity}>
              <PhoneFrame src="/app/plan.jpg" alt="Kusin week plan: seven days planned" />
            </SidePhone>
          </div>

          <FloatCard
            icon="fridge"
            title="19 items at home"
            sub="4 to use first"
            delay={0}
            drift={5.6}
            show={settled}
            className="left-0 top-[16%] sm:left-[2%] sm:top-[24%]"
          />
          <FloatCard
            icon="calendar"
            title="Week planned"
            sub="21 meals · 7 days"
            delay={0.18}
            drift={6.4}
            show={settled}
            className="hidden sm:right-[1%] sm:top-[52%] sm:block"
          />
          <FloatCard
            icon="shield"
            title="Nut-free for Tobi"
            sub="Checked in every recipe"
            delay={0.36}
            drift={5.1}
            show={settled}
            className="hidden sm:left-[4%] sm:top-[72%] sm:block"
          />
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
