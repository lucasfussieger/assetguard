import { WHATSAPP_URL } from "../lib/whatsapp";
import { Wordmark } from "./header";
import { QuoteButton } from "./quote-form";

const links = [
  { href: "#solucao", label: "Monitoramento" },
  { href: "#gestao", label: "Gestão" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Footer() {
  return (
    <footer className="bg-abyss">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-6 pb-14 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-xs">
          <Wordmark tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            Smart living para condomínios: a água do prédio em tempo real e a
            gestão do dia a dia no mesmo app.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <QuoteButton className="text-sm font-semibold text-brand-1 transition-colors hover:text-brand-2">
                Pedir orçamento
              </QuoteButton>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/40 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Viz smart living. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
