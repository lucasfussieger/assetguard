import { CONTACT_PHONE_DISPLAY } from "../lib/site";
import { WHATSAPP_URL } from "../lib/whatsapp";
import { PreferenciasDeCookies } from "./cookies";
import { navLinks } from "./header";
import { QuoteButton } from "./quote-form";
import Wordmark from "./wordmark";

/* Rodapé branco em linha: a marca à esquerda, os links à direita. */
export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            Gestão do condomínio e monitoramento da água, num app só.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
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
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <QuoteButton className="text-sm font-semibold text-neutral-950 underline decoration-brand-5/50 underline-offset-4 transition-colors hover:decoration-brand-4">
                Pedir orçamento
              </QuoteButton>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-neutral-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Viz smart living. Todos os direitos
            reservados.
          </p>
          <p className="flex gap-4">
            <PreferenciasDeCookies className="transition-colors hover:text-neutral-950" />
            <span className="tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
