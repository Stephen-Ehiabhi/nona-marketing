import { KusinLogo } from "./ui";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "The week", href: "#week" },
  { label: "Family", href: "#family" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-16 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <KusinLogo height={26} className="text-ink" />
            <p className="display mt-4 text-[22px] font-semibold tracking-[-0.01em] text-ink2">
              A friend in the kitchen.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[14px] font-medium text-ink2 transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink3 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Kusin. Cooking ideas, not medical advice.</span>
          <span>Food photography from Pexels.</span>
        </div>
      </div>
    </footer>
  );
}
