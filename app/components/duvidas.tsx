import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, Plus } from "lucide-react";

import { faq } from "../lib/content";
import { WHATSAPP_URL } from "../lib/whatsapp";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

/*
 * Duas colunas: o título e um atalho discreto para o WhatsApp à esquerda,
 * parados enquanto a pessoa rola; as perguntas numeradas à direita. Na
 * aberta, o número fica laranja e o + vira × verde.
 */
export default function Duvidas() {
  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-title"
      className="flex min-h-svh flex-col justify-center bg-white py-28 sm:py-40"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="duvidas-title"
            align="left"
            title="Perguntas frequentes"
            subtitle="Respostas rápidas sobre a Viz, a instalação e o app."
          />
          <Reveal delay={0.1} className="mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-950"
            >
              <WhatsappLogoIcon size={18} weight="fill" className="text-[#25d366]" />
              <span className="underline decoration-neutral-300 underline-offset-4 transition-colors group-hover:decoration-brand-4">
                Não achou? Chame no WhatsApp
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-t border-neutral-200">
            {faq.map((item, index) => (
              // A primeira já vem aberta: mostra como são as respostas
              <details
                key={item.question}
                open={index === 0}
                className="faq group border-b border-neutral-200"
              >
                <summary className="grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-4 rounded-md py-6 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-5">
                  <span className="text-sm font-medium text-neutral-400 tabular-nums transition-colors group-open:text-brand-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium text-neutral-950 transition-colors group-hover:text-neutral-600">
                    {item.question}
                  </span>
                  {/* Só o ícone gira (+ vira ×); o quadradinho fica parado */}
                  <span className="grid size-8 place-items-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors duration-300 group-open:border-brand-4/40 group-open:text-brand-4">
                    <Plus
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform duration-300 group-open:rotate-45"
                    />
                  </span>
                </summary>
                {/* Recuo de 3.5rem: a resposta começa onde começa a pergunta */}
                <p className="pb-6 pl-14 pr-12 leading-relaxed text-neutral-500">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
