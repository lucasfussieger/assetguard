import { ArrowRight, Building2, Check, HardHat } from "lucide-react";

import { audiences } from "../lib/content";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";

const cards: Record<
  (typeof audiences)[number]["id"],
  { icon: typeof HardHat; cta: string; dark: boolean }
> = {
  condominio: {
    icon: Building2,
    cta: "Quero no meu condomínio",
    dark: false,
  },
  construtora: {
    icon: HardHat,
    cta: "Quero no meu empreendimento",
    dark: true,
  },
};

export default function ParaQuem() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-title"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="para-quem-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            Para quem cuida do prédio e para quem o constrói.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {audiences
            .map((audience) => ({ ...audience, ...cards[audience.id] }))
            .map(({ id, icon: Icon, title, subtitle, points, cta, dark }, index) => (
              <Reveal key={id} delay={index * 0.1} className="h-full min-w-0">
                <article
                  id={id}
                  className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] p-6 sm:p-10 ${
                    dark ? "bg-deep text-white" : "card-soft text-ink"
                  }`}
                >
                  {dark && (
                    <div
                      className="absolute -right-24 -top-24 h-80 w-80 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 25%, transparent) 0%, transparent 65%)",
                      }}
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    <span
                      className={`grid size-14 place-items-center rounded-2xl ${
                        dark
                          ? "bg-white/10 text-brand-5 ring-1 ring-inset ring-white/15"
                          : "bg-brand-5/10 text-brand-4 ring-1 ring-inset ring-brand-5/20"
                      }`}
                    >
                      <Icon className="size-7" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold">{title}</h3>
                      <p
                        className={`text-sm ${
                          dark ? "text-white/55" : "text-ink-soft"
                        }`}
                      >
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="relative mt-9 flex-1 space-y-5">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                            dark
                              ? "bg-brand-5/15 text-brand-5"
                              : "bg-brand-5/15 text-brand-4"
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span
                          className={`text-lg leading-snug ${
                            dark ? "text-white/85" : "text-ink"
                          }`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <QuoteButton
                    tipo={id}
                    className="btn-primary group relative mt-10 w-full whitespace-normal px-5 py-3.5 text-center text-sm sm:w-auto sm:self-start sm:px-6 sm:text-base"
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
            ))}
        </div>
      </div>
    </section>
  );
}
