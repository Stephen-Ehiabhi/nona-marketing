import StatusBar from "./StatusBar";

export default function CookScreen() {
  return (
    <div className="h-full bg-cream relative" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <StatusBar time="18:24" />

      <div className="px-5 pb-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-warm-500 font-medium">Shakshuka Bowl</p>
          <span className="text-[10px] font-bold text-warm-400">Step 3/6</span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${s <= 3 ? "bg-burnt-orange" : "bg-warm-200"}`}
            />
          ))}
        </div>

        {/* Timer circle */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#F5EDE0" strokeWidth="4" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#C75B2A"
                strokeWidth="4"
                strokeDasharray="326.73"
                strokeDashoffset="109"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-[24px] font-bold text-warm-dark">4:32</span>
              <span className="text-[8px] text-warm-500 font-medium">remaining</span>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <div className="mt-4 text-center">
          <h3 className="font-serif text-[15px] font-bold text-warm-dark">Saut&eacute; the onions</h3>
          <p className="mt-1.5 text-[10px] text-warm-500 leading-relaxed px-3">
            Heat olive oil over medium heat. Add diced onions and cook until golden, stirring occasionally.
          </p>
        </div>

        {/* Ingredient used indicator */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-sage-light/50 rounded-full px-3 py-1.5">
            <span className="text-xs">🧅</span>
            <span className="text-[9px] font-semibold text-forest">-1 onion used</span>
          </div>
          <div className="flex items-center gap-2 bg-sage-light/50 rounded-full px-3 py-1.5">
            <span className="text-xs">🫒</span>
            <span className="text-[9px] font-semibold text-forest">-2 tbsp oil</span>
          </div>
        </div>

        {/* Voice control */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-warm-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-burnt-orange flex items-center justify-center shadow-lg shadow-burnt-orange/30">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
