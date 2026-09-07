import type { Metadata } from "next";
import { Poppins, Inter, Black_Ops_One } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-black-ops",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Viz smart living | Gestão condominial com monitoramento hídrico",
  description:
    "A Viz integra software e hardware na gestão condominial: manutenções, reservas, comunicados, documentos e o monitoramento do sistema hidráulico em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable} ${blackOpsOne.variable} h-full antialiased scroll-smooth`}
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Header />
        {children}
      </body>
    </html>
  );
}
