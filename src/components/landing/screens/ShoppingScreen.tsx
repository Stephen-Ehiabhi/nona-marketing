import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";

const categories = [
  {
    name: "Produce",
    items: [
      { name: "Tomatoes", qty: "x6", checked: false },
      { name: "Fresh basil", qty: "1 bunch", checked: false },
      { name: "Lemons", qty: "x3", checked: true },
    ],
  },
  {
    name: "Dairy",
    items: [
      { name: "Feta cheese", qty: "200g", checked: false },
      { name: "Greek yogurt", qty: "500ml", checked: false },
    ],
  },
  {
    name: "Pantry",
    items: [
      { name: "Olive oil", qty: "500ml", checked: true },
      { name: "Cumin", qty: "1 jar", checked: false },
    ],
  },
];

export default function ShoppingScreen() {
  return (
    <div className="h-full bg-cream relative" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <StatusBar time="10:45" />

      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mt-1">
          <h2 className="font-serif text-[18px] font-bold text-warm-dark">Shopping List</h2>
          <span className="text-[9px] font-medium text-warm-500">
            8 items • 3 stores
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[8px] font-semibold text-forest bg-sage-light px-2 py-0.5 rounded-full">
            Auto-generated
          </span>
          <span className="text-[8px] text-warm-400">from this week&apos;s plan</span>
        </div>

        {/* Categories */}
        <div className="mt-4 space-y-3">
          {categories.map((cat) => (
            <div key={cat.name}>
              <p className="text-[9px] font-bold text-warm-500 uppercase tracking-wider mb-1.5">
                {cat.name}
              </p>
              <div className="space-y-1">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl bg-white border border-warm-100 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                          item.checked
                            ? "bg-forest border-forest"
                            : "border-warm-300"
                        }`}
                        style={{ width: 18, height: 18 }}
                      >
                        {item.checked && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          item.checked ? "text-warm-400 line-through" : "text-warm-dark"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[9px] text-warm-400 font-medium">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Share button */}
        <button className="mt-4 w-full h-9 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          Share with Family
        </button>
      </div>

      <BottomNav active={3} />
    </div>
  );
}
