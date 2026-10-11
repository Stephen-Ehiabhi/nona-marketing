"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

/** The Kusin icon: a cloche on a slightly tilted bowl, over a plate on a
 *  short foot. Same geometry as paintKusinMark() in the app. */
export function KusinMark({
  size = 24,
  className,
  style,
}: {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden
    >
      <path d="M32.24 46.31 A18 18 0 1 1 55.74 51.73 Z" />
      <path d="M-32 0 A32 21 0 0 0 32 0 Z" transform="translate(50 54) rotate(13)" />
      <path d="M10 75 L90 75 Q82 83 64 84.5 L36 84.5 Q18 83 10 75 Z" />
      <rect x="41" y="87.5" width="18" height="4" rx="0.8" />
    </svg>
  );
}

export function KusinLogo({
  height = 24,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap: height * 0.28 }}
      aria-label="Kusin"
      role="img"
    >
      <KusinMark size={height * 1.15} />
      <span
        className="font-display font-extrabold leading-none"
        style={{ fontSize: height * 1.05, letterSpacing: "-0.03em" }}
        aria-hidden
      >
        kusin
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Icons (Lucide paths, 1.5px line)                                    */
/* ------------------------------------------------------------------ */

const ICONS = {
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  chefHat: <><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" /><path d="M6 17h12" /></>,
  receipt: <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></>,
  calendar: <><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>,
  shuffle: <><path d="m18 14 4 4-4 4" /><path d="m18 2 4 4-4 4" /><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" /><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" /><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" /></>,
  lock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  unlock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" /></>,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  bag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>,
  camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  fridge: <><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" /><path d="M5 10h14" /><path d="M15 7v6" /></>,
  barcode: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 7v10" /><path d="M12 7v10" /><path d="M17 7v10" /></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  volume: <><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></>,
  timer: <><line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  undo: <><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /></>,
  book: <><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></>,
  store: <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /></>,
  phone: <><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></>,
  menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Layout bits                                                         */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "light" | "sage";
  className?: string;
}) {
  const color =
    tone === "light" ? "text-white/70" : tone === "sage" ? "text-sage" : "text-ink3";
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color} ${className}`}>
      {children}
    </p>
  );
}

/** Fade and lift into view once. Off when the reader prefers less motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/* iPhone 17 Pro proportions in a 1000-unit-wide body (side buttons stick
 * out 12 units, hence the 1024-wide viewBox). The 1206 x 2622 screenshot
 * fills a 932 x 2026 display; around it sit a 20-unit black border and a
 * 14-unit metal band. Display corners match the device's 62pt radius. */
const BODY_H = 2094;
const SCREEN = { x: 34, y: 34, w: 932, h: 2026, r: 144 };
const OUTER_R = SCREEN.r + SCREEN.x;
const BAND = 14;
const PHONE_TONES = {
  graphite: {
    band: ["#77787d", "#3a3b3f", "#202124", "#2c2d31", "#6c6d72"],
    edge: "rgba(255,255,255,0.5)",
    glassEdge: "rgba(255,255,255,0.14)",
    button: ["#26272a", "#707176", "#202124"],
    antenna: "#9a9ba0",
  },
  silver: {
    band: ["#fafafa", "#d9dadc", "#c3c4c7", "#d6d7d9", "#f3f3f4"],
    edge: "rgba(255,255,255,0.95)",
    glassEdge: "rgba(255,255,255,0.35)",
    button: ["#b3b4b7", "#f4f4f5", "#a5a6a9"],
    antenna: "#ececed",
  },
} as const;

/** A real app screenshot in a realistic iPhone 17 Pro: polished metal band
 *  with a chamfer highlight, a thin black border, the glass edge catching
 *  the light, side buttons, antenna lines, soft cover-glass glare and a
 *  two-layer shadow. The screenshot carries its own status bar and
 *  Dynamic Island. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  eager = false,
  tone = "graphite",
  shadow = true,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  tone?: keyof typeof PHONE_TONES;
  shadow?: boolean;
}) {
  const t = PHONE_TONES[tone];
  const id = `pf-${tone}`;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const button = (side: "l" | "r", top: number, height: number, width = 14) => (
    <rect
      x={side === "l" ? -9 : 1009 - width}
      y={top * BODY_H}
      width={width}
      height={height * BODY_H}
      rx={width / 2.4}
      fill={`url(#${id}-btn-${side})`}
    />
  );
  return (
    <div
      className={`relative ${className}`}
      style={{
        aspectRatio: `1024 / ${BODY_H}`,
        filter: shadow
          ? "drop-shadow(0 50px 50px rgba(15,14,13,0.26)) drop-shadow(0 12px 14px rgba(15,14,13,0.2))"
          : undefined,
      }}
    >
      <svg viewBox={`-12 0 1024 ${BODY_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.band[0]} />
            <stop offset="0.16" stopColor={t.band[1]} />
            <stop offset="0.5" stopColor={t.band[2]} />
            <stop offset="0.84" stopColor={t.band[3]} />
            <stop offset="1" stopColor={t.band[4]} />
          </linearGradient>
          <radialGradient id={`${id}-spec`} cx="0.12" cy="0.04" r="0.5">
            <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {(["l", "r"] as const).map((side) => (
            <linearGradient key={side} id={`${id}-btn-${side}`} x1={side === "l" ? 0 : 1} y1="0" x2={side === "l" ? 1 : 0} y2="0">
              <stop offset="0" stopColor={t.button[0]} />
              <stop offset="0.55" stopColor={t.button[1]} />
              <stop offset="1" stopColor={t.button[2]} />
            </linearGradient>
          ))}
        </defs>

        {/* Action button, volume up and down (left); side button and
            Camera Control (right). */}
        {button("l", 0.178, 0.049)}
        {button("l", 0.262, 0.086)}
        {button("l", 0.366, 0.086)}
        {button("r", 0.306, 0.138)}
        {button("r", 0.592, 0.1, 11)}

        {/* Metal band */}
        <rect x="0" y="0" width="1000" height={BODY_H} rx={OUTER_R} fill={`url(#${id}-band)`} />
        <rect x="0" y="0" width="1000" height={BODY_H} rx={OUTER_R} fill={`url(#${id}-spec)`} />
        <rect x="2" y="2" width="996" height={BODY_H - 4} rx={OUTER_R - 2} fill="none" stroke={t.edge} strokeWidth="2.5" />

        {/* Antenna lines across the band */}
        {[0.112, 0.888].map((y) => (
          <g key={y} fill={t.antenna} opacity="0.5">
            <rect x="0" y={y * BODY_H} width={BAND} height="7" />
            <rect x={1000 - BAND} y={y * BODY_H} width={BAND} height="7" />
          </g>
        ))}
        <rect x="300" y={BODY_H - BAND} width="7" height={BAND} fill={t.antenna} opacity="0.5" />

        {/* Black border under the glass, and the glass edge catching light */}
        <rect x={BAND} y={BAND} width={1000 - BAND * 2} height={BODY_H - BAND * 2} rx={OUTER_R - BAND} fill="#020202" />
        <rect
          x={BAND + 1}
          y={BAND + 1}
          width={1000 - BAND * 2 - 2}
          height={BODY_H - BAND * 2 - 2}
          rx={OUTER_R - BAND - 1}
          fill="none"
          stroke={t.glassEdge}
          strokeWidth="2"
        />
      </svg>

      {/* Display */}
      <div
        className="absolute overflow-hidden bg-ink"
        style={{
          left: pct(SCREEN.x + 12, 1024),
          top: pct(SCREEN.y, BODY_H),
          width: pct(SCREEN.w, 1024),
          height: pct(SCREEN.h, BODY_H),
          borderRadius: `${pct(SCREEN.r, SCREEN.w)} / ${pct(SCREEN.r, SCREEN.h)}`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        {/* Cover glass: a faint, wide glare from the top left */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(122deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_20%,rgba(255,255,255,0)_34%)]" />
      </div>
    </div>
  );
}

export function Chip({
  children,
  tone = "surface",
  className = "",
}: {
  children: ReactNode;
  tone?: "surface" | "glass" | "warn" | "forest" | "line";
  className?: string;
}) {
  const tones = {
    surface: "bg-surface text-ink2",
    glass: "glass text-white",
    warn: "bg-warn-soft text-warn",
    forest: "bg-forest-soft text-forest",
    line: "bg-card text-ink2 border border-line",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-medium leading-none tracking-[0.01em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** The small accent marker used in front of AI suggestions in the app. */
export function AccentDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-2 w-2 rounded-full bg-[linear-gradient(135deg,#8dc29e,#3e6e4b)] shadow-[0_0_10px_rgba(141,194,158,0.8)] ${className}`}
    />
  );
}
