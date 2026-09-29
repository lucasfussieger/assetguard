import { faq, modules } from "../lib/content";
import { CONTACT_PHONE, SITE_NAME, SITE_URL } from "../lib/site";

const faqText = faq
  .map((item) => `### ${item.question}\n\n${item.answer}`)
  .join("\n\n");

const modulesText = modules
  .map((item) => `- ${item.name}: ${item.description}`)
  .join("\n");

const content = `# ${SITE_NAME}

> A Viz é uma empresa de smart living para condomínios. Mede o nível dos reservatórios e o consumo do hidrômetro em tempo real, avisa no celular quando algo sai do normal e, no mesmo app, cuida da gestão do condomínio.

Fonte: ${SITE_URL}/
Idioma: português do Brasil

## O problema

Hoje, o prédio descobre os problemas de água tarde demais:

- A conta vem alta e ninguém sabe por quê. Um vazamento escondido corre dia e noite e só aparece na fatura, um mês depois.
- A água acaba sem aviso. A bomba para ou a boia trava, e quem avisa é o morador que ficou sem banho.
- A gestão não enxerga a água. Reservas, avisos e manutenções ficam de um lado; reservatório e hidrômetro ficam do outro, sem ninguém olhando.

## Monitoramento hídrico

A Viz troca a surpresa pelo aviso. Sensores no reservatório e no hidrômetro enviam as leituras para o app. Quando algo sai do padrão, o responsável fica sabendo na hora.

### Nível dos reservatórios

O app mostra o nível de cada reservatório em porcentagem e em litros, a qualquer hora, sem ninguém subir na laje.

- Alerta de nível baixo, antes de a água acabar.
- Alerta de transbordo, quando a água escapa pelo ladrão.
- Histórico do nível ao longo do dia.

### Leitura do hidrômetro

A Viz lê o hidrômetro sozinha e mostra quanto o prédio gasta por hora, por dia e por mês.

- Alerta de consumo fora do padrão, como água correndo de madrugada.
- Comparação entre dias, semanas e meses.
- Fim da leitura manual e da anotação em planilha.

## Gestão do condomínio

A água e a rotina do prédio ficam no mesmo app. Síndico, portaria e moradores resolvem pelo celular o que antes dependia de caderno, planilha e grupo de WhatsApp.

${modulesText}

Além desses, a Viz tem outros módulos para a rotina do prédio, apresentados na proposta.

## Como funciona

1. Instalamos os sensores: a equipe da Viz coloca os sensores no reservatório e no hidrômetro e prepara o app para o condomínio.
2. A leitura não para: as medições chegam ao app dia e noite, sem ninguém anotar nada.
3. Você recebe o alerta: se o nível cair ou o consumo sair do padrão, o aviso chega no celular.

## Para quem

### Condomínios (síndicos e administradoras)

- Vazamento percebido no mesmo dia, não na próxima conta.
- Aviso antes de faltar água.
- A rotina do condomínio organizada no mesmo app.

### Construtoras e incorporadoras

- Um prédio smart living, diferencial concreto na venda.
- Histórico técnico que protege a construtora na garantia.
- Falhas percebidas cedo, antes de virarem obra corretiva.

## Perguntas frequentes

${faqText}

## Contato e orçamento

O orçamento é pedido por um formulário na própria página, que pergunta nome, WhatsApp, perfil (condomínio ou construtora) e se o prédio já usa software de gestão. A conversa continua pelo WhatsApp.

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
