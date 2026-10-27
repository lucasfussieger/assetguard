import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import Wordmark from "../components/wordmark";
import { sql } from "../lib/metricas/db";
import { painelLiberado, senhaDoPainel } from "../lib/metricas/painel";
import { sair } from "./acoes";
import Atualizar from "./atualizar";
import Colunas, { type Coluna } from "./colunas";
import {
  carregarMetricas,
  lerPeriodo,
  PERIODOS,
  type Linha,
  type Metricas,
} from "./dados";
import Entrar from "./entrar";

export const metadata: Metadata = {
  title: "Métricas",
  robots: { index: false, follow: false },
};

const FUSO = "America/Sao_Paulo";
const inteiro = new Intl.NumberFormat("pt-BR");
const dataEHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: FUSO,
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
const soHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: FUSO,
  hour: "2-digit",
  minute: "2-digit",
});
const diaDaSemana = new Intl.DateTimeFormat("pt-BR", {
  timeZone: FUSO,
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
});

const APARELHOS: Record<string, string> = {
  celular: "Celular",
  computador: "Computador",
  tablet: "Tablet",
  outro: "Outro",
};

/** Partes da página onde há botão de WhatsApp (ids das seções). */
const LUGARES: Record<string, string> = {
  header: "Menu do topo",
  topo: "Início",
  solucao: "Solução",
  "como-funciona": "Como funciona",
  "para-quem": "Para quem",
  duvidas: "Dúvidas",
  contato: "Contato",
  footer: "Rodapé",
  bio: "Página /bio",
};

function duracao(segundos: number | null) {
  if (segundos === null) return "–";
  if (segundos < 60) return `${segundos}s`;
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return resto ? `${minutos}min ${resto}s` : `${minutos}min`;
}

const porcento = (parte: number, todo: number) =>
  todo ? Math.round((parte / todo) * 100) : 0;

const plural = (n: number, um: string, varios: string) =>
  `${inteiro.format(n)} ${n === 1 ? um : varios}`;

function nomeDoBotao(alvo: string) {
  const [lugar, texto] = alvo.split("|");
  const onde = LUGARES[lugar] ?? lugar;
  return texto ? `${onde} · ${texto}` : onde;
}

function colunasDaSerie(dados: Metricas): Coluna[] {
  return dados.serie.map((ponto) => {
    const [data, hora] = ponto.inicio.split("T");
    const [, mes, dia] = data.split("-");
    const base = {
      valor: ponto.acessos,
      detalhe: plural(ponto.visitantes, "visitante", "visitantes"),
    };
    if (dados.unidade === "hour") {
      const h = Number(hora);
      return { ...base, eixo: `${h}h`, rotulo: `Das ${h}h às ${h + 1}h` };
    }
    if (dados.unidade === "week") {
      return { ...base, eixo: `${dia}/${mes}`, rotulo: `Semana de ${dia}/${mes}` };
    }
    return {
      ...base,
      eixo: `${dia}/${mes}`,
      rotulo: diaDaSemana.format(new Date(`${data}T12:00:00-03:00`)),
    };
  });
}

export default async function MetricasPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string | string[] }>;
}) {
  // Sempre na hora do pedido: sem isso, um build sem banco ou senha deixaria
  // a página de configuração congelada como estática.
  await connection();

  const temSenha = Boolean(senhaDoPainel());
  if (!sql || !temSenha) {
    return (
      <Moldura>
        <Configurar banco={Boolean(sql)} senha={temSenha} />
      </Moldura>
    );
  }

  if (!(await painelLiberado())) {
    return (
      <Moldura>
        <div className="mx-auto max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-950">
            Métricas do site
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Área interna. Digite a senha para ver os acessos.
          </p>
          <Entrar />
        </div>
      </Moldura>
    );
  }

  const { p } = await searchParams;
  const periodo = lerPeriodo(typeof p === "string" ? p : undefined);

  let dados: Metricas | null = null;
  try {
    dados = await carregarMetricas(sql, periodo);
  } catch (erro) {
    console.error("Métricas: falha ao ler o banco", erro);
  }

  return (
    <Moldura comSair>
      {dados ? (
        <>
          <Atualizar />
          <Painel dados={dados} />
        </>
      ) : (
        <Aviso titulo="Não foi possível ler o banco de dados">
          O banco está configurado, mas a consulta falhou. Veja os logs da
          função na Vercel e tente de novo em alguns minutos.
        </Aviso>
      )}
    </Moldura>
  );
}

