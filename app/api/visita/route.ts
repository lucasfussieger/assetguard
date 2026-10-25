import { createHash } from "node:crypto";
import { userAgent, type NextRequest } from "next/server";

import { prepararBanco, sql, urlDoBanco } from "../../lib/metricas/db";
import { COOKIE_PAINEL } from "../../lib/metricas/painel";

/*
 * Recebe os avisos do rastreador (app/components/rastreador.tsx):
 * "acesso" quando a página abre, "atualiza" com o tempo e a rolagem quando a
 * pessoa sai ou troca de aba, e "clique" a cada botão de WhatsApp.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const vazio = () => new Response(null, { status: 204 });
const invalido = () => new Response(null, { status: 400 });

/** Campo de texto que veio do navegador: aparado e com tamanho limitado. */
function texto(valor: unknown, max = 200) {
  return typeof valor === "string" && valor.trim()
    ? valor.trim().slice(0, max)
    : null;
}

function numero(valor: unknown, max: number) {
  return typeof valor === "number" && Number.isFinite(valor)
    ? Math.min(max, Math.max(0, Math.round(valor)))
    : null;
}

/** Os cabeçalhos de cidade da Vercel vêm com acento codificado (Itaja%C3%AD). */
function cabecalho(request: NextRequest, nome: string) {
  const valor = request.headers.get(nome);
  if (!valor) return null;
  try {
    return decodeURIComponent(valor).slice(0, 80);
  } catch {
    return valor.slice(0, 80);
  }
}

/** Domínio de quem mandou a pessoa para cá, sem "www.". Links internos não contam. */
function dominioDe(referencia: string | null, host: string | null) {
  if (!referencia) return null;
  try {
    const dominio = new URL(referencia).hostname.replace(/^www\./, "");
    return dominio && dominio !== host?.replace(/^www\./, "") ? dominio : null;
  } catch {
    return null;
  }
}

const REDES: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "Facebook"],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, "WhatsApp"],
  [/(^|\.)google\.[a-z.]+$/, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "LinkedIn"],
  [/(^|\.)youtube\.com$|^youtu\.be$/, "YouTube"],
  [/(^|\.)tiktok\.com$/, "TikTok"],
  [/^(t\.co|x\.com|twitter\.com)$/, "X (Twitter)"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "ChatGPT"],
  [/(^|\.)perplexity\.ai$/, "Perplexity"],
];

