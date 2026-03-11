"use client";

interface StoreBadgesProps {
  theme?: "dark" | "light";
  className?: string;
}

export default function StoreBadges({ theme = "dark", className = "" }: StoreBadgesProps) {
  const isDark = theme === "dark";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Apple App Store */}
      <a
        href="#"
        className={`inline-flex items-center gap-2.5 h-[44px] px-4 rounded-xl transition-opacity hover:opacity-80 ${
          isDark ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <svg width="18" height="22" viewBox="0 0 17 20" fill="currentColor">
          <path d="M13.545 10.239c-.022-2.234 1.823-3.306 1.906-3.358-.037-.054-1.496-2.167-3.822-2.167-1.626 0-2.953 1.063-3.727 1.063-.773 0-1.972-1.035-3.238-1.008C2.895 4.8 1.28 5.906.594 7.58c-1.376 2.698-.352 6.693.988 8.883.655.946 1.435 2.008 2.46 1.97 1.025-.038 1.413-.586 2.652-.586 1.239 0 1.6.586 2.69.568 1.063-.018 1.738-1.006 2.385-1.956.751-1.094 1.062-2.154 1.08-2.21-.024-.01-2.073-.795-2.095-3.154zM11.547 3.23c.544-.66.912-1.577.812-2.49-.784.032-1.733.522-2.296 1.18-.504.584-.946 1.516-.828 2.41.874.068 1.768-.444 2.312-1.1z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-[9px] leading-none opacity-60">Download on the</span>
          <span className="text-[14px] font-semibold leading-tight">App Store</span>
        </div>
      </a>

      {/* Google Play — monochrome to match brand */}
      <a
        href="#"
        className={`inline-flex items-center gap-2.5 h-[44px] px-4 rounded-xl border transition-opacity hover:opacity-80 ${
          isDark
            ? "border-white/20 text-white"
            : "border-black/10 text-black"
        }`}
      >
        <svg width="16" height="18" viewBox="0 0 18 20" fill="currentColor" opacity="0.7">
          <path d="M.55.81L9.83 10 .55 19.19c-.15-.2-.25-.45-.25-.73V1.54c0-.28.1-.53.25-.73z" />
          <path d="M13.14 6.69L9.83 10l-9.28-9.19C.85.51 1.25.38 1.68.58l11.46 6.11z" />
          <path d="M13.14 13.31L1.68 19.42c-.43.2-.83.07-1.13-.23L9.83 10l3.31 3.31z" />
          <path d="M17.2 10c0 .52-.28.99-.75 1.24l-3.31 1.76L9.83 10l3.31-3.31 3.31 1.76c.47.25.75.72.75 1.24z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-[9px] leading-none opacity-50">Get it on</span>
          <span className="text-[14px] font-semibold leading-tight">Google Play</span>
        </div>
      </a>
    </div>
  );
}
