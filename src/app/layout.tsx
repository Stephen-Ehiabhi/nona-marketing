import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nona — Scan. Plan. Cook.",
  description:
    "Point your camera at your kitchen. Nona plans your meals with AI. Scan your fridge, get personalized dinner ideas, and cook with a live AI chef. Less waste, better meals, zero guesswork.",
  keywords: [
    "meal planning app",
    "AI kitchen assistant",
    "food waste reduction",
    "recipe suggestions",
    "smart cooking",
    "fridge scanner",
    "inventory tracking",
    "shopping list generator",
  ],
  openGraph: {
    title: "Nona — Scan. Plan. Cook.",
    description:
      "Point your camera at your kitchen. Nona plans your meals with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
