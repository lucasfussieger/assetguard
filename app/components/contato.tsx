import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";

import { CONTACT_PHONE_DISPLAY } from "../lib/site";
import { WHATSAPP_URL } from "../lib/whatsapp";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";

/*
 * Fecha a página como ela abre: um card preto no estilo da hero, com as
 * mesmas luzes por dentro e o mesmo brilho no texto ciano. A seção em volta
 * continua branca; as luzes ficam presas no card (overflow-hidden).
 */
export default function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="flex min-h-svh flex-col justify-center bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-night px-6 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% -10%, color-mix(in srgb, var(--brand-3) 70%, transparent) 0%, color-mix(in srgb, var(--brand-3) 16%, transparent) 50%, transparent 78%)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-72"
              style={{
                background:
                  "radial-gradient(ellipse 55% 70% at 50% 100%, color-mix(in srgb, var(--brand-5) 24%, transparent) 0%, color-mix(in srgb, var(--brand-4) 8%, transparent) 45%, transparent 75%)",
              }}
            />
            <div className="grain absolute inset-0" />
          </div>

          {/* O brilho fica numa linha só dele: dividindo a linha, o inline-block subiria na base */}
          <h2 id="contato-title" className="title-display text-white">
            <span className="block">Seu prédio inteiro,</span>{" "}
            <span className="text-shimmer-light whitespace-nowrap">
              num app só.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-lg font-light text-white/75">
            Conte sobre o seu prédio e receba uma proposta.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <QuoteButton className="btn-primary group px-8 py-4 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_50px_-14px_rgba(246,55,0,0.75)]">
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
              aria-label={`WhatsApp ${CONTACT_PHONE_DISPLAY}`}
              className="btn-ghost border border-white/15 bg-white/[0.04] px-8 py-4 text-base text-white tabular-nums hover:border-white/30 hover:bg-white/10"
            >
              <WhatsappLogoIcon size={20} weight="fill" className="text-[#25d366]" />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
