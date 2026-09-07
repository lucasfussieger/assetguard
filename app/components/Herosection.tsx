import { ArrowUpRight } from "lucide-react";

import { QuoteButton } from "./quote-form";

const ctaClass =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-10 py-3.5 text-base font-semibold text-white hover:brightness-110 transition-all sm:min-w-[220px]";

export default function Herosection() {
  return (
    <section className="relative overflow-hidden rounded-b-4xl bg-white pt-12 pb-24 sm:pt-16 sm:pb-28">
      {/* Calor laranja discreto na base */}
      <div
        className="absolute -bottom-[30vw] right-[8vw] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-1) 16%, transparent) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-ink">
            Conectamos seu edifício à{" "}
            <span className="text-shimmer-brand">tecnologia</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-ink-soft leading-relaxed">
            A Viz reúne software e hardware em um único sistema: manutenções,
            reservas, comunicados, documentos e o monitoramento de recursos
            hídricos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
            <a
              href="#condominio"
              className={ctaClass}
            >
              Condomínios
              <ArrowUpRight
                size={20}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#construtora"
              className={ctaClass}
            >
              Construtoras
              <ArrowUpRight
                size={20}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <QuoteButton className={ctaClass}>
              Fazer orçamento
              <ArrowUpRight
                size={20}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </QuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
