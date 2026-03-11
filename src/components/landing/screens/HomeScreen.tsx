import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";

export default function HomeScreen() {
  return (
    <div className="h-full bg-cream relative" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <StatusBar time="9:41" />

      <div className="px-5 pb-20">
        {/* Greeting */}
        <div className="mt-2">
          <p className="text-[10px] text-warm-500 font-medium tracking-wide uppercase">Good morning</p>
          <h2 className="mt-1 font-serif text-[20px] font-bold leading-tight text-warm-dark">
            You have 14 items.
            <br />
            Here&apos;s dinner.
          </h2>
        </div>

        {/* Scan CTA */}
        <div className="mt-4 rounded-[18px] bg-forest p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold">Scan your kitchen</p>
              <p className="text-[9px] text-white/50 mt-0.5">AI-powered ingredient detection</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Today&apos;s picks label */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-warm-500">
            Today&apos;s picks
          </p>
          <p className="text-[9px] font-medium text-burnt-orange">See all</p>
        </div>

        {/* Meal cards */}
        {[
          { name: "Shakshuka Bowl", time: "25 min", match: "96%", emoji: "🍳", bg: "bg-orange-50" },
          { name: "Lemon Herb Pasta", time: "18 min", match: "93%", emoji: "🍋", bg: "bg-yellow-50" },
          { name: "Green Thai Curry", time: "30 min", match: "88%", emoji: "🥬", bg: "bg-green-50" },
        ].map((meal, i) => (
          <div
            key={i}
            className="mt-2 flex items-center justify-between rounded-[14px] border border-warm-100 bg-white p-3"
          >
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl ${meal.bg} flex items-center justify-center text-base`}>
                {meal.emoji}
              </div>
              <div>
                <p className="text-[11px] font-bold text-warm-dark">{meal.name}</p>
                <p className="text-[9px] text-warm-400 mt-0.5 flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {meal.time}
                </p>
              </div>
            </div>
            <span className="text-[9px] font-bold bg-sage-light text-forest px-2 py-0.5 rounded-full">
              {meal.match}
            </span>
          </div>
        ))}

