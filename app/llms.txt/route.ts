import { CONTACT_PHONE, SITE_NAME, SITE_URL } from "../lib/site";

const content = `# ${SITE_NAME}

> A Viz é uma empresa de smart living para condomínios. Mede o nível dos reservatórios e o consumo do hidrômetro em tempo real, avisa no celular quando algo sai do normal e, no mesmo app, cuida da gestão do condomínio.

Com a Viz, o síndico sabe quanta água tem na caixa sem subir na laje, recebe alerta antes de a água acabar e descobre um vazamento no mesmo dia, não na próxima conta. O mesmo app organiza reservas de áreas, comunicados, manutenções, documentos e encomendas, entre outros módulos. A instalação dos sensores é feita pela equipe da Viz.

O produto atende dois públicos: condomínios (síndicos e administradoras), que gastam menos água, evitam falta d'água e organizam a rotina em um só lugar; e construtoras e incorporadoras, que entregam um prédio smart living e mantêm registro técnico durante a garantia.

## Páginas

- [${SITE_NAME}](${SITE_URL}/): página única com a proposta de valor para condomínios e para construtoras.
- [Conteúdo completo em texto](${SITE_URL}/llms-full.txt): todo o conteúdo do site, sem marcação.

## Contato

- WhatsApp e telefone: ${CONTACT_PHONE}
- Orçamento: formulário na própria página, em ${SITE_URL}/#contato
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
