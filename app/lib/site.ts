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
  "Gestão de condomínio e monitoramento de água | Viz";

/** Até ~155 caracteres, pelo mesmo motivo. */
export const SITE_DESCRIPTION =
  "Gestão do condomínio e monitoramento da água num app só. Alerta de vazamento e de caixa baixa no celular, com reservas, boletos e avisos.";

/** Definição em uma frase, para JSON-LD e llms.txt. */
export const SITE_SUMMARY =
  "A Viz junta a gestão do condomínio e o monitoramento da água num app só. Sensores na caixa d'água e no hidrômetro avisam no celular quando algo sai do normal, e o mesmo app organiza reservas, boletos, encomendas, comunicados, manutenções e documentos.";

export const SLOGAN = "Seu edifício integrado em todos os pontos.";

export const CONTACT_PHONE = "+5547999346074";

/** O mesmo número, como aparece na tela. */
export const CONTACT_PHONE_DISPLAY = "(47) 99934-6074";

export const KEYWORDS = [
  "gestão de condomínio",
  "monitoramento de água em condomínio",
  "app de gestão de condomínio",
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
