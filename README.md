# Kusin — marketing site

The landing page for **Kusin**, a friend in the kitchen: a family kitchen assistant that knows what's at home, plans Nigerian and Polish meals for everyone at the table, and changes course when someone says not tonight.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · framer-motion · Firebase (beta signups).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `src/app/page.tsx` — the page, section by section
- `src/components/site/` — the sections (Hero, DishRail, HowItWorks, Week, NotTonight, Family, Showcase, Trust, FAQ, FinalCTA, Footer) and shared bits in `ui.tsx` (Kusin mark, icons, phone frame, reveal)
- `src/components/SignupModal.tsx`, `BetaSignup.tsx` — the beta signup; answers go to the `beta_signups` collection in Firestore
- `src/lib/photos.ts` — food photography (Pexels)
- `src/app/globals.css` — Kusin tokens and fluid type sizes
- `public/app/` — real app screenshots

## Brand rules

These match the app's design system (`CLAUDE.md` in the app repo):

- Ink on warm paper (`#F7F5F2`); actions in Kusin Forest green (`#2F5A3C`); deep green (`#1E3219`) with one oversized mark for brand sections.
- Figtree for display, Inter for text. One italic word per headline may carry the green accent.
- **No stock people.** Food, ingredients and kitchen scenes only (hands are fine). Check new photos for faces before adding them.
- App screenshots come from the simulator with demo avatars blanked.
- No invented testimonials, stats or prices.
