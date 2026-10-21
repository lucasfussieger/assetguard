import {
  Barcode,
  CalendarCheck,
  Megaphone,
  Package,
  type LucideIcon,
} from "lucide-react";

/*
 * Painel do app na hero, sobre o fundo preto. Os números são ilustrativos:
 * mostram como a leitura aparece para o síndico, não dados de um prédio real.
 *
 * A água subindo (.fill-up) e as barras crescendo (.grow-y) são CSS: começam
 * quando o Reveal em volta entra na tela.
 */

/** Consumo por hora (litros) de um prédio com vazamento entre 01h e 04h. */
const hourlyConsumption = [
  180, 420, 410, 430, 415, 520, 1250, 1780, 1450, 980, 820, 900, 1050, 880,
  640, 600, 680, 890, 1240, 1620, 1480, 1100, 620, 320,
];

const leakHours = { from: 1, to: 4 };

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
function Tank({ level, className = "" }: { level: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Reservatório com ${level}% de água`}
      className={`relative overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-inset ring-white/10 ${className}`}
    >
      {[25, 50, 75].map((mark) => (
        <div
          key={mark}
          className="absolute inset-x-0 border-t border-dashed border-white/[0.07]"
          style={{ bottom: `${mark}%` }}
        />
      ))}

      <div
        className="fill-up absolute inset-x-0 bottom-0"
        style={{ height: `${level}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-4 to-brand-5" />
        <Wave className="text-brand-5/45 animate-wave-slow" />
        <Wave className="text-brand-5 animate-wave" />
      </div>
    </div>
  );
}

/** Barras de consumo por hora, com as horas do vazamento em laranja. */
function HourlyChart({ className = "h-24" }: { className?: string }) {
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
            <div
              key={hour}
              className={`grow-y flex-1 origin-bottom rounded-t-[3px] ${
                isLeak
                  ? "bg-gradient-to-t from-brand-2 to-brand-1"
                  : "bg-gradient-to-t from-brand-4/80 to-brand-5/80"
              }`}
              style={
                {
                  height: `${Math.max((value / max) * 100, 4)}%`,
                  "--bar-delay": `${hour * 0.025}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-4 text-[10px] font-medium text-white/35 tabular-nums">
        <span>0h</span>
        <span>6h</span>
        <span>12h</span>
        <span className="flex justify-between">
          18h<span>23h</span>
        </span>
      </div>
    </div>
  );
}


/** Notificação no celular, como chega para o síndico ou para o morador. */
export function Notice({
  icon: Icon,
  tone,
  title,
  text,
  time,
  className = "",
}: {
  icon: LucideIcon;
  tone: "alert" | "info";
  title: string;
  text: string;
  time: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-[16rem] items-start gap-3 rounded-2xl bg-white p-4 text-left shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-line ${className}`}
    >
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-xl ${
          tone === "alert"
            ? "bg-brand-1/10 text-brand-2"
            : "bg-brand-5/10 text-brand-4"
        }`}
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div className="flex items-center justify-between text-[11px] text-ink-faint">
          <span className="font-wordmark tracking-wide text-ink">VIZ</span>
          <span className="tabular-nums">{time}</span>
        </div>
        <p className="mt-0.5 text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{text}</p>
      </div>
    </div>
  );
}

/** A rotina do prédio no mesmo painel da água. */
const routine = [
  { icon: CalendarCheck, name: "Reservas", status: "Salão hoje, 19h" },
  { icon: Barcode, name: "Boletos", status: "Vence dia 10" },
  { icon: Package, name: "Encomendas", status: "3 na portaria" },
  { icon: Megaphone, name: "Comunicados", status: "1 aviso novo" },
];

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="col-span-full text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
      {children}
    </p>
  );
}

/** Painel do app na hero: a água em cima, a gestão embaixo. */
export function DashboardPreview() {
  const total = hourlyConsumption.reduce((sum, value) => sum + value, 0);

  return (
    <div className="panel-dark rounded-[1.75rem] p-4 text-left sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white">Residencial Jardins</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-5/10 px-3 py-1 text-xs font-semibold text-brand-5 ring-1 ring-inset ring-brand-5/20">
          <LiveDot />
          Ao vivo
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <RowLabel>Água</RowLabel>
        <TankCard name="Superior" level={82} liters={16400} />
        <TankCard name="Inferior" level={61} liters={18300} />

        <div className="col-span-2 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.08]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-white/45">Hidrômetro · 24 h</p>
              <p className="mt-1 text-2xl font-semibold text-white tabular-nums">
                {formatNumber(total / 1000, 1)}{" "}
                <span className="text-sm font-medium text-white/50">m³</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-1/15 px-2.5 py-1 text-[11px] font-semibold text-brand-1 ring-1 ring-inset ring-brand-1/25">
              <span className="size-1.5 rounded-full bg-brand-1" />
              1 alerta
            </span>
          </div>
          <HourlyChart className="mt-3 h-14 sm:h-16" />
        </div>

        <RowLabel>Gestão</RowLabel>
        {routine.map(({ icon: Icon, name, status }) => (
          <div
            key={name}
            className="flex flex-col items-start gap-2 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.08] sm:flex-row sm:items-center sm:gap-3 sm:p-4"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-5/10 text-brand-5 ring-1 ring-inset ring-brand-5/20">
              <Icon className="size-[18px]" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-white/45">{name}</p>
              <p className="text-sm font-semibold text-white sm:truncate">
                {status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TankCard({
  name,
  level,
  liters,
}: {
  name: string;
  level: number;
  liters: number;
}) {
  return (
    <div className="flex items-stretch gap-3 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.08] sm:p-4">
      <Tank level={level} className="h-24 w-10 shrink-0 sm:w-12" />
      <div className="flex min-w-0 flex-col justify-between">
        <p className="text-xs text-white/45">Caixa {name.toLowerCase()}</p>
        <p className="text-2xl font-semibold text-white tabular-nums sm:text-3xl">
          {level}%
        </p>
        <p className="text-[11px] text-white/50 tabular-nums">
          {formatNumber(liters)} L
        </p>
      </div>
    </div>
  );
}
