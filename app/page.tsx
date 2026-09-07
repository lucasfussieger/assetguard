import Herosection from "./components/Herosection";
import CondominioComoFunciona from "./components/condominio-comofunciona";
import ConstrutoraComoFunciona from "./components/construtora-comofunciona";
import SmartLiving from "./components/smart-living";
import Contato from "./components/contato";
import Footer from "./components/footer";
import { QuoteProvider } from "./components/quote-form";

export default function Home() {
  return (
    <QuoteProvider>
      <div className="min-h-screen bg-white text-ink">
        <main>
          <div className="bg-zinc-950">
            <Herosection />
          </div>
          <CondominioComoFunciona />
          <ConstrutoraComoFunciona />
          <SmartLiving />
          <Contato />
        </main>

        <Footer />
      </div>
    </QuoteProvider>
  );
}
