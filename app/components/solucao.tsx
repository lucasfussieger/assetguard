import { Activity, Check, Waves } from "lucide-react";

import Reveal from "./reveal";
import { ConsumptionPanel, ReservoirPanel } from "./viz-visuals";

const features = [
  {
    id: "reservatorios",
    icon: Waves,
    tag: "Nível dos reservatórios",
    title: "Saiba quanta água tem na caixa, sem subir na laje.",
    text: "O app mostra o nível de cada reservatório em porcentagem e em litros, a qualquer hora.",
    points: [
      "Alerta de nível baixo, antes de a água acabar",
      "Alerta de transbordo, quando a água escapa pelo ladrão",
      "Histórico do nível ao longo do dia",
    ],
    visual: <ReservoirPanel />,
  },
  {
    id: "hidrometro",
    icon: Activity,
    tag: "Leitura do hidrômetro",
    title: "Veja o consumo hora a hora, não só no fim do mês.",
    text: "A Viz lê o hidrômetro sozinha. Você acompanha quanto o prédio gasta por hora, por dia e por mês.",
    points: [
      "Alerta de consumo fora do padrão, como água correndo de madrugada",
      "Comparação entre dias, semanas e meses",
      "Fim da leitura manual e da anotação em planilha",
    ],
    visual: <ConsumptionPanel />,
  },
];

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
            const Icon = feature.icon;
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
                        filter: "blur(40px)",
                      }}
                    />
                    {feature.visual}
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={reversed ? "lg:order-1" : undefined}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-5/10 px-3.5 py-1.5 text-sm font-semibold text-brand-4">
                    <Icon className="size-4" strokeWidth={2.25} />
                    {feature.tag}
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
