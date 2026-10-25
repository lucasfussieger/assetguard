import postgres from "postgres";

/**
 * Banco das métricas. A integração da Neon na Vercel (Storage > Neon) cria
 * DATABASE_URL sozinha. Sem ela o site funciona igual e só não grava nada.
 */
export const urlDoBanco = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

export const sql = urlDoBanco
  ? postgres(urlDoBanco, { prepare: false, max: 5, idle_timeout: 20 })
  : null;

export type Banco = NonNullable<typeof sql>;

let tabelas: Promise<void> | undefined;

/** Cria as tabelas na primeira vez que o banco é usado. */
export function prepararBanco(db: Banco) {
  tabelas ??= (async () => {
    await db`
      create table if not exists acessos (
        id uuid primary key,
        criado_em timestamptz not null default now(),
        caminho text not null,
        origem text not null,
        referencia text,
        campanha text,
        dispositivo text not null,
        navegador text,
        sistema text,
        pais text,
        estado text,
        cidade text,
        idioma text,
        largura integer,
        visitante text not null,
        consentiu boolean not null default false,
        duracao integer,
        rolagem integer
      )
    `;
    await db`create index if not exists acessos_criado_em on acessos (criado_em)`;
    await db`create index if not exists acessos_visitante on acessos (visitante, criado_em)`;
    await db`
      create table if not exists cliques (
        id bigint generated always as identity primary key,
        acesso_id uuid not null,
        criado_em timestamptz not null default now(),
        alvo text not null
      )
    `;
    await db`create index if not exists cliques_criado_em on cliques (criado_em)`;
  })().catch((erro) => {
    tabelas = undefined;
    throw erro;
  });
  return tabelas;
}
