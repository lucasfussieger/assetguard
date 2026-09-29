import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";

import { WHATSAPP_URL } from "../lib/whatsapp";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";

export default function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative overflow-hidden bg-deep pt-28 pb-40 sm:pt-36 sm:pb-48"
    >
      <div className="grid-faint-dark mask-fade-y absolute inset-0 pointer-events-none" />
      <div
        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand-5) 20%, transparent) 0%, color-mix(in srgb, var(--brand-4) 8%, transparent) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="contato-title"
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl"
        >
          Chega de descobrir vazamento{" "}
          <span className="text-gradient-brand">pela conta.</span>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
          Conte um pouco sobre o seu prédio e receba uma proposta.
        </p>

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <QuoteButton className="btn-primary group px-8 py-4 text-base">
            Pedir orçamento
            <ArrowRight
              size={18}
              strokeWidth={2.25}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </QuoteButton>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost border border-white/15 bg-white/5 px-8 py-4 text-base text-white hover:border-white/30 hover:bg-white/10"
          >
            <WhatsappLogoIcon size={20} weight="fill" className="text-[#25d366]" />
            Falar no WhatsApp
          </a>
        </div>
      </Reveal>

      {/* Água na base da seção */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 overflow-hidden sm:h-28">
        <svg
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          className="animate-wave-slow absolute bottom-0 left-0 h-full w-[200%] text-brand-4/30"
        >
          <path d="M0 10 Q 50 0 100 10 T 200 10 T 300 10 T 400 10 V 20 H 0 Z" fill="currentColor" />
        </svg>
        <svg
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          className="animate-wave absolute -bottom-px left-0 h-2/3 w-[200%] text-abyss"
        >
          <path d="M0 10 Q 50 0 100 10 T 200 10 T 300 10 T 400 10 V 20 H 0 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
