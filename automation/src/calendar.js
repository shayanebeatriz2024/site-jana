import {
  getCalendar,
  hasGoogleCredentials,
  CALENDAR_ID,
  TIMEZONE,
} from "./googleClient.js";
import { getProcedimento, duracaoTotalMin } from "./procedures.js";

// -----------------------------------------------------------------------------
// Regras de expediente da clínica (ajuste conforme a rotina real da Jana).
// Padrão atual: Terça a Sábado, 09h–18h, almoço 12h00–13h30.
// -----------------------------------------------------------------------------

// Offset fixo do fuso da clínica em relação ao UTC. São Paulo = -3 (sem horário
// de verão). Isso torna o cálculo de horários independente do fuso do servidor.
const OFFSET = Number(process.env.CLINIC_UTC_OFFSET ?? -3);

// Dias de atendimento: 0 = domingo ... 6 = sábado. Padrão: terça a sábado.
const DIAS_ATENDIMENTO = (process.env.CLINIC_WORKDAYS ?? "2,3,4,5,6")
  .split(",")
  .map((n) => Number(n.trim()));

const ABRE_HORA = Number(process.env.CLINIC_OPEN_HOUR ?? 9); // 09:00
const FECHA_HORA = Number(process.env.CLINIC_CLOSE_HOUR ?? 18); // 18:00
const PASSO_MIN = Number(process.env.CLINIC_SLOT_STEP ?? 30); // grade de 30 min

// Intervalo de almoço no formato "HH:MM" (bloqueia agendamentos nesse período).
const ALMOCO_INICIO = process.env.CLINIC_LUNCH_START ?? "12:00";
const ALMOCO_FIM = process.env.CLINIC_LUNCH_END ?? "13:30";

const MIN_MS = 60 * 1000;

/** Converte "HH:MM" em minutos desde a meia-noite. */
function hmParaMin(hm) {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + (m || 0);
}
const ALMOCO_INICIO_MIN = hmParaMin(ALMOCO_INICIO);
const ALMOCO_FIM_MIN = hmParaMin(ALMOCO_FIM);

// --- Helpers de fuso (offset fixo) ---------------------------------------------

/** Lê o "relógio de parede" da clínica a partir de um instante (Date). */
function partesClinica(instante) {
  const d = new Date(instante.getTime() + OFFSET * 60 * MIN_MS);
  return {
    ano: d.getUTCFullYear(),
    mes: d.getUTCMonth(),
    dia: d.getUTCDate(),
    hora: d.getUTCHours(),
    min: d.getUTCMinutes(),
    diaSemana: d.getUTCDay(),
  };
}

/** Converte um horário de parede da clínica (ano, mês, dia, h, min) em Date UTC. */
function paredeParaUtc(ano, mes, dia, hora, min) {
  return new Date(Date.UTC(ano, mes, dia, hora, min) - OFFSET * 60 * MIN_MS);
}

function sobrepoe(inicioA, fimA, inicioB, fimB) {
  return inicioA < fimB && fimA > inicioB;
}

// --- VIA 3.1 — Buscar horários livres ------------------------------------------

/**
 * Consulta a API `freebusy` e retorna os horários vagos que comportam o
 * procedimento escolhido, respeitando o expediente da clínica.
 *
 * @param {object} opts
 * @param {string} opts.procedimento  Nome exato do procedimento (chave em procedures.js).
 * @param {number} [opts.dias=14]     Janela de dias à frente a considerar.
 * @param {number} [opts.maxSlots=12] Máximo de horários retornados.
 * @returns {Promise<Array<{inicio:string, fim:string}>>} Slots em ISO (UTC).
 */
