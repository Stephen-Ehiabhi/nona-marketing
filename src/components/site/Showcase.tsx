"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
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
      className={`relative z-0 mt-[9%] hidden w-[29%] max-w-[270px] sm:block lg:mt-[calc(var(--pw)*0.26)] lg:w-[calc(var(--pw)*0.83)] lg:max-w-none ${
        side === "left" ? "-mr-[6%] lg:-mr-[calc(var(--pw)*0.17)]" : "-ml-[6%] lg:-ml-[calc(var(--pw)*0.17)]"
      }`}
    >
      {children}
    </motion.div>
  );
}

function useMinWidth(px: number) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const q = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setMatch(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, [px]);
  return match;
}

/* One progress value (0 → 1) drives the whole scene.
 *
 * Desktop (≥1024px), after Foodify's app section: the scene pins for about
 * two screens. The phones fan out as it arrives (0 → FAN), the cards pop in,
 * then everything else lifts away while the centre phone zooms to fill the
 * screen and the reasons behind tonight's dinner appear beside it (OUT → 1).
 *
 * Smaller screens: no pin; the entrance alone maps onto 0 → FAN, so the
 * zoom never runs. Reduced motion: no pin, phones shown settled. */
const FAN = 0.25;
const OUT = 0.48;
const ZOOM_END = 0.8;

function ReasonCard({
  icon,
  title,
  sub,
  progress,
  at,
}: {
  icon: IconName;
  title: string;
  sub: string;
  progress: MotionValue<number>;
  at: number;
}) {
  const opacity = useTransform(progress, [at, at + 0.04], [0, 1]);
  const x = useTransform(progress, [at, at + 0.05], [28, 0]);
  return (
    <motion.div
      style={{ opacity, x }}
      className="flex w-full max-w-[300px] items-center gap-3.5 rounded-[20px] border border-black/5 bg-card py-3 pl-3 pr-5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-forest-soft text-forest">
        <Icon name={icon} size={20} />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-[13px] text-ink3">{sub}</span>
      </span>
    </motion.div>
  );
}