/* ---------- Estrutura ---------- */

function Moldura({
  children,
  comSair = false,
}: {
  children: React.ReactNode;
  comSair?: boolean;
}) {
  return (
    <div className="min-h-screen flex-1 bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Ir para o site">
              <Wordmark tone="mono" />
            </Link>
            <span aria-hidden className="h-7 w-px bg-neutral-200" />
            <span className="text-sm font-medium text-neutral-500">Métricas</span>
          </div>
          {comSair && (
            <form action={sair}>
              <button
                type="submit"
                className="rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                Sair
              </button>
            </form>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

function Aviso({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      <h1 className="text-xl font-semibold tracking-tight text-neutral-950">{titulo}</h1>
      <div className="mt-3 text-sm leading-relaxed text-neutral-600">{children}</div>
    </div>
  );
}

function Configurar({ banco, senha }: { banco: boolean; senha: boolean }) {
  const passos = [
    {
      feito: banco,
      titulo: "Ligar o banco de dados",
      texto:
        "Na Vercel, abra o projeto > Storage > Create Database > Neon (Postgres) e conecte ao projeto. Isso cria a variável DATABASE_URL.",
    },
    {
      feito: senha,
      titulo: "Definir a senha do painel",
      texto:
        "Settings > Environment Variables > adicione METRICAS_SENHA com a senha que vai abrir esta página.",
    },
    {
      feito: false,
      titulo: "Publicar de novo",
      texto: "Deployments > no último deploy, Redeploy. A contagem começa a partir daí.",
    },
  ];

  return (
    <Aviso titulo="Falta pouco para as métricas funcionarem">
      <ol className="space-y-4">
        {passos.map((passo, indice) => (
          <li key={passo.titulo} className="flex gap-3">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                passo.feito
                  ? "bg-brand-4 text-white"
                  : "border border-neutral-300 text-neutral-500"
              }`}
            >
              {passo.feito ? "✓" : indice + 1}
            </span>
            <div>
              <p className="font-medium text-neutral-950">
                {passo.titulo}
                {passo.feito && <span className="font-normal text-neutral-500"> · pronto</span>}
              </p>
              <p className="mt-0.5">{passo.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </Aviso>
  );
}

function Cartao({
  titulo,
  descricao,
  children,
  className = "",
}: {
  titulo: string;
  descricao?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 ${className}`}>
      <h2 className="font-semibold text-neutral-950">{titulo}</h2>
      {descricao && <p className="mt-0.5 text-sm text-neutral-500">{descricao}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Vazio({ children = "Nenhum acesso neste período ainda." }: { children?: React.ReactNode }) {
  return <p className="py-6 text-center text-sm text-neutral-400">{children}</p>;
}

/* ---------- Números ---------- */

function Variacao({
  atual,
  anterior,
  comparacao,
}: {
  atual: number;
  anterior: number;
  comparacao: string;
}) {
  if (anterior === 0) {
    return (
      <p className="mt-1 text-xs text-neutral-500">
        {comparacao.startsWith("ontem") ? `Nenhum ${comparacao}` : `Nenhum nos ${comparacao}`}
      </p>
    );
  }
  const diferenca = Math.round(((atual - anterior) / anterior) * 100);
  const cor =
    diferenca > 0 ? "text-emerald-700" : diferenca < 0 ? "text-rose-700" : "text-neutral-500";
  const seta = diferenca > 0 ? "▲" : diferenca < 0 ? "▼" : "=";
  return (
    <p className="mt-1 text-xs text-neutral-500">
      <span className={`font-medium ${cor}`}>
        {seta} {Math.abs(diferenca)}%
      </span>{" "}
      vs. {comparacao}
    </p>
  );
}

function Indicador({
  rotulo,
  valor,
  children,
  aoVivo = false,
  className = "",
}: {
  rotulo: string;
  valor: string;
  children?: React.ReactNode;
  aoVivo?: boolean;
  className?: string;
}) {
  return (
    <div className={`min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 ${className}`}>
      <p className="flex items-center gap-2 text-sm text-neutral-500">
        {aoVivo && (
          <span aria-hidden className="relative flex size-2">
            <span className="animate-signal absolute inset-0 rounded-full bg-brand-5" />
            <span className="relative size-2 rounded-full bg-brand-5" />
          </span>
        )}
        {rotulo}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">{valor}</p>
      {children}
    </div>
  );
}

const Nota = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1 text-xs text-neutral-500">{children}</p>
);

/** Lista com barra fina: nome, número e a parte do total. */
function ListaDeBarras({
  itens,
  total,
}: {
  itens: { nome: string; valor: number; extra?: string }[];
  total: number;
}) {
  if (!itens.length) return <Vazio />;
  return (
    <ul className="space-y-3.5">
      {itens.map((item) => {
        const parte = porcento(item.valor, total);
        return (
          <li key={item.nome}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-neutral-950" title={item.nome}>
                {item.nome}
              </span>
              <span className="shrink-0 tabular-nums text-neutral-950">
                {item.extra && (
                  <span className="mr-2 text-xs text-neutral-500">{item.extra}</span>
                )}
                <span className="font-medium">{inteiro.format(item.valor)}</span>
                <span className="ml-1.5 inline-block w-9 text-right text-xs text-neutral-500">
                  {parte}%
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-brand-4/10">
              <div
                className="h-full rounded-full bg-brand-4"
                style={{ width: `${Math.max(parte, item.valor ? 1 : 0)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TabelaDeAparelhos({ linhas, total }: { linhas: Linha[]; total: number }) {
  if (!linhas.length) return <Vazio />;
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[22rem] text-sm [&_td:not(:last-child)]:pr-4 [&_th:not(:last-child)]:pr-4">
        <thead>
          <tr className="text-left text-xs text-neutral-500">
            <th className="pb-2 font-medium">Aparelho</th>
            <th className="pb-2 text-right font-medium">Acessos</th>
            <th className="pb-2 text-right font-medium">Visitantes</th>
            <th className="pb-2 text-right font-medium">Tempo médio</th>
            <th className="pb-2 text-right font-medium">WhatsApp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 tabular-nums">
          {linhas.map((linha) => (
            <tr key={linha.nome}>
              <td className="py-2.5 text-neutral-950">{APARELHOS[linha.nome] ?? linha.nome}</td>
              <td className="py-2.5 text-right text-neutral-950">
                <span className="font-medium">{inteiro.format(linha.acessos)}</span>
                <span className="ml-1 text-xs text-neutral-500">
                  {porcento(linha.acessos, total)}%
                </span>
              </td>
              <td className="py-2.5 text-right text-neutral-950">
                {inteiro.format(linha.visitantes)}
              </td>
              <td className="py-2.5 text-right text-neutral-950">{duracao(linha.tempo)}</td>
              <td className="py-2.5 text-right text-neutral-950">
                {inteiro.format(linha.cliques)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Painel ---------- */

function Painel({ dados }: { dados: Metricas }) {
  const { resumo, anterior, conversao, periodo, rolagem } = dados;
  const { anterior: comparacao } = PERIODOS[periodo];
  const semAcessos = resumo.acessos === 0;
  const porUnidade =
    dados.unidade === "hour" ? "por hora" : dados.unidade === "week" ? "por semana" : "por dia";
  const serie = colunasDaSerie(dados);

  const aparelhosComCookies = dados.frequencia.reduce((soma, f) => soma + f.aparelhos, 0);
  const voltaram = dados.frequencia
    .filter((f) => f.vezes >= 2)
    .reduce((soma, f) => soma + f.aparelhos, 0);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            Acessos ao site
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Atualizado às {soHora.format(new Date())}. Atualiza sozinho a cada minuto.
          </p>
        </div>
        <nav aria-label="Período" className="flex rounded-xl border border-neutral-200 bg-white p-1">
          {Object.entries(PERIODOS).map(([chave, { rotulo }]) => (
            <Link
              key={chave}
              href={`/metricas?p=${chave}`}
              aria-current={chave === periodo ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                chave === periodo
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
              }`}
            >
              {rotulo}
            </Link>
          ))}
        </nav>
      </div>

      <section aria-label="Resumo" className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Indicador rotulo="Acessos" valor={inteiro.format(resumo.acessos)}>
          <Variacao atual={resumo.acessos} anterior={anterior.acessos} comparacao={comparacao} />
        </Indicador>
        <Indicador rotulo="Visitantes" valor={inteiro.format(resumo.visitantes)}>
          <Variacao
            atual={resumo.visitantes}
            anterior={anterior.visitantes}
            comparacao={comparacao}
          />
        </Indicador>
        <Indicador rotulo="Tempo médio na página" valor={duracao(resumo.tempo)}>
          {resumo.rapidas !== null && (
            <Nota>{resumo.rapidas}% saíram em menos de 10s</Nota>
          )}
        </Indicador>
        <Indicador rotulo="Cliques no WhatsApp" valor={inteiro.format(conversao.cliques)}>
          <Nota>
            {porcento(conversao.pessoas, resumo.visitantes)}% dos visitantes clicaram
          </Nota>
        </Indicador>
        <Indicador
          rotulo="Últimos 30 min"
          valor={inteiro.format(dados.agora)}
          aoVivo
          className="col-span-2 lg:col-span-1"
        >
          <Nota>{dados.agora === 1 ? "pessoa no site" : "pessoas no site"}</Nota>
        </Indicador>
      </section>

      <Cartao
        titulo={`Acessos ${porUnidade}`}
        descricao="Passe o dedo ou o mouse nas colunas para ver os números."
        className="mt-3"
      >
        {semAcessos ? (
          <Vazio />
        ) : (
          <Colunas colunas={serie} rotulosNoEixo={dados.unidade === "hour" ? 8 : 7} />
        )}
        <details className="mt-5 text-sm">
          <summary className="cursor-pointer text-neutral-500 transition-colors hover:text-neutral-950">
            Ver em tabela
          </summary>
          <div className="mt-3 max-h-72 overflow-y-auto">
            <table className="w-full tabular-nums [&_td:not(:last-child)]:pr-4 [&_th:not(:last-child)]:pr-4">
              <thead>
                <tr className="text-left text-xs text-neutral-500">
                  <th className="pb-2 font-medium">Quando</th>
                  <th className="pb-2 text-right font-medium">Acessos</th>
                  <th className="pb-2 text-right font-medium">Visitantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {serie.map((coluna, indice) => (
                  <tr key={dados.serie[indice].inicio}>
                    <td className="py-1.5 text-neutral-950">{coluna.rotulo}</td>
                    <td className="py-1.5 text-right text-neutral-950">
                      {inteiro.format(coluna.valor)}
                    </td>
                    <td className="py-1.5 text-right text-neutral-950">
                      {inteiro.format(dados.serie[indice].visitantes)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Cartao>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Cartao titulo="Por aparelho" descricao="Quantas vezes o site foi aberto em cada tipo de aparelho.">
          <TabelaDeAparelhos linhas={dados.dispositivos} total={resumo.acessos} />
        </Cartao>

        <Cartao titulo="De onde vieram" descricao="Rede, site ou anúncio que trouxe cada acesso.">
          <ListaDeBarras
            total={resumo.acessos}
            itens={dados.origens.map((linha) => ({
              nome: linha.nome,
              valor: linha.acessos,
              extra: linha.cliques ? plural(linha.cliques, "clique", "cliques") : undefined,
            }))}
          />
        </Cartao>

        <Cartao titulo="Cidades" descricao="Pela localização da conexão (aproximada).">
          <ListaDeBarras
            total={resumo.acessos}
            itens={dados.locais.map((linha) => ({ nome: linha.nome, valor: linha.acessos }))}
          />
        </Cartao>

        <Cartao titulo="Horário dos acessos" descricao="Somando todos os dias do período, horário de Brasília.">
          {semAcessos ? (
            <Vazio />
          ) : (
            <Colunas
              altura={140}
              rotulosNoEixo={4}
              colunas={dados.horas.map((h) => ({
                eixo: `${h.hora}h`,
                rotulo: `Das ${h.hora}h às ${h.hora + 1}h`,
                valor: h.acessos,
              }))}
            />
          )}
        </Cartao>

        <Cartao titulo="Até onde rolaram a página" descricao="Parte dos acessos que passou de cada ponto da página.">
          <ListaDeBarras
            total={rolagem.medidos}
            itens={
              rolagem.medidos
                ? [
                    { nome: "Passaram de 25%", valor: rolagem.r25 },
                    { nome: "Passaram da metade", valor: rolagem.r50 },
                    { nome: "Passaram de 75%", valor: rolagem.r75 },
                    { nome: "Chegaram ao fim", valor: rolagem.r90 },
                  ]
                : []
            }
          />
        </Cartao>

        <Cartao
          titulo="Quantas vezes cada aparelho entrou"
          descricao={
            aparelhosComCookies
              ? `${porcento(voltaram, aparelhosComCookies)}% voltaram ao site. Só aparelhos que aceitaram cookies (${inteiro.format(aparelhosComCookies)}).`
              : "Só aparelhos que aceitaram cookies."
          }
        >
          <ListaDeBarras
            total={aparelhosComCookies}
            itens={dados.frequencia.map((f) => ({
              nome: f.vezes >= 6 ? "6 vezes ou mais" : f.vezes === 1 ? "1 vez" : `${f.vezes} vezes`,
              valor: f.aparelhos,
            }))}
          />
        </Cartao>

        <Cartao titulo="Botões de WhatsApp clicados" descricao="Em que parte da página a pessoa clicou.">
          <ListaDeBarras
            total={conversao.cliques}
            itens={dados.botoes.map((b) => ({ nome: nomeDoBotao(b.alvo), valor: b.cliques }))}
          />
        </Cartao>

        <Cartao titulo="Navegador e sistema">
          <div className="grid gap-6 sm:grid-cols-2">
            <ListaDeBarras
              total={resumo.acessos}
              itens={dados.navegadores.map((l) => ({ nome: l.nome, valor: l.acessos }))}
            />
            <ListaDeBarras
              total={resumo.acessos}
              itens={dados.sistemas.map((l) => ({ nome: l.nome, valor: l.acessos }))}
            />
          </div>
        </Cartao>

        {dados.campanhas.length > 0 && (
          <Cartao
            titulo="Campanhas"
            descricao="Links com utm_campaign, como os dos anúncios."
            className="lg:col-span-2"
          >
            <ListaDeBarras
              total={resumo.acessos}
              itens={dados.campanhas.map((linha) => ({
                nome: linha.nome,
                valor: linha.acessos,
                extra: linha.cliques ? plural(linha.cliques, "clique", "cliques") : undefined,
              }))}
            />
          </Cartao>
        )}
      </div>

      <Cartao titulo="Últimos acessos" descricao="Os 20 mais recentes, de qualquer período." className="mt-3">
        {dados.ultimos.length ? (
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="w-full min-w-[46rem] whitespace-nowrap text-sm [&_td:not(:last-child)]:pr-4 [&_th:not(:last-child)]:pr-4">
              <thead>
                <tr className="text-left text-xs text-neutral-500">
                  <th className="pb-2 font-medium">Quando</th>
                  <th className="pb-2 font-medium">Aparelho</th>
                  <th className="pb-2 font-medium">Origem</th>
                  <th className="pb-2 font-medium">Local</th>
                  <th className="pb-2 text-right font-medium">Tempo</th>
                  <th className="pb-2 text-right font-medium">Rolagem</th>
                  <th className="pb-2 text-right font-medium">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {dados.ultimos.map((acesso, indice) => (
                  <tr key={indice} className="text-neutral-950">
                    <td className="py-2.5 whitespace-nowrap tabular-nums">
                      {dataEHora.format(acesso.criado_em)}
                    </td>
                    <td className="py-2.5">
                      {[APARELHOS[acesso.dispositivo] ?? acesso.dispositivo, acesso.sistema, acesso.navegador]
                        .filter(Boolean)
                        .join(" · ")}
                    </td>
                    <td className="py-2.5">{acesso.origem}</td>
                    <td className="py-2.5 text-neutral-600">{acesso.local ?? "–"}</td>
                    <td className="py-2.5 text-right tabular-nums">{duracao(acesso.duracao)}</td>
                    <td className="py-2.5 text-right tabular-nums">
                      {acesso.rolagem === null ? "–" : `${acesso.rolagem}%`}
                    </td>
                    <td className="py-2.5 text-right">{acesso.clicou ? "Clicou" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Vazio>Nenhum acesso registrado ainda.</Vazio>
        )}
      </Cartao>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-neutral-500">
        Como contamos: cada vez que a página abre é um acesso. Visitantes são
        pessoas diferentes: quem aceitou cookies é reconhecido sempre; quem
        recusou ou não respondeu é contado uma vez por dia, sem identificação.
        {resumo.consentimento !== null &&
          ` Neste período, ${resumo.consentimento}% dos acessos aceitaram cookies.`}{" "}
        Robôs e os acessos deste navegador, enquanto estiver logado no painel,
        não entram na conta.
      </p>
    </>
  );
}
