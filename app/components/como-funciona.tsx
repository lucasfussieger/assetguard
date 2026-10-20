import { BellRing, Smartphone, Wrench } from "lucide-react";

import { steps } from "../lib/content";
import Reveal from "./reveal";

const icons: Record<(typeof steps)[number]["id"], typeof Wrench> = {
  instalacao: Wrench,
  app: Smartphone,
  alerta: BellRing,
};

/*
 * Passos em linha do tempo: os ícones ficam sobre uma linha tracejada
 * (horizontal no desktop, entre os passos no celular). O anel branco de cada
 * ícone "corta" a linha.
 */
export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="flex min-h-svh flex-col justify-center bg-white py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="como-funciona-title" className="title-display text-ink">
            Simples de começar.
          </h2>
          <p className="mt-3 text-lg font-light text-ink-soft">
            A gente instala. Você acompanha pelo celular.
          </p>
        </Reveal>

        <ol className="relative isolate mx-auto mt-16 grid max-w-5xl md:grid-cols-3 md:gap-x-10">
          <span
            aria-hidden="true"
            className="absolute inset-x-[16.67%] top-8 -z-10 hidden border-t-2 border-dashed border-brand-5/35 md:block"
          />

          {steps.map(({ id, title, text }, index) => {
            const Icon = icons[id];

            return (
              <li key={id} className="flex flex-col items-center text-center">
                <Reveal
                  delay={index * 0.12}
                  className="flex flex-col items-center"
                >
                  <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-4 to-brand-5 text-white ring-8 ring-white">
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <p className="mt-6 text-sm font-semibold text-brand-4 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-ink-soft">
                    {text}
                  </p>
                </Reveal>

                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="my-8 h-12 border-l-2 border-dashed border-brand-5/35 md:hidden"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
