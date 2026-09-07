import { LayoutDashboard, Wrench, TrendingDown, ArrowUpRight } from "lucide-react";

import { QuoteButton } from "./quote-form";

const items = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Gestão inteligente",
    solution:
      "Um sistema único reúne manutenções, reservas, comunicados, documentos e a leitura do sistema hidráulico em tempo real. As decisões passam a ser tomadas com informação verificada e histórico registrado.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Manutenção preditiva",
    solution:
      "O sistema acompanha a rede hidráulica e alerta os responsáveis assim que um vazamento começa. A resposta acontece no início do problema, o que evita obras extensas e danos estruturais.",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Menores custos de condomínio",
    solution:
      "A detecção de vazamentos, a leitura do consumo registrado no hidrômetro e o acompanhamento dos reservatórios reduzem perdas e têm efeito direto sobre a conta do condomínio.",
  },
];

export default function CondominioComoFunciona() {
  return (
    <section id="condominio" className="relative bg-zinc-950 py-24 sm:py-32 overflow-hidden">
      {/* Luz ciano de fundo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 18%, transparent) 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight leading-tight">
            O valor que a Viz gera para{" "}
            <span className="text-gradient-brand">condomínios</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative rounded-lg border border-white/10 bg-white/[0.04] p-8 overflow-hidden flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-brand-5/10 border border-brand-5/25 flex items-center justify-center text-brand-5">
                  {item.icon}
                </span>
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-white/70 text-sm leading-relaxed">
                {item.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <QuoteButton className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-7 py-3.5 text-base font-semibold text-white hover:brightness-110 transition-all">
            Quero para meu condomínio
            <ArrowUpRight
              size={20}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
