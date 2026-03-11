import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const meals = [
  { day: "Mon", items: [{ emoji: "🍳", name: "Shakshuka" }, { emoji: "🥗", name: "Greek Bowl" }, { emoji: "🍝", name: "Aglio e Olio" }] },
  { day: "Tue", items: [{ emoji: "🥞", name: "Pancakes" }, { emoji: "🌯", name: "Wrap" }, { emoji: "🍛", name: "Curry" }] },
  { day: "Wed", items: [{ emoji: "🥣", name: "Oatmeal" }, { emoji: "🥙", name: "Falafel" }, { emoji: "🍲", name: "Stew" }] },
  { day: "Thu", items: [{ emoji: "🧇", name: "Waffles" }, { emoji: "🥗", name: "Cobb Salad" }, { emoji: "🍕", name: "Pizza" }] },
];

export default function PlanScreen() {
  return (
    <div className="h-full bg-cream relative" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <StatusBar time="8:30" />

      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mt-1">
          <h2 className="font-serif text-[18px] font-bold text-warm-dark">This Week</h2>
          <span className="text-[9px] font-bold text-burnt-orange bg-burnt-orange/10 px-2.5 py-1 rounded-full">
            Auto-planned ✨
          </span>
        </div>

        {/* Day pills */}
        <div className="mt-3 flex gap-1 overflow-hidden">
          {days.map((d, i) => (
            <span
              key={d}
              className={`text-[9px] font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap ${
                i === 0 ? "bg-forest text-white" : "border border-warm-200 text-warm-500"
              }`}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Meal grid */}
        <div className="mt-3 space-y-2">
          {meals.map((day) => (
            <div key={day.day} className="rounded-[14px] border border-warm-100 bg-white p-3">
              <p className="text-[9px] font-bold text-warm-500 uppercase tracking-wider">{day.day}</p>
              <div className="mt-2 flex gap-2">
                {day.items.map((meal, j) => (
                  <div key={j} className="flex-1 text-center">
                    <div className="text-lg">{meal.emoji}</div>
                    <p className="text-[8px] font-medium text-warm-600 mt-0.5 leading-tight">{meal.name}</p>
                    <p className="text-[7px] text-warm-400 mt-0.5">
                      {j === 0 ? "Breakfast" : j === 1 ? "Lunch" : "Dinner"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Generate button */}
        <button className="mt-3 w-full h-9 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Regenerate Week
        </button>
      </div>

      <BottomNav active={2} />
    </div>
  );
}
