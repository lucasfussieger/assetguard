import {
  audiences,
  faq,
  joinPt,
  modules,
  monitoring,
  steps,
} from "./content";
import {
  BRAND_NAME,
  CONTACT_PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SUMMARY,
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
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_SUMMARY,
      slogan: SLOGAN,
      knowsAbout: [
        "Monitoramento de reservatórios de água",
        "Leitura remota de hidrômetro",
        "Detecção de vazamentos em condomínios",
        "Gestão de condomínios",
        "Apps para condomínios",
      ],
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
      primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: BRAND_NAME,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Smart living para condomínios",
      operatingSystem: "Web",
      description: `App que junta a gestão do condomínio e o monitoramento da água: nível da caixa e consumo do hidrômetro, com alertas no celular, e ${joinPt(
        modules.map((item) => item.name.toLowerCase())
      )}.`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [...monitoring, ...modules].map((item) => item.name),
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Gestão do condomínio e monitoramento da água",
      serviceType: "Smart living para condomínios",
      description:
        "Instalação de sensores na caixa d'água e no hidrômetro, com alerta no celular quando algo sai do normal, e o app de gestão do condomínio, tudo no mesmo lugar.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      audience: audiences.map((item) => ({
        "@type": "Audience",
        audienceType: item.subtitle,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Gestão e monitoramento da Viz",
        itemListElement: [...monitoring, ...modules].map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.name,
          },
        })),
      },
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#como-funciona`,
      name: "Como a Viz funciona no condomínio",
      description:
        "Instalação feita pela equipe Viz, um app para todo o prédio e aviso no celular quando algo sai do normal.",
      inLanguage: "pt-BR",
      step: steps.map((item, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: item.title,
        text: item.text,
        url: `${SITE_URL}/#como-funciona`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      inLanguage: "pt-BR",
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
