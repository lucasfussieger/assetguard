"use client";

import { useState } from "react";

export type Coluna = {
  /** Rótulo completo, no tooltip ("sex., 24/10") */
  rotulo: string;
  /** Rótulo curto, no eixo ("24/10") */
  eixo: string;
  valor: number;
  /** Segunda linha do tooltip ("9 visitantes") */
  detalhe?: string;
};

const compacto = new Intl.NumberFormat("pt-BR", { notation: "compact" });
const inteiro = new Intl.NumberFormat("pt-BR");

/** Topo do eixo num número redondo e par, para a linha do meio cair em inteiro. */
function topoDoEixo(maior: number) {
  if (maior <= 2) return 2;
  const ordem = 10 ** Math.floor(Math.log10(maior));
  const passo = [1, 2, 4, 6, 8, 10].find((p) => p * ordem >= maior) ?? 10;
  return passo * ordem;
}

/*
 * Colunas de uma série só, na cor da marca. Cada coluna é alvo de hover e de
 * foco (a coluna inteira, não só a parte pintada) e mostra o valor num
 * tooltip; a tabela abaixo do gráfico tem os mesmos números.
 */
export default function Colunas({
  colunas,
  unidade = "acessos",
  altura = 176,
  rotulosNoEixo = 7,
}: {
  colunas: Coluna[];
  unidade?: string;
  altura?: number;
  rotulosNoEixo?: number;
}) {
  const [ativa, setAtiva] = useState<number | null>(null);
  const topo = topoDoEixo(Math.max(0, ...colunas.map((c) => c.valor)));
  const cadaQuantos = Math.max(1, Math.ceil(colunas.length / rotulosNoEixo));
  const selecionada = ativa === null ? null : colunas[ativa];

  // Tooltip centrado na coluna, mas preso às bordas do gráfico.
  const posicao = ativa === null ? 0 : (ativa + 0.5) / colunas.length;
  const alinhamento =
    posicao < 0.15 ? "0%" : posicao > 0.85 ? "-100%" : "-50%";

  return (
    <div className="select-none">
      <div className="relative" style={{ height: altura }}>
        {[1, 0.5, 0].map((fracao) => (
          <div
            key={fracao}
            aria-hidden
            className="absolute inset-x-0 border-t border-neutral-200"
            style={{ bottom: `${fracao * 100}%` }}
          >
            <span className="absolute -top-2 left-0 bg-white pr-1.5 text-[11px] leading-none text-neutral-400 tabular-nums">
              {compacto.format(fracao * topo)}
            </span>
          </div>
        ))}

        <div
          className="absolute inset-y-0 left-9 right-0 flex items-end gap-[2px]"
          onPointerLeave={() => setAtiva(null)}
        >
          {colunas.map((coluna, indice) => (
            <div
              key={`${coluna.eixo}-${indice}`}
              tabIndex={0}
              role="img"
              aria-label={`${coluna.rotulo}: ${inteiro.format(coluna.valor)} ${unidade}`}
              onPointerEnter={() => setAtiva(indice)}
              onFocus={() => setAtiva(indice)}
              onBlur={() => setAtiva(null)}
              className="flex h-full min-w-0 flex-1 items-end justify-center rounded-sm outline-none focus-visible:bg-neutral-100"
            >
              <div
                className={`w-full max-w-6 rounded-t-[4px] bg-brand-4 transition-opacity ${
                  ativa !== null && ativa !== indice ? "opacity-45" : ""
                }`}
                style={{ height: `${(coluna.valor / topo) * 100}%` }}
              />
            </div>
          ))}

          {selecionada && (
            <div
              role="status"
              className="pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white shadow-lg"
              style={{
                left: `${posicao * 100}%`,
                bottom: `calc(${(selecionada.valor / topo) * 100}% + 8px)`,
                transform: `translateX(${alinhamento})`,
              }}
            >
              <p className="text-sm font-semibold">
                {inteiro.format(selecionada.valor)} {unidade}
              </p>
              <p className="text-white/70">{selecionada.rotulo}</p>
              {selecionada.detalhe && (
                <p className="text-white/70">{selecionada.detalhe}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div aria-hidden className="ml-9 mt-2 flex gap-[2px]">
        {colunas.map((coluna, indice) => (
          <div
            key={`${coluna.eixo}-${indice}`}
            className="flex min-w-0 flex-1 justify-center text-[11px] text-neutral-400 tabular-nums"
          >
            {/* centrado por flex: um rótulo mais largo que a coluna vaza igual para os dois lados */}
            <span className="whitespace-nowrap">
              {indice % cadaQuantos === 0 ? coluna.eixo : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
