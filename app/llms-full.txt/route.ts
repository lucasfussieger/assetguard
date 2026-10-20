import {
  audiences,
  faq,
  modules,
  monitoring,
  pillars,
  steps,
} from "../lib/content";
import { CONTACT_PHONE, SITE_NAME, SITE_SUMMARY, SITE_URL } from "../lib/site";

/*
 * Todo o conteúdo do site em Markdown, montado a partir de lib/content para
 * dizer exatamente o que a página diz.
 */

const list = (items: readonly string[]) =>
  items.map((item) => `- ${item}.`).join("\n");

const features = (items: readonly { name: string }[]) =>
  items.map((item) => `- ${item.name}`).join("\n");

const content = `# ${SITE_NAME}

> ${SITE_SUMMARY}

Fonte: ${SITE_URL}/
Idioma: português do Brasil
Atualizado em: ${new Date().toISOString().slice(0, 10)}

## Gestão e monitoramento, no mesmo app

A água e a rotina do prédio num lugar só, para síndico, portaria e moradores.

### ${pillars.monitoring.title}

${pillars.monitoring.pitch}

${features(monitoring)}

### ${pillars.modules.title}

${pillars.modules.pitch}

${features(modules)}

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

O orçamento é pedido pelo botão "Pedir orçamento", que abre uma conversa no WhatsApp da Viz.

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
