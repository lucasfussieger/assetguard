import {
  Barcode,
  CalendarCheck,
  Check,
  Clock,
  Copy,
  FileText,
  Megaphone,
  Package,
  Search,
  Users,
  Wrench,
} from "lucide-react";

import { modules } from "../lib/content";
import Reveal from "./reveal";

/*
 * Mini telas do app para cada módulo de gestão. Conteúdo ilustrativo, no
 * mesmo espírito dos painéis de água.
 */

function Screen({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 text-ink shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)] ring-1 ring-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

const days = [
  ["Sex", "25"],
  ["Sáb", "26"],
  ["Dom", "27"],
  ["Seg", "28"],
  ["Ter", "29"],
];

const slots = [
  { area: "Salão de festas", time: "19h às 23h", status: "mine" },
  { area: "Churrasqueira", time: "12h às 16h", status: "free" },
  { area: "Quadra", time: "8h às 10h", status: "busy" },
] as const;

function ReservasScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Setembro</p>
        <p className="text-xs text-ink-faint">Áreas comuns</p>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map(([day, date], index) => {
          const selected = index === 1;
          return (
            <div
              key={date}
              className={`rounded-xl py-2 text-center ${
                selected
                  ? "bg-gradient-to-br from-brand-4 to-brand-5 text-white shadow-[0_8px_20px_-8px_var(--brand-4)]"
                  : "bg-surface-soft text-ink-soft"
              }`}
            >
              <p className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                {day}
              </p>
              <p className="text-base font-semibold tabular-nums">{date}</p>
            </div>
          );
        })}
      </div>

      <ul className="mt-3 space-y-2">
        {slots.map((slot) => (
          <li
            key={slot.area}
            className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{slot.area}</p>
              <p className="text-xs text-ink-faint tabular-nums">{slot.time}</p>
            </div>
            {slot.status === "mine" && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-5/15 px-2.5 py-1 text-[11px] font-semibold text-brand-4">
                <Check size={12} strokeWidth={3} />
                Sua reserva
              </span>
            )}
            {slot.status === "free" && (
              <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-brand-4 ring-1 ring-inset ring-brand-4/30">
                Livre
              </span>
            )}
            {slot.status === "busy" && (
              <span className="shrink-0 rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                Ocupada
              </span>
            )}
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function ComunicadosScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-1/10 px-2.5 py-1 text-[11px] font-semibold text-brand-2">
          <Megaphone size={12} strokeWidth={2.25} />
          Comunicado
        </span>
        <span className="text-[11px] text-ink-faint">Hoje, 09:10</span>
      </div>
      <p className="mt-3 text-sm font-semibold">Manutenção do elevador social</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Quinta-feira, das 9h às 12h. Use o elevador de serviço.
      </p>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-ink-faint">
        <Users size={13} strokeWidth={2} />
        Enviado para todos os moradores
      </div>
    </Screen>
  );
}

const tasks = [
  { name: "Limpeza da caixa d'água", status: "Concluída", tone: "done" },
  { name: "Revisão do elevador", status: "Agendada · 16/10", tone: "scheduled" },
  { name: "Bomba de recalque", status: "Em andamento", tone: "doing" },
] as const;