/** utm_source mais comuns, incluindo os do {{site_source_name}} da Meta. */
const FONTES: Record<string, string> = {
  ig: "Instagram",
  instagram: "Instagram",
  fb: "Facebook",
  facebook: "Facebook",
  meta: "Facebook",
  msg: "Messenger",
  an: "Audience Network",
  google: "Google",
  whatsapp: "WhatsApp",
  wa: "WhatsApp",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

/**
 * De onde a pessoa veio, em ordem de confiança: UTM do link, domínio de
 * origem, marcas de clique (fbclid/gclid) e, por último, o navegador interno
 * do Instagram e do Facebook, que costuma não mandar origem.
 */
function origemDe(dados: {
  dominio: string | null;
  fonte: string | null;
  meio: string | null;
  fbclid: boolean;
  gclid: boolean;
  navegador: string | null;
}) {
  const pago =
    dados.gclid ||
    /^(cpc|ppc|paid|ads?|paid[_-]?social|anuncio|trafego[_-]?pago)$/i.test(
      dados.meio ?? ""
    );

  let nome: string | null = null;
  if (dados.fonte) nome = FONTES[dados.fonte.toLowerCase()] ?? dados.fonte;
  else if (dados.dominio)
    nome = REDES.find(([regra]) => regra.test(dados.dominio!))?.[1] ?? dados.dominio;
  else if (dados.gclid) nome = "Google";
  else if (dados.navegador === "Instagram" || dados.navegador === "Facebook")
    nome = dados.navegador;
  else if (dados.fbclid) nome = "Facebook ou Instagram";

  if (!nome) return "Direto";
  return pago ? `${nome} (anúncio)` : nome;
}

function dispositivoDe(tipo: string | undefined) {
  if (!tipo) return "computador";
  if (tipo === "mobile") return "celular";
  if (tipo === "tablet") return "tablet";
  return "outro";
}

function navegadorDe(nome: string | undefined) {
  return nome?.replace(/^Mobile /, "").replace(/ WebView$/, "") || null;
}

function sistemaDe(nome: string | undefined) {
  if (nome === "Mac OS") return "macOS";
  if (nome === "Chromium OS") return "ChromeOS";
  return nome || null;
}

/** Id que o navegador guardou depois do "Aceitar" dos cookies. */
function idConsentido(valor: unknown) {
  return typeof valor === "string" && UUID.test(valor) ? `v:${valor}` : null;
}

const diaEmSaoPaulo = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(
    new Date()
  );

/**
 * Sem consentimento: um código que troca todo dia, tirado do IP e do
 * navegador. Conta visitantes do dia sem guardar o IP nem nada no aparelho.
 */
function idAnonimo(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const navegador = request.headers.get("user-agent") ?? "";
  const codigo = createHash("sha256")
    .update(`${diaEmSaoPaulo()}|${urlDoBanco}|${ip}|${navegador}`)
    .digest("hex");
  return `h:${codigo.slice(0, 20)}`;
}

export async function POST(request: NextRequest) {
  const db = sql;
  const agente = userAgent(request);
  const vindoDe = request.headers.get("sec-fetch-site");

  // Só o próprio site manda visita. Robôs e quem entrou no painel ficam de fora.
  if (
    !db ||
    (vindoDe && vindoDe !== "same-origin") ||
    agente.isBot ||
    request.cookies.has(COOKIE_PAINEL)
  ) {
    return vazio();
  }

  const corpo = await request.text();
  if (corpo.length > 4000) return invalido();

  let dados: Record<string, unknown>;
  try {
    const lido: unknown = JSON.parse(corpo);
    if (!lido || typeof lido !== "object") return invalido();
    dados = lido as Record<string, unknown>;
  } catch {
    return invalido();
  }

  const id = texto(dados.id);
  if (!id || !UUID.test(id)) return invalido();

  await prepararBanco(db);
  const consentido = idConsentido(dados.visitante);

  if (dados.t === "acesso") {
    const navegador = navegadorDe(agente.browser.name);
    const utm = (dados.utm ?? {}) as Record<string, unknown>;
    const dominio = dominioDe(
      texto(dados.referencia, 500),
      request.headers.get("host")
    );

    await db`
      insert into acessos ${db({
        id,
        caminho: texto(dados.caminho, 300) ?? "/",
        origem: origemDe({
          dominio,
          fonte: texto(utm.source, 80),
          meio: texto(utm.medium, 80),
          fbclid: dados.fbclid === true,
          gclid: dados.gclid === true,
          navegador,
        }),
        referencia: dominio,
        campanha: texto(utm.campaign, 120),
        dispositivo: dispositivoDe(agente.device.type),
        navegador,
        sistema: sistemaDe(agente.os.name),
        pais: cabecalho(request, "x-vercel-ip-country"),
        estado: cabecalho(request, "x-vercel-ip-country-region"),
        cidade: cabecalho(request, "x-vercel-ip-city"),
        idioma: texto(dados.idioma, 20),
        largura: numero(dados.largura, 10000),
        visitante: consentido ?? idAnonimo(request),
        consentiu: consentido !== null,
      })}
      on conflict (id) do nothing
    `;
  } else if (dados.t === "atualiza") {
    // Chega várias vezes por acesso (troca de aba, saída): fica o maior valor.
    await db`
      update acessos set
        duracao = greatest(coalesce(duracao, 0), ${numero(dados.duracao, 86400) ?? 0}),
        rolagem = greatest(coalesce(rolagem, 0), ${numero(dados.rolagem, 100) ?? 0}),
        visitante = coalesce(${consentido}::text, visitante),
        consentiu = consentiu or ${consentido !== null}
      where id = ${id} and criado_em > now() - interval '1 day'
    `;
  } else if (dados.t === "clique") {
    const alvo = texto(dados.alvo, 120);
    if (!alvo) return invalido();
    await db`insert into cliques (acesso_id, alvo) values (${id}, ${alvo})`;
  } else {
    return invalido();
  }

  return vazio();
}
