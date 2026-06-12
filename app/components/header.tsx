import { ArrowUpRight } from "lucide-react";

import { WHATSAPP_URL } from "../lib/whatsapp";

export default function Header() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-950 h-16 flex items-center justify-between">
        {/* Nome */}
        <a href="/" className="flex items-center">
          <span className="font-bold text-xl tracking-tight text-gold">
            AssetGuard
          </span>
        </a>

        {/* Índices */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <a href="#construtora" className="text-sm hover:text-white transition-colors">
            Construtora
          </a>
          <a href="#condominio" className="text-sm hover:text-white transition-colors">
            Condomínio
          </a>
          <a href="#como-funciona" className="text-sm hover:text-white transition-colors">
            Como funciona
          </a>
        </div>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:text-white transition-colors flex items-center gap-1"
        >
          Fazer cotação
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </a>
      </div>
    </nav>
  );
}