export async function getAvailableSlots({ procedimento, dias = 14, maxSlots = 12 }) {
  const duracao = duracaoTotalMin(procedimento);

  const agora = new Date();
  const timeMin = agora;
  const timeMax = new Date(agora.getTime() + dias * 24 * 60 * MIN_MS);

  // 1) Descobre os intervalos OCUPADOS na agenda.
  //    Sem credenciais do Google (modo dry-run), assume agenda vazia — útil para
  //    testar a lógica de expediente/almoço/duração antes de configurar o Google.
  let ocupados = [];
  if (hasGoogleCredentials()) {
    const fb = await getCalendar().freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    ocupados = (fb.data.calendars?.[CALENDAR_ID]?.busy ?? []).map((b) => ({
      inicio: new Date(b.start),
      fim: new Date(b.end),
    }));
  } else {
    console.warn(
      "[dry-run] Sem credenciais do Google — considerando a agenda vazia.",
    );
  }

  // 2) Gera candidatos dentro do expediente e descarta os que colidem/já passaram.
  const slots = [];
  for (let d = 0; d < dias && slots.length < maxSlots; d++) {
    const base = partesClinica(new Date(agora.getTime() + d * 24 * 60 * MIN_MS));
    if (!DIAS_ATENDIMENTO.includes(base.diaSemana)) continue;

    // Intervalo de almoço deste dia (em instantes UTC), para bloquear slots.
    const almocoInicio = paredeParaUtc(
      base.ano, base.mes, base.dia,
      Math.floor(ALMOCO_INICIO_MIN / 60), ALMOCO_INICIO_MIN % 60,
    );
    const almocoFim = paredeParaUtc(
      base.ano, base.mes, base.dia,
      Math.floor(ALMOCO_FIM_MIN / 60), ALMOCO_FIM_MIN % 60,
    );

    for (let h = ABRE_HORA * 60; h < FECHA_HORA * 60; h += PASSO_MIN) {
      const inicio = paredeParaUtc(
        base.ano,
        base.mes,
        base.dia,
        Math.floor(h / 60),
        h % 60,
      );
      const fim = new Date(inicio.getTime() + duracao * MIN_MS);

      // Não pode ultrapassar o horário de fechamento.
      const fechamento = paredeParaUtc(base.ano, base.mes, base.dia, FECHA_HORA, 0);
      if (fim > fechamento) break;

      // Não pode invadir o horário de almoço.
      if (sobrepoe(inicio, fim, almocoInicio, almocoFim)) continue;

      // Não pode ser no passado (com margem de 60 min para deslocamento).
      if (inicio.getTime() < agora.getTime() + 60 * MIN_MS) continue;

      // Não pode colidir com nenhum intervalo ocupado.
      const colide = ocupados.some((o) =>
        sobrepoe(inicio, fim, o.inicio, o.fim),
      );
      if (colide) continue;

      slots.push({ inicio: inicio.toISOString(), fim: fim.toISOString() });
      if (slots.length >= maxSlots) break;
    }
  }

  return slots;
}

// --- VIA 3.2 — Formatar horários para o WhatsApp -------------------------------

const DIAS_PT = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const MESES_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

function rotuloSlot(iso) {
  const p = partesClinica(new Date(iso));
  const hh = String(p.hora).padStart(2, "0");
  const mm = String(p.min).padStart(2, "0");
  return {
    chaveDia: `${p.dia} ${MESES_PT[p.mes]}`,
    diaSemana: DIAS_PT[p.diaSemana],
    hora: `${hh}:${mm}`,
  };
}

/**
 * Transforma a lista de slots em um texto pronto para o Chatbot enviar no
 * WhatsApp, agrupado por dia.
 */
export function formatSlotsForWhatsApp(slots, { maxPorDia = 4 } = {}) {
  if (!slots.length) {
    return "No momento não encontrei horários livres na janela consultada. "
      + "Quer que eu verifique outra semana? 😊";
  }

  const porDia = new Map();
  for (const s of slots) {
    const r = rotuloSlot(s.inicio);
    const cabecalho = `${r.diaSemana}, ${r.chaveDia}`;
    if (!porDia.has(cabecalho)) porDia.set(cabecalho, []);
    porDia.get(cabecalho).push(r.hora);
  }

  const linhas = ["Encontrei estes horários disponíveis: ✨", ""];
  for (const [dia, horas] of porDia) {
    linhas.push(`📅 *${dia}*: ${horas.slice(0, maxPorDia).join(" · ")}`);
  }
  linhas.push("", "Qual deles fica melhor para você?");
  return linhas.join("\n");
}

// --- VIA 3.3 — Criar o agendamento ---------------------------------------------

/**
 * Cria o evento no Google Calendar assim que o cliente confirma o horário.
 *
 * @param {object} opts
 * @param {string} opts.procedimento  Nome do procedimento.
 * @param {string} opts.inicioISO     Início escolhido (ISO 8601).
 * @param {object} opts.cliente       { nome, telefone, email? }
 * @returns {Promise<{id:string, htmlLink:string, inicio:string, fim:string}>}
 */
export async function createAppointment({ procedimento, inicioISO, cliente = {} }) {
  const proc = getProcedimento(procedimento);
  const inicio = new Date(inicioISO);
  const fim = new Date(inicio.getTime() + duracaoTotalMin(proc.nome) * MIN_MS);

  const descricao = [
    `Procedimento: ${proc.nome}`,
    cliente.nome && `Cliente: ${cliente.nome}`,
    cliente.telefone && `Telefone: ${cliente.telefone}`,
    cliente.email && `E-mail: ${cliente.email}`,
    "",
    "Agendado automaticamente pelo Chatbot de WhatsApp.",
  ]
    .filter(Boolean)
    .join("\n");

  const { data } = await getCalendar().events.insert({
    calendarId: CALENDAR_ID,
    sendUpdates: cliente.email ? "all" : "none",
    requestBody: {
      summary: `${proc.nome} — ${cliente.nome ?? "Cliente"}`,
      description: descricao,
      start: { dateTime: inicio.toISOString(), timeZone: TIMEZONE },
      end: { dateTime: fim.toISOString(), timeZone: TIMEZONE },
      attendees: cliente.email ? [{ email: cliente.email }] : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
  });

  return {
    id: data.id,
    htmlLink: data.htmlLink,
    inicio: data.start?.dateTime,
    fim: data.end?.dateTime,
  };
}
