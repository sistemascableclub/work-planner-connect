import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChartNoAxesCombined, Check, Clock3, HeartHandshake, LockKeyhole, Mail, MapPin, Megaphone, ShieldCheck, Sparkles, Target, TrendingUp, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationWizard } from "@/components/application-wizard";
import heroPhoto from "@/assets/work-planner-hero.jpg";
import logoAsset from "@/assets/work-planner-logo.png.asset.json";
import logoWhiteAsset from "@/assets/work-planner-logo-white.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Work Planner S.A.C. | Talento y BPO en Arequipa" },
    { name: "description", content: "Work Planner S.A.C.: hub estratégico de BPO y gestión de talento humano en Arequipa, Perú. Conecta tu talento con oportunidades en Ventas y Marketing." },
    { property: "og:title", content: "Work Planner | Conecta tu talento con grandes oportunidades" },
    { property: "og:description", content: "Conoce Work Planner S.A.C., nuestro equipo y las oportunidades para crecer en Ventas y Marketing." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand({ tone }: { tone?: "footer" }) {
  const isFooter = tone === "footer";
  return <a href="#inicio" className="brand brand-image" aria-label="Work Planner, inicio"><img src={(isFooter ? logoWhiteAsset : logoAsset).url} width={179} height={202} alt="Work Planner" /></a>;
}

function Index() {
  function startApplication() { document.getElementById("postulacion")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); }
  return (
    <>
      <header className="site-header"><div className="container header-inner"><Brand /><nav className="header-right" aria-label="Navegación principal"><div className="nav-links"><a href="#inicio">Inicio</a><a href="#nosotros">Nosotros</a></div><Button variant="sunshine" size="touch" onClick={startApplication}>Trabaja con Nosotros <ArrowRight /></Button></nav></div></header>
      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-photo" src={heroPhoto} width={1920} height={1024} alt="Profesionales de Ventas y Marketing colaborando en una oficina luminosa" fetchPriority="high" />
          <div className="container hero-content"><div className="hero-copy"><div className="hero-eyebrow"><Sparkles /> WORK PLANNER · TALENTO QUE IMPULSA</div><h1 id="hero-title">Conecta tu talento con <span className="hero-highlight">grandes oportunidades</span></h1><p className="hero-description">Somos el motor humano detrás de grandes proyectos. Encuentra tu próximo desafío en Ventas o Marketing con nosotros.</p><div className="hero-cta"><Button variant="sunshine" size="touch" onClick={startApplication}>Postular ahora <ArrowRight /></Button><span className="time-note"><Clock3 size={13} /> Solo unos minutos</span></div><div className="hero-checks"><span><Check /> Sin costo para ti</span><span><Check /> Proceso simple y cercano</span></div></div></div>
        </section>
        <div className="specialties"><div className="container specialties-inner"><span className="specialties-label">Especialistas en talento que impulsa negocios</span><span className="specialty-divider" /><span className="specialty"><TrendingUp /> Ventas & Comercial</span><span className="specialty"><Megaphone /> Marketing & Digital</span><span className="specialty"><ChartNoAxesCombined /> Desarrollo de negocios</span></div></div>
        <section className="about-section" id="nosotros" aria-labelledby="about-title"><div className="container about-layout"><div className="about-copy"><span className="eyebrow">NOSOTROS · WORK PLANNER S.A.C.</span><h2 id="about-title">Detrás de cada gran proyecto,<br />hay un gran equipo.</h2><p>Somos un hub estratégico de BPO y gestión de talento humano. Desde Arequipa, conectamos personas y empresas para impulsar proyectos de Ventas y Marketing.</p><p>Integramos la gestión de procesos de negocio con el desarrollo de las personas. Porque el crecimiento de una empresa empieza con el talento de su equipo.</p><div className="about-signature"><span className="benefit-icon"><UsersRound /></span><span>El talento es nuestro punto de partida.<br /><strong>Las personas, nuestra prioridad.</strong></span></div></div><div className="corporate-benefits">{[{ icon: TrendingUp, title: "Línea de Carrera", text: "Un camino para desarrollar tus habilidades y crecer profesionalmente junto a nuestro equipo." }, { icon: ShieldCheck, title: "Estabilidad en Planilla", text: "La tranquilidad de construir tu futuro con respaldo y un vínculo laboral formal." }, { icon: HeartHandshake, title: "Excelente Clima Laboral", text: "Un entorno cercano y colaborativo donde tus ideas y tu aporte cuentan." }].map(({ icon: Icon, title, text }, index) => <article className="corporate-benefit" key={title}><span className="corporate-icon"><Icon size={23} /></span><div><span className="benefit-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
        <section className="application-section" id="postulacion" aria-labelledby="application-title"><div className="container application-layout"><div className="application-intro"><span className="eyebrow">TU SIGUIENTE PASO EMPIEZA AQUÍ</span><h2 id="application-title">¡Únete a nuestro equipo!</h2><p>Queremos conocer tu historia y ayudarte a encontrar un lugar donde tu talento haga la diferencia.</p><ul className="benefits"><li><span className="benefit-icon"><Target /></span><div><h4>Oportunidades que van contigo</h4><p>Buscamos el match entre tu perfil, tus metas y el próximo desafío.</p></div></li><li><span className="benefit-icon"><HeartHandshake /></span><div><h4>Personas, no solo currículums</h4><p>Te acompañamos con un trato cercano en cada etapa del proceso.</p></div></li><li><span className="benefit-icon"><ShieldCheck /></span><div><h4>Tu información, en buenas manos</h4><p>El cuidado de tus datos es parte de nuestro compromiso contigo.</p></div></li></ul><div className="intro-note"><UsersRound /> Tu próximo equipo podría estar buscándote.</div></div><ApplicationWizard /></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><Brand tone="footer" /><div className="footer-caption">Talento que conecta. Carreras que crecen.</div></div><div className="footer-contact"><span><MapPin size={15} /> Arequipa, Perú</span><span><Mail size={15} /> Correo de contacto por confirmar</span></div></div><div className="container footer-bottom"><span>© 2026 Work Planner S.A.C.</span><span><LockKeyhole size={12} /> Un proceso pensado para ti</span></div></footer>
    </>
  );
}
