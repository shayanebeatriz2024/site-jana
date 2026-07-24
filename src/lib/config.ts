// -----------------------------------------------------------------------------
// Configuração de integração (frontend)
//
// Todos os valores vêm de variáveis de ambiente VITE_* (arquivo .env na raiz).
// Como este arquivo roda no navegador, NÃO coloque segredos aqui — apenas o
// número do WhatsApp e a URL pública do webhook da automação (n8n/Make/Typebot).
// -----------------------------------------------------------------------------

/** Número do WhatsApp no formato internacional, só dígitos (ex.: 555183139439). */
export const WHATSAPP_NUMERO =
  import.meta.env.VITE_WHATSAPP_NUMERO ?? "555183139439";

/**
 * URL do webhook da plataforma de automação que recebe o formulário (VIA 2).
 * Ex.: https://n8n.suaclinica.com/webhook/agendamento
 * Se ficar vazia, o formulário cai no fluxo de fallback (abre o WhatsApp).
 */
export const WEBHOOK_AGENDAMENTO =
  import.meta.env.VITE_WEBHOOK_AGENDAMENTO ?? "";

/** Monta um link wa.me com uma mensagem opcional já codificada. */
export function buildWhatsAppLink(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
