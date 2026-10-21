import {
  ArrowDownToLine,
  ArrowRight,
  Building2,
  Check,
  FileCheck2,
  HardHat,
} from "lucide-react";

import { audiences } from "../lib/content";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import { Notice } from "./viz-visuals";

/*
 * Cada público abre com uma prévia do app mostrando o ganho dele, com a mesma
 * notificação da hero. Os números são ilustrativos, como os do painel.
 * Condomínio no verde, construtora com um toque de laranja.
 */
const cards = {
  condominio: {
    icon: Building2,
    cta: "Quero no meu condomínio",
    tint: "from-brand-5/15 via-brand-5/[0.06] to-white",
    ring: "border-brand-5/20",
    notice: {
      icon: ArrowDownToLine,
      tone: "info",
      title: "Caixa abaixo de 25%",
      text: "Aviso antes de a água acabar.",
      time: "14:05",
    },
  },
  construtora: {
    icon: HardHat,
    cta: "Quero no meu empreendimento",
    tint: "from-brand-1/[0.12] via-brand-1/[0.05] to-white",
    ring: "border-brand-1/20",
    notice: {
      icon: FileCheck2,
      tone: "info",
      title: "Registro técnico salvo",
      text: "Histórico da água guardado para a garantia.",
      time: "Hoje",
    },
  },
} as const;

/** Anéis parados atrás da notificação: o eco das ondas de sinal da hero. */
const rings = ["10rem", "17rem", "24rem"];

export default function ParaQuem() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-title"
      className="flex min-h-svh flex-col justify-center bg-white py-28 sm:py-40"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="para-quem-title"
          align="left"
          title="Para quem cuida do prédio."
          muted="E para quem constrói."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {audiences.map(({ id, title, subtitle, points }, index) => {
            const { icon: Icon, cta, tint, ring, notice } = cards[id];

            return (
              <Reveal key={id} delay={index * 0.1} className="h-full min-w-0">
                {/* Cantos casados: 20px por fora = 8px da prévia + 12px de espaço */}
                <article
                  id={id}
                  className="flex h-full flex-col rounded-[1.25rem] border border-neutral-200 bg-white p-3 transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_30px_60px_-40px_rgba(0,126,128,0.45)]"
                >
                  <div
                    aria-hidden="true"
                    className={`relative grid h-48 place-items-center overflow-hidden rounded-lg bg-gradient-to-br sm:h-52 ${tint}`}
                  >
                    {rings.map((size) => (
                      <span
                        key={size}
                        className={`absolute left-1/2 top-1/2 rounded-full border ${ring}`}
                        style={{
                          width: size,
                          height: size,
                          marginLeft: `calc(${size} / -2)`,
                          marginTop: `calc(${size} / -2)`,
                        }}
                      />
                    ))}
                    <Notice {...notice} className="animate-float relative" />
                  </div>

                  <div className="flex flex-1 flex-col px-4 pt-7 pb-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-neutral-200 text-neutral-950">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-950">
                          {title}
                        </h3>
                        <p className="text-sm text-neutral-500">{subtitle}</p>
                      </div>
                    </div>

                    <ul className="mt-6 flex-1 space-y-3">
                      {points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 text-neutral-700"
                        >
                          <Check
                            className="size-4 shrink-0 text-brand-4"
                            strokeWidth={2.5}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <QuoteButton
                      tipo={id}
                      className="btn-primary group mt-8 w-full whitespace-normal px-6 py-3.5 text-sm sm:w-auto sm:self-start sm:text-base"
                    >
                      {cta}
                      <ArrowRight
                        size={18}
                        strokeWidth={2.25}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </QuoteButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
