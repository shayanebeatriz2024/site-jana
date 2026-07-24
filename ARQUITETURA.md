# Arquitetura — Agendamento automático (Site + WhatsApp + Google Agenda)

## Visão geral

```
                          ┌──────────────────────────────────────────────┐
                          │                   SITE (Vite/TanStack)         │
                          │                                                │
   VIA 1  ───────────────►  WhatsAppButton  ──► wa.me com mensagem pronta  │
   "Agende sua Avaliação"  │                                               │
                          │                                                │
   VIA 2  ───────────────►  Formulário "Entre em contato"                  │
   "Enviar"                │        │  POST (webhook)                       │
                          └────────┼───────────────────────────────────────┘
                                   ▼
                    ┌───────────────────────────────┐
                    │  AUTOMAÇÃO (n8n / Make / Typebot) │
                    │  + Chatbot de WhatsApp            │
                    └───────┬───────────────┬───────────┘
                            │               │  HTTP (Bearer token)
                            │               ▼
                            │      ┌───────────────────────────────┐
                            │      │  SERVIÇO NODE (/automation)     │
                            │      │  /disponibilidade  (freebusy)   │
                            │      │  /agendar          (events.insert) │
                            │      └───────────────┬─────────────────┘
                            │                      │  googleapis (JWT)
                            ▼                      ▼
                    ┌───────────────┐     ┌───────────────────┐
                    │   WhatsApp     │     │   Google Calendar  │
                    └───────────────┘     └───────────────────┘
```

## Estrutura de pastas (arquivos criados/alterados)

```
connectgithub/
├── .env.example                      # variáveis do frontend (VITE_*)
├── ARQUITETURA.md                    # este documento
├── src/
│   ├── lib/
│   │   └── config.ts                 # ✚ número WhatsApp + URL do webhook (via env)
│   ├── components/
│   │   └── WhatsAppButton.tsx        # ✚ VIA 1 — botão reutilizável
│   └── routes/
│       └── index.tsx                 # ✎ CTA usa WhatsAppButton + form dispara webhook (VIA 2)
└── automation/                       # ✚ serviço Node de integração com Google Agenda
    ├── package.json
    ├── .env.example
    ├── .gitignore
    ├── README.md
    ├── server.js                     # API HTTP (/disponibilidade, /agendar)
    ├── scripts/
    │   └── teste-horarios.js
    └── src/
        ├── googleClient.js           # auth (Conta de Serviço / JWT)
        ├── procedures.js             # procedimento → duração + buffer
        └── calendar.js               # freebusy + formatação + events.insert
```

## Fluxo VIA 1 — Botão "Agende sua Avaliação"
1. Cliente clica no botão (`WhatsAppButton`).
2. Abre o WhatsApp com uma mensagem inicial pré-formatada.
3. O **Chatbot** assume: pergunta o procedimento, chama `/disponibilidade`,
   oferece horários e, ao confirmar, chama `/agendar`.

## Fluxo VIA 2 — Formulário "Entre em contato"
1. Cliente preenche Nome, Sobrenome, E-mail, Telefone, Procedimento e Mensagem.
2. Ao enviar, o site faz **POST (webhook)** para a automação com o JSON dos dados.
3. A automação registra o lead e/ou inicia a conversa no WhatsApp.
4. O site também abre o WhatsApp como continuidade/fallback.

## Fluxo VIA 3 — Google Agenda (serviço Node)
- `getAvailableSlots({ procedimento })` → consulta `freebusy`, respeita o
  expediente e a duração (+buffer) e devolve slots livres.
- `formatSlotsForWhatsApp(slots)` → texto agrupado por dia para o Chatbot.
- `createAppointment({ procedimento, inicioISO, cliente })` → `events.insert`.

## Contrato de dados
- O campo **Procedimento** enviado pelo site deve bater com as chaves de
  `automation/src/procedures.js` (mesmos nomes). É o "contrato" entre as pontas.

## Variáveis de ambiente
- **Frontend** (`.env` na raiz): `VITE_WHATSAPP_NUMERO`, `VITE_WEBHOOK_AGENDAMENTO`.
- **Automação** (`automation/.env`): credenciais Google + expediente (ver `automation/.env.example`).
```
