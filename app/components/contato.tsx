import { ArrowUpRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5548999999999";

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative bg-zinc-950 py-32 overflow-hidden"
    >
      {/* Luz dourada de fundo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--gold) 10%, transparent) 0%, color-mix(in srgb, var(--gold) 4%, transparent) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
          Vamos dar o próximo passo para tornar seu prédio um{" "}
          <span className="text-shimmer-gold">smart building?</span>
        </h2>

        <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
          Entre em contato conosco e faça sua cotação sem compromisso.
        </p>

        <div className="flex justify-center mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-xl text-white hover:text-zinc-600 transition-colors flex items-center justify-center gap-2"
          >
            Entrar em contato
            <ArrowUpRight size={50} strokeWidth={1} />
          </a>
        </div>
      </div>
    </section>
  );
}
