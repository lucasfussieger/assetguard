import { BellRing, RadioTower, Wrench } from "lucide-react";

import { steps } from "../lib/content";
import Reveal from "./reveal";

const icons: Record<(typeof steps)[number]["id"], typeof Wrench> = {
  instalacao: Wrench,
  leitura: RadioTower,
  alerta: BellRing,
};

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative overflow-hidden bg-surface-soft py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="como-funciona-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            Do sensor ao seu celular.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Nós cuidamos da parte técnica. Você só acompanha.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map(({ id, title, text }, index) => {
            const Icon = icons[id];

            return (
              <li key={id}>
                <Reveal delay={index * 0.1} className="h-full">
                  <div className="relative flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center ring-1 ring-line">
                    <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-4 to-brand-5 text-white shadow-[0_12px_30px_-12px_var(--brand-4)]">
                      <Icon className="size-6" strokeWidth={2} />
                      <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white ring-4 ring-white">
                        {index + 1}
                      </span>
                    </span>
                    <h3 className="mt-7 text-xl font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
