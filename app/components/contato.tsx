import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, Check, SendHorizontal } from "lucide-react";

import { CONTACT_PHONE_DISPLAY } from "../lib/site";
import { QUOTE_MESSAGES } from "../lib/whatsapp";
import { QuoteButton } from "./quote-form";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

/** O que a pessoa ganha ao chamar, em três linhas curtas. */
const assurances = [
  "Proposta para o tamanho do seu prédio",
  "Instalação feita pela equipe Viz",
  "Sem contratar ninguém à parte",
];

/*
 * Prévia do que acontece no clique: o WhatsApp da Viz abre com a mensagem de
 * orçamento já escrita na caixa de texto, pronta para enviar. É a mesma
 * mensagem que o botão manda (QUOTE_MESSAGES), não uma conversa inventada.
 */
function WhatsappPreview() {
  return (
    <div
      role="img"
      aria-label="Prévia do WhatsApp: a conversa com a Viz abre com a mensagem de orçamento pronta para enviar"
      className="relative isolate"
    >
      {/* Luz verde suave atrás da prévia */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-5) 16%, transparent) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_30px_60px_-30px_rgba(0,126,128,0.4)]"
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-night font-wordmark text-sm text-white">
            VIZ
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-neutral-950">
              Viz smart living
            </p>
            <p className="text-xs text-neutral-500 tabular-nums">
              WhatsApp · {CONTACT_PHONE_DISPLAY}
            </p>
          </div>
          <WhatsappLogoIcon size={22} weight="fill" className="text-[#25d366]" />
        </div>

        <div className="flex h-52 flex-col items-center justify-center gap-3 bg-neutral-50 px-6 text-center">
          <span className="rounded-md bg-white px-3 py-1 text-xs text-neutral-500 ring-1 ring-inset ring-neutral-200">
            Hoje
          </span>
          <p className="max-w-[17rem] text-xs leading-relaxed text-neutral-400">
            Sua mensagem de orçamento já vem escrita. É só enviar.
          </p>
        </div>

        <div className="flex items-end gap-2 border-t border-neutral-200 p-3">
          <p className="flex-1 rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm leading-relaxed text-neutral-800">
            {QUOTE_MESSAGES[""]}
            <span className="animate-caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-brand-4" />
          </p>
          <span className="relative grid size-11 shrink-0 place-items-center">
            {/* Pulso suave, o mesmo sinal "ao vivo" da hero, puxando o olho para o envio */}
            <span className="animate-signal absolute inset-0 rounded-lg bg-brand-5/40" />
            <span className="relative grid size-11 place-items-center rounded-lg bg-gradient-to-br from-brand-4 to-brand-5 text-white shadow-[0_10px_24px_-10px_rgba(0,185,189,0.8)]">
              <SendHorizontal className="size-4" strokeWidth={2.25} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* Orçamento em duas colunas: o convite à esquerda, a prévia do WhatsApp à direita. */
export default function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="flex min-h-svh flex-col justify-center overflow-hidden bg-white py-28 sm:py-40"
    >
      {/* Coluna do texto mais larga: "Seu prédio inteiro," cabe numa linha no desktop */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="contato-title"
            align="left"
            title="Seu prédio inteiro,"
            muted="num app só."
            subtitle="Toque no botão e o WhatsApp abre com a mensagem pronta. É só enviar."
          />

          <Reveal delay={0.1} className="mt-10">
            {/* Um botão só: abre o WhatsApp com a mesma mensagem da prévia ao lado */}
            <QuoteButton className="btn-primary group w-full px-8 py-4 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_40px_-14px_rgba(0,185,189,0.7)] sm:w-auto">
              <WhatsappLogoIcon size={20} weight="fill" />
              Pedir orçamento pelo WhatsApp
              <ArrowRight
                size={18}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </QuoteButton>

            <ul className="mt-8 space-y-2.5 text-sm text-neutral-600">
              {assurances.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="size-4 text-brand-4" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <WhatsappPreview />
        </Reveal>
      </div>
    </section>
  );
}
