import type { Fragment } from "postgres";

import { prepararBanco, type Banco } from "../lib/metricas/db";

export const PERIODOS = {
  hoje: { rotulo: "Hoje", dias: 1, anterior: "ontem até esta hora" },
  "7d": { rotulo: "7 dias", dias: 7, anterior: "7 dias anteriores" },
  "30d": { rotulo: "30 dias", dias: 30, anterior: "30 dias anteriores" },
  "90d": { rotulo: "90 dias", dias: 90, anterior: "90 dias anteriores" },
} as const;

export type Periodo = keyof typeof PERIODOS;

export function lerPeriodo(valor: string | undefined): Periodo {
  return valor && Object.hasOwn(PERIODOS, valor) ? (valor as Periodo) : "7d";
}

const FUSO = "America/Sao_Paulo";
const DIA = 86_400_000;

/** Acima disso a aba ficou esquecida aberta: conta como 30 min na média. */
const TETO_DURACAO = 1800;

/** Meia-noite de hoje em Brasília (sem horário de verão desde 2019: -03:00). */
function meiaNoiteDeHoje() {
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(
    new Date()
  );
  return new Date(`${hoje}T00:00:00-03:00`);
}

export type Linha = {
  nome: string;
  acessos: number;
  visitantes: number;
  tempo: number | null;
  cliques: number;
};

export type Ponto = { inicio: string; acessos: number; visitantes: number };

export type Acesso = {
  criado_em: Date;
  dispositivo: string;
  sistema: string | null;
  navegador: string | null;
  origem: string;
  local: string | null;
  duracao: number | null;
  rolagem: number | null;
  consentiu: boolean;
  clicou: boolean;
};

