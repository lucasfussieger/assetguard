import Link from "next/link";

import { QuoteButton } from "./quote-form";
import Wordmark from "./wordmark";

/** As mesmas âncoras no header e no rodapé. */
export const navLinks = [
  { href: "#solucao", label: "Solução" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#duvidas", label: "Dúvidas" },
];

/* Cápsula branca fixa no topo, sempre com a marca. Texto todo preto; só o botão é verde. */
export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="header-capsule pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full p-2 pl-5 sm:pl-6">
        <Link
          href="/"
          aria-label="Viz smart living, página inicial"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-5"
        >
          <Wordmark tone="mono" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-brand-5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Só aqui o botão é pílula, para acompanhar a cápsula do header */}
        <QuoteButton className="btn-primary rounded-full px-5 py-2.5 text-sm">
          Pedir orçamento
        </QuoteButton>
      </div>
    </header>
  );
}
