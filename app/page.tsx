import Herosection from "./components/Herosection";
import Explai from "./components/explai";
import ConstrutoraComoFunciona from "./components/construtora-comofunciona";
import CondominioComoFunciona from "./components/condominio-comofunciona";
import Contato from "./components/contato";
import Header from "./components/header";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <Header />

      <main>

        <Herosection />
        <Explai />
        <ConstrutoraComoFunciona />
        <CondominioComoFunciona />
        <Contato />

      </main>
    </div>
  );
}
