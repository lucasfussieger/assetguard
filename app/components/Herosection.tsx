import { ArrowRight, Check } from "lucide-react";

import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";
import { DashboardPreview, LeakAlert, LiveDot } from "./viz-visuals";

const proofs = [
  "Instalação feita pela equipe Viz",
  "Para condomínios e construtoras",
];

export default function Herosection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white"
    >
      {/* Malha e luzes de fundo */}
      <div className="grid-faint mask-fade-y absolute inset-0 pointer-events-none" />
      <div
        className="absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 22%, transparent) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-56 left-[-12%] h-[34rem] w-[34rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-1) 12%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-8 lg:pt-24">
        <div>
          <h1 id="hero-title">
            <span className="flex items-center gap-2.5 text-sm font-semibold text-brand-4">
              <LiveDot />
              Monitoramento de água para condomínios
            </span>
            <span className="mt-5 block text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]">
              Veja a água do seu prédio{" "}
              <span className="text-shimmer-brand">em tempo real.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            A Viz mede o nível dos reservatórios e o consumo do hidrômetro e
            avisa no celular quando algo sai do normal. No mesmo app, cuida da
            gestão do condomínio.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <QuoteButton className="btn-primary group px-7 py-4 text-base">
              Pedir orçamento
              <ArrowRight
                size={18}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </QuoteButton>
            <a
              href="#como-funciona"
              className="btn-ghost border border-line bg-white px-7 py-4 text-base text-ink hover:border-brand-4/40 hover:bg-surface-soft"
            >
              Como funciona
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-6">
            {proofs.map((proof) => (
              <li
                key={proof}
                className="flex items-center gap-2 text-sm text-ink-soft"
              >
                <span className="grid size-5 place-items-center rounded-full bg-brand-5/15 text-brand-4">
                  <Check size={12} strokeWidth={3} />
                </span>
                {proof}
              </li>
            ))}
          </ul>
        </div>

        <Reveal
          immediate
          delay={0.15}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <DashboardPreview />
          <LeakAlert className="animate-float relative mx-auto -mt-6 sm:absolute sm:-bottom-16 sm:-right-8 sm:mt-0 lg:-right-6" />
        </Reveal>
      </div>
    </section>
  );
}
