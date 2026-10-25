import type { Metadata, Viewport } from "next";
import { Inter, Black_Ops_One } from "next/font/google";
import "./globals.css";
import Cookies from "./components/cookies";
import { QuoteProvider } from "./components/quote-form";
import Rastreador from "./components/rastreador";
import { structuredData } from "./lib/structured-data";
import {
  KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "./lib/site";

/** Fonte de toda a página. Variável: todos os pesos num arquivo só. */
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  // Código da propriedade no Google Search Console (Vercel > Environment Variables).
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  // A página abre na hero preta: a barra do navegador acompanha.
  themeColor: "#010405",
};

/*
 * Liga as animações de entrada antes da primeira pintura, sem piscar. Se o JS
 * do site não carregar, tira a classe e mostra tudo parado em vez de escondido.
 */
const revealScript = `(function(d){d.classList.add("js");addEventListener("load",function(){setTimeout(function(){if(!d.dataset.reveal)d.classList.remove("js")},3000)})})(document.documentElement)`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${blackOpsOne.variable} h-full antialiased scroll-smooth`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <QuoteProvider>{children}</QuoteProvider>
        <Rastreador />
        <Cookies />
      </body>
    </html>
  );
}
