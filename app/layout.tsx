import type { Metadata } from "next";
import { Instrument_Serif, Doto } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
});

export const metadata: Metadata = {
  title: "Usalatino Prime — Freelance legal review for U.S. attorneys",
  description:
    "Join the network: AI-prepared immigration case files, verdicts signed by you, paid per case. 100% remote, incorporated in Utah. Únete a la red de revisión legal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${doto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
