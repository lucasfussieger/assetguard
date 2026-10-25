/*
 * Escolha de cookies, guardada no próprio navegador. "aceito" libera um id
 * fixo do aparelho (visitas que voltam, quantas vezes cada um entrou); sem
 * ele o site só conta o acesso, de forma anônima.
 */

export type Consentimento = "aceito" | "recusado";

const CHAVE = "viz_cookies";
const CHAVE_VISITANTE = "viz_visitante";
const MUDOU = "viz:cookies";
const ABRIR = "viz:cookies-abrir";

export function lerConsentimento(): Consentimento | null {
  try {
    const valor = localStorage.getItem(CHAVE);
    return valor === "aceito" || valor === "recusado" ? valor : null;
  } catch {
    return null;
  }
}

export function salvarConsentimento(valor: Consentimento) {
  try {
    localStorage.setItem(CHAVE, valor);
    if (valor === "recusado") localStorage.removeItem(CHAVE_VISITANTE);
  } catch {}
  dispatchEvent(new Event(MUDOU));
}

export function aoMudarConsentimento(callback: () => void) {
  addEventListener(MUDOU, callback);
  return () => removeEventListener(MUDOU, callback);
}

/** O link "Cookies" do rodapé reabre o aviso. */
export function abrirPreferencias() {
  dispatchEvent(new Event(ABRIR));
}

export function aoAbrirPreferencias(callback: () => void) {
  addEventListener(ABRIR, callback);
  return () => removeEventListener(ABRIR, callback);
}

export function novoId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Id do aparelho, só para quem aceitou. Criado na primeira vez. */
export function idDoVisitante() {
  if (lerConsentimento() !== "aceito") return undefined;
  try {
    let id = localStorage.getItem(CHAVE_VISITANTE);
    if (!id) {
      id = novoId();
      localStorage.setItem(CHAVE_VISITANTE, id);
    }
    return id;
  } catch {
    return undefined;
  }
}
