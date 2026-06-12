import Header from "../components/header";
import CondominioHero from "../components/condominio-hero";
import CondominioProblemSection from "../components/condominio-problems";
import CondominioComoFunciona from "../components/condominio-comofunciona";
import CondominioCTA from "../components/condominio-cta";

export const metadata = {
  title: "AssetGuard para Condomínios",
  description:
    "Sensores e alertas em tempo real para a infraestrutura do seu prédio. Pare de descobrir problemas quando já são emergências.",
};

export default function CondominiosPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      <main>
        <CondominioHero />
        <CondominioProblemSection />
        <CondominioComoFunciona />
        <CondominioCTA />
      </main>
    </div>
  );
}
