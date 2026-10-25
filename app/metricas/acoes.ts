"use server";

import { cookies } from "next/headers";

import {
  COOKIE_PAINEL,
  senhaConfere,
  senhaDoPainel,
  tokenDoPainel,
} from "../lib/metricas/painel";

export type EstadoEntrada = { erro?: string };

export async function entrar(
  _estado: EstadoEntrada,
  formulario: FormData
): Promise<EstadoEntrada> {
  const senha = senhaDoPainel();
  const digitada = String(formulario.get("senha") ?? "");
  if (!senha || !senhaConfere(digitada, senha)) {
    return { erro: "Senha incorreta." };
  }

  (await cookies()).set(COOKIE_PAINEL, tokenDoPainel(senha), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
  return {};
}

export async function sair() {
  (await cookies()).delete(COOKIE_PAINEL);
}
