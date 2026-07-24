import { google } from "googleapis";

// -----------------------------------------------------------------------------
// Autenticação com a API do Google Calendar via CONTA DE SERVIÇO (JWT).
//
// A autenticação é PREGUIÇOSA (lazy): o cliente só é criado quando realmente
// precisamos falar com o Google. Assim é possível testar a lógica de horários
// localmente ANTES de ter as credenciais configuradas (modo "dry-run").
//
// Passos (detalhados no README.md):
//  1. Crie um projeto no Google Cloud e ative a "Google Calendar API".
//  2. Crie uma Conta de Serviço e gere uma chave JSON.
//  3. Copie client_email e private_key da chave para o .env.
//  4. COMPARTILHE a agenda da clínica com o client_email da conta de serviço,
//     com permissão "Fazer alterações nos eventos".
// -----------------------------------------------------------------------------

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

/** Há credenciais do Google configuradas no ambiente? */
export function hasGoogleCredentials() {
  return Boolean(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
}

let _calendar = null;

/** Retorna o cliente do Google Calendar (criado sob demanda e memoizado). */
export function getCalendar() {
  if (_calendar) return _calendar;

  if (!hasGoogleCredentials()) {
    throw new Error(
      "Credenciais do Google ausentes. Defina GOOGLE_CLIENT_EMAIL e GOOGLE_PRIVATE_KEY no .env.",
    );
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    // No .env a chave vem com "\n" literal; aqui convertemos para quebra real.
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });

  _calendar = google.calendar({ version: "v3", auth });
  return _calendar;
}

/** ID da agenda onde os eventos serão criados/consultados. */
export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

/** Fuso horário usado nos eventos criados. */
export const TIMEZONE = process.env.GOOGLE_TIMEZONE || "America/Sao_Paulo";
