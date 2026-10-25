import Header from "./components/header";
import Herosection from "./components/Herosection";
import Solucao from "./components/solucao";
import ComoFunciona from "./components/como-funciona";
import ParaQuem from "./components/para-quem";
import Duvidas from "./components/duvidas";
import Contato from "./components/contato";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Herosection />
        <Solucao />
        <ComoFunciona />
        <ParaQuem />
        <Duvidas />
        <Contato />
      </main>

      <Footer />
    </>
  );
}
