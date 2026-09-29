/**
 * Textos compartilhados entre a página, o JSON-LD e o llms.txt, para que as
 * três versões digam sempre a mesma coisa.
 */

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

/** Monitoramento hídrico. */
export const features = [
  {
    name: "Nível dos reservatórios",
    description:
      "Nível de cada reservatório em porcentagem e em litros, com alerta de nível baixo e de transbordo.",
  },
  {
    name: "Leitura do hidrômetro",
    description:
      "Consumo do prédio hora a hora, com alerta quando a água corre fora do padrão, como de madrugada.",
  },
];

export const faq = [
  {
    question: "O que a Viz faz?",
    answer:
      "Monitora a água do prédio e cuida da gestão do condomínio no mesmo app. Os sensores medem o nível dos reservatórios e o consumo do hidrômetro. O app organiza reservas, comunicados, manutenções, documentos e encomendas.",
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
      "Síndico, portaria e moradores. O síndico acompanha a água e a rotina do prédio. O morador reserva áreas, lê os comunicados e recebe o aviso de encomenda.",
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
];
