/**
 * Textos compartilhados entre a página, o JSON-LD e o llms.txt, para que as
 * três versões digam sempre a mesma coisa. Ícones e visuais ficam nos
 * componentes, ligados pelo id.
 *
 * Tom: frase curta, palavra do dia a dia, a dor antes da função.
 */

/** "a, b e c", para montar frases a partir das listas abaixo. */
export function joinPt(items: readonly string[]) {
  return items.length > 1
    ? `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`
    : items.join("");
}

/** Os dois lados do app, como a página os apresenta. */
export const pillars = {
  monitoring: {
    title: "Monitoramento da água",
    pitch: "A água do prédio à vista, dia e noite.",
  },
  modules: {
    title: "Gestão do condomínio",
    pitch: "A rotina do prédio fora do caderno e do WhatsApp.",
  },
} as const;

/** Monitoramento da água: só o nome de cada função, sem repetir. */
export const monitoring = [
  { id: "reservatorios", name: "Nível da caixa d'água" },
  { id: "hidrometro", name: "Consumo hora a hora" },
  { id: "vazamento", name: "Alerta de vazamento" },
  { id: "nivel-baixo", name: "Alerta de caixa baixa" },
  { id: "transbordo", name: "Alerta de transbordo" },
] as const;

/** Gestão do dia a dia do condomínio, também só pelo nome. */
export const modules = [
  { id: "reservas", name: "Reserva de áreas" },
  { id: "boletos", name: "Boletos" },
  { id: "encomendas", name: "Encomendas" },
  { id: "comunicados", name: "Comunicados" },
  { id: "manutencoes", name: "Manutenções" },
  { id: "documentos", name: "Documentos" },
] as const;

/** Do começo ao dia a dia, em três passos. */
export const steps = [
  {
    id: "instalacao",
    title: "A gente instala",
    text: "Nossa equipe coloca os sensores e deixa o app pronto.",
  },
  {
    id: "app",
    title: "Tudo no mesmo app",
    text: "O síndico vê a água e a rotina do prédio na mesma tela.",
  },
  {
    id: "alerta",
    title: "Você fica sabendo na hora",
    text: "Vazamento, caixa baixa ou encomenda: o aviso chega no celular.",
  },
] as const;

export const audiences = [
  {
    id: "condominio",
    title: "Condomínios",
    subtitle: "Síndicos e administradoras",
    points: [
      "Vazamento visto no mesmo dia",
      "Aviso antes de faltar água",
      "Gestão e água num app só",
    ],
  },
  {
    id: "construtora",
    title: "Construtoras",
    subtitle: "Construtoras e incorporadoras",
    points: [
      "Diferencial na hora de vender",
      "Registro técnico para a garantia",
      "Falhas percebidas cedo",
    ],
  },
] as const;

export const faq = [
  {
    question: "O que a Viz faz?",
    answer:
      "Junta a gestão do condomínio e o monitoramento da água num app só. Você acompanha a caixa d'água e o hidrômetro e organiza reservas, boletos, encomendas e avisos no mesmo lugar.",
  },
  {
    question: "Como a Viz ajuda a achar vazamentos?",
    answer:
      "Ela lê o hidrômetro e mostra o consumo hora a hora. Se a água correr fora do normal, como de madrugada, o alerta chega no celular no mesmo dia.",
  },
  {
    question: "Quem faz a instalação?",
    answer:
      "A equipe da Viz instala os sensores e deixa o app pronto. O prédio não precisa contratar ninguém à parte.",
  },
  {
    question: "Quem usa o app?",
    answer:
      "O síndico acompanha a água e a rotina do prédio. A portaria registra as encomendas. O morador reserva áreas, lê os avisos e acessa o boleto.",
  },
  {
    question: "Serve para prédios em construção?",
    answer:
      "Sim. A construtora entrega o prédio com a Viz instalada e guarda o registro técnico durante a garantia.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Depende do tamanho do prédio e de quantos reservatórios e hidrômetros ele tem. Peça um orçamento e mandamos a proposta.",
  },
] as const;
