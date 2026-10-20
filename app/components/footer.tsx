import { WHATSAPP_URL } from "../lib/whatsapp";
import { navLinks } from "./header";
import { QuoteButton } from "./quote-form";
import Wordmark from "./wordmark";

/* Rodapé branco, como as seções acima; uma linha fina separa da última. */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 pt-14 pb-12 text-center sm:px-6 lg:px-8">
        <Wordmark />
        <p className="max-w-md text-balance text-sm leading-relaxed text-ink-soft">
          Gestão do condomínio e monitoramento da água, num app só.
        </p>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
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
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <QuoteButton className="text-sm font-semibold text-brand-2 transition-colors hover:text-brand-1">
                Pedir orçamento
              </QuoteButton>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-ink-faint sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Viz smart living. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
