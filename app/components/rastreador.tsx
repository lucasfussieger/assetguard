"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  aoMudarConsentimento,
  idDoVisitante,
  novoId,
} from "../lib/metricas/consentimento";

/*
 * Conta cada acesso para o /metricas: avisa quando a página abre, quanto
 * tempo ela ficou visível, até onde a pessoa rolou e cada clique no WhatsApp.
 * Tudo por sendBeacon, que não atrasa a página nem se perde ao fechar a aba.
 */

function enviar(dados: object) {
  const corpo = JSON.stringify(dados);
  try {
    if (navigator.sendBeacon?.("/api/visita", corpo)) return;
  } catch {}
  fetch("/api/visita", { method: "POST", body: corpo, keepalive: true }).catch(
    () => {}
  );
}

/** Nome de cada parte da página, para saber qual botão de WhatsApp foi usado. */
function lugarDo(link: Element) {
  const lugar = link.closest("header, footer, section[id]");
  if (!lugar) return "página";
  return lugar.id || lugar.tagName.toLowerCase();
}

export default function Rastreador() {
  const caminho = usePathname();

  useEffect(() => {
    if (caminho.startsWith("/metricas")) return;

    const id = novoId();
    const busca = new URLSearchParams(location.search);
    let visivelDesde =
      document.visibilityState === "visible" ? performance.now() : null;
    let tempoVisivel = 0;
    let rolagem = 0;

    enviar({
      t: "acesso",
      id,
      caminho,
      referencia: document.referrer,
      utm: {
        source: busca.get("utm_source"),
        medium: busca.get("utm_medium"),
        campaign: busca.get("utm_campaign"),
      },
      fbclid: busca.has("fbclid"),
      gclid: busca.has("gclid"),
      idioma: navigator.language,
      largura: innerWidth,
      visitante: idDoVisitante(),
    });

    const medirRolagem = () => {
      const fim = document.documentElement.scrollHeight - innerHeight;
      const agora = fim > 0 ? Math.round((scrollY / fim) * 100) : 100;
      if (agora > rolagem) rolagem = Math.min(100, agora);
    };

    const atualizar = () => {
      const aberta =
        visivelDesde === null ? 0 : performance.now() - visivelDesde;
      enviar({
        t: "atualiza",
        id,
        duracao: Math.round((tempoVisivel + aberta) / 1000),
        rolagem,
        visitante: idDoVisitante(),
      });
    };

    // O tempo só corre com a aba à vista; ao esconder, já manda o que tem.
    const mudouVisibilidade = () => {
      if (document.visibilityState === "visible") {
        visivelDesde = performance.now();
        return;
      }
      if (visivelDesde !== null) {
        tempoVisivel += performance.now() - visivelDesde;
        visivelDesde = null;
      }
      atualizar();
    };

    const clicou = (evento: MouseEvent) => {
      const link = (evento.target as Element | null)?.closest?.("a[href]");
      const destino = link?.getAttribute("href") ?? "";
      if (!link || !/wa\.me|whatsapp/i.test(destino)) return;
      const texto = (link.textContent ?? "").replace(/\s+/g, " ").trim();
      enviar({ t: "clique", id, alvo: `${lugarDo(link)}|${texto.slice(0, 60)}` });
    };

    medirRolagem();
    addEventListener("scroll", medirRolagem, { passive: true });
    addEventListener("pagehide", atualizar);
    document.addEventListener("visibilitychange", mudouVisibilidade);
    document.addEventListener("click", clicou, true);
    const pararDeOuvir = aoMudarConsentimento(atualizar);

    return () => {
      removeEventListener("scroll", medirRolagem);
      removeEventListener("pagehide", atualizar);
      document.removeEventListener("visibilitychange", mudouVisibilidade);
      document.removeEventListener("click", clicou, true);
      pararDeOuvir();
      atualizar();
    };
  }, [caminho]);

  return null;
}
