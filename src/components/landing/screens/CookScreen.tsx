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

