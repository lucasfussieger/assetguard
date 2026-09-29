/**
 * Dados canônicos do site, usados em metadata, sitemap, robots e JSON-LD.
 *
 * Domínio: NEXT_PUBLIC_SITE_URL, se definido; senão o domínio de produção
 * que a Vercel informa no build (o domínio próprio, quando houver). Assim o
 * canonical nunca aponta para um endereço que não serve este site.
 */
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = siteUrl().replace(/\/$/, "");

export const SITE_NAME = "Viz smart living";

export const BRAND_NAME = "Viz";

/** Até ~60 caracteres: o Google corta o resto. Palavra-chave antes da marca. */
export const SITE_TITLE =
  "Monitoramento de água e app para condomínios | Viz smart living";

/** Até ~155 caracteres, pelo mesmo motivo. */
export const SITE_DESCRIPTION =
  "Sensores no reservatório e no hidrômetro avisam no celular antes de faltar água ou quando há vazamento. E o mesmo app cuida da gestão do condomínio.";

/** Definição em uma frase, para JSON-LD e llms.txt. */
export const SITE_SUMMARY =
  "A Viz é uma empresa de smart living para condomínios. Mede o nível dos reservatórios e o consumo do hidrômetro em tempo real, avisa no celular quando algo sai do normal e, no mesmo app, cuida da gestão do condomínio: reservas, comunicados, manutenções, boletos, documentos e encomendas.";

export const SLOGAN = "Veja a água do seu prédio em tempo real.";

export const CONTACT_PHONE = "+5547999346074";

export const KEYWORDS = [
  "smart living",
  "monitoramento de reservatórios",
  "nível de caixa d'água",
  "sensor de nível para caixa d'água",
  "leitura remota de hidrômetro",
  "detecção de vazamentos em condomínio",
  "alerta de vazamento de água",
  "consumo de água em condomínio",
  "app para condomínio",
  "gestão de condomínios",
  "boleto de condomínio no app",
  "reserva de áreas comuns",
  "gestão de encomendas em condomínio",
  "tecnologia para síndicos",
  "tecnologia para construtoras",
];
