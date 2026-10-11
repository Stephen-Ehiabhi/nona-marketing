import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Kusin knows what's in your kitchen, plans Nigerian and Polish meals for everyone at the table, and changes course when someone says not tonight.";

export const metadata: Metadata = {
  title: "Kusin — A friend in the kitchen",
  description,
  applicationName: "Kusin",
  keywords: [
    "family meal planner",
    "Nigerian recipes",
    "Polish recipes",
    "receipt scanner",
    "pantry tracker",
    "shopping list",
    "postpartum meals",
  ],
  openGraph: {
    title: "Kusin — A friend in the kitchen",
    description,
    type: "website",
    siteName: "Kusin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kusin — A friend in the kitchen",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
