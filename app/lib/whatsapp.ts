import { CONTACT_PHONE } from "./site";

const PHONE = CONTACT_PHONE.replace(/\D/g, "");

const DEFAULT_MESSAGE =
  "Olá! Quero saber mais sobre a Viz para o meu prédio.";

export function whatsappLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappLink();

/**
 * Mensagem pronta de cada botão de orçamento, por perfil. A seção de
 * orçamento mostra a geral na prévia do WhatsApp.
 */
export const QUOTE_MESSAGES = {
  "": "Olá! Quero um orçamento da Viz para o meu prédio.",
  condominio: "Olá! Quero um orçamento da Viz para o meu condomínio.",
  construtora: "Olá! Quero um orçamento da Viz para a minha construtora.",
} as const;
