import { CONTACT_PHONE } from "./site";

const PHONE = CONTACT_PHONE.replace(/\D/g, "");

const DEFAULT_MESSAGE =
  "Olá! Quero saber mais sobre a Viz para o meu prédio.";

export function whatsappLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappLink();
