import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AssetGuard — Gestão Inteligente de Imóveis em SC",
  description:
    "Monitoramento inteligente, controle de acesso, manutenção preditiva e vistorias para proteger seu imóvel em Santa Catarina em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} h-full antialiased scroll-smooth`}
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
