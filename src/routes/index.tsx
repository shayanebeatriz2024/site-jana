import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WEBHOOK_AGENDAMENTO, buildWhatsAppLink } from "@/lib/config";
import {
  MessageCircle,
  MapPin,
  Phone,
  Instagram,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  ShieldCheck,
  Heart,
} from "lucide-react";

// Institucionais
import hero from "@/assets/espaco.png";
import clinic from "@/assets/espaco.png";
import janaFoto from "@/assets/jana.png";
// Versão clara e recortada da logo (fundo transparente) para superfícies escuras
import logoLight from "@/assets/logo-jana-light.png";
import limpezaDePele from "@/assets/limpeza-de-pele-depois.jpeg";

// Galeria "Resultados reais"
import designSobrancelhasAntes from "@/assets/design-sobrancelhas-antes.jpeg";
import designSobrancelhasDepois from "@/assets/design-sobrancelhas-depois.jpeg";
import labialAntes02 from "@/assets/micropigmentacao-labial-antes-02.jpeg";
import labialDepois02 from "@/assets/micropigmentacao-labial-depois-02.jpeg";
import hennaAplicacao from "@/assets/henna-resultado-aplicacao.jpeg";
import hennaFinal from "@/assets/henna-resultado-final.jpeg";
import limpezaResultado01 from "@/assets/limpeza-de-pele-resultado-01.jpeg";
import limpezaResultado02 from "@/assets/limpeza-de-pele-resultado-02.jpeg";

// Foto de destaque única por serviço
import depilacaoLaser02 from "@/assets/depilacao-laser-02.jpeg";
import designNormal from "@/assets/design-normal.png";
import hennaDepois from "@/assets/henna-depois.jpeg";
import microbladingFioAFio from "@/assets/microblading-fio-a-fio.png";
import micropigmentacaoLabialDepois from "@/assets/micropigmentacao-labial-depois.jpeg";

// Vídeos
import microagulhamentoVideo from "@/assets/microagulhamento.mp4";
import radiofrequenciaVideo from "@/assets/radiofrequencia-facial.mp4";
import dermaplaningVideo from "@/assets/dermaplaning.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jana Jordão — Estética avançada e ciência da beleza" },
      {
        name: "description",
        content:
          "Clínica de estética avançada que realça sua beleza natural com ciência e sofisticação.",
      },
      { property: "og:title", content: "Jana Jordão" },
      {
        property: "og:description",
        content: "Realce a sua beleza natural com ciência e sofisticação.",
      },
    ],
  }),
  component: Index,
});

// ---------- DADOS ----------

type MidiaItem = { type: "image" | "video"; src: string };

type Servico = {
  title: string;
  desc: string;
  /** Foto única e estática exibida no topo do card (novo padrão, sem slideshow). */
  featuredImage?: string;
  /** Vídeo em loop — usado apenas nos serviços que ainda não têm foto própria. */
  video?: string;
};

const services: Servico[] = [
  {
    title: "Depilação a Laser",
    desc: "Tecnologia avançada para eliminação definitiva e confortável dos pelos indesejados.",
    featuredImage: depilacaoLaser02,
  },
  {
    title: "Design com Henna",
    desc: "Alinhamento e coloração natural para realçar o olhar com efeito duradouro.",
    featuredImage: hennaDepois,
  },
  {
    title: "Design de Sobrancelhas",
    desc: "Modelagem personalizada respeitando a simetria facial e realçando sua expressão natural.",
    featuredImage: designNormal,
  },
  {
    title: "Micropigmentação de Sobrancelhas",
    desc: "Técnica fio a fio hiper-realista para preenchimento de falhas e reconstrução de sobrancelhas.",
    featuredImage: microbladingFioAFio,
  },
  {
    title: "Micropigmentação Labial",
    desc: "Neutralização de tom, revitalização e efeito lip tint para lábios impecáveis.",
    featuredImage: micropigmentacaoLabialDepois,
  },
  {
    title: "Microagulhamento",
    desc: "Estímulo natural de colágeno para renovação da textura da pele.",
    video: microagulhamentoVideo,
  },
  {
    title: "Radiofrequência Facial",
    desc: "Tratamento não invasivo que firma e revitaliza a pele em profundidade.",
    video: radiofrequenciaVideo,
  },
  {
    title: "Dermaplaning",
    desc: "Esfoliação física que remove células mortas, deixando a pele lisa e luminosa.",
    video: dermaplaningVideo,
  },
];

