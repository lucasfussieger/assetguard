import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { QuoteButton } from "./quote-form";

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-zinc-950 py-28 sm:py-32"
    >
      {/* Luz ciano de fundo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 22%, transparent) 0%, color-mix(in srgb, var(--brand-4) 8%, transparent) 45%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <Image
          src="/3dicons-chat-text-dynamic-color.png"
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className="w-20 h-20 object-contain animate-float"
        />

        <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white">
          Amplie a gestão do seu edifício com a{" "}
          <span className="text-brand-5">Viz</span>
        </h2>

        <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-xl">
          Solicite seu orçamento.
        </p>

        <div className="flex justify-center mt-10">
          <QuoteButton className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-8 py-4 text-base font-semibold text-white hover:brightness-110 transition-all">
            Fazer orçamento
            <ArrowUpRight
              size={20}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
