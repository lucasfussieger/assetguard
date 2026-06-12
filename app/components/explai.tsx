"use client";

import { KeyRound, Zap, Droplets } from "lucide-react";

const highlights = [
  {
    icon: <KeyRound className="w-5 h-5" />,
    title: "Gestão de controle de acesso",
    body: "Monitore e gerencie entradas e saídas com registro completo, acesso remoto e liberações temporárias, sem chave física.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Gestão de energia",
    body: "Acompanhe o consumo de energia em tempo real, identifique desperdícios e receba alertas quando algo foge do padrão.",
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: "Gestão de recursos hídricos",
    body: "Controle o consumo de água, detecte vazamentos cedo e reduza perdas com dados precisos de toda a edificação.",
  },
];

export default function Explai() {
  return (
    <section id="como-funciona" className="relative bg-zinc-950 py-24 overflow-hidden">
      {/* Luz dourada de fundo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--gold) 8%, transparent) 0%, color-mix(in srgb, var(--gold) 3%, transparent) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Texto */}
          <div className="flex flex-col gap-8">

            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-white">
              Controle total da{" "}
              <span className="text-shimmer-gold">infraestrutura</span> do seu
              edifício
            </h2>

            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              A AssetGuard garante que você <span className="text-gold">tenha visão completa da gestão da infraestrutura.</span> Instalamos dispositivos <span className="text-gold">sem grandes obras</span> em pontos
              estratégicos que geram dados e, por meio do nosso software, você
              verifica tudo que ocorre no <span className="text-gold">seu edifício de maneira ágil e prática</span>,
              garantindo eficiência operacional e a redução de custos de
              manutenção.
            </p>

            <div className="flex flex-col gap-6 mt-2">
              {highlights.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center text-gold">
                    {/* Brilho alternado que pisca atrás de cada ícone */}
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none animate-icon-flash"
                      style={{
                        animationDelay: `${i * 5}s`,
                        background:
                          "radial-gradient(circle, color-mix(in srgb, var(--gold) 60%, transparent) 0%, transparent 70%)",
                        filter: "blur(10px)",
                      }}
                    />
                    <span className="relative z-10">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-semibold text-base">
                      {item.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-md">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem do dashboard */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <img
                src="/dashboard.png"
                alt="Dashboard da AssetGuard com a visão completa da infraestrutura do edifício"
                className="w-full h-auto block"
              />
            </div>
            {/* Brilho sutil na borda da imagem */}
            <div
              className="absolute -inset-px rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,193,3,0.15) 0%, transparent 40%)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