// Dados reais fornecidos pela Jana Jordão.
type ProcedimentoPrincipal = {
  nome: string;
  midia?: MidiaItem; // undefined = ainda sem foto/vídeo (mostra a logo como placeholder)
  oQueE: string;
  tempoAplicacao: string;
  formaAplicacao: string;
  diferenciaisLabel?: string; // default "Diferenciais"
  diferenciais: string;
};

const procedimentosPrincipais: ProcedimentoPrincipal[] = [
  {
    nome: "Microagulhamento",
    midia: { type: "video", src: microagulhamentoVideo },
    oQueE: "Procedimento estético feito com pequenas agulhas que realizam microperfurações na pele. Estimula a produção natural de colágeno e elastina, sendo muito utilizado para rejuvenescer, suavizar cicatrizes de acne, atenuar estrias e melhorar linhas de expressão.",
    tempoAplicacao: "1h",
    formaAplicacao: "Higienização, esfoliação leve e aplicação do microagulhamento",
    diferenciaisLabel: "Diferencial",
    diferenciais: "Paciente leva para uso em home care um sérum personalizado de acordo com a queixa apresentada",
  },
  {
    nome: "Radiofrequência Facial",
    midia: { type: "video", src: radiofrequenciaVideo },
    oQueE: "Tratamento estético não invasivo que utiliza ondas eletromagnéticas para aquecer as camadas mais profundas da pele. Esse calor induz a formação de novas fibras de colágeno e elastina, melhorando a firmeza, reduzindo linhas de expressão, suavizando cicatrizes de acne e diminuindo a papada.",
    tempoAplicacao: "40 min",
    formaAplicacao: "Higienização, esfoliação, aplicação da radiofrequência e finalização com fototerapia, que estimula ainda mais a produção de colágeno",
    diferenciais: "Aplicação feita 1 vez por semana ou a cada 15 dias",
  },
  {
    nome: "Limpeza de Pele",
    midia: { type: "image", src: limpezaDePele },
    oQueE: "A limpeza de pele é um procedimento estético que promove a higienização profunda da pele, removendo impurezas, excesso de oleosidade, células mortas e comedões (cravos). Além de deixar a pele mais limpa, macia e uniforme, prepara o tecido para receber melhor os cuidados e ativos utilizados na rotina de skincare.",
    tempoAplicacao: "1h 30min",
    formaAplicacao: "Higienização, esfoliação, emoliência, extração, hidratação e finalização com fototerapia",
    diferenciaisLabel: "Durabilidade",
    diferenciais: "30 dias",
  },
  {
    nome: "Micropigmentação Labial",
    midia: { type: "image", src: micropigmentacaoLabialDepois },
    oQueE: "Técnica refinada que revitaliza, uniformiza o contorno e neutraliza o tom dos lábios, proporcionando aspecto saudável, hidratação visual e efeito lip tint natural de longa duração.",
    tempoAplicacao: "1h 30min",
    formaAplicacao: "Esfoliação, hidratação, anestesia tópica e implantação do pigmento",
    diferenciaisLabel: "Durabilidade",
    diferenciais: "1 a 2 anos",
  },
  {
    nome: "Dermaplaning",
    midia: { type: "video", src: dermaplaningVideo },
    oQueE: "Procedimento estético que utiliza uma lâmina específica para realizar uma esfoliação superficial da pele, removendo células mortas e a fina camada de pelos (vellus). O resultado é uma pele mais lisa, macia, uniforme e luminosa, além de favorecer a aplicação e absorção dos produtos utilizados em casa nos cuidados faciais.",
    tempoAplicacao: "1h",
    formaAplicacao: "Higienização, esfoliação, aplicação do Dermaplaning e finalização com hidratação",
    diferenciaisLabel: "Frequência",
    diferenciais: "Feito de 15 em 15 dias, ou quando a cliente achar necessário",
  },
];

