import {
  audiences,
  faq,
  features,
  joinPt,
  modules,
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
        "Smart living",
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
      description: `App que mostra o nível dos reservatórios e o consumo do hidrômetro do prédio em tempo real, com alertas no celular, e cuida da gestão do condomínio: ${joinPt(
        modules.map((item) => item.name.toLowerCase())
      )}.`,
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
      audience: audiences.map((item) => ({
        "@type": "Audience",
        audienceType: item.subtitle,
      })),
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
      "@type": "HowTo",
      "@id": `${SITE_URL}/#como-funciona`,
      name: "Como a Viz monitora a água do prédio",
      description:
        "Do sensor ao celular: instalação, leitura contínua e alerta quando algo sai do normal.",
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
