"use client";

import { useEffect, useRef } from "react";

/*
 * Entrada suave ao rolar a página. A animação é CSS (.reveal em globals.css),
 * em transform/opacity: roda no compositor e não trava enquanto a página
 * hidrata. Aqui só marcamos data-in-view quando o bloco entra na tela.
 */

let observer: IntersectionObserver | undefined;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Na tela, ou já acima dela (recarregou no meio da página).
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          (entry.target as HTMLElement).dataset.inView = "";
          observer?.unobserve(entry.target);
        }
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
    io.observe(element);
    return () => io.unobserve(element);
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
