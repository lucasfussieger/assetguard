import Header from "../components/header";
import ConstrutoraHero from "../components/construtora-hero";
import ConstrutoraProblemSection from "../components/construtora-problems";
import ConstrutoraComoFunciona from "../components/construtora-comofunciona";
import ConstrutoraCTA from "../components/construtora-cta";

export const metadata = {
  title: "AssetGuard para Construtoras",
  description:
    "Monitoramento de infraestrutura predial durante e após a obra. Feche o período de garantia com dados, não com suposições.",
};

export default function ConstrutorасPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      <main>
        <ConstrutoraHero />
        <ConstrutoraProblemSection />
        <ConstrutoraComoFunciona />
        <ConstrutoraCTA />
      </main>
    </div>
  );
}
