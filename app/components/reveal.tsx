"use client";

import { useEffect, useRef } from "react";

/*
 * Entrada suave ao rolar a página. A animação é CSS (.reveal em globals.css),
 * em transform/opacity: roda no compositor e não trava enquanto a página
 * hidrata. Aqui só marcamos data-in-view quando o bloco entra na tela.
 */

let observer: IntersectionObserver | undefined;
const pending = new Set<HTMLElement>();

function show(element: HTMLElement) {
  element.dataset.inView = "";
  pending.delete(element);
  observer?.unobserve(element);
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      }
      // O que já ficou acima da tela aparece também: recarregar no meio da
      // página ou saltar por âncora passa rápido demais para o observer ver.
      for (const element of pending) {
        if (element.getBoundingClientRect().bottom < 0) show(element);
      }
    },
    { rootMargin: "0px 0px -80px 0px" }
  );
  return observer;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Anima já no carregamento, sem esperar o JS (use no topo da página). */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avisa o script do <head> que o JS carregou (senão ele mostra tudo parado).
    document.documentElement.dataset.reveal = "ready";

    const element = ref.current;
    if (immediate || !element) return;

    const io = getObserver();
    pending.add(element);
    io.observe(element);
    return () => {
      pending.delete(element);
      io.unobserve(element);
    };
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-in-view={immediate ? "" : undefined}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
