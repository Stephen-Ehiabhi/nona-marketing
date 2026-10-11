"use client";

import { Eyebrow, Icon, type IconName, Reveal } from "./ui";

const POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Health details are opt-in",
    body: "Postpartum and health questions only appear if you say yes. Answers stay private to that person, and you can delete them whenever you like.",
  },
  {
    icon: "leaf",
    title: "Ideas, not prescriptions",
    body: "Kusin suggests meals, not medical advice. Support for new mums follows published guidance — no weight-loss plans in the first six weeks, ever.",
  },
  {
    icon: "heart",
    title: "No guilt on the menu",
    body: "No streaks, no calorie headlines, no “bad food”. Jollof and pierogi are equally welcome — Kusin just suggests a gentler way to cook them.",
  },
];

export default function Trust() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-[720px]">
          <Eyebrow>Your table, your data</Eyebrow>
          <h2 className="display h-section mt-4 font-bold">
            Warm by nature. Private by <span className="accent-word">default.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {POINTS.map((p, n) => (
            <Reveal key={p.title} delay={n * 0.05}>
              <div className="h-full rounded-[24px] border border-line bg-card p-6 md:flex md:gap-6 md:p-7 lg:block">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-forest-soft text-forest">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <p className="display mt-6 text-[21px] font-semibold leading-tight tracking-[-0.01em] md:mt-1 lg:mt-6">{p.title}</p>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-[1.6] text-ink2">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
