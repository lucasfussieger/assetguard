import {
  Barcode,
  Building2,
  CalendarCheck,
  Droplets,
  FileText,
  Megaphone,
  Package,
  Plus,
  Wrench,
} from "lucide-react";

import { modules, pillars } from "../lib/content";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

type Icon = typeof Plus;

const moduleIcons: Record<(typeof modules)[number]["id"], Icon> = {
  reservas: CalendarCheck,
  boletos: Barcode,
  encomendas: Package,
  comunicados: Megaphone,
  manutencoes: Wrench,
  documentos: FileText,
};

/** Os dois lados do app, lado a lado, ligados por um "+". */
const sides = [
  { ...pillars.monitoring, icon: Droplets },
  { ...pillars.modules, icon: Building2 },
];

function Join({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`z-10 size-11 place-items-center rounded-lg bg-neutral-950 text-white ring-8 ring-white ${className}`}
    >
      <Plus className="size-5" strokeWidth={2.5} />
    </span>
  );
}

export default function Solucao() {
  return (
    <section
      id="solucao"
      aria-labelledby="solucao-title"
      // Sobe 2rem (o tamanho do arredondado) sobre a hero: os cantos mostram o preto dela.
      className="relative z-10 -mt-8 flex min-h-svh flex-col justify-center rounded-t-4xl bg-white py-28 sm:py-40"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="solucao-title"
          title="Gestão e monitoramento,"
          muted="no mesmo app."
          subtitle="A água e a rotina do prédio num lugar só, para síndico, portaria e moradores."
        />

        <div className="relative mt-14 grid lg:grid-cols-2 lg:gap-5">
          {sides.map(({ title, pitch, icon: SideIcon }, index) => (
            <div key={title} className="contents">
              {index === 1 && (
                <Join className="relative mx-auto -my-3 grid lg:hidden" />
              )}
              <Reveal delay={index * 0.1} className="h-full min-w-0">
                {/* Embaixo sobra espaço para o card das funções, que sobe por cima */}
                <article className="card-soft h-full rounded-lg px-6 pt-10 pb-10 text-center sm:px-10 lg:pb-28">
                  <span className="mx-auto grid size-12 place-items-center rounded-lg border border-neutral-200 text-neutral-950">
                    <SideIcon className="size-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-neutral-500">{pitch}</p>
                </article>
              </Reveal>
            </div>
          ))}

          {/* No meio da parte que fica à vista: o card de baixo cobre os últimos 4rem */}
          <Join className="absolute left-1/2 top-[calc(50%-2rem)] hidden -translate-x-1/2 -translate-y-1/2 lg:grid" />
        </div>

        {/*
         * Os 6 módulos num card escuro no estilo do painel da hero: fundo em
         * degradê, borda verde → laranja e cantos arredondados (exceção ao
         * rounded-lg das seções brancas). Uma fileira só, como uma barra de
         * app: ícone em cima, nome embaixo, linhas finas entre eles.
         */}
        <Reveal
          delay={0.2}
          className="relative z-10 mx-auto mt-5 max-w-5xl lg:-mt-16"
        >
          <div className="panel-dark panel-glow relative isolate overflow-hidden rounded-[1.75rem] px-4 py-8 sm:px-6">
            {/* Luz verde suave no alto, por dentro do card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-56 w-[36rem] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, color-mix(in srgb, var(--brand-5) 22%, transparent) 0%, transparent 70%)",
              }}
            />

            <ul
              aria-label="Módulos do app"
              className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0 lg:divide-x lg:divide-white/10"
            >
              {modules.map(({ id, name }) => {
                const ModuleIcon = moduleIcons[id];

                return (
                  <li
                    key={id}
                    className="flex flex-col items-center gap-3 px-2 text-center"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-5/10 text-brand-5 ring-1 ring-inset ring-brand-5/20">
                      <ModuleIcon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium text-white/90">
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
