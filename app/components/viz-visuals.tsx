"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

/*
 * Peças visuais do painel da Viz. Os números são ilustrativos: mostram como
 * a leitura aparece para o síndico, não dados de um prédio real.
 */

/** Consumo por hora (litros) de um prédio com vazamento entre 01h e 04h. */
export const hourlyConsumption = [
  180, 420, 410, 430, 415, 520, 1250, 1780, 1450, 980, 820, 900, 1050, 880,
  640, 600, 680, 890, 1240, 1620, 1480, 1100, 620, 320,
];

export const leakHours = { from: 1, to: 4 };

/** Nível (%) do reservatório inferior: enche de madrugada e esvazia ao longo do dia. */
const levelHistory = [
  70, 74, 78, 82, 85, 86, 80, 71, 63, 58, 55, 57, 54, 52, 56, 60, 63, 60, 54,
  47, 44, 48, 55, 61,
];

const ease = [0.22, 1, 0.36, 1] as const;

const formatNumber = (value: number, digits = 0) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export function LiveDot({ className = "bg-brand-5" }: { className?: string }) {
  return (
    <span className="relative flex size-2">
      <span
        className={`absolute inset-0 rounded-full animate-signal ${className}`}
      />
      <span className={`relative size-2 rounded-full ${className}`} />
    </span>
  );
}