export default function Showcase() {
  const scene = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const centreWrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMinWidth(1024);
  const pinned = desktop && !reduce;

  const { scrollYProgress: deskRaw } = useScroll({ target: scene, offset: ["start 0.6", "end end"] });
  const { scrollYProgress: mobRaw } = useScroll({ target: stage, offset: ["start 0.95", "start 0.3"] });

  const raw = useMotionValue(0);
  useEffect(() => {
    if (reduce) raw.set(0.3);
    else raw.set(pinned ? deskRaw.get() : mobRaw.get() * FAN);
  }, [reduce, pinned, raw, deskRaw, mobRaw]);
  useMotionValueEvent(deskRaw, "change", (v) => {
    if (pinned) raw.set(v);
  });
  useMotionValueEvent(mobRaw, "change", (v) => {
    if (!pinned && !reduce) raw.set(v * FAN);
  });
  // Smoothed like GSAP's scrub: the scene catches up with the scrollbar.
  const p = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.6 });

  // Entrance: side phones tucked behind the centre phone fan out.
  const fan = useTransform(p, [0, FAN], [0, 1]);
  const leftXPct = useTransform(fan, (v) => `${(1 - v) * 78}%`);
  const rightXPct = useTransform(fan, (v) => `${-(1 - v) * 78}%`);
  const leftRotate = useTransform(fan, [0, 1], [7, 0]);
  const rightRotate = useTransform(fan, [0, 1], [-7, 0]);
  const sideScale = useTransform(fan, [0, 1], [0.86, 1]);

  // Exit of everything around the centre phone (desktop only).
  const out = useTransform(p, [OUT, OUT + 0.12], [0, 1]);
  const sideOpacity = useTransform([fan, out], ([f, o]: number[]) => Math.min(1, f * 1.6) * (1 - o));
  const liftY = useTransform(out, [0, 1], [0, -50]);
  const fadeOut = useTransform(out, [0, 1], [1, 0]);

  // Centre phone: rises in, then zooms to the middle of the screen.
  const zoom = useTransform(p, [OUT + 0.02, ZOOM_END], [0, 1]);
  const zoomDy = useMotionValue(0);
  const zoomScale = useMotionValue(1);
  const rise = useTransform(fan, [0, 1], [110, 0]);
  const centreY = useTransform([rise, zoom, zoomDy], ([r, z, d]: number[]) => r + z * d);
  const centreScale = useTransform([fan, zoom, zoomScale], ([f, z, t]: number[]) => (0.9 + 0.1 * f) * (1 + z * (t - 1)));
  const endFade = useTransform(p, [0.92, 1], [1, 0]);
  const glowOpacity = useTransform([fan, zoom, endFade], ([f, z, e]: number[]) => f * (1 + 0.4 * z) * e);
  const glowScale = useTransform([fan, zoom], ([f, z]: number[]) => (0.6 + 0.4 * f) * (1 + 0.5 * z));
  // Spotlight: darken around the phone, then lift again before the scene
  // releases so there is no seam where the tiles begin.
  const dim = useTransform(p, [OUT + 0.02, ZOOM_END, 0.92, 1], [0, 0.55, 0.55, 0]);
  const leftCopyOpacity = useTransform(p, [0.72, 0.8], [0, 1]);
  const leftCopyY = useTransform(p, [0.72, 0.82], [24, 0]);

  // Where the zoom lands, measured from layout (transforms don't move it).
  const [phoneHalf, setPhoneHalf] = useState(160);
  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const s = sticky.current?.getBoundingClientRect();
      const w = centreWrap.current?.getBoundingClientRect();
      if (!s || !w || !w.height) return;
      const centre = w.top - s.top + w.height / 2;
      const scale = Math.min((s.height * 0.86) / w.height, 1.6);
      zoomDy.set(s.height / 2 - centre);
      zoomScale.set(scale);
      setPhoneHalf((w.width * scale) / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sticky.current) ro.observe(sticky.current);
    return () => ro.disconnect();
  }, [pinned, zoomDy, zoomScale]);

  // Cards show once the phones have fanned out and leave when the zoom
  // starts; the sweep runs from then on. Hysteresis stops flicker.
  const [settled, setSettled] = useState(false);
  const [sheen, setSheen] = useState(false);
  const settledRef = useRef(false);
  useMotionValueEvent(p, "change", (v) => {
    const next = settledRef.current ? v > 0.1 && v < OUT + 0.01 : v > 0.22 && v < OUT - 0.01;
    if (next !== settledRef.current) {
      settledRef.current = next;
      setSettled(next);
    }
    if ((v > 0.2) !== sheen) setSheen(v > 0.2);
    // Like Foodify, the nav steps aside while the phone has the stage.
    document.documentElement.toggleAttribute("data-immersive", pinned && v > OUT + 0.04 && v < 0.97);
  });
  useEffect(() => () => document.documentElement.removeAttribute("data-immersive"), []);

  const pw = { "--pw": "min(330px, calc((100svh - 330px) / 2.045))" } as CSSProperties;

  return (
    <section className="px-3 py-24 md:px-4 md:py-32">
      <div className="relative isolate overflow-clip rounded-[32px] bg-[linear-gradient(160deg,#1e3219_0%,#132210_100%)]">
        <KusinMark
          className="pointer-events-none absolute -right-[12%] -top-[10%] -z-10 h-[90%] max-h-[1200px] w-auto rotate-[-5deg] text-mark md:h-[110%]"
          style={{ aspectRatio: "1" }}
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(141,194,158,0.14),transparent_70%)]" />

        <div ref={scene} className={`relative ${pinned ? "h-[280vh]" : ""}`}>
          <div
            ref={sticky}
            style={pw}
            className={`relative px-5 pt-20 md:px-10 md:pt-28 ${
              pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden !pt-[88px] pb-6" : ""
            }`}
          >
            <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-castiron-deep" />

            <motion.div style={pinned ? { opacity: fadeOut, y: liftY } : undefined} className="relative">
              <Reveal className="mx-auto max-w-[760px] text-center lg:max-w-[1040px]">
                <Eyebrow tone="sage">The app</Eyebrow>
                <h2 className="display h-feature mt-4 font-bold text-white">
                  Your kitchen, <span className="accent-word-light">sorted.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-white/70 lg:mt-3 lg:max-w-[700px]">
                  What you have, what to cook, what to buy. One calm place for the whole family.
                </p>
              </Reveal>
            </motion.div>

            {/* Phones: the side ones fan out from behind the centre phone as it
                rises, then three small cards pop in around them. */}
            <div
              ref={stage}
              className="relative mx-auto mt-16 w-full max-w-[1000px] md:mt-20 lg:mt-8 lg:w-[calc(var(--pw)*3.5)] lg:max-w-none"
            >
              <motion.div
                aria-hidden
                style={{ opacity: glowOpacity, scale: glowScale }}
                className="absolute left-1/2 top-[38%] h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(141,194,158,0.38),rgba(141,194,158,0))]"
              />
              <motion.div
                aria-hidden
                style={{ opacity: pinned ? fadeOut : glowOpacity }}
                className="absolute -bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl"
              />

              <div className="relative flex items-start justify-center">
                <SidePhone side="left" x={leftXPct} rotate={leftRotate} scale={sideScale} opacity={sideOpacity}>
                  <motion.div style={pinned ? { y: liftY } : undefined}>
                    <PhoneFrame src="/app/recipes.jpg" alt="Kusin Recipes: the family cookbook" />
                  </motion.div>
                </SidePhone>
                <div ref={centreWrap} className="relative z-10 w-[72%] max-w-[330px] sm:w-[35%] lg:w-[var(--pw)] lg:max-w-none">
                  <motion.div style={{ y: centreY, scale: centreScale }}>
                    <PhoneFrame
                      src="/app/today.jpg"
                      alt="Kusin Today: tonight's dinner suggestion"
                      overlay={<Sheen active={sheen} />}
                    />
                  </motion.div>
                </div>
                <SidePhone side="right" x={rightXPct} rotate={rightRotate} scale={sideScale} opacity={sideOpacity}>
                  <motion.div style={pinned ? { y: liftY } : undefined}>
                    <PhoneFrame src="/app/plan.jpg" alt="Kusin week plan: seven days planned" />
                  </motion.div>
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

            {/* The zoom's landing: why tonight's dinner was picked. */}
            {pinned && (
              <>
                <motion.div
                  style={{ opacity: leftCopyOpacity, y: leftCopyY, width: `calc(50% - ${phoneHalf}px - 6% - 56px)` }}
                  className="pointer-events-none absolute left-[6%] top-1/2 z-20 -translate-y-1/2"
                >
                  <Eyebrow tone="sage">Tonight</Eyebrow>
                  <p className="display mt-3 text-[clamp(34px,3.2vw,52px)] font-bold leading-[1.02] text-white">
                    Dinner, <span className="accent-word-light">decided.</span>
                  </p>
                  <p className="mt-4 max-w-[340px] text-[16px] leading-[1.6] text-white/70">
                    One suggestion when you open the app, with the reasons it fits your family and your fridge.
                  </p>
                </motion.div>
                <div
                  style={{ width: `calc(50% - ${phoneHalf}px - 6% - 56px)` }}
                  className="pointer-events-none absolute right-[6%] top-1/2 z-20 flex -translate-y-1/2 flex-col items-start gap-3"
                >
                  <ReasonCard icon="fridge" title="Uses 3 items expiring Tue" sub="Spinach, tomatoes, yam" progress={p} at={0.76} />
                  <ReasonCard icon="heart" title="Mum: iron + protein" sub="Gentle on recovery" progress={p} at={0.8} />
                  <ReasonCard icon="clock" title="Ready in 35 min" sub="Serves 4" progress={p} at={0.84} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 md:px-10 md:pb-10">
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

          <Reveal delay={0.1} className="h-full">
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

          <Reveal delay={0.2} className="h-full md:col-span-2 lg:col-span-1">
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
      </div>
    </section>
  );
}
