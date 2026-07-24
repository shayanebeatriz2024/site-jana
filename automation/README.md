# Serviço de automação — Google Calendar + WhatsApp

Serviço Node (Express) que o Chatbot de WhatsApp / n8n usa para:

1. **Buscar horários livres** na Google Agenda (`freebusy`) considerando a duração do procedimento.
2. **Devolver os horários formatados** em texto para o WhatsApp.
3. **Criar o evento** na Google Agenda (`events.insert`) quando o cliente confirma.

> Por que um serviço Node separado? O site roda em **Cloudflare (edge)**, onde a
> lib `googleapis` (que depende do Node) não funciona. Este serviço roda em
> qualquer host Node (Railway, Render, Fly, VPS) — ou o mesmo código pode ir para
> um **Code node do n8n**.

## Instalação

```bash
cd automation
npm install
cp .env.example .env   # preencha as variáveis
```

## Configurar o Google Calendar (Conta de Serviço)

1. [Google Cloud Console](https://console.cloud.google.com/) → crie um projeto.
2. **APIs e serviços → Biblioteca** → ative **Google Calendar API**.
3. **Credenciais → Criar credenciais → Conta de serviço**.
4. Na conta criada → aba **Chaves → Adicionar chave → JSON**. Baixe o arquivo.
5. Copie do JSON para o `.env`:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key`  → `GOOGLE_PRIVATE_KEY` (em uma linha, com `\n` literais)
6. **Compartilhe a agenda** com o `client_email`: no Google Agenda →
   *Configurações da agenda* → *Compartilhar com pessoas específicas* →
   adicione o e-mail da conta de serviço com **"Fazer alterações nos eventos"**.
7. Em `GOOGLE_CALENDAR_ID`, use o **ID da agenda** (fica em *Integrar agenda* nas
   configurações) ou `primary` se for a agenda principal da conta compartilhada.

## Rodar

```bash
npm start          # produção
npm run dev        # com --watch
npm run teste:horarios "Micropigmentação Labial"   # teste de horários no terminal
```

## Endpoints

| Método | Rota                | Corpo (JSON)                                  |
|--------|---------------------|-----------------------------------------------|
| GET    | `/health`           | —                                             |
| POST   | `/disponibilidade`  | `{ "procedimento": "Design de Sobrancelhas", "dias": 14 }` |
| POST   | `/agendar`          | `{ "procedimento": "...", "inicioISO": "2026-07-28T13:00:00.000Z", "cliente": { "nome": "...", "telefone": "...", "email": "..." } }` |

Todos (menos `/health`) exigem `Authorization: Bearer <API_TOKEN>` se `API_TOKEN` estiver definido.

### Exemplos

```bash
curl -X POST http://localhost:3333/disponibilidade \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"procedimento":"Design de Sobrancelhas","dias":14}'

curl -X POST http://localhost:3333/agendar \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"procedimento":"Design de Sobrancelhas","inicioISO":"2026-07-28T13:00:00.000Z","cliente":{"nome":"Maria","telefone":"5551999999999"}}'
```
