import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  title: "Md Ashkarul Azim — Apparel Quality Control & Inspection Professional",
  description:
    "Portfolio of Md Ashkarul Azim, Quality Control Engineer at V-Trust Inspection Service Ltd. Apparel inspection, factory audits, production monitoring and continuous improvement.",
};

export const viewport: Viewport = { themeColor: "#101010" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable} ${instrument.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