function ManutencoesScreen() {
  return (
    <Screen>
      <p className="text-sm font-semibold">Manutenções</p>
      <ul className="mt-3 space-y-3">
        {tasks.map((task) => (
          <li key={task.name} className="flex items-start gap-3">
            {task.tone === "done" && (
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-4 to-brand-5 text-white">
                <Check size={11} strokeWidth={3} />
              </span>
            )}
            {task.tone === "scheduled" && (
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-soft text-ink-soft ring-1 ring-inset ring-line">
                <Clock size={11} strokeWidth={2.5} />
              </span>
            )}
            {task.tone === "doing" && (
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-1/10">
                <span className="size-2 rounded-full bg-brand-1" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">{task.name}</p>
              <p
                className={`mt-0.5 text-[11px] ${
                  task.tone === "doing" ? "text-brand-2" : "text-ink-faint"
                }`}
              >
                {task.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function BoletosScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Boleto do condomínio</p>
        <p className="text-xs text-ink-faint">Apto 302</p>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-surface-soft p-3">
        <div>
          <p className="text-xs text-ink-faint">Outubro</p>
          <p className="mt-0.5 text-2xl font-semibold tabular-nums">
            R$ 685,40
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-1/10 px-2.5 py-1 text-[11px] font-semibold text-brand-2 tabular-nums">
          <span className="size-1.5 rounded-full bg-brand-2" />
          Vence 10/10
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5">
        <Barcode size={16} strokeWidth={2} className="shrink-0 text-ink-soft" />
        <p className="min-w-0 flex-1 truncate text-sm font-medium">
          Código de barras
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-brand-4">
          <Copy size={12} strokeWidth={2.5} />
          Copiar
        </span>
      </div>
    </Screen>
  );
}

const files = [
  { name: "Ata da assembleia", meta: "Setembro · PDF" },
  { name: "Regimento interno", meta: "PDF" },
  { name: "Contrato de limpeza", meta: "PDF" },
];

function DocumentosScreen() {
  return (
    <Screen>
      <div className="flex items-center gap-2 rounded-xl bg-surface-soft px-3 py-2 text-xs text-ink-faint">
        <Search size={13} strokeWidth={2.25} />
        Buscar documento
      </div>
      <ul className="mt-3 space-y-2.5">
        {files.map((file) => (
          <li key={file.name} className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-5/10 text-brand-4">
              <FileText size={15} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">
                {file.name}
              </p>
              <p className="text-[11px] text-ink-faint">{file.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function EncomendasScreen() {
  return (
    <Screen>
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-4 to-brand-5 text-white">
          <Package size={18} strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold leading-tight">
              Chegou uma encomenda
            </p>
            <span className="text-[11px] text-ink-faint tabular-nums">14:32</span>
          </div>
          <p className="mt-0.5 text-xs text-ink-soft">Portaria · Apto 302</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="text-[11px] text-ink-faint">1 volume</span>
        <span className="rounded-full bg-brand-1/10 px-2.5 py-1 text-[11px] font-semibold text-brand-2">
          Aguardando retirada
        </span>
      </div>
    </Screen>
  );
}

const cards: Record<
  (typeof modules)[number]["id"],
  { icon: typeof Wrench; screen: React.ReactNode; className?: string }
> = {
  reservas: {
    icon: CalendarCheck,
    screen: <ReservasScreen />,
    className: "md:col-span-2",
  },
  comunicados: { icon: Megaphone, screen: <ComunicadosScreen /> },
  manutencoes: { icon: Wrench, screen: <ManutencoesScreen /> },
  boletos: {
    icon: Barcode,
    screen: <BoletosScreen />,
    className: "md:col-span-2",
  },
  documentos: { icon: FileText, screen: <DocumentosScreen /> },
  encomendas: { icon: Package, screen: <EncomendasScreen /> },
};

export default function Gestao() {
  return (
    <section
      id="gestao"
      aria-labelledby="gestao-title"
      className="relative overflow-hidden bg-deep py-24 sm:py-32"
    >
      <div className="grid-faint-dark mask-fade-y absolute inset-0 pointer-events-none" />
      <div
        className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 16%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h2
              id="gestao-title"
              className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
            >
              A água e a rotina do prédio,{" "}
              <span className="text-gradient-light">no mesmo app.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-white/65">
            O app que mostra os reservatórios também organiza o dia a dia do
            condomínio. Síndico, portaria e moradores resolvem pelo celular o
            que antes dependia de caderno, planilha e grupo de WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {modules.map((module, index) => {
            const { icon: Icon, screen, className = "" } = cards[module.id];
            const wide = className !== "";

            return (
              <Reveal
                key={module.id}
                delay={(index % 3) * 0.08}
                className={`min-w-0 ${className}`}
              >
                <article
                  id={module.id}
                  className={`flex h-full flex-col gap-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:p-8 ${
                    wide ? "lg:flex-row lg:items-center lg:gap-10" : ""
                  }`}
                >
                  <div className={wide ? "lg:flex-1" : undefined}>
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-5/10 text-brand-5 ring-1 ring-inset ring-brand-5/25">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {module.name}
                    </h3>
                    <p className="mt-3 leading-relaxed text-white/60">
                      {module.description}
                    </p>
                  </div>

                  <div className={`mt-auto ${wide ? "lg:mt-0 lg:w-[22rem]" : ""}`}>
                    {screen}
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal
            delay={0.16}
            className="min-w-0 md:col-span-2 lg:col-span-1"
          >
            <div className="flex h-full flex-col gap-2 rounded-3xl border border-dashed border-white/15 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:flex-col lg:items-start lg:justify-center lg:gap-3">
              <p className="text-lg font-semibold text-white">
                E outros módulos para a rotina do prédio.
              </p>
              <p className="text-white/60">
                Esses são os mais usados. Na proposta, apresentamos todos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