// Pares de fotos exibidos lado a lado na galeria de resultados.
type Resultado = {
  titulo: string;
  fotos: [{ src: string; label: string }, { src: string; label: string }];
};

const resultados: Resultado[] = [
  {
    titulo: "Design de Sobrancelhas",
    fotos: [
      { src: designSobrancelhasAntes, label: "Antes" },
      { src: designSobrancelhasDepois, label: "Depois" },
    ],
  },
  {
    titulo: "Micropigmentação Labial",
    fotos: [
      // Ordem cronológica: logo após a aplicação → já cicatrizado
      { src: labialDepois02, label: "Logo após" },
      { src: labialAntes02, label: "Cicatrizado" },
    ],
  },
  {
    titulo: "Design com Henna",
    fotos: [
      { src: hennaAplicacao, label: "Aplicação" },
      { src: hennaFinal, label: "Resultado" },
    ],
  },
  {
    titulo: "Limpeza de Pele",
    fotos: [
      { src: limpezaResultado01, label: "Resultado" },
      { src: limpezaResultado02, label: "Resultado" },
    ],
  },
];

const stats = [
  { value: "98%", label: "Clientes Satisfeitas" },
  { value: "5+", label: "Anos de Experiência e Inovação" },
  { value: "10k+", label: "Procedimentos Realizados com Segurança" },
];

const highlights = [
  {
    icon: FlaskConical,
    title: "Ciência & Tecnologia",
    text: "Protocolos validados cientificamente e aparelhos de última geração.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança em Primeiro Lugar",
    text: "Todos os procedimentos são realizados sob rígidos padrões biológicos.",
  },
  {
    icon: Heart,
    title: "Atendimento Exclusivo",
    text: "Um ambiente acolhedor projetado para o seu conforto absoluto.",
  },
];

const testimonials = [
  {
    name: "Samanta Lima",
    text: "Saudades desse atendimento maravilhoso! Não sei se lembra de mim, faz uns 4 anos que saí de Capão, e é uma das coisas que mais sinto falta daí e de uma profissional como tu! Adorava muito ser atendida por ti, além de sair belíssima com a sobrancelha TOP 😍 ainda saía muito leve, papo bom e uma energia incrível era garantido sempre que ia aí. PARABÉNS pelo teu trabalho e que Deus continue te abençoando cada vez mais. 🙏 Muito sucesso!",
  },
  {
    name: "Giancarla Fidelis Lopes",
    text: "Eu concordo plenamente com essas postagens... tu é fera. Alto astral, energia contagiante, luz que ilumina nossas vidas. Que tenhas sempre esse coração bondoso... sucesso negaaaaa!!!!",
  },
  {
    name: "Juliana Soares",
    text: "Eu sinto tanta saudades de fazer sobrancelha contigo, a melhor que há! Energia muito boa e papo muito bom também, aqui em Portugal não achei ninguém que faça tão boa quanto você! ❤️",
  },
];

// Link base do WhatsApp (número centralizado em src/lib/config.ts via .env)
const WHATSAPP_LINK = buildWhatsAppLink();

// ---------- COMPONENTES ----------

