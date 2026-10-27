import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarCheck,
  Droplets,
} from "lucide-react";

import { CONTACT_PHONE_DISPLAY, SITE_NAME } from "../lib/site";
import { QUOTE_MESSAGES, whatsappLink } from "../lib/whatsapp";
import styles from "./bio.module.css";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Peça um orçamento da Viz pelo WhatsApp ou conheça o app que junta a gestão do condomínio e o monitoramento da água.",
  alternates: { canonical: "/bio" },
  // Página de links da bio das redes: quem vem da busca deve cair na home.
  robots: { index: false, follow: true },
};

/** Ordem de entrada de cada bloco (bio.module.css lê --i). */
const ordem = (i: number) => ({ "--i": i }) as CSSProperties;

const destaques = [
  { icon: Droplets, label: "Alerta de vazamento" },
  { icon: BellRing, label: "Avisos no celular" },
  { icon: CalendarCheck, label: "Reservas e boletos" },
];

/*
 * Página de links para a bio do Instagram: a marca, o slogan e dois botões,
 * o orçamento no WhatsApp e o site. A seção tem id "bio" para o rastreador
 * contar os cliques no WhatsApp daqui separados dos da home.
 */
export default function Bio() {
  return (
    <main className="relative isolate flex min-h-svh flex-1 flex-col items-center overflow-hidden bg-night px-4">
      {/* Fundo da hero: luz petróleo no alto, brilho quente num canto e ciano no pé */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 45% at 50% -8%, color-mix(in srgb, var(--brand-3) 75%, transparent) 0%, color-mix(in srgb, var(--brand-3) 18%, transparent) 55%, transparent 80%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-2) 18%, transparent) 0%, color-mix(in srgb, var(--brand-1) 6%, transparent) 40%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[28rem]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--brand-5) 24%, transparent) 0%, color-mix(in srgb, var(--brand-4) 9%, transparent) 45%, transparent 75%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="flex w-full max-w-md flex-1 flex-col items-center pt-12 pb-8 text-center sm:pt-20">
        {/* A marca no lugar da foto de perfil, com o sinal saindo dela */}
        <div className={`${styles.enter} relative`} style={ordem(0)}>
          <span aria-hidden="true" className={styles.signal} />
          <span
            aria-hidden="true"
            className={styles.signal}
            style={{ animationDelay: "1.8s" }}
          />
          <div className="panel-dark relative grid size-20 place-items-center rounded-[1.5rem]">
            <span className="font-wordmark text-3xl text-white">VIZ</span>
          </div>
        </div>

        <h1 className={`${styles.title} mt-7`}>
          <span
            className={`${styles.enter} block text-xs font-medium uppercase tracking-[0.28em] text-brand-5`}
            style={ordem(1)}
          >
            {SITE_NAME}
          </span>
          <span
            className={`${styles.enter} mt-3 block text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-white`}
            style={ordem(2)}
          >
            Seu edifício integrado{" "}
            <span className={`${styles.shine} text-shimmer-light`}>
              em todos os pontos.
            </span>
          </span>
        </h1>

        <p
          className={`${styles.enter} mt-4 max-w-xs text-base font-light leading-relaxed text-white/70`}
          style={ordem(3)}
        >
          Gestão do condomínio e monitoramento da água, num app só.
        </p>

        <section
          id="bio"
          aria-label="Links"
          className="mt-8 flex w-full flex-col gap-3.5 text-left"
        >
          <a
            href={whatsappLink(QUOTE_MESSAGES[""])}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.enter} ${styles.zap} group relative flex items-center gap-4 rounded-3xl p-3.5 pr-5 text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-5`}
            style={ordem(4)}
          >
            <span aria-hidden="true" className={styles.sheen} />
            <span className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-deep/40 ring-1 ring-white/20">
              <Image
                src="/3dicons-whatsapp-dynamic-color.png"
                alt=""
                width={48}
                height={48}
                priority
                className={`${styles.bob} size-12 drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]`}
              />
            </span>
            <span className="relative min-w-0 flex-1">
              <span className="block text-lg font-semibold leading-tight">
                Pedir orçamento
              </span>{" "}
              <span className="mt-1 block text-sm leading-snug text-white/85">
                Direto pelo WhatsApp
              </span>
            </span>
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              <ArrowRight
                size={18}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </a>

          <Link
            href="/"
            className={`${styles.enter} panel-dark group flex items-center gap-4 rounded-3xl p-3.5 pr-5 text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-5`}
            style={ordem(5)}
          >
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white">
              <span className="font-wordmark text-xl text-ink">VIZ</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold leading-tight">
                Conheça a Viz
              </span>{" "}
              <span className="mt-1 block text-sm leading-snug text-white/60">
                Veja como funciona
              </span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] transition-colors group-hover:border-white/30 group-hover:bg-white/10">
              <ArrowUpRight
                size={18}
                strokeWidth={2.25}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </section>

        {/* O que o app faz, embaixo dos botões para eles ficarem acima da dobra */}
        <ul
          className={`${styles.enter} mt-8 flex flex-wrap justify-center gap-2`}
          style={ordem(6)}
        >
          {destaques.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
            >
              <Icon size={14} strokeWidth={2} className="text-brand-5" />
              {label}
            </li>
          ))}
        </ul>

        <p
          className={`${styles.enter} mt-auto pt-12 text-xs text-white/40`}
          style={ordem(7)}
        >
          <span className="tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
          <span aria-hidden="true"> · </span>© {new Date().getFullYear()}{" "}
          {SITE_NAME}
        </p>
      </div>
    </main>
  );
}
