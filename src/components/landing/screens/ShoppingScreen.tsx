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

