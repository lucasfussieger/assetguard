import { faq, joinPt, modules, monitoring } from "../lib/content";
import { CONTACT_PHONE, SITE_NAME, SITE_SUMMARY, SITE_URL } from "../lib/site";

/*
 * Resumo do site para mecanismos generativos, no formato de llmstxt.org:
 * título, resumo em citação, fatos objetivos e links para cada seção.
 */

const answer = (question: string) =>
  faq.find((item) => item.question === question)?.answer ?? "";

const names = (items: readonly { name: string }[]) =>
  joinPt(items.map((item) => item.name.toLowerCase()));

const content = `# ${SITE_NAME}

> ${SITE_SUMMARY}

Fatos principais:

- O que é: gestão do condomínio e monitoramento da água no mesmo app.
- Monitoramento da água: ${names(monitoring)}.
- Gestão do condomínio: ${names(modules)}.
- Alertas no celular: caixa baixa, transbordo e água correndo fora do normal, como de madrugada.
- Quem usa: síndico, portaria e moradores.
- Para quem: condomínios (síndicos e administradoras) e construtoras e incorporadoras.
- Instalação: ${answer("Quem faz a instalação?")}
- Preço: sob orçamento. ${answer("Quanto custa?")}
- País e idioma: Brasil, português.

## Páginas

- [Página inicial](${SITE_URL}/): gestão do condomínio e monitoramento da água num app só.
- [Gestão e monitoramento](${SITE_URL}/#solucao): o que o app faz na água e na rotina do prédio.
- [Como funciona](${SITE_URL}/#como-funciona): instalação, app para todo o prédio e aviso no celular, em três passos.
- [Para quem](${SITE_URL}/#para-quem): benefícios para condomínios e para construtoras.
- [Perguntas frequentes](${SITE_URL}/#duvidas): respostas diretas sobre vazamentos, instalação, quem usa e preço.

## Para IAs

- [Conteúdo completo](${SITE_URL}/llms-full.txt): todo o texto do site em Markdown, com as perguntas frequentes.

## Contato

- WhatsApp e telefone: ${CONTACT_PHONE}
- Orçamento: botão "Pedir orçamento" em ${SITE_URL}/#contato, que abre o WhatsApp.
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