function Wave({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      className={`absolute left-0 h-3 w-[200%] ${className}`}
      style={{ bottom: "calc(100% - 1px)" }}
    >
      <path
        d="M0 10 Q 50 0 100 10 T 200 10 T 300 10 T 400 10 V 20 H 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Reservatório com a água no nível informado. */
export function Tank({
  level,
  className = "",
  marks = false,
}: {
  level: number;
  className?: string;
  marks?: boolean;
}) {
  const reduce = useReducedMotion();
  const height = `${level}%`;

  return (
    <div
      role="img"
      aria-label={`Reservatório com ${level}% de água`}
      className={`relative overflow-hidden rounded-2xl bg-surface-soft ring-1 ring-inset ring-line ${className}`}
    >
      {[25, 50, 75].map((mark) => (
        <div
          key={mark}
          className="absolute inset-x-0 border-t border-dashed border-brand-3/10"
          style={{ bottom: `${mark}%` }}
        />
      ))}

      <motion.div
        className="absolute inset-x-0 bottom-0"
        initial={reduce ? { height } : { height: "6%" }}
        whileInView={{ height }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-4 to-brand-5" />
        <Wave className="text-brand-5/45 animate-wave-slow" />
        <Wave className="text-brand-5 animate-wave" />
      </motion.div>

      {marks && (
        <>
          <div
            className="absolute inset-x-0 border-t-2 border-dashed border-brand-1/70"
            style={{ bottom: "94%" }}
          />
          <div
            className="absolute inset-x-0 border-t-2 border-dashed border-brand-1/70"
            style={{ bottom: "25%" }}
          />
        </>
      )}
    </div>
  );
}

/** Barras de consumo por hora, com as horas do vazamento em laranja. */
export function HourlyChart({
  className = "h-24",
  showAxis = true,
  overlay,
}: {
  className?: string;
  showAxis?: boolean;
  overlay?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...hourlyConsumption);

  return (
    <div>
      <div
        role="img"
        aria-label="Consumo de água por hora, com consumo fora do padrão entre 1h e 4h da madrugada"
        className={`relative flex items-end gap-[3px] ${className}`}
      >
        {hourlyConsumption.map((value, hour) => {
          const isLeak = hour >= leakHours.from && hour <= leakHours.to;

          return (
            <motion.div
              key={hour}
              className={`flex-1 origin-bottom rounded-t-[3px] ${
                isLeak
                  ? "bg-gradient-to-t from-brand-2 to-brand-1"
                  : "bg-gradient-to-t from-brand-4/80 to-brand-5/80"
              }`}
              style={{ height: `${Math.max((value / max) * 100, 4)}%` }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: hour * 0.025, ease }}
            />
          );
        })}
        {overlay}
      </div>

      {showAxis && (
        <div className="mt-2 grid grid-cols-4 text-[10px] font-medium text-ink-faint tabular-nums">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span className="flex justify-between">
            18h<span>23h</span>
          </span>
        </div>
      )}
    </div>
  );
}

/** Notificação no celular: consumo fora do padrão durante a madrugada. */
export function LeakAlert({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-[17.5rem] items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,37,44,0.45)] ring-1 ring-line backdrop-blur ${className}`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-1/10 text-brand-2">
        <TriangleAlert className="size-5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="flex items-center justify-between text-[11px] text-ink-faint">
          <span className="font-wordmark tracking-wide text-ink">VIZ</span>
          <span className="tabular-nums">03:12</span>
        </div>
        <p className="mt-0.5 text-sm font-semibold text-ink">
          Água correndo de madrugada
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
          Cerca de 400 L/h com o prédio dormindo. Pode ser vazamento.
        </p>
      </div>
    </div>
  );
}

/** Painel resumido exibido no topo da página. */
export function DashboardPreview() {
  const total = hourlyConsumption.reduce((sum, value) => sum + value, 0);

  return (
    <div className="panel rounded-[1.75rem] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
            App da Viz
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink">
            Residencial Jardins
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-5/10 px-3 py-1 text-xs font-semibold text-brand-4">
          <LiveDot />
          Ao vivo
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <TankCard
          name="Superior"
          level={82}
          liters={16400}
          capacity={20000}
        />
        <TankCard
          name="Inferior"
          level={61}
          liters={18300}
          capacity={30000}
        />
      </div>

      <div className="mt-3 rounded-2xl ring-1 ring-line p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-ink-faint">Hidrômetro · últimas 24 h</p>
            <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
              {formatNumber(total / 1000, 1)}{" "}
              <span className="text-sm font-medium text-ink-soft">m³</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-1/10 px-2.5 py-1 text-[11px] font-semibold text-brand-2">
            <span className="size-1.5 rounded-full bg-brand-2" />
            1 alerta
          </span>
        </div>
        <HourlyChart className="mt-4 h-20 sm:h-24" />
      </div>
    </div>
  );
}

function TankCard({
  name,
  level,
  liters,
  capacity,
}: {
  name: string;
  level: number;
  liters: number;
  capacity: number;
}) {
  return (
    <div className="flex items-stretch gap-3 rounded-2xl ring-1 ring-line p-3 sm:p-4">
      <Tank level={level} className="h-24 w-10 shrink-0 sm:h-28 sm:w-14" />
      <div className="flex min-w-0 flex-col justify-between">
        <p className="text-xs text-ink-faint">
          <span className="sm:hidden">{name}</span>
          <span className="hidden sm:inline">
            Reservatório {name.toLowerCase()}
          </span>
        </p>
        <p className="text-2xl font-semibold text-ink tabular-nums sm:text-3xl">
          {level}%
        </p>
        <p className="text-[11px] text-ink-soft tabular-nums">
          {formatNumber(liters)} L
          <span className="hidden sm:inline"> de {formatNumber(capacity)}</span>
        </p>
      </div>
    </div>
  );
}

/** Reservatório grande com as faixas de alerta e o nível ao longo do dia. */
export function ReservoirPanel() {
  const width = 240;
  const height = 64;
  const step = width / (levelHistory.length - 1);
  const y = (value: number) => height - (value / 100) * height;
  const line = levelHistory
    .map((value, index) => `${index === 0 ? "M" : "L"}${index * step} ${y(value)}`)
    .join(" ");

  return (
    <div className="panel rounded-[1.75rem] p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Reservatório inferior</p>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-4">
          <LiveDot />
          Ao vivo
        </span>
      </div>

      <div className="mt-6 flex items-stretch gap-5 sm:gap-7">
        <Tank level={61} marks className="h-64 w-28 shrink-0 sm:h-72 sm:w-36" />

        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-[6%] -translate-y-1/2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-2">
              Alerta de transbordo
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-[61%] translate-y-1/2">
            <p className="text-4xl font-semibold text-ink tabular-nums sm:text-5xl">
              61%
            </p>
            <p className="mt-1 text-sm text-ink-soft tabular-nums">
              18.300 de 30.000 L
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-[25%] translate-y-1/2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-2">
              Alerta de nível baixo
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-surface-soft p-4">
        <p className="text-xs text-ink-faint">Nível nas últimas 24 h</p>
        <svg
          role="img"
          aria-label="Nível do reservatório ao longo do dia, entre 44% e 86%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="mt-3 h-16 w-full overflow-visible"
        >
          <defs>
            <linearGradient id="level-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-5)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--brand-5)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            x2={width}
            y1={y(25)}
            y2={y(25)}
            stroke="var(--brand-1)"
            strokeOpacity="0.6"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
          <path d={`${line} L${width} ${height} L0 ${height} Z`} fill="url(#level-fill)" />
          <path
            d={line}
            fill="none"
            stroke="var(--brand-4)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

/** Consumo por hora ampliado, com a perda que o vazamento causa. */
export function ConsumptionPanel() {
  const total = hourlyConsumption.reduce((sum, value) => sum + value, 0);
  const leakPerHour = 380;
  const leftPct = (leakHours.from / 24) * 100;
  const widthPct = ((leakHours.to - leakHours.from + 1) / 24) * 100;
  const leakTop =
    (Math.max(...hourlyConsumption.slice(leakHours.from, leakHours.to + 1)) /
      Math.max(...hourlyConsumption)) *
    100;

  return (
    <div className="panel rounded-[1.75rem] p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Consumo por hora</p>
        <span className="text-xs text-ink-faint">Hoje</span>
      </div>

      <HourlyChart
        className="mt-6 h-44 sm:h-52"
        overlay={
          <>
            <div
              aria-hidden="true"
              className="absolute h-2 rounded-t-md border-x-2 border-t-2 border-brand-1/60"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                bottom: `calc(${leakTop}% + 6px)`,
              }}
            />
            <span
              className="absolute whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-2 shadow-sm ring-1 ring-brand-1/30"
              style={{ left: `${leftPct}%`, bottom: `calc(${leakTop}% + 20px)` }}
            >
              Madrugada fora do padrão
            </span>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-surface-soft p-4">
          <p className="text-xs text-ink-faint">Total do dia</p>
          <p className="mt-1 text-xl font-semibold text-ink tabular-nums">
            {formatNumber(total / 1000, 1)} m³
          </p>
        </div>
        <div className="rounded-2xl bg-brand-1/[0.07] p-4 ring-1 ring-inset ring-brand-1/15">
          <p className="text-xs text-brand-2">Perda estimada</p>
          <p className="mt-1 text-xl font-semibold text-ink tabular-nums">
            {formatNumber((leakPerHour * 24) / 1000, 1)} mil L/dia
          </p>
        </div>
      </div>
    </div>
  );
}