function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-4 md:py-6 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center shrink-0" aria-label="Jana Jordão — início">
          <img
            src={logoLight}
            alt="Jana Jordão — Esteticista e Cosmetóloga"
            width={720}
            height={415}
            className="h-14 md:h-16 lg:h-[72px] w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.18em] text-foreground/80">
          <a href="#sobre" className="hover:text-primary transition">Sobre</a>
          <a href="#servicos" className="hover:text-primary transition">Serviços</a>
          <a href="#resultados" className="hover:text-primary transition">Resultados</a>
          <a href="#contato" className="hover:text-primary transition">Contato</a>
        </nav>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[11px] md:text-[12px] uppercase tracking-[0.18em] md:tracking-[0.2em] border border-secondary/60 text-secondary px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-secondary hover:text-secondary-foreground transition"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="md:hidden">Agendar</span>
          <span className="hidden md:inline">Agendar Consulta</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <img
        src={hero}
        alt="Beleza natural"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <Nav />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-32 md:pt-40 pb-20 md:pb-24 min-h-[100svh] flex items-center">
        <div className="space-y-6 md:space-y-8 max-w-xl">
          <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white drop-shadow-lg">
            Ciência, Técnica e<br />
            <em className="text-primary">Sofisticação.</em>
          </h1>
          <p className="text-base md:text-lg max-w-md text-white/85 leading-relaxed">
            Tratamentos estéticos personalizados e de alta performance para realçar a sua melhor versão com naturalidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <WhatsAppButton
              mensagem="Olá! Gostaria de agendar uma avaliação na clínica Jana Jordão. 😊"
              variant="light"
              className="justify-center px-7 py-4"
            >
              Agendar pelo WhatsApp
            </WhatsAppButton>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-4 rounded-full text-sm uppercase tracking-[0.18em] hover:bg-white/10 transition"
            >
              Ver tratamentos
            </a>
          </div>
          <p className="text-xs text-white/60 tracking-wide">
            Tire suas dúvidas e agende direto com a Jana — resposta rápida.
          </p>
        </div>
      </div>
      <a
        href={buildWhatsAppLink("Olá! Vim pelo site e gostaria de tirar uma dúvida / agendar um horário. 😊")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Jana no WhatsApp"
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 hover:brightness-110 hover:scale-105 transition h-14 w-14 justify-center md:w-auto md:px-5"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-ping [animation-duration:2.5s] -z-10" />
        <MessageCircle className="h-7 w-7 md:h-5 md:w-5" />
        <span className="hidden md:inline text-[12px] uppercase tracking-[0.18em] font-medium">Fale conosco</span>
      </a>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-background py-12 md:py-16 border-y border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 grid grid-cols-3 gap-3 md:gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label} className="space-y-2">
            <p className="font-display text-3xl md:text-5xl text-secondary">{s.value}</p>
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.15em] text-muted-foreground leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-10 text-center space-y-8">
        <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— Sobre a clínica</span>
        <h2 className="font-display text-4xl md:text-5xl">Excelência e Cuidado Individualizado</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Fundada com o propósito de unir ciência, tecnologia de ponta e um olhar humanizado, a clínica de
          estética avançada Jana Jordão é um refúgio para quem busca cuidar de si com segurança e
          sofisticação. A filosofia é tratar cada paciente como único, preservando sua identidade e
          realçando seus traços naturais.
        </p>
        <div className="grid md:grid-cols-3 gap-8 pt-6">
          {highlights.map((h) => (
            <div key={h.title} className="space-y-3">
              <h.icon className="h-7 w-7 text-primary mx-auto" />
              <h3 className="font-display text-lg">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SobreProfissional() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative h-[440px] sm:h-[520px] lg:h-[600px] overflow-hidden rounded-tl-3xl rounded-tr-[160px] rounded-br-3xl rounded-bl-3xl bg-secondary/10">
          <img src={janaFoto} alt="Jana Jordão" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-secondary">— Sobre a profissional</span>
          <h2 className="font-display text-3xl md:text-4xl leading-snug">
            Uma década dedicada a fazer você se sentir <em className="text-primary">ainda mais bonita.</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Há mais de 10 anos na área da beleza, Jana Jordão construiu sua trajetória com uma missão simples:
            cuidar de cada cliente como se fosse única. Especialista em design de sobrancelhas, depilação e
            estética facial, ela une técnica apurada e sensibilidade para entregar resultados naturais, sem
            abrir mão do conforto e do acolhimento em cada atendimento.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mais do que um procedimento, cada visita ao espaço da Jana é pensada para ser um momento de
            cuidado — atenção aos detalhes, escuta ativa e o compromisso de valorizar a sua beleza do seu jeito.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: Servico }) {
  return (
    <a
      href={buildWhatsAppLink(`Olá! Tenho interesse em ${s.title} e gostaria de tirar algumas dúvidas. 😊`)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${s.title} — tirar dúvidas no WhatsApp`}
      className="group relative block h-[250px] sm:h-[320px] md:h-[360px] overflow-hidden rounded-xl md:rounded-2xl"
    >
      {/* barra de destaque no topo do card */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-secondary z-10" />

      {s.video ? (
        <video
          src={s.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={s.featuredImage}
          alt={s.title}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <div className="h-px w-8 bg-secondary mb-2 md:mb-3" />
        <h3 className="font-display text-base md:text-lg leading-tight text-white">{s.title}</h3>
        <p className="hidden sm:block text-sm text-white/75 mt-1 line-clamp-3">{s.desc}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-secondary group-hover:text-white transition">
          <MessageCircle className="h-3 w-3" /> Saiba mais
        </span>
      </div>
    </a>
  );
}

function Services() {
  return (
    <section id="servicos" className="bg-background py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
        <h2 className="font-display text-[88px] sm:text-[140px] md:text-[220px] leading-none text-foreground/5 select-none whitespace-nowrap" aria-hidden="true">
          tratamentos
        </h2>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— O que fazemos</span>
          <h2 className="font-display text-4xl md:text-5xl">Procedimentos</h2>
          <div className="mx-auto h-px w-24 bg-secondary/50" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
        <div className="mt-10 md:mt-14 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Não sabe qual tratamento é ideal para você? A Jana te orienta.
          </p>
          <WhatsAppButton
            mensagem="Olá! Gostaria de uma orientação sobre qual tratamento é ideal para mim. 😊"
            variant="light"
            className="justify-center w-full sm:w-auto px-8 py-4"
          >
            Tirar dúvidas no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function Resultados() {
  return (
    <section id="resultados" className="bg-background py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— Antes e depois</span>
          <h2 className="font-display text-4xl md:text-5xl">Resultados reais</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Clientes reais atendidas pela Jana. Resultados naturais, respeitando a beleza de cada uma.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {resultados.map((r) => (
            <figure key={r.titulo} className="bg-foreground/5 border border-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-border">
                {r.fotos.map((f, idx) => (
                  <div key={idx} className="relative aspect-[3/4] overflow-hidden bg-black/40">
                    <img
                      src={f.src}
                      alt={`${r.titulo} — ${f.label}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 md:px-5 py-4">
                <span className="font-display text-lg md:text-xl">{r.titulo}</span>
                <a
                  href={buildWhatsAppLink(`Olá! Vi os resultados de ${r.titulo} no site e gostaria de agendar. 😊`)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-secondary hover:text-white transition"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Quero esse resultado
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 md:mt-14 text-center">
          <WhatsAppButton
            mensagem="Olá! Vi os resultados no site e gostaria de agendar uma avaliação. 😊"
            variant="light"
            className="justify-center w-full sm:w-auto px-8 py-4"
          >
            Agendar minha avaliação
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function ProcedimentosPrincipais() {
  return (
    <section id="procedimentos-principais" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— Ficha técnica</span>
          <h2 className="font-display text-4xl md:text-5xl">Procedimentos principais</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Veja os detalhes, forma de aplicação e diferenciais dos principais tratamentos da Jana Jordão.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {procedimentosPrincipais.map((p) => (
            <div key={p.nome} className="flex flex-col bg-foreground/5 border border-border rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3] sm:aspect-video bg-black/40 flex items-center justify-center">
                {p.midia?.type === "video" && (
                  <video src={p.midia.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                )}
                {p.midia?.type === "image" && (
                  <img src={p.midia.src} alt={p.nome} loading="lazy" className="w-full h-full object-cover" />
                )}
                {!p.midia && (
                  // Placeholder elegante até a foto/vídeo definitivo chegar
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-background to-secondary/5 flex items-center justify-center">
                    <img src={logoLight} alt="Jana Jordão" className="w-1/2 max-w-[260px] h-auto opacity-90" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5 md:p-6 space-y-5">
                <h3 className="font-display text-2xl">{p.nome}</h3>
                {p.oQueE ? (
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-secondary">O que é?</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.oQueE}</p>
                  </div>
                ) : (
                  <p className="text-xs uppercase tracking-[0.15em] text-secondary/60 italic">
                    Descrição "O que é" pendente
                  </p>
                )}
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-secondary">Tempo de aplicação</p>
                  <p className="text-sm text-muted-foreground">{p.tempoAplicacao}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-secondary">Forma de aplicação</p>
                  <p className="text-sm text-muted-foreground">{p.formaAplicacao}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-secondary">{p.diferenciaisLabel || "Diferenciais"}</p>
                  <p className="text-sm text-muted-foreground">{p.diferenciais}</p>
                </div>
                <div className="mt-auto pt-2">
                  <WhatsAppButton
                    mensagem={`Olá! Tenho interesse em ${p.nome} e gostaria de tirar dúvidas / agendar. 😊`}
                    variant="light"
                    className="justify-center w-full px-6 py-3.5 text-xs"
                  >
                    Agendar pelo WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clinic() {
  return (
    <section id="clinica" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <span className="text-[11px] uppercase tracking-[0.4em] text-secondary">— O ambiente</span>
          <h2 className="font-display text-4xl md:text-5xl">
            Um espaço planejado<br />para o seu bem-estar.
          </h2>
          <div className="h-px w-16 bg-secondary" />
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Visite a clínica e desfrute de um atendimento VIP em um ambiente confortável, moderno e
            seguro.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><span className="text-secondary">—</span> Tecnologia médica de última geração</li>
            <li className="flex gap-3"><span className="text-secondary">—</span> Ambientes climatizados e privativos</li>
            <li className="flex gap-3"><span className="text-secondary">—</span> Equipe técnica em constante atualização</li>
          </ul>
        </div>
        <div>
          {/* TODO: troque pela foto real do interior/ambiente da clínica assim que disponível */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-sm overflow-hidden bg-gradient-to-br from-secondary/15 via-background to-secondary/5 border border-border flex items-center justify-center">
            <img src={logoLight} alt="Jana Jordão" className="w-3/5 max-w-[340px] h-auto object-contain opacity-90" />
          </div>
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
    <section className="bg-background text-foreground py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">— Depoimentos</span>
          <h2 className="font-display text-4xl md:text-5xl">O que dizem sobre a Jana</h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="grid md:grid-cols-3 gap-5 flex-1 min-w-0">
            {[0, 1, 2].map((offset) => {
              const t = testimonials[(i + offset) % testimonials.length];
              return (
                <div
                  key={offset}
                  className={`bg-foreground/5 border border-border text-foreground rounded-sm p-5 md:p-6 space-y-3 ${offset > 0 ? "hidden md:block" : ""}`}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-secondary">— {t.name}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition shrink-0"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        {/* Depoimentos reais de clientes da Jana */}
      </div>
    </section>
  );
}

function Contact() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"idle" | "enviando" | "enviado" | "erro">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Payload estruturado enviado para a automação (n8n/Make/Typebot).
    const payload = {
      nome,
      sobrenome,
      email,
      telefone,
      procedimento,
      mensagem,
      origem: "site-jana-jordao",
      enviadoEm: new Date().toISOString(),
    };

    // Mensagem legível para o WhatsApp (fallback / continuidade do atendimento).
    const partes = [
      `Olá! Meu nome é ${nome} ${sobrenome}.`.trim(),
      procedimento && `Tenho interesse em: ${procedimento}.`,
      mensagem && `Mensagem: ${mensagem}`,
      email && `E-mail: ${email}`,
      telefone && `Telefone: ${telefone}`,
    ].filter(Boolean);
    const textoWhats = partes.join("\n");

    // VIA 2 — dispara o webhook (POST) para o endpoint de automação.
    if (WEBHOOK_AGENDAMENTO) {
      try {
        setStatus("enviando");
        const res = await fetch(WEBHOOK_AGENDAMENTO, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("enviado");
      } catch (err) {
        console.error("Falha ao enviar para o webhook de agendamento:", err);
        setStatus("erro");
      }
    }

    // Abre o WhatsApp para o cliente concluir o agendamento com o Chatbot.
    window.open(buildWhatsAppLink(textoWhats), "_blank");
  };

  return (
    <section id="contato" className="bg-background py-20 md:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid lg:grid-cols-5 gap-0 items-stretch">
        <form
          className="lg:col-span-2 bg-secondary/10 text-primary-foreground p-6 sm:p-10 space-y-5 rounded-sm relative z-10 lg:translate-x-8"
          onSubmit={handleSubmit}
        >
          <h3 className="font-display text-3xl">Entre em contato</h3>
          <p className="text-sm text-primary-foreground/70 -mt-2">
            Preencha e continue o atendimento direto no WhatsApp.
          </p>
          <div className="h-px w-12 bg-primary-foreground/40" />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground"
            />
            <input
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              className="bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground"
            />
          </div>
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground"
          />
          <input
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground"
          />
          <select
            value={procedimento}
            onChange={(e) => setProcedimento(e.target.value)}
            className={`w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm focus:outline-none focus:border-primary-foreground [color-scheme:dark] ${
              procedimento ? "text-primary-foreground" : "text-primary-foreground/60"
            }`}
          >
            <option className="text-foreground" value="">Procedimento de interesse</option>
            {services.map((s) => (
              <option key={s.title} className="text-foreground" value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Mensagem"
            rows={3}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full bg-transparent border-b border-primary-foreground/30 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground resize-none"
          />
          <button
            type="submit"
            disabled={status === "enviando"}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-medium py-4 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg shadow-black/30 hover:bg-[#E8D8C8] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <MessageCircle className="h-4 w-4" />
            {status === "enviando" ? "Enviando..." : "Enviar e agendar no WhatsApp"}
          </button>
          {status === "enviado" && (
            <p className="text-xs text-center text-primary-foreground/80">
              Recebemos seus dados! Continue o agendamento pelo WhatsApp. 💬
            </p>
          )}
          {status === "erro" && (
            <p className="text-xs text-center text-primary-foreground/80">
              Não foi possível enviar automaticamente, mas abrimos o WhatsApp
              para você concluir. 💬
            </p>
          )}
        </form>
        <div className="hidden sm:block lg:col-span-3 relative">
          <img
            src={clinic}
            alt="Ambiente"
            loading="lazy"
            className="w-full h-full min-h-[320px] lg:min-h-[420px] object-cover rounded-sm"
          />
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-3xl md:text-4xl">Veja como chegar até nós</h2>
        </div>
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7] rounded-sm overflow-hidden">
          <iframe
            title="Localização"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.419974287581!2d-50.02724108918097!3d-29.76549547496128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95187886a73cbadb%3A0x3721aa56a8f58984!2sHospital%20Santa%20Luzia!5e0!3m2!1spt-BR!2sbr!4v1784666397885!5m2!1spt-BR!2sbr"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-14 pb-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div className="space-y-3">
          <img src={logoLight} alt="Jana Jordão — Esteticista e Cosmetóloga" className="h-16 w-auto" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            Estética avançada com ciência, técnica e sofisticação.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Navegação</h4>
          <a href="#sobre" className="block text-muted-foreground hover:text-foreground">Sobre</a>
          <a href="#servicos" className="block text-muted-foreground hover:text-foreground">Serviços</a>
          <a href="#resultados" className="block text-muted-foreground hover:text-foreground">Resultados</a>
          <a href="#contato" className="block text-muted-foreground hover:text-foreground">Contato</a>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Contato</h4>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" /> +55 51 8313-9439
          </a>
          {/* TODO: troque pelo endereço real da clínica */}
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Endereço a definir
          </p>
          <a
            href="https://www.instagram.com/janajordao_g/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-3.5 w-3.5" /> @janajordao_g
          </a>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.25em] text-sage mb-3">Horário</h4>
          <p className="text-muted-foreground">Segunda a Sexta · 9h às 20h</p>
          <p className="text-muted-foreground">Sábado · 9h às 14h</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Jana Jordão. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <Stats />
      <SobreProfissional />
      <Services />
      <Resultados />
      <ProcedimentosPrincipais />
      <Sobre />
      <Clinic />
      <Testimonials />
      <Contact />
      <MapSection />
      <Footer />
    </main>
  );
}
