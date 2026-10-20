import {
  ArrowDownToLine,
  ArrowUpToLine,
  Barcode,
  Building2,
  CalendarCheck,
  ChartColumn,
  Droplets,
  FileText,
  Gauge,
  Megaphone,
  Package,
  Plus,
  Siren,
  Wrench,
} from "lucide-react";

import { modules, monitoring, pillars } from "../lib/content";
import Reveal from "./reveal";

type Icon = typeof Plus;

const featureIcons: Record<
  | (typeof monitoring)[number]["id"]
  | (typeof modules)[number]["id"],
  Icon
> = {
  reservatorios: Gauge,
  hidrometro: ChartColumn,
  vazamento: Siren,
  "nivel-baixo": ArrowDownToLine,
  transbordo: ArrowUpToLine,
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

/** Tudo o que vem no app, numa lista só: primeiro a água, depois a gestão. */
const features = [...monitoring, ...modules];

function Join({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`z-10 size-12 place-items-center rounded-full bg-ink text-white ring-8 ring-white ${className}`}
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
      className="relative z-10 -mt-8 flex min-h-svh flex-col justify-center rounded-t-4xl bg-white py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl text-center">
          <h2
            id="solucao-title"
            className="title-display text-ink"
          >
            Gestão e monitoramento,{" "}
            <span className="text-gradient-brand whitespace-nowrap">
              no mesmo app.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg font-light text-ink-soft">
            A água e a rotina do prédio num lugar só, para síndico, portaria e
            moradores.
          </p>
        </Reveal>

        <div className="relative mt-14 grid lg:grid-cols-2 lg:gap-5">
          {sides.map(({ title, pitch, icon: SideIcon }, index) => (
            <div key={title} className="contents">
              {index === 1 && (
                <Join className="relative mx-auto -my-3 grid lg:hidden" />
              )}
              <Reveal delay={index * 0.1} className="h-full min-w-0">
                {/* Embaixo sobra espaço para o card das funções, que sobe por cima */}
                <article className="card-soft h-full rounded-[2rem] px-6 pt-10 pb-10 text-center sm:px-10 lg:pb-28">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-4 to-brand-5 text-white">
                    <SideIcon className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{pitch}</p>
                </article>
              </Reveal>
            </div>
          ))}

          {/* No meio da parte que fica à vista: o card de baixo cobre os últimos 4rem */}
          <Join className="absolute left-1/2 top-[calc(50%-2rem)] hidden -translate-x-1/2 -translate-y-1/2 lg:grid" />
        </div>

        <Reveal
          delay={0.2}
          className="relative z-10 mx-auto mt-5 max-w-4xl lg:-mt-16"
        >
          <ul
            aria-label="O que vem no app"
            className="panel-dark panel-glow flex flex-wrap justify-center gap-2.5 rounded-[1.75rem] p-6 sm:p-8"
          >
            {features.map(({ id, name }) => {
              const FeatureIcon = featureIcons[id];

              return (
                <li
                  key={id}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10"
                >
                  <FeatureIcon className="size-4 text-brand-5" strokeWidth={2} />
                  {name}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
