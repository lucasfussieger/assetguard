import Herosection from "./components/Herosection";
import Problema from "./components/problema";
import Solucao from "./components/solucao";
import Gestao from "./components/gestao";
import ComoFunciona from "./components/como-funciona";
import ParaQuem from "./components/para-quem";
import Duvidas from "./components/duvidas";
import Contato from "./components/contato";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <main>
        <Herosection />
        <Problema />
        <Solucao />
        <Gestao />
        <ComoFunciona />
        <ParaQuem />
        <Duvidas />
        <Contato />
      </main>

      <Footer />
    </>
  );
}
