import { ArrowRight, Building2, Check, HardHat } from "lucide-react";

import { audiences } from "../lib/content";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";

const cards: Record<
  (typeof audiences)[number]["id"],
  { icon: typeof HardHat; cta: string }
> = {
  condominio: { icon: Building2, cta: "Quero no meu condomínio" },
  construtora: { icon: HardHat, cta: "Quero no meu empreendimento" },
};

export default function ParaQuem() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-title"
      className="flex min-h-svh flex-col justify-center bg-white py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl text-center">
          <h2 id="para-quem-title" className="title-display text-ink">
            Para quem cuida do prédio.{" "}
            <span className="text-gradient-brand block">
              E para quem constrói.
            </span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {audiences.map(({ id, title, subtitle, points }, index) => {
            const { icon: Icon, cta } = cards[id];

            return (
              <Reveal key={id} delay={index * 0.1} className="h-full min-w-0">
                <article
                  id={id}
                  className="card-soft flex h-full flex-col items-center rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-12"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-4 to-brand-5 text-white">
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>

                  <div aria-hidden="true" className="mt-8 h-px w-full bg-line" />

                  {/* Bloco centralizado, itens alinhados à esquerda: os checks ficam em coluna */}
                  <ul className="mx-auto mt-8 w-fit flex-1 space-y-3.5 text-left">
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-ink">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-5/15 text-brand-4">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <QuoteButton
                    tipo={id}
                    className="btn-primary group mt-10 w-full whitespace-normal px-6 py-3.5 text-center text-sm sm:w-auto sm:text-base"
                  >
                    {cta}
                    <ArrowRight
                      size={18}
                      strokeWidth={2.25}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </QuoteButton>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
