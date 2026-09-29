import { faq, features, modules } from "./content";
import {
  BRAND_NAME,
  CONTACT_PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SLOGAN,
} from "./site";

/**
 * Grafo JSON-LD do site. Renderizado no layout para que buscadores e
 * mecanismos generativos leiam a estrutura da oferta sem depender do CSS.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      slogan: SLOGAN,
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE,
          contactType: "sales",
          areaServed: "BR",
          availableLanguage: ["Portuguese"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: BRAND_NAME,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Smart living para condomínios",
      operatingSystem: "Web",
      description:
        "App que mostra o nível dos reservatórios e o consumo do hidrômetro do prédio em tempo real, com alertas no celular, e cuida da gestão do condomínio: reservas, comunicados, manutenções, documentos e encomendas.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [...features, ...modules].map((item) => item.name),
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Monitoramento da água e gestão do condomínio",
      serviceType: "Smart living para condomínios",
      description:
        "Instalação de sensores no reservatório e no hidrômetro, com leitura contínua e alerta quando o nível ou o consumo sai do normal, somada à gestão do condomínio no mesmo app.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      audience: [
        {
          "@type": "Audience",
          audienceType: "Condomínios e síndicos",
        },
        {
          "@type": "Audience",
          audienceType: "Construtoras e incorporadoras",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Monitoramento e gestão da Viz",
        itemListElement: [...features, ...modules].map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: item.description,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};
