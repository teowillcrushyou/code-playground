import type { Metadata } from "next";
import { Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Teo Is The Winner! | Play Big. Win Bigger.",
  description:
    "Welcome to Teo's game world—wild rides, blocky adventures, and new challenges made for players who never stop exploring.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
