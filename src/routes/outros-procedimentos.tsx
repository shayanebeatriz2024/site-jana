import { createFileRoute } from "@tanstack/react-router";
import JJLogo from "@/assets/JJ.png";
import jana from "@/assets/jana.png";

export const Route = createFileRoute("/outros-procedimentos")({
  head: () => ({
    meta: [
      { title: "Outros Procedimentos — Jana Jordão" },
      { name: "description", content: "Landing page de catálogo de serviços da Jana Jordão." },
    ],
  }),
  component: OutrosProcedimentos,
});

function OutrosProcedimentos() {
  return (
    <main className="outros-procedimentos min-h-screen bg-background text-foreground">
      <div className="relative mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="profile-top">
            <img src={JJLogo} alt="Logo JJ" className="mx-auto h-14 w-auto" />
            <div className="profile-photo-wrap">
              <img
                src={jana}
                alt="Jana Jordão"
                className="profile-photo"
              />
              <div className="profile-verified">✦</div>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-logo-wrap">
              <div className="footer-logo text-2xl">Jana Jordão</div>
            </div>
            <div className="profile-role">Esteticista e Cosmetóloga</div>
            <div className="profile-divider" />
            <p className="profile-bio">
              Realçando sua beleza natural com técnicas personalizadas e atendimento acolhedor. Cada detalhe faz a diferença!
            </p>
          </div>
        </div>

        <div className="profile-pills">
          <div className="pill">
            <div className="pill-icon">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            Técnicas seguras
          </div>
          <div className="pill">
            <div className="pill-icon">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            Atendimento personalizado
          </div>
          <div className="pill">
            <div className="pill-icon">✦</div>
            Resultados naturais
          </div>
        </div>

        <div className="wrap">
          <span className="section-label">Catálogo de Serviços</span>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="link-card card-v1">
              <div className="card-icon">🎯</div>
              <div className="card-text">
                <div className="card-title">Design de Sobrancelhas</div>
                <div className="card-desc">Modelagem e contorno personalizados</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
            <div className="link-card card-v2">
              <div className="card-icon">✨</div>
              <div className="card-text">
                <div className="card-title">Microblading Fio a Fio</div>
                <div className="card-desc">Técnica semipermanente realista</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
            <div className="link-card card-v3">
              <div className="card-icon">🎨</div>
              <div className="card-text">
                <div className="card-title">Design + Tintura</div>
                <div className="card-desc">Realce com tonalizante nos fios brancos</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
            <div className="link-card card-v4">
              <div className="card-icon">🕊️</div>
              <div className="card-text">
                <div className="card-title">Depilação com Cera</div>
                <div className="card-desc">Acabamento suave e duradouro</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
            <div className="link-card card-v5">
              <div className="card-icon">💧</div>
              <div className="card-text">
                <div className="card-title">Limpeza Facial</div>
                <div className="card-desc">Pele renovada e radiante</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
            <a href="https://wa.me/555183139439" target="_blank" rel="noreferrer" className="link-card card-wa">
              <div className="card-icon icon-bg-light">📲</div>
              <div className="card-text">
                <div className="card-title">WhatsApp</div>
                <div className="card-desc">Atendimento rápido e direto</div>
              </div>
              <div className="card-arrow">›</div>
            </a>
          </div>

          <div className="final-block">
            <div className="final-block-eyebrow">Procedimentos</div>
            <h2>Veja todos os<br /><em>procedimentos</em></h2>
            <p>Acesse o catálogo completo com fotos reais, descrições detalhadas e valores de cada serviço.</p>
            <a href="/#servicos" className="btn-catalog">
              Ver Catálogo Completo
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <a href="/" className="text-primary hover:underline">← Voltar para o site principal</a>
          <img src={JJLogo} alt="Logo JJ" className="h-10 w-auto" />
          <div className="footer-role">Esteticista</div>
          <span className="footer-heart">♥</span>
          <div className="footer-links flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/555183139439" target="_blank" rel="noreferrer">(51) 98313-9439</a>
            <a href="https://www.instagram.com/janajordao_g/" target="_blank" rel="noreferrer">@janajordao_g</a>
          </div>
          <div className="footer-copy">Feito com carinho para valorizar sua beleza.</div>
        </div>
      </div>
    </main>
  );
}
