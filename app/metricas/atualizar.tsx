"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Busca os números de novo a cada minuto enquanto o painel está à vista. */
export default function Atualizar() {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, 60_000);
    return () => clearInterval(timer);
  }, [router]);

  return null;
}
