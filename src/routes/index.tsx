import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, MapPin, Phone, Instagram, Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import sLaser from "@/assets/service-laser.jpg";
import sBotox from "@/assets/service-botox.jpg";
import sFiller from "@/assets/service-filler.jpg";
import sBody from "@/assets/service-body.jpg";
import sLips from "@/assets/service-lips.jpg";
import sSkin from "@/assets/service-skin.jpg";
import dra1 from "@/assets/dra1.jpg";
import dra2 from "@/assets/dra2.jpg";
import clinic from "@/assets/clinic.jpg";
import JJLogo from "@/assets/JJ.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espaço Bonança — Estética avançada e ciência da beleza" },
      { name: "description", content: "Clínica de estética avançada que realça sua beleza natural com ciência e sofisticação." },
      { property: "og:title", content: "Espaço Bonança" },
      { property: "og:description", content: "Realce a sua beleza natural com ciência e sofisticação." },
    ],
  }),
  component: Index,
});

const services = [
  { title: "Design de Sobrancelhas", desc: "Modelagem e contorno personalizados", img: sSkin },
  { title: "Microblading Fio a Fio", desc: "Técnica semipermanente realista", img: sLaser },
  { title: "Design + Tintura", desc: "Realce com tonalizante nos fios brancos", img: sBotox },
  { title: "Depilação com Cera", desc: "Acabamento suave e duradouro", img: sFiller },
  { title: "Limpeza Facial", desc: "Pele renovada e radiante", img: sBody },
  { title: "Outros Procedimentos", desc: "Veja o catálogo completo", img: sLips },
];

const testimonials = [
  { name: "Mariana C.", text: "Atendimento impecável, ambiente acolhedor e resultados naturais. Saí me sentindo cuidada e renovada. Recomendo de olhos fechados." },
  { name: "Juliana R.", text: "Profissionalismo e empatia em cada detalhe. A Dra. ouviu minhas expectativas e entregou exatamente o que eu sonhava." },
  { name: "Patrícia M.", text: "Espaço sofisticado e equipe técnica de altíssimo nível. Sou cliente há dois anos e os resultados falam por si." },
];

