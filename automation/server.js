import "dotenv/config";
import express from "express";
import {
  getAvailableSlots,
  formatSlotsForWhatsApp,
  createAppointment,
} from "./src/calendar.js";

// -----------------------------------------------------------------------------
// API HTTP consumida pelo Chatbot / plataforma de automação (n8n/Make/Typebot).
//
//  GET  /health                 -> checagem simples
//  POST /disponibilidade        -> { procedimento, dias? } -> horários livres
//  POST /agendar                -> { procedimento, inicioISO, cliente } -> cria evento
//
// Proteja com um token simples no header:  Authorization: Bearer <API_TOKEN>
// -----------------------------------------------------------------------------

const app = express();
app.use(express.json());

// Autenticação básica por token (opcional, mas recomendada).
app.use((req, res, next) => {
  if (req.path === "/health") return next();
  const token = process.env.API_TOKEN;
  if (!token) return next(); // sem token configurado = aberto (apenas para testes)
  const header = req.headers.authorization ?? "";
  if (header === `Bearer ${token}`) return next();
  return res.status(401).json({ erro: "Não autorizado." });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

// VIA 3.1 + 3.2 — devolve horários livres já formatados para o WhatsApp.
app.post("/disponibilidade", async (req, res) => {
  try {
    const { procedimento, dias } = req.body ?? {};
    const slots = await getAvailableSlots({ procedimento, dias });
    res.json({
      procedimento: procedimento ?? "Avaliação",
      slots,
      mensagemWhatsApp: formatSlotsForWhatsApp(slots),
    });
  } catch (err) {
    console.error("Erro em /disponibilidade:", err);
    res.status(500).json({ erro: "Falha ao consultar horários." });
  }
});

// VIA 3.3 — cria o evento no Google Calendar após a confirmação do cliente.
app.post("/agendar", async (req, res) => {
  try {
    const { procedimento, inicioISO, cliente } = req.body ?? {};
    if (!inicioISO) {
      return res.status(400).json({ erro: "inicioISO é obrigatório." });
    }
    const evento = await createAppointment({ procedimento, inicioISO, cliente });
    res.json({
      ok: true,
      evento,
      mensagemWhatsApp:
        `Agendamento confirmado! ✅\n` +
        `${procedimento ?? "Avaliação"} marcado com sucesso. ` +
        `Você receberá um lembrete antes do horário. Até breve! 💛`,
    });
  } catch (err) {
    console.error("Erro em /agendar:", err);
    res.status(500).json({ erro: "Falha ao criar o agendamento." });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`✅ Serviço de automação rodando em http://localhost:${PORT}`);
});
