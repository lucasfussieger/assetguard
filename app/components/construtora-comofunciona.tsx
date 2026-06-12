import { TrendingUp, Scale, ShieldCheck, ArrowUpRight } from "lucide-react";

import { WHATSAPP_URL } from "../lib/whatsapp";

const items = [
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Diferencial de venda",
    problem:
      "Empreendimentos competem por preço e localização. Depois da entrega, é difícil sustentar valor percebido além do imóvel pronto.",
    solution:
      "Entregar um edifício monitorado vira argumento comercial: tecnologia embarcada que valoriza o empreendimento e diferencia a sua marca da concorrência.",
  },
  {
    icon: <Scale className="w-7 h-7" />,
    title: "Dados estruturais com valor jurídico",
    problem:
      "Durante os 5 anos de garantia, sem registro do que estava funcionando, o ônus da prova recai sobre a construtora em qualquer reclamação.",
    solution:
      "Histórico completo e auditável de cada sistema serve como evidência técnica, protegendo a construtora em acionamentos indevidos e disputas.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Menos custo corretivo na garantia",
    problem:
      "Um problema detectado tarde dentro da garantia vira obra corretiva cara e emergencial que corrói o VGV do empreendimento.",
    solution:
      "O monitoramento contínuo antecipa falhas, troca emergência por manutenção planejada e preserva a margem ao longo de todo o período de garantia.",
  },
];

export default function ConstrutoraComoFunciona() {
  return (
    <section id="construtora" className="relative bg-zinc-950 py-24 overflow-hidden">
      {/* Luz dourada de fundo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--gold) 8%, transparent) 0%, color-mix(in srgb, var(--gold) 3%, transparent) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight leading-tight">
            O valor que a AssetGuard gera para{" "}
            <span className="text-shimmer-gold">construtoras</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-8 overflow-hidden flex flex-col gap-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
              />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-gold">{item.icon}</span>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                    O problema
                  </span>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-gold/30 to-transparent" />

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold/70">
                    Com a AssetGuard
                  </span>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-xl text-white hover:text-zinc-600 transition-colors flex items-center justify-center gap-2"
          >
            Quero para minha obra
            <ArrowUpRight size={50} strokeWidth={1} />
          </a>
        </div>
      </div>
    </section>
  );
}
