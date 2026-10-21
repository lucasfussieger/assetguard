import { BellRing, Smartphone, Wrench } from "lucide-react";

import { steps } from "../lib/content";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const icons: Record<(typeof steps)[number]["id"], typeof Wrench> = {
  instalacao: Wrench,
  app: Smartphone,
  alerta: BellRing,
};

/*
 * Passos em linha do tempo: os ícones ficam sobre uma linha fina em degradê,
 * do verde ao laranja (horizontal no desktop, entre os passos no celular). O
 * anel branco de cada ícone "corta" a linha.
 */
export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="flex min-h-svh flex-col justify-center bg-white py-28 sm:py-40"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="como-funciona-title"
          title="Simples de começar."
          subtitle="A gente instala. Você acompanha pelo celular."
        />

        <ol className="relative isolate mx-auto mt-16 grid max-w-5xl md:grid-cols-3 md:gap-x-10">
          <span
            aria-hidden="true"
            className="absolute inset-x-[16.67%] top-6 -z-10 hidden h-px bg-gradient-to-r from-brand-4/50 via-brand-5/50 to-brand-1/50 md:block"
          />

          {steps.map(({ id, title, text }, index) => {
            const Icon = icons[id];

            return (
              <li key={id} className="flex flex-col items-center text-center">
                <Reveal
                  delay={index * 0.12}
                  className="flex flex-col items-center"
                >
                  <span className="grid size-12 place-items-center rounded-lg border border-neutral-200 bg-white text-neutral-950 ring-8 ring-white">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-6 text-xs font-medium text-neutral-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-xs leading-relaxed text-neutral-500">
                    {text}
                  </p>
                </Reveal>

                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="my-8 h-12 w-px bg-gradient-to-b from-brand-5/50 to-brand-1/40 md:hidden"
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
