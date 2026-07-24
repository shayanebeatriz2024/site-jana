// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Força o Nitro a rodar no build com o preset "vercel".
  // Sem isso, FORA do ambiente Lovable (ex.: deploy na Vercel) o Nitro nem é
  // executado — o build vira "Vite-only", sem servidor SSR, o que causa o
  // erro 404: NOT_FOUND na Vercel. Fixar o preset aqui gera a saída
  // .vercel/output que a plataforma entende nativamente.
  nitro: { preset: "vercel" },
});
