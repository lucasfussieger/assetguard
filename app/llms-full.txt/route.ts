import {
  audiences,
  faq,
  features,
  modules,
  problems,
  steps,
} from "../lib/content";
import { CONTACT_PHONE, SITE_NAME, SITE_SUMMARY, SITE_URL } from "../lib/site";

/*
 * Todo o conteúdo do site em Markdown, montado a partir de lib/content para
 * dizer exatamente o que a página diz.
 */

const list = (items: readonly string[]) =>
  items.map((item) => `- ${item}.`).join("\n");

const content = `# ${SITE_NAME}

> ${SITE_SUMMARY}

Fonte: ${SITE_URL}/
Idioma: português do Brasil
Atualizado em: ${new Date().toISOString().slice(0, 10)}

## O problema

Hoje, o prédio descobre os problemas de água tarde demais.

${problems.map((item) => `- ${item.title} ${item.text}`).join("\n")}

## Monitoramento hídrico

A Viz troca a surpresa pelo aviso. Sensores no reservatório e no hidrômetro enviam as leituras para o app. Quando algo sai do padrão, o responsável fica sabendo na hora.

${features
  .map(
    (item) =>
      `### ${item.name}\n\n${item.title} ${item.text}\n\n${list(item.points)}`
  )
  .join("\n\n")}

## Gestão do condomínio

A água e a rotina do prédio ficam no mesmo app. Síndico, portaria e moradores resolvem pelo celular o que antes dependia de caderno, planilha e grupo de WhatsApp.

${modules.map((item) => `### ${item.name}\n\n${item.description}`).join("\n\n")}

## Como funciona

${steps
  .map((item, index) => `${index + 1}. ${item.title}: ${item.text}`)
  .join("\n")}

## Para quem

${audiences
  .map(
    (item) =>
      `### ${item.title} (${item.subtitle.toLowerCase()})\n\n${list(item.points)}`
  )
  .join("\n\n")}

## Perguntas frequentes

${faq.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Contato e orçamento

O orçamento é pedido pelo botão "Pedir orçamento", que abre um formulário com nome, WhatsApp, perfil (condomínio ou construtora) e se o prédio já usa software de gestão. A conversa continua pelo WhatsApp.

- WhatsApp e telefone: ${CONTACT_PHONE}
- Site: ${SITE_URL}/
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
