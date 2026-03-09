"use client";

import { useReveal } from "@/hooks/useReveal";

const stories = [
  {
    emoji: "🚗",
    scenario: "7pm, no plan",
    quote: "Got home exhausted. Opened Nona, scanned the fridge, tapped a 15-minute pasta. Eating by 7:20. This used to be a 45-minute ordeal of scrolling recipes.",
    name: "Kasia M.",
    role: "Product manager, Warsaw",
  },
  {
    emoji: "👶",
    scenario: "Picky eaters",
    quote: "My 4-year-old won\u2019t eat anything green. My husband is dairy-free. Nona still finds meals we all sit down to. I didn\u2019t think that was possible.",
    name: "Tomek R.",
    role: "Father of two, Krak\u00f3w",
  },
  {
    emoji: "🏋️",
    scenario: "Hitting macros",
    quote: "I used to spend Sunday afternoon meal-prepping with a spreadsheet. Now I just scan what I bought and Nona hits my protein targets automatically.",
    name: "Ania K.",
    role: "Fitness coach, Gdansk",
  },
  {
    emoji: "🗑️",
    scenario: "Waste wake-up call",
    quote: "I tracked my food waste for a month before Nona: 340 PLN in the bin. Month two with Nona: under 40. That\u2019s not an exaggeration.",
    name: "Marek S.",
    role: "Student, Wroclaw",
  },
];

export default function Testimonials() {
  useReveal();

  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            Real Stories
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1] max-w-lg mx-auto">
            People are cooking{" "}
            <span className="text-gray-300">differently now.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 stagger-children">
          {stories.map((story, i) => (
            <div
              key={i}
              className="reveal group rounded-[20px] border border-gray-200 bg-white p-6 md:p-7 transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
            >
              {/* Scenario badge */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-2xl">{story.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                  {story.scenario}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[14px] font-medium leading-[1.7] text-gray-700 min-h-[80px]">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500">
                    {story.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold">{story.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{story.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
