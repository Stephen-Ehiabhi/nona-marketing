"use client";

/* eslint-disable @next/next/no-img-element */
import { photo, type PhotoKey } from "@/lib/photos";
import { Eyebrow, Icon, Reveal } from "./ui";

const DISHES: { name: string; cuisine: string; mins: number; key: PhotoKey }[] = [
  { name: "Jollof rice", cuisine: "Nigerian", mins: 50, key: "jollof" },
  { name: "Shoyu ramen", cuisine: "Japanese", mins: 30, key: "ramen" },
  { name: "Pierogi ruskie", cuisine: "Polish", mins: 60, key: "pierogi" },
  { name: "Chicken tacos", cuisine: "Mexican", mins: 30, key: "tacos" },
  { name: "Biryani", cuisine: "Indian", mins: 60, key: "biryani" },
  { name: "Egusi soup", cuisine: "Nigerian", mins: 45, key: "egusi" },
  { name: "Spaghetti al pomodoro", cuisine: "Italian", mins: 20, key: "spaghetti" },
  { name: "Pad kra pao", cuisine: "Thai", mins: 20, key: "padKraPao" },
  { name: "Waakye", cuisine: "Ghanaian", mins: 50, key: "waakye" },
  { name: "Pho", cuisine: "Vietnamese", mins: 45, key: "pho" },
  { name: "Żurek", cuisine: "Polish", mins: 50, key: "zurek" },
  { name: "Paella", cuisine: "Spanish", mins: 45, key: "paella" },
  { name: "Chow mein", cuisine: "Chinese", mins: 20, key: "chowMein" },
  { name: "Gyoza", cuisine: "Japanese", mins: 35, key: "gyoza" },
  { name: "Malai kofta", cuisine: "Indian", mins: 45, key: "kofta" },
  { name: "Suya", cuisine: "Nigerian", mins: 30, key: "suya" },
];

// A sample of the 170 cuisines people can pick in onboarding.
const CUISINES = [
  "Nigerian", "Polish", "Japanese", "Mexican", "Indian", "Italian", "Ghanaian",
  "Thai", "Ethiopian", "Lebanese", "Korean", "Jamaican", "Vietnamese", "Spanish",
  "Moroccan", "Chinese", "Greek", "Turkish", "Senegalese", "Peruvian", "French",
  "Filipino", "Ukrainian", "Brazilian", "Persian", "Kenyan", "Georgian", "Cuban",
];

function DishCard({ d }: { d: (typeof DISHES)[number] }) {
  return (
    <div className="group relative h-[340px] w-[250px] shrink-0 overflow-hidden rounded-[32px] bg-surface md:h-[380px] md:w-[280px]">
      <img
        src={photo(d.key, 700)}
        alt={d.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(15,14,13,0.6),rgba(15,14,13,0))]" />
      <span className="absolute left-1/2 top-4 max-w-[86%] -translate-x-1/2 truncate whitespace-nowrap rounded-full bg-card px-4 py-2 text-[14px] font-semibold text-ink shadow-[0_4px_12px_rgba(15,14,13,0.12)]">
        {d.name}
      </span>
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
          {d.cuisine}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/85">
          <Icon name="clock" size={14} />
          {d.mins} min
        </span>
      </div>
    </div>
  );
}

export default function DishRail() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>On the table</Eyebrow>
            <h2 className="display h-section mt-4 max-w-[760px] font-bold">
              Jollof to ramen. <span className="accent-word">Anything</span> your family loves.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[380px] text-[16px] leading-[1.6] text-ink2">
              Pick your cuisines when you set up, from 170 of them, and change them whenever you
              like. Kusin plans with the dishes your family actually eats.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <div className="drift flex w-max gap-4 pl-4">
          {[...DISHES, ...DISHES].map((d, n) => (
            <DishCard key={`${d.key}-${n}`} d={d} />
          ))}
        </div>
      </div>

      {/* Cuisine names drifting the other way */}
      <div
        aria-label={`Cuisines include ${CUISINES.join(", ")} and more`}
        className="relative mt-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="drift-reverse flex w-max gap-2 pl-2" aria-hidden>
          {[...CUISINES, ...CUISINES].map((c, n) => (
            <span
              key={`${c}-${n}`}
              className="whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-[14px] font-medium text-ink2"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
