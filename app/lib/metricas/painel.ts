import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Acesso ao /metricas: uma senha só, em METRICAS_SENHA (Vercel > Environment
 * Variables). Quem entra ganha este cookie, e os acessos desse navegador
 * param de ser contados.
 */
export const COOKIE_PAINEL = "viz_painel";

export const senhaDoPainel = () => process.env.METRICAS_SENHA || undefined;

export function tokenDoPainel(senha: string) {
  return createHash("sha256").update(`viz-painel:${senha}`).digest("hex");
}

export function senhaConfere(digitada: string, senha: string) {
  return timingSafeEqual(
    Buffer.from(tokenDoPainel(digitada)),
    Buffer.from(tokenDoPainel(senha))
  );
}

export async function painelLiberado() {
  const senha = senhaDoPainel();
  if (!senha) return false;
  const cookie = (await cookies()).get(COOKIE_PAINEL)?.value;
  return cookie === tokenDoPainel(senha);
}
