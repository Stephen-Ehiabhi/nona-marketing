"use client";

/* eslint-disable @next/next/no-img-element */
import { useSignupModal } from "../SignupModal";
import { photo, type PhotoKey } from "@/lib/photos";
import { Icon, KusinMark, Reveal } from "./ui";

const STACK: { key: PhotoKey; className: string }[] = [
  { key: "pierogi", className: "left-0 top-10 -rotate-[8deg]" },
  { key: "egusi", className: "right-0 top-0 rotate-[7deg]" },
  { key: "jollof", className: "left-1/2 top-24 -translate-x-1/2 rotate-[-1deg] z-10" },
];

export default function FinalCTA() {
  const { open } = useSignupModal();
  return (
    <section className="px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#1e3219_0%,#132210_100%)]">
        <KusinMark
          className="pointer-events-none absolute -bottom-[30%] -left-[8%] -z-10 h-[130%] w-auto rotate-[8deg] text-mark"
          style={{ aspectRatio: "1" }}
        />
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <h2 className="display h-feature font-bold text-white">
              Pull up a <span className="accent-word-light">chair.</span>
            </h2>
            <p className="mt-6 max-w-[460px] text-[18px] leading-[1.6] text-white/75">
              Join the beta and help shape what Kusin cooks next. Free while we&apos;re in beta.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={open}
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-semibold tracking-[0.02em] text-castiron transition-colors hover:bg-forest-soft"
              >
                Join the beta
                <Icon name="arrowRight" size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="flex items-center gap-2 text-[14px] text-white/60">
                <Icon name="phone" size={17} />
                iPhone and Android
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto hidden h-[400px] w-full max-w-[440px] md:block">
            {STACK.map((s) => (
              <div
                key={s.key}
                className={`absolute h-[280px] w-[210px] overflow-hidden rounded-[28px] border-4 border-white/90 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ${s.className}`}
              >
                <img src={photo(s.key, 600)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
