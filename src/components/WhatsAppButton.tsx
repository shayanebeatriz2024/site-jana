import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/config";

// -----------------------------------------------------------------------------
// VIA 1 — Botão "Agende sua Avaliação"
//
// Componente reutilizável que abre o WhatsApp da clínica já com uma mensagem
// inicial pré-formatada pedindo o agendamento. A partir daí o Chatbot de
// WhatsApp (conectado ao n8n/Make + Google Agenda) assume a conversa.
// -----------------------------------------------------------------------------

type WhatsAppButtonProps = {
  /** Mensagem inicial já preenchida no WhatsApp do cliente. */
  mensagem?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  /** Mostra o ícone do WhatsApp antes do texto (padrão: true). */
  comIcone?: boolean;
};

const VARIANTES: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-foreground/30 hover:bg-primary/10 hover:text-primary hover:border-primary",
};

const MENSAGEM_PADRAO =
  "Olá! Gostaria de agendar uma avaliação na clínica Jana Jordão. 😊";

export function WhatsAppButton({
  mensagem = MENSAGEM_PADRAO,
  children,
  className = "",
  variant = "primary",
  comIcone = true,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(mensagem)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full text-sm uppercase tracking-[0.18em] transition ${VARIANTES[variant]} ${className}`}
    >
      {comIcone && <MessageCircle className="h-4 w-4" />}
      {children}
    </a>
  );
}
