import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChartNoAxesCombined, Check, Clock3, HeartHandshake, LockKeyhole, Megaphone, ShieldCheck, Sparkles, Target, TrendingUp, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationWizard } from "@/components/application-wizard";
import heroPhoto from "@/assets/work-planner-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Work Planner | Tu próximo desafío en Ventas y Marketing" },
    { name: "description", content: "Da el siguiente paso en tu carrera. Comparte tu perfil con Work Planner, agencia de talento especializada en Ventas y Marketing." },
    { property: "og:title", content: "Work Planner | Tu próximo desafío profesional" },
    { property: "og:description", content: "Encuentra tu próximo desafío en Ventas o Marketing. Completa tu perfil en tres pasos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand() {
  return <a href="#" className="brand" aria-label="Work Planner, inicio">work<strong>planner</strong><span className="brand-dot" /></a>;
}

function Index() {
  function startApplication() { document.getElementById("postulacion")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); }
  return (
    <>
      <header className="site-header"><div className="container header-inner"><Brand /><div className="header-right"><span className="header-tagline">Conectamos talento con oportunidades.</span><Button variant="outline" size="default" onClick={startApplication}>Quiero postular <ArrowRight /></Button></div></div></header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-photo" src={heroPhoto} width={1920} height={1024} alt="Profesionales de Ventas y Marketing colaborando en una oficina luminosa" fetchPriority="high" />
          <div className="container hero-content"><div className="hero-copy"><div className="hero-eyebrow"><Sparkles /> TU TALENTO, NUEVAS POSIBILIDADES</div><h1 id="hero-title">Encuentra tu próximo<br className="hidden md:block" /> desafío en <span className="hero-highlight">Ventas</span><br className="hidden md:block" /> o <span className="hero-highlight">Marketing</span></h1><p className="hero-description">Tú tienes el talento. Nosotros, las conexiones.<br />Demos juntos el siguiente paso en tu carrera.</p><div className="hero-cta"><Button variant="recruitment" size="touch" onClick={startApplication}>Postular ahora <ArrowRight /></Button><span className="time-note"><Clock3 size={13} /> Solo unos minutos</span></div><div className="hero-checks"><span><Check /> Sin costo para ti</span><span><Check /> Proceso simple y cercano</span></div></div></div>
        </section>
        <div className="specialties"><div className="container specialties-inner"><span className="specialties-label">Especialistas en talento que impulsa negocios</span><span className="specialty-divider" /><span className="specialty"><TrendingUp /> Ventas & Comercial</span><span className="specialty"><Megaphone /> Marketing & Digital</span><span className="specialty"><ChartNoAxesCombined /> Desarrollo de negocios</span></div></div>
        <section className="application-section" id="postulacion" aria-labelledby="application-title"><div className="container application-layout"><div className="application-intro"><span className="eyebrow">TU SIGUIENTE PASO EMPIEZA AQUÍ</span><h2>Grandes oportunidades.<br />Personas como tú.</h2><p>Queremos conocer tu historia y ayudarte a encontrar un lugar donde tu talento haga la diferencia.</p><ul className="benefits"><li><span className="benefit-icon"><Target /></span><div><h4>Oportunidades que van contigo</h4><p>Buscamos el match entre tu perfil, tus metas y el próximo desafío.</p></div></li><li><span className="benefit-icon"><HeartHandshake /></span><div><h4>Personas, no solo currículums</h4><p>Te acompañamos con un trato cercano en cada etapa del proceso.</p></div></li><li><span className="benefit-icon"><ShieldCheck /></span><div><h4>Tu información, en buenas manos</h4><p>El cuidado de tus datos es parte de nuestro compromiso contigo.</p></div></li></ul><div className="intro-note"><UsersRound /> Tu próximo equipo podría estar buscándote.</div></div><ApplicationWizard /></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><Brand /><div className="footer-caption">Talento que conecta. Carreras que crecen.</div></div><div className="footer-right"><span><LockKeyhole size={12} /> Un proceso pensado para ti</span><span>© 2026 Work Planner</span></div></div></footer>
    </>
  );
}
