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
  title: "Usalatino Prime · Abogados — Red de revisión legal migratoria",
  description:
    "Únete a la red de abogados revisores: expedientes migratorios pre-analizados con IA, veredictos con tu criterio y pago por revisión. 100% remoto, sede en Utah.",
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
