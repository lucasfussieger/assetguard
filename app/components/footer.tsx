import { QuoteButton } from "./quote-form";

const links = [
  { href: "#condominio", label: "Condomínios" },
  { href: "#construtora", label: "Construtoras" },
  { href: "#missao", label: "Nosso compromisso" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="font-wordmark text-xl text-white">VIZ</span>
          <span className="font-tagline text-[10px] font-light uppercase tracking-[0.25em] text-brand-5">
            smart living
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <QuoteButton className="text-sm font-semibold text-brand-1 hover:text-brand-2 transition-colors">
            Fazer orçamento
          </QuoteButton>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Viz smart living. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
