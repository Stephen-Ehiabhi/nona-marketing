import StatusBar from "./StatusBar";

export default function ScanScreen() {
  return (
    <div className="h-full bg-warm-900 relative" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <StatusBar time="12:15" light />

      {/* Camera viewfinder */}
      <div className="relative mx-3 rounded-2xl bg-gradient-to-br from-warm-800 to-warm-900 aspect-[3/4] overflow-hidden">
        {/* Subtle gradient simulating a photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 via-warm-700/30 to-warm-brown/20" />

        {/* Scan frame corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-burnt-orange rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-burnt-orange rounded-tr-lg" />
        <div className="absolute bottom-16 left-4 w-6 h-6 border-b-2 border-l-2 border-burnt-orange rounded-bl-lg" />
        <div className="absolute bottom-16 right-4 w-6 h-6 border-b-2 border-r-2 border-burnt-orange rounded-br-lg" />

        {/* Scanning line */}
        <div
          className="absolute left-6 right-6 h-[1px]"
          style={{
            top: "40%",
            background: "linear-gradient(90deg, transparent, rgba(199,91,42,0.6), transparent)",
          }}
        />

        {/* Detected items */}
        <div className="absolute top-8 right-5 bg-white rounded-xl px-3 py-2 shadow-lg">
          <p className="text-[9px] font-bold text-warm-dark">Tomatoes</p>
          <p className="text-[8px] text-warm-500">x4 • Fresh</p>
        </div>
        <div className="absolute top-24 left-5 bg-white rounded-xl px-3 py-2 shadow-lg">
          <p className="text-[9px] font-bold text-warm-dark">Chicken</p>
          <p className="text-[8px] text-warm-500">~500g</p>
        </div>
        <div className="absolute bottom-24 right-6 bg-white rounded-xl px-3 py-2 shadow-lg">
          <p className="text-[9px] font-bold text-warm-dark">Basil</p>
          <p className="text-[8px] text-warm-500">Fresh herb</p>
        </div>
        <div className="absolute bottom-24 left-5 bg-white rounded-xl px-3 py-2 shadow-lg">
          <p className="text-[9px] font-bold text-warm-dark">Eggs</p>
          <p className="text-[8px] text-warm-500">x6</p>
        </div>

        {/* Bottom counter */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <p className="text-white text-[10px] font-medium">8 items detected</p>
            <div className="bg-burnt-orange text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full">
              Done ✓
            </div>
          </div>
        </div>
      </div>

      {/* Shutter button area */}
      <div className="flex justify-center py-5">
        <div className="w-14 h-14 rounded-full border-[3px] border-warm-400 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-burnt-orange" />
        </div>
      </div>
    </div>
  );
}
