"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import {
  abrirPreferencias,
  aoAbrirPreferencias,
  aoMudarConsentimento,
  lerConsentimento,
  salvarConsentimento,
  type Consentimento,
} from "../lib/metricas/consentimento";

/* No servidor ainda não se sabe a escolha: o aviso só aparece no navegador. */
const AINDA_NAO_SEI = "carregando";

function useConsentimento() {
  return useSyncExternalStore(
    aoMudarConsentimento,
    lerConsentimento,
    () => AINDA_NAO_SEI
  );
}

/* Aviso de cookies no pé da tela, até a pessoa escolher. */
export default function Cookies() {
  const caminho = usePathname();
  const escolha = useConsentimento();
  const [revendo, setRevendo] = useState(false);

  useEffect(() => aoAbrirPreferencias(() => setRevendo(true)), []);

  if (caminho.startsWith("/metricas")) return null;
  if (escolha !== null && !revendo) return null;

  const escolher = (valor: Consentimento) => {
    salvarConsentimento(valor);
    setRevendo(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm"
    >
      <p className="text-sm font-semibold text-neutral-950">Cookies</p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
        Usamos cookies para entender como o site é usado e melhorar a sua
        experiência. Se recusar, contamos só a visita, sem identificar você.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => escolher("recusado")}
          className="btn-ghost flex-1 border border-neutral-200 px-4 py-2.5 text-sm text-neutral-950 hover:bg-neutral-50"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => escolher("aceito")}
          className="btn-primary flex-1 px-4 py-2.5 text-sm"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}

/** Link do rodapé para rever a escolha. */
export function PreferenciasDeCookies({ className }: { className?: string }) {
  return (
    <button type="button" onClick={abrirPreferencias} className={className}>
      Cookies
    </button>
  );
}
