import { Activity, Check, Waves } from "lucide-react";

import { features } from "../lib/content";
import Reveal from "./reveal";
import { ConsumptionPanel, ReservoirPanel } from "./viz-visuals";

const visuals: Record<
  (typeof features)[number]["id"],
  { icon: typeof Waves; visual: React.ReactNode }
> = {
  reservatorios: { icon: Waves, visual: <ReservoirPanel /> },
  hidrometro: { icon: Activity, visual: <ConsumptionPanel /> },
};

export default function Solucao() {
  return (
    <section
      id="solucao"
      aria-labelledby="solucao-title"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="solucao-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            A Viz troca a surpresa{" "}
            <span className="text-gradient-brand">pelo aviso.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Sensores no reservatório e no hidrômetro enviam as leituras para o
            app. Quando algo sai do padrão, você fica sabendo na hora.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 sm:mt-24 sm:gap-32">
          {features.map((feature, index) => {
            const { icon: Icon, visual } = visuals[feature.id];
            const reversed = index % 2 === 1;

            return (
              <div
                key={feature.id}
                id={feature.id}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <Reveal className={reversed ? "lg:order-2" : undefined}>
                  <div className="relative isolate">
                    <div
                      className="absolute inset-0 -z-10 scale-110 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 18%, transparent) 0%, transparent 65%)",
                      }}
                    />
                    {visual}
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={reversed ? "lg:order-1" : undefined}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-5/10 px-3.5 py-1.5 text-sm font-semibold text-brand-4">
                    <Icon className="size-4" strokeWidth={2.25} />
                    {feature.name}
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                    {feature.text}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {feature.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-4 to-brand-5 text-white">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="text-ink">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
