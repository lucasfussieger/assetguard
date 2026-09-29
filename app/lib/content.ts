/**
 * Textos compartilhados entre a página, o JSON-LD e o llms.txt, para que as
 * três versões digam sempre a mesma coisa. Ícones e visuais ficam nos
 * componentes, ligados pelo id.
 */

/** "a, b e c", para montar frases a partir das listas abaixo. */
export function joinPt(items: readonly string[]) {
  return items.length > 1
    ? `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`
    : items.join("");
}

/** O que o prédio enfrenta hoje. */
export const problems = [
  {
    id: "conta",
    title: "A conta vem alta e ninguém sabe por quê.",
    text: "Um vazamento escondido corre dia e noite. Ele só aparece na fatura, um mês depois.",
  },
  {
    id: "falta",
    title: "A água acaba sem aviso.",
    text: "A bomba para ou a boia trava. Quem avisa é o morador que ficou sem banho.",
  },
  {
    id: "gestao",
    title: "A gestão não enxerga a água.",
    text: "Reservas, avisos e manutenções ficam de um lado. Reservatório e hidrômetro ficam do outro, sem ninguém olhando.",
  },
] as const;

/** Monitoramento hídrico. */
export const features = [
  {
    id: "reservatorios",
    name: "Nível dos reservatórios",
    description:
      "Nível de cada reservatório em porcentagem e em litros, com alerta de nível baixo e de transbordo.",
    title: "Saiba quanta água tem na caixa, sem subir na laje.",
    text: "O app mostra o nível de cada reservatório em porcentagem e em litros, a qualquer hora.",
    points: [
      "Alerta de nível baixo, antes de a água acabar",
      "Alerta de transbordo, quando a água escapa pelo ladrão",
      "Histórico do nível ao longo do dia",
    ],
  },
  {
    id: "hidrometro",
    name: "Leitura do hidrômetro",
    description:
      "Consumo do prédio hora a hora, com alerta quando a água corre fora do padrão, como de madrugada.",
    title: "Veja o consumo hora a hora, não só no fim do mês.",
    text: "A Viz lê o hidrômetro sozinha. Você acompanha quanto o prédio gasta por hora, por dia e por mês.",
    points: [
      "Alerta de consumo fora do padrão, como água correndo de madrugada",
      "Comparação entre dias, semanas e meses",
      "Fim da leitura manual e da anotação em planilha",
    ],
  },
] as const;

/** Gestão do dia a dia do condomínio. */
export const modules = [
  {
    id: "reservas",
    name: "Reserva de áreas",
    description:
      "O morador vê os horários livres e reserva o salão de festas ou a churrasqueira pelo app. O caderno da portaria se aposenta.",
  },
  {
    id: "comunicados",
    name: "Comunicados",
    description:
      "O aviso chega no celular de todos os moradores e fica registrado. Ninguém fica sem saber.",
  },
  {
    id: "manutencoes",
    name: "Gestão de manutenções",
    description:
      "Chamados, prazos e histórico de cada manutenção do prédio. O síndico sabe o que foi feito e o que vem pela frente.",
  },
  {
    id: "boletos",
    name: "Boletos",
    description:
      "O boleto do condomínio fica no app. O morador copia o código de barras na hora de pagar, sem pedir a segunda via à administradora.",
  },
  {
    id: "documentos",
    name: "Documentos",
    description:
      "Atas, regimento interno e contratos em um só lugar, para consultar quando precisar.",
  },
  {
    id: "encomendas",
    name: "Encomendas",
    description:
      "A portaria registra a chegada e o morador é avisado na hora, sem interfone e sem bilhete.",
  },
] as const;

/** Do sensor ao celular. */
export const steps = [
  {
    id: "instalacao",
    title: "Instalamos os sensores",
    text: "Nossa equipe coloca os sensores no reservatório e no hidrômetro e prepara o app para o condomínio.",
  },
  {
    id: "leitura",
    title: "A leitura não para",
    text: "As medições chegam ao app dia e noite, sem ninguém anotar nada.",
  },
  {
    id: "alerta",
    title: "Você recebe o alerta",
    text: "Se o nível cair ou o consumo sair do padrão, o aviso chega no celular e você age cedo.",
  },
] as const;

export const audiences = [
  {
    id: "condominio",
    title: "Condomínios",
    subtitle: "Síndicos e administradoras",
    points: [
      "Vazamento percebido no mesmo dia, não na próxima conta",
      "Aviso antes de faltar água",
      "Gestão do dia a dia e água do prédio no mesmo app",
    ],
  },
  {
    id: "construtora",
    title: "Construtoras",
    subtitle: "Construtoras e incorporadoras",
    points: [
      "Um prédio smart living, diferencial concreto na venda",
      "Histórico técnico que protege a construtora na garantia",
      "Falhas percebidas cedo, antes de virarem obra corretiva",
    ],
  },
] as const;

export const faq = [
  {
    question: "O que a Viz faz?",
    answer:
      "Monitora a água do prédio e cuida da gestão do condomínio no mesmo app. Os sensores medem o nível dos reservatórios e o consumo do hidrômetro. O app organiza reservas, comunicados, manutenções, boletos, documentos e encomendas.",
  },
  {
    question: "Como a Viz ajuda a descobrir vazamentos?",
    answer:
      "A Viz lê o hidrômetro sozinha e mostra o consumo do prédio hora a hora. Quando a água corre fora do padrão, como de madrugada, o alerta chega no celular no mesmo dia, e não na próxima conta.",
  },
  {
    question: "Dá para saber o nível da caixa d'água sem subir na laje?",
    answer:
      "Sim. O sensor no reservatório envia o nível para o app, em porcentagem e em litros, a qualquer hora. Se o nível ficar baixo ou a água transbordar, você recebe um alerta.",
  },
  {
    question: "Quem faz a instalação?",
    answer:
      "A equipe da Viz instala os sensores e prepara o app para o condomínio. O prédio não precisa contratar ninguém à parte.",
  },
  {
    question: "Como chegam os alertas?",
    answer:
      "No celular de quem cuida do prédio, assim que a leitura sai do normal. Não é preciso abrir o app para ficar sabendo.",
  },
  {
    question: "Quem usa o app?",
    answer:
      "Síndico, portaria e moradores. O síndico acompanha a água e a rotina do prédio. O morador reserva áreas, lê os comunicados, acessa o boleto do condomínio e recebe o aviso de encomenda.",
  },
  {
    question: "O boleto do condomínio fica no app?",
    answer:
      "Sim. O morador acessa o boleto pelo app e copia o código de barras para pagar, sem pedir a segunda via à administradora.",
  },
  {
    question: "Serve para prédios em construção?",
    answer:
      "Sim. A construtora entrega o edifício com a Viz instalada e mantém o registro técnico durante a garantia.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Depende do tamanho do condomínio e de quantos reservatórios e hidrômetros o prédio tem. Peça um orçamento e enviamos a proposta.",
  },
] as const;
