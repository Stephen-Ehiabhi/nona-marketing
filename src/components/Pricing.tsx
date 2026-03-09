"use client";

import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "",
    badge: null,
    description: "See if the hype is real. No card needed.",
    features: [
      "5 kitchen scans / month",
      "1 meal recommendation / day",
      "Basic inventory tracking",
      "Step-by-step cooking mode",
      "Single user",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "29",
    period: "PLN / mo",
    badge: "Most Popular",
    description: "For people who are done wondering what\u2019s for dinner.",
    features: [
      "Unlimited kitchen scans",
      "3 meals / day with AI matching",
      "Full inventory + expiry tracking",
      "Voice-guided cooking mode",
      "Smart shopping lists",
      "Meal history + ratings",
      "Priority support",
    ],
    cta: "Join Waitlist",
    highlighted: true,
  },
  {
    name: "Family",
    price: "49",
    period: "PLN / mo",
    badge: null,
    description: "One subscription, every mouth in the house fed.",
    features: [
      "Everything in Plus",
      "Up to 5 family members",
      "Multi-diet meal planning",
      "Shared inventory sync",
      "Auto portion scaling",
      "Weekly meal reports",
      "Family shopping lists",
    ],
    cta: "Join Waitlist",
    highlighted: false,
  },
];

export default function Pricing() {
  useReveal();

  return (
    <section id="pricing" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20 reveal">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            Pricing
          </p>
          <h2 className="font-serif text-[32px] md:text-[48px] font-extrabold leading-[1.1]">
            Less than a takeaway.
          </h2>
          <p className="mt-4 text-[15px] text-gray-500">
            Nona pays for itself in the food you stop throwing away. Start free, upgrade when it clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto stagger-children">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal relative rounded-[24px] p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                plan.highlighted
                  ? "bg-black text-white shadow-2xl shadow-black/20 border-2 border-black md:scale-[1.03]"
                  : "bg-gray-50 border border-gray-200 hover:shadow-xl hover:shadow-black/5"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-bold shadow-lg whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-[15px] font-bold">{plan.name}</h3>

              <div className="mt-5 flex items-baseline gap-2">
                {plan.price === "0" ? (
                  <span className="font-serif text-[42px] font-extrabold leading-none">
                    Free
                  </span>
                ) : (
                  <>
                    <span className="font-serif text-[42px] font-extrabold leading-none">
                      {plan.price}
                    </span>
                    <span className={`text-[13px] font-medium ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.period}
                    </span>
                  </>
                )}
              </div>

              <p className={`mt-3 text-[13px] leading-relaxed ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                {plan.description}
              </p>

              <div className={`mt-6 h-px ${plan.highlighted ? "bg-white/10" : "bg-gray-200"}`} />

              <ul className="mt-6 flex-1 space-y-3.5">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-[13px]">
                    <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                      plan.highlighted ? "bg-white/15" : "bg-black"
                    }`}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={plan.highlighted ? "white" : "white"}
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className={plan.highlighted ? "text-gray-300" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#download"
                className={`mt-8 inline-flex items-center justify-center h-[48px] rounded-full text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-white text-black hover:shadow-lg hover:shadow-white/20"
                    : "bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
