"use client";

/* eslint-disable @next/next/no-img-element */
import { photo, type PhotoKey } from "@/lib/photos";
import { Eyebrow, Icon, Reveal } from "./ui";

const DISHES: { name: string; cuisine: "Nigerian" | "Polish"; mins: number; key: PhotoKey }[] = [
  { name: "Egusi soup", cuisine: "Nigerian", mins: 45, key: "egusi" },
  { name: "Pierogi ruskie", cuisine: "Polish", mins: 60, key: "pierogi" },
  { name: "Pepper soup", cuisine: "Nigerian", mins: 35, key: "pepperSoup" },
  { name: "Żurek", cuisine: "Polish", mins: 50, key: "zurek" },
  { name: "Jollof rice", cuisine: "Nigerian", mins: 50, key: "jollof" },
  { name: "Zupa pomidorowa", cuisine: "Polish", mins: 30, key: "pomidorowa" },
  { name: "Suya", cuisine: "Nigerian", mins: 30, key: "suya" },
  { name: "Dodo", cuisine: "Nigerian", mins: 15, key: "plantain" },
  { name: "Ogi & akara", cuisine: "Nigerian", mins: 25, key: "ogi" },
  { name: "Rice & skewers", cuisine: "Nigerian", mins: 40, key: "friedRice" },
  { name: "Beef stew", cuisine: "Nigerian", mins: 60, key: "beefStew" },
];

function DishCard({ d }: { d: (typeof DISHES)[number] }) {
  return (
    <div className="group relative h-[340px] w-[250px] shrink-0 overflow-hidden rounded-[32px] bg-surface md:h-[380px] md:w-[280px]">
      <img
        src={photo(d.key, 700)}
        alt={d.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(15,14,13,0.6),rgba(15,14,13,0))]" />
      <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-card px-4 py-2 text-[14px] font-semibold text-ink shadow-[0_4px_12px_rgba(15,14,13,0.12)]">
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
              Nigerian classics. Polish comfort. <span className="accent-word">Both</span> at home.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[360px] text-[16px] leading-[1.6] text-ink2">
              Egusi on Tuesday, żurek on Saturday, and nobody has to translate. Kusin cooks the way
              your family already eats.
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
    </section>
  );
}
