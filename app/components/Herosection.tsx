import { ArrowUpRight } from "lucide-react";

export default function Herosection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">

      {/* Luz laranja em meia lua no topo */}
      <div
        className="absolute -top-[38vw] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--gold) 12%, transparent) 0%, color-mix(in srgb, var(--gold) 8%, transparent) 25%, color-mix(in srgb, var(--gold) 4%, transparent) 50%, color-mix(in srgb, var(--gold) 1.5%, transparent) 70%, transparent 90%)",
          filter: "blur(70px)",
        }}
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center">
        <div className="max-w-4xl text-center">
          <h1 className="!text-4xl m- !lg:text-7xl mb-8 font-semibold leading-tight text-white">
            Transformando edifícios em
            <br />
             <span className="text-shimmer-gold">
              Smart Buidings
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg text-zinc-600">
            Nascemos da vontade de modernizar a construção civil e a gestão
            predial, trazendo conforto, controle e dados para os envolvidos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#construtora"
              className="px-6 py-2.5 rounded-full text-xl text-white hover:text-zinc-600 transition-colors text-center flex items-center justify-center gap-2"
            >
              Para construtoras
              <ArrowUpRight size={50} strokeWidth={1} />
            </a>
            <a
              href="#condominio"
              className="px-6 py-2.5 rounded-full text-xl text-white hover:text-zinc-600 transition-colors text-center flex items-center justify-center gap-2"
            >
              Para condomínios
              <ArrowUpRight size={50} strokeWidth={1} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
