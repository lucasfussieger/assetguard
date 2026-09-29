import { DropletOff, EyeOff, ReceiptText } from "lucide-react";

import { problems } from "../lib/content";
import Reveal from "./reveal";

const icons: Record<(typeof problems)[number]["id"], typeof EyeOff> = {
  conta: ReceiptText,
  falta: DropletOff,
  gestao: EyeOff,
};

export default function Problema() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative overflow-hidden bg-deep py-24 sm:py-32"
    >
      <div className="grid-faint-dark mask-fade-y absolute inset-0 pointer-events-none" />
      <div
        className="absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--brand-1) 16%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2
            id="problema-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
          >
            Hoje, o prédio descobre os problemas de água tarde demais.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {problems.map(({ id, title, text }, index) => {
            const Icon = icons[id];

            return (
              <Reveal key={id} delay={index * 0.08}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-1/10 text-brand-1 ring-1 ring-inset ring-brand-1/25">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold leading-snug text-white">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/60">{text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
