import { ArrowRight, Package, TriangleAlert } from "lucide-react";

import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";
import { DashboardPreview, Notice } from "./viz-visuals";

/** Atrasos negativos: as ondas já começam espalhadas, não saem juntas. */
const ripples = ["0s", "-3s", "-6s"];

export default function Herosection() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-night"
    >
      {/* Fundo: luz petróleo no alto, brilho quente num canto e linha d'água no pé */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, color-mix(in srgb, var(--brand-3) 70%, transparent) 0%, color-mix(in srgb, var(--brand-3) 16%, transparent) 50%, transparent 78%)",
          }}
        />
        <div
          className="absolute -bottom-48 -left-48 h-[38rem] w-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-2) 16%, transparent) 0%, color-mix(in srgb, var(--brand-1) 6%, transparent) 40%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-96"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, color-mix(in srgb, var(--brand-5) 26%, transparent) 0%, color-mix(in srgb, var(--brand-4) 10%, transparent) 45%, transparent 75%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      {/* O topo deixa espaço para o header fixo, que já traz a marca */}
      <div className="relative mx-auto w-full max-w-4xl px-4 pt-28 text-center sm:px-6">
        <h1 id="hero-title">
          <span className="block text-sm font-medium text-white/70">
            Gestão + monitoramento para condomínios
          </span>
          <span className="title-display mt-5 block text-white">
            Seu edifício integrado{" "}
            <span className="text-shimmer-light text-balance">
              em todos os pontos.
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg font-light leading-relaxed text-white/75">
          Do vazamento ao boleto, você vê tudo e resolve pelo celular.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <QuoteButton className="btn-primary group px-7 py-4 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_50px_-14px_rgba(246,55,0,0.75)]">
            Pedir orçamento
            <ArrowRight
              size={18}
              strokeWidth={2.25}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </QuoteButton>
          <a
            href="#como-funciona"
            className="btn-ghost border border-white/15 bg-white/[0.04] px-7 py-4 text-base text-white hover:border-white/30 hover:bg-white/10"
          >
            Como funciona
          </a>
        </div>
      </div>

      {/* Embaixo: espaço para a folha branca que sobe 2rem e, até xl, para o alerta que pende do painel */}
      <div className="relative mx-auto w-full max-w-4xl px-4 pt-12 pb-20 sm:px-6 sm:pb-36 xl:pb-16">
        <Reveal immediate delay={0.15} className="relative">
          {/* Brilho e ondas de sinal atrás do painel */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 -ml-[30rem] -mt-[30rem] size-[60rem] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 22%, transparent) 0%, color-mix(in srgb, var(--brand-4) 8%, transparent) 38%, transparent 66%)",
              }}
            />
            {ripples.map((delay) => (
              <span
                key={delay}
                className="ripple"
                style={{ animationDelay: delay }}
              />
            ))}
          </div>

          <div className="relative">
            <DashboardPreview />
          </div>

          {/*
           * Os dois lados chegando no celular: a gestão perto da linha de
           * gestão, a água perto do hidrômetro. Em telas largas elas ficam
           * quase fora do painel, para não cobrir nenhum número.
           */}
          <Notice
            icon={Package}
            tone="info"
            title="Chegou uma encomenda"
            text="Portaria · Apto 302"
            time="14:32"
            className="animate-float absolute -bottom-4 hidden xl:-left-52 xl:flex"
          />
          <Notice
            icon={TriangleAlert}
            tone="alert"
            title="Água correndo de madrugada"
            text="Cerca de 400 L/h com o prédio dormindo. Pode ser vazamento."
            time="03:12"
            className="animate-float relative mx-auto -mt-6 sm:absolute sm:-right-4 sm:-bottom-24 sm:mt-0 xl:-right-52 xl:top-40 xl:bottom-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}
