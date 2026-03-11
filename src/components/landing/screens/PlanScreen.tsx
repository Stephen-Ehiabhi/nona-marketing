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

