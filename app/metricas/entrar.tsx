"use client";

import { useActionState } from "react";

import { entrar } from "./acoes";

export default function Entrar() {
  const [estado, enviar, enviando] = useActionState(entrar, {});

  return (
    <form action={enviar} className="mt-6 space-y-3">
      <label htmlFor="senha" className="block text-sm font-medium text-neutral-950">
        Senha
      </label>
      <input
        id="senha"
        name="senha"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-950 outline-none transition-colors focus:border-brand-5"
      />
      <p aria-live="polite" className="min-h-5 text-sm text-red-700">
        {estado.erro}
      </p>
      <button
        type="submit"
        disabled={enviando}
        className="btn-primary w-full px-6 py-3 disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
