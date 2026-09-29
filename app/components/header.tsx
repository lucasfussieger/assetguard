import Link from "next/link";

import { QuoteButton } from "./quote-form";

const links = [
  { href: "#solucao", label: "Monitoramento" },
  { href: "#gestao", label: "Gestão" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span
        className={`font-wordmark text-2xl ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
      >
        VIZ
      </span>{" "}
      {/* o espaço não aparece no flex, mas faz leitores lerem "VIZ smart living" */}
      <span
        className={`mt-1 font-tagline text-[9px] font-light uppercase tracking-[0.28em] ${
          tone === "dark" ? "text-brand-4" : "text-brand-5"
        }`}
      >
        smart living
      </span>
    </span>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link href="/" aria-label="Viz smart living, página inicial">
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <QuoteButton className="btn-primary px-5 py-2.5 text-sm">
          Pedir orçamento
        </QuoteButton>
      </div>
    </header>
  );
}
