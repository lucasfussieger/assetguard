import { TrendingUp, Scale, ShieldCheck, ArrowUpRight } from "lucide-react";

import { QuoteButton } from "./quote-form";

const items = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Diferencial de venda",
    solution:
      "Um edifício monitorado agrega argumento comercial ao empreendimento: tecnologia embarcada que valoriza o produto e diferencia a marca da construtora frente à concorrência.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Dados estruturais com valor jurídico",
    solution:
      "O histórico completo e auditável dos sistemas serve como evidência técnica e protege a construtora em acionamentos indevidos e disputas.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Menos custo corretivo na garantia",
    solution:
      "O monitoramento contínuo antecipa falhas e substitui o atendimento emergencial por manutenção planejada, preservando a margem durante todo o período de garantia.",
  },
];

export default function ConstrutoraComoFunciona() {
  return (
    <section
      id="construtora"
      className="relative bg-white py-24 sm:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-ink font-semibold tracking-tight leading-tight">
            O valor que a Viz gera para{" "}
            <span className="text-gradient-brand">construtoras</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative rounded-lg card-soft p-8 overflow-hidden flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-brand-5/10 border border-brand-5/20 flex items-center justify-center text-brand-4">
                  {item.icon}
                </span>
                <h3 className="text-lg font-semibold text-ink leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-ink-soft text-sm leading-relaxed">
                {item.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <QuoteButton className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-7 py-3.5 text-base font-semibold text-white hover:brightness-110 transition-all">
            Quero para meu empreendimento
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
