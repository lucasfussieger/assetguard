import { faq, features, joinPt, modules } from "../lib/content";
import { CONTACT_PHONE, SITE_NAME, SITE_SUMMARY, SITE_URL } from "../lib/site";

/*
 * Resumo do site para mecanismos generativos, no formato de llmstxt.org:
 * título, resumo em citação, fatos objetivos e links para cada seção.
 */

const answer = (question: string) =>
  faq.find((item) => item.question === question)?.answer ?? "";

const moduleNames = joinPt(modules.map((item) => item.name.toLowerCase()));

const content = `# ${SITE_NAME}

> ${SITE_SUMMARY}

Fatos principais:

- O que é: monitoramento da água do prédio (${joinPt(
  features.map((item) => item.name.toLowerCase())
)}) com alertas no celular, somado a um app de gestão do condomínio.
- Alertas: nível baixo, transbordo e consumo fora do padrão, como água correndo de madrugada.
- Gestão do condomínio: ${moduleNames}.
- Para quem: condomínios (síndicos e administradoras) e construtoras e incorporadoras.
- Instalação: ${answer("Quem faz a instalação?")}
- Preço: sob orçamento. ${answer("Quanto custa?")}
- País e idioma: Brasil, português.

## Páginas

- [Página inicial](${SITE_URL}/): proposta de valor para condomínios e construtoras.
${features
  .map(
    (item) => `- [${item.name}](${SITE_URL}/#${item.id}): ${item.description}`
  )
  .join("\n")}
- [Gestão do condomínio](${SITE_URL}/#gestao): ${moduleNames}, no mesmo app da água.
- [Como funciona](${SITE_URL}/#como-funciona): do sensor ao alerta no celular, em três passos.
- [Para quem](${SITE_URL}/#para-quem): benefícios para condomínios e para construtoras.
- [Perguntas frequentes](${SITE_URL}/#duvidas): respostas diretas sobre instalação, alertas, boletos e preço.

## Para IAs

- [Conteúdo completo](${SITE_URL}/llms-full.txt): todo o texto do site em Markdown, com as perguntas frequentes.

## Contato

- WhatsApp e telefone: ${CONTACT_PHONE}
- Orçamento: botão "Pedir orçamento" em ${SITE_URL}/#contato; a conversa continua pelo WhatsApp.
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
