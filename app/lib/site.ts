/**
 * Dados canônicos do site, usados em metadata, sitemap, robots e JSON-LD.
 * Defina NEXT_PUBLIC_SITE_URL no ambiente de produção com o domínio real.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://viz.com.br"
).replace(/\/$/, "");

export const SITE_NAME = "Viz smart living";

export const BRAND_NAME = "Viz";

export const SITE_TITLE =
  "Viz smart living | Água do prédio em tempo real e gestão do condomínio no mesmo app";

export const SITE_DESCRIPTION =
  "A Viz mede o nível dos reservatórios e o consumo do hidrômetro em tempo real, avisa no celular quando algo sai do normal e, no mesmo app, cuida da gestão do condomínio.";

export const SLOGAN = "Veja a água do seu prédio em tempo real.";

export const CONTACT_PHONE = "+5547999346074";

export const KEYWORDS = [
  "smart living",
  "monitoramento de reservatórios",
  "nível de caixa d'água",
  "leitura remota de hidrômetro",
  "detecção de vazamentos em condomínio",
  "consumo de água em condomínio",
  "app para condomínio",
  "gestão de condomínios",
  "reserva de áreas comuns",
  "gestão de encomendas em condomínio",
  "tecnologia para síndicos",
  "tecnologia para construtoras",
];