export async function carregarMetricas(db: Banco, periodo: Periodo) {
  await prepararBanco(db);

  const { dias } = PERIODOS[periodo];
  const inicio = new Date(meiaNoiteDeHoje().getTime() - (dias - 1) * DIA);
  // Mesma janela, deslocada para trás: "hoje até agora" contra "ontem até esta hora".
  const inicioAnterior = new Date(inicio.getTime() - dias * DIA);
  const fimAnterior = new Date(Date.now() - dias * DIA);
  const unidade = periodo === "hoje" ? "hour" : periodo === "90d" ? "week" : "day";

  const agrupar = (expressao: Fragment, limite = 8) => db<Linha[]>`
    select
      ${expressao} as nome,
      count(*)::int as acessos,
      count(distinct a.visitante)::int as visitantes,
      round(avg(least(a.duracao, ${TETO_DURACAO})) filter (where a.duracao is not null))::int as tempo,
      coalesce(sum(c.cliques), 0)::int as cliques
    from acessos a
    left join (
      select acesso_id, count(*) as cliques
      from cliques
      where criado_em >= ${inicio}
      group by acesso_id
    ) c on c.acesso_id = a.id
    where a.criado_em >= ${inicio}
    group by 1
    order by acessos desc, nome
    limit ${limite}
  `;

  const [
    [resumo],
    [anterior],
    [conversao],
    [agora],
    serie,
    dispositivos,
    origens,
    campanhas,
    locais,
    navegadores,
    sistemas,
    horas,
    [rolagem],
    frequencia,
    botoes,
    ultimos,
  ] = await Promise.all([
    db<
      {
        acessos: number;
        visitantes: number;
        tempo: number | null;
        rapidas: number | null;
        consentimento: number | null;
      }[]
    >`
      select
        count(*)::int as acessos,
        count(distinct visitante)::int as visitantes,
        round(avg(least(duracao, ${TETO_DURACAO})) filter (where duracao is not null))::int as tempo,
        round(100.0 * count(*) filter (where duracao < 10)
          / nullif(count(*) filter (where duracao is not null), 0))::int as rapidas,
        round(100.0 * count(*) filter (where consentiu) / nullif(count(*), 0))::int as consentimento
      from acessos
      where criado_em >= ${inicio}
    `,
    db<{ acessos: number; visitantes: number }[]>`
      select count(*)::int as acessos, count(distinct visitante)::int as visitantes
      from acessos
      where criado_em >= ${inicioAnterior} and criado_em < ${fimAnterior}
    `,
    db<{ cliques: number; pessoas: number }[]>`
      select count(*)::int as cliques, count(distinct a.visitante)::int as pessoas
      from cliques c
      join acessos a on a.id = c.acesso_id
      where c.criado_em >= ${inicio}
    `,
    db<{ pessoas: number }[]>`
      select count(distinct visitante)::int as pessoas
      from acessos
      where criado_em >= now() - interval '30 minutes'
    `,
    db<Ponto[]>`
      select
        to_char(b.inicio, 'YYYY-MM-DD"T"HH24') as inicio,
        count(a.id)::int as acessos,
        count(distinct a.visitante)::int as visitantes
      from generate_series(
        date_trunc(${unidade}, ${inicio}::timestamptz at time zone ${FUSO}),
        now() at time zone ${FUSO},
        ${`1 ${unidade}`}::interval
      ) as b(inicio)
      left join acessos a
        on a.criado_em >= ${inicio}
        and date_trunc(${unidade}, a.criado_em at time zone ${FUSO}) = b.inicio
      group by b.inicio
      order by b.inicio
    `,
    agrupar(db`a.dispositivo`, 5),
    agrupar(db`a.origem`),
    agrupar(db`coalesce(a.campanha, '')`, 9),
    agrupar(
      db`coalesce(nullif(concat_ws(' · ', a.cidade, a.estado, nullif(a.pais, 'BR')), ''), 'Sem localização')`
    ),
    agrupar(db`coalesce(a.navegador, 'Outro')`, 6),
    agrupar(db`coalesce(a.sistema, 'Outro')`, 6),
    db<{ hora: number; acessos: number }[]>`
      select extract(hour from criado_em at time zone ${FUSO})::int as hora, count(*)::int as acessos
      from acessos
      where criado_em >= ${inicio}
      group by 1
    `,
    db<{ medidos: number; r25: number; r50: number; r75: number; r90: number }[]>`
      select
        count(*)::int as medidos,
        count(*) filter (where rolagem >= 25)::int as r25,
        count(*) filter (where rolagem >= 50)::int as r50,
        count(*) filter (where rolagem >= 75)::int as r75,
        count(*) filter (where rolagem >= 90)::int as r90
      from acessos
      where criado_em >= ${inicio} and rolagem is not null
    `,
    // Visita nova quando o mesmo aparelho volta depois de 30 min parado.
    db<{ vezes: number; aparelhos: number }[]>`
      select least(visitas, 6)::int as vezes, count(*)::int as aparelhos
      from (
        select visitante, count(*) filter (where nova) as visitas
        from (
          select
            visitante,
            coalesce(
              criado_em - lag(criado_em) over (partition by visitante order by criado_em)
                > interval '30 minutes',
              true
            ) as nova
          from acessos
          where criado_em >= ${inicio} and consentiu
        ) s
        group by visitante
      ) v
      group by 1
      order by 1
    `,
    db<{ alvo: string; cliques: number }[]>`
      select alvo, count(*)::int as cliques
      from cliques
      where criado_em >= ${inicio}
      group by 1
      order by 2 desc, 1
      limit 8
    `,
    db<Acesso[]>`
      select
        a.criado_em, a.dispositivo, a.sistema, a.navegador, a.origem,
        nullif(concat_ws(' · ', a.cidade, a.estado, nullif(a.pais, 'BR')), '') as local,
        a.duracao, a.rolagem, a.consentiu,
        exists (select 1 from cliques c where c.acesso_id = a.id) as clicou
      from acessos a
      order by a.criado_em desc
      limit 20
    `,
  ]);

  const porHora = new Map(horas.map((h) => [h.hora, h.acessos]));

  return {
    periodo,
    unidade,
    resumo,
    anterior,
    conversao,
    agora: agora.pessoas,
    serie,
    dispositivos,
    origens,
    campanhas: campanhas.filter((c) => c.nome !== ""),
    locais,
    navegadores,
    sistemas,
    horas: Array.from({ length: 24 }, (_, hora) => ({
      hora,
      acessos: porHora.get(hora) ?? 0,
    })),
    rolagem,
    frequencia,
    botoes,
    ultimos,
  };
}

export type Metricas = Awaited<ReturnType<typeof carregarMetricas>>;
