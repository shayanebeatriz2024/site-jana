# Deploy na Vercel

Este projeto é um **TanStack Start** (SSR, com Nitro) — **não** é um Vite/React SPA estático.
Por isso **não existe** `index.html` na raiz nem uma pasta `dist` de SPA, e adicionar um
`vercel.json` com `rewrites` para `/index.html` **não** resolve o erro `404: NOT_FOUND`.

## Causa do 404

Por padrão o Nitro compila usando o target **Cloudflare** (ver comentário no `vite.config.ts`).
A Vercel não entende essa saída, então retorna 404. A correção é fazer o Nitro gerar a
saída no formato que a Vercel entende (`.vercel/output`), usando o **preset `vercel`**.

## Correção (via variável de ambiente)

1. Painel da Vercel → **Settings → Environment Variables**. Adicione:
   - **Key:** `NITRO_PRESET`
   - **Value:** `vercel`
   - **Environments:** Production, Preview e Development.
2. **Settings → Build & Deployment**:
   - **Framework Preset:** `Other`
   - **Build Command:** `npm run build`
   - **Output Directory:** *deixe em branco* (a Vercel detecta `.vercel/output` sozinha).
     ⚠️ **Não** coloque `dist` aqui.
   - **Install Command:** padrão (`npm install`).
3. **Deployments** → último deploy → **⋯ → Redeploy**, com **"Use existing Build Cache"
   desmarcado** para forçar um build limpo.

## Se o 404 persistir

- Confira o **log do build** na Vercel.
- Verifique o SSR entry em `src/server.ts` e as rotas em `src/routes/`.