function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={JJLogo} alt="Logo JJ" className="h-10 w-auto" />
          <div className="leading-tight">
            <div className="font-display text-[15px] tracking-wide">Espaço</div>
            <div className="font-display text-[15px] tracking-[0.3em] -mt-1">BONANÇA</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.18em] text-foreground/80">
          <a href="#sobre" className="hover:text-primary transition">Sobre</a>
          <a href="#servicos" className="hover:text-primary transition">Serviços</a>
          <a href="#equipe" className="hover:text-primary transition">Equipe</a>
          <a href="#clinica" className="hover:text-primary transition">Clínica</a>
          <a href="#contato" className="hover:text-primary transition">Contato</a>
        </nav>
        <a href="#contato" className="hidden md:inline-flex text-[12px] uppercase tracking-[0.2em] border border-foreground/30 px-5 py-2.5 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary transition">
          Agendar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Nav />
      {/* faint background circles */}
      <div className="absolute -left-40 top-10 w-[700px] h-[700px] rounded-full border border-border" />
      <div className="absolute -left-20 top-32 w-[500px] h-[500px] rounded-full border border-border" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
            Realce a sua<br/>beleza natural<br/>com ciência e<br/><em className="text-primary">sofisticação.</em>
          </h1>
          <p className="text-base md:text-lg max-w-md text-muted-foreground leading-relaxed">
            Tratamentos estéticos avançados conduzidos por especialistas, com tecnologia de ponta e olhar humano para cada paciente.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contato" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-[0.18em] hover:bg-primary/90 transition">
              Agende sua consulta
            </a>
            <a href="#servicos" className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-full text-sm uppercase tracking-[0.18em] hover:bg-primary/5 transition">
              Nossos serviços
            </a>
          </div>
        </div>
        <div className="relative">
          <img src={hero} alt="Beleza natural" width={1280} height={896} className="w-full h-[520px] lg:h-[640px] object-cover rounded-sm" />
        </div>
      </div>
      <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#6B4A3A] text-white flex items-center justify-center shadow-xl hover:bg-[#3A241A] hover:scale-105 transition">
        <MessageCircle className="h-7 w-7" />
      </a>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="bg-background py-28 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
        <h2 className="font-display text-[140px] md:text-[220px] leading-none text-foreground/5 select-none whitespace-nowrap">tratamentos</h2>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— O que fazemos</span>
          <h2 className="font-display text-4xl md:text-5xl">Nossos procedimentos</h2>
          <div className="mx-auto h-px w-24 bg-secondary/50" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {services.map((s) => {
            const CardContent = (
              <>
                <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="h-px w-8 bg-secondary mb-3" />
                  <h3 className="font-display text-lg text-white">{s.title}</h3>
                  <p className="text-sm text-white/75 mt-1">{s.desc}</p>
                </div>
              </>
            );

            if (s.title === "Outros Procedimentos") {
              return (
                <Link
                  key={s.title}
                  to="/"
                  className="group relative h-[360px] overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div key={s.title} className="group relative h-[360px] overflow-hidden rounded-sm cursor-pointer">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DoctorBlock({ img, name, role, body, reverse }: { img: string; name: string; role: string; body: string; reverse?: boolean }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <div className="space-y-6">
        <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— {role}</span>
        <h3 className="font-display text-4xl md:text-5xl">{name}</h3>
        <div className="h-px w-16 bg-sage" />
        <p className="text-muted-foreground leading-relaxed max-w-lg">{body}</p>
        <p className="text-muted-foreground leading-relaxed max-w-lg">
          Atua com foco em resultados naturais, sempre respeitando a individualidade e a anatomia de cada paciente.
        </p>
        <a href="#contato" className="inline-block text-primary text-sm uppercase tracking-[0.2em] border-b border-primary pb-1 hover:text-secondary transition">
          Conhecer agenda →
        </a>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 border border-secondary/30 rounded-sm" />
        <img src={img} alt={name} loading="lazy" className="relative w-full max-w-md mx-auto h-[520px] object-cover rounded-sm" />
      </div>
    </div>
  );
}

function Team() {
  return (
    <section id="equipe" className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-32">
        <DoctorBlock
          img={dra1}
          name="Dra. Bruna Costa"
          role="Médica responsável"
          body="Especialista em dermatologia estética com mais de uma década dedicada ao estudo da longevidade da pele. Une protocolos baseados em evidência a uma estética sutil e contemporânea."
        />
        <DoctorBlock
          reverse
          img={dra2}
          name="Dra. Helena Marques"
          role="Harmonização facial"
          body="Especialista em harmonização facial e procedimentos injetáveis. Acredita em uma abordagem conservadora, valorizando os traços únicos de cada rosto."
        />
      </div>
    </section>
  );
}

function VideoCard({ img }: { img: string }) {
  return (
    <div className="relative aspect-[3/4] rounded-sm overflow-hidden group cursor-pointer">
      <img src={img} alt="Depoimento" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
          <Play className="h-6 w-6 text-umber ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

function Videos() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— Quem confia em nós</span>
          <h2 className="font-display text-4xl md:text-5xl">Histórias reais</h2>
          <div className="mx-auto h-px w-24 bg-sage/60" />
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          <VideoCard img={dra1} />
          <VideoCard img={dra2} />
        </div>
      </div>
    </section>
  );
}

function Clinic() {
  return (
    <section id="clinica" className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— O ambiente</span>
          <h2 className="font-display text-4xl md:text-5xl">Uma clínica pensada<br/>para o seu bem-estar.</h2>
          <div className="h-px w-16 bg-secondary" />
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Cada detalhe foi cuidadosamente projetado para oferecer uma experiência sensorial completa: do aroma à iluminação, do silêncio às texturas naturais.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><span className="text-secondary">—</span> Tecnologia médica de última geração</li>
            <li className="flex gap-3"><span className="text-secondary">—</span> Ambientes climatizados e privativos</li>
            <li className="flex gap-3"><span className="text-secondary">—</span> Equipe técnica em constante atualização</li>
          </ul>
        </div>
        <div>
          <img src={clinic} alt="Interior da clínica" loading="lazy" width={896} height={640} className="w-full h-[480px] object-cover rounded-sm" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((p) => (p + 1) % testimonials.length);
  return (
    <section className="bg-background text-foreground py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">— Depoimentos</span>
          <h2 className="font-display text-4xl md:text-5xl">O que dizem sobre nós</h2>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={prev} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition shrink-0">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="grid md:grid-cols-3 gap-5 flex-1">
            {[0, 1, 2].map((offset) => {
              const t = testimonials[(i + offset) % testimonials.length];
              return (
                <div key={offset} className="bg-background/90 text-foreground rounded-sm p-6 space-y-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">— {t.name}</p>
                </div>
              );
            })}
          </div>
          <button onClick={next} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition shrink-0">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="bg-background py-24 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-5 gap-0 items-stretch">
        <form className="lg:col-span-2 bg-secondary/10 text-primary-foreground p-10 space-y-5 rounded-sm relative z-10 lg:translate-x-8" onSubmit={(e) => e.preventDefault()}>
          <h3 className="font-display text-3xl">Entre em contato</h3>
          <div className="h-px w-12 bg-primary-foreground/40" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Nome" className="bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground" />
            <input placeholder="Sobrenome" className="bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground" />
          </div>
          <input placeholder="E-mail" className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground" />
          <input placeholder="Telefone" className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground" />
          <select className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm focus:outline-none focus:border-primary-foreground">
            <option className="text-foreground">Procedimento de interesse</option>
            {services.map((s) => <option key={s.title} className="text-foreground">{s.title}</option>)}
          </select>
          <textarea placeholder="Mensagem" rows={3} className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground resize-none" />
          <button type="submit" className="mt-2 w-full bg-primary text-primary-foreground py-3 rounded-full text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition">
            Enviar
          </button>
        </form>
        <div className="lg:col-span-3 relative">
          <img src={clinic} alt="Ambiente" loading="lazy" className="w-full h-full min-h-[420px] object-cover rounded-sm" />
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl">Clique no vídeo e veja como chegar</h2>
        </div>
        <div className="relative aspect-[16/7] rounded-sm overflow-hidden">
          <iframe
            title="Localização"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.66%2C-23.57%2C-46.64%2C-23.55&layer=mapnik"
            className="absolute inset-0 w-full h-full grayscale-[40%]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-4 gap-10 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={JJLogo} alt="Logo JJ" className="h-9 w-auto" />
            <div className="font-display tracking-[0.3em] text-base">BONANÇA</div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">Estética avançada com ciência, técnica e sofisticação.</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Navegação</h4>
          <a href="#sobre" className="block text-muted-foreground hover:text-foreground">Sobre</a>
          <a href="#servicos" className="block text-muted-foreground hover:text-foreground">Serviços</a>
          <a href="#equipe" className="block text-muted-foreground hover:text-foreground">Equipe</a>
          <a href="#contato" className="block text-muted-foreground hover:text-foreground">Contato</a>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Contato</h4>
          <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> (11) 9 0000-0000</p>
          <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Av. Paulista, 1000 — SP</p>
          <p className="flex items-center gap-2 text-muted-foreground"><Instagram className="h-3.5 w-3.5" /> @espaco.bonanca</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Horário</h4>
          <p className="text-muted-foreground">Segunda a Sexta · 9h às 20h</p>
          <p className="text-muted-foreground">Sábado · 9h às 14h</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Espaço Bonança. Todos os direitos reservados.</p>
        <p>CRM/SP 000000 · Responsável técnica Dra. Bruna Costa</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <Services />
      <Team />
      <Videos />
      <Clinic />
      <Testimonials />
      <Contact />
      <MapSection />
      <Footer />
    </main>
  );
}
