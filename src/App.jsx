import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  CircleNotch,
  Funnel,
  List,
  MagnifyingGlass,
  Moon,
  Sparkle,
  Strategy,
  Target,
  X,
} from "@phosphor-icons/react";
import "./styles.css";

const navItems = [
  ["Diagnóstico", "diagnostico"],
  ["Benchmark", "benchmark"],
  ["Audiencia", "audiencia"],
  ["Sistema", "sistema"],
  ["Apuestas", "apuestas"],
  ["Roadmap", "roadmap"],
  ["Medición", "medicion"],
  ["Uso IA", "ia"],
  ["Valor IA", "ia-valor"],
  ["Fuentes", "fuentes"],
];

const diagnosticSignals = [
  ["+25 años", "Experiencia consultiva que permite hablar con decisores enterprise."],
  ["+100 empresas", "Prueba de confianza en clientes grandes y sectores exigentes."],
  ["+1000 proyectos", "Capacidad de ejecución reciente, no solo trayectoria histórica."],
  ["Neo AI Lab", "Activo experiencial para pasar de discurso de IA a demostración."],
];

const diagnosticRows = [
  {
    area: "Mensaje",
    works: "IA, data y transformación con foco en resultados.",
    gap: "La promesa aún puede aterrizarse mejor por rol decisor.",
    move: "Traducir el mensaje para CEO, CIO/CDO, CMO y líderes de transformación.",
  },
  {
    area: "Credenciales",
    works: "+25 años, +100 empresas, +1000 proyectos y clientes enterprise.",
    gap: "La prueba no siempre aparece conectada a outcomes por industria.",
    move: "Convertir credenciales en mini casos y argumentos por vertical.",
  },
  {
    area: "Servicios",
    works: "Cuatro líneas claras: adopción AI, governance, growth y staffing AI.",
    gap: "Un comprador nuevo puede no saber por dónde empezar.",
    move: "Crear puertas de entrada como AI Opportunity Scan y briefings del Lab.",
  },
  {
    area: "LinkedIn",
    works: "Audiencia, cultura, liderazgo y reputación visibles.",
    gap: "Faltan más CTAs consultivos, POVs ejecutivos y señales de caso.",
    move: "Rebalancear hacia ABM, casos, invitaciones y seguimiento comercial.",
  },
  {
    area: "Neo AI Lab",
    works: "Espacio tangible para demostrar IA aplicada en un contexto de confianza.",
    gap: "Debe mostrarse como motor de demanda, no solo como iniciativa institucional.",
    move: "Activarlo con calendario, formatos cerrados y follow up en 24 a 48 horas.",
  },
];

const benchmarkPatterns = [
  {
    ref: "Accenture",
    pattern: "Research, cifras ejecutivas, casos y data readiness.",
    adaptation: "Checklist AI ready para Perú y casos por banca, retail y seguros.",
    lesson: "Autoridad empaquetada como evidencia descargable.",
  },
  {
    ref: "BCG",
    pattern: "IA ligada a funciones core, procesos y adopción.",
    adaptation: "Playbook de adopción agéntica para empresas peruanas.",
    lesson: "Pocas iniciativas de alto valor superan una lista larga de pilotos.",
  },
  {
    ref: "Deloitte",
    pattern: "Readiness, acceleration y advantage como escalera comercial.",
    adaptation: "Tres paquetes: diagnóstico, sprint y escalamiento con governance.",
    lesson: "El comprador necesita saber por dónde empezar según su madurez.",
  },
  {
    ref: "Globant",
    pattern: "AI Pods, agentes por función y demos concretas.",
    adaptation: "Demos del Neo AI Lab para marketing, CRM y operaciones.",
    lesson: "La IA se vuelve creíble cuando se puede ver en acción.",
  },
  {
    ref: "NTT DATA",
    pattern: "Escala enterprise con humanos en control y confianza.",
    adaptation: "Oferta de IA responsable para banca y seguros.",
    lesson: "La confianza es un argumento comercial, no solo técnico.",
  },
];

const audienceSegments = [
  {
    role: "CEO / Gerente General",
    pain: "Capturar valor de IA sin dispersar recursos ni multiplicar pilotos aislados.",
    message: "IA aplicada a crecimiento, eficiencia y mejores decisiones.",
    cta: "Briefing ejecutivo",
    priority: "Sponsor de visión y riesgo.",
  },
  {
    role: "CDO / Transformación",
    pain: "Pasar de pilotos aislados a adopción real en procesos y equipos.",
    message: "Roadmap de procesos, agentes y cambio operativo.",
    cta: "Workshop de priorización",
    priority: "Puerta de entrada para adopción.",
  },
  {
    role: "CIO / CDO Data",
    pain: "Escalar IA con datos confiables, gobierno, seguridad y compliance.",
    message: "Governance, arquitectura y modelos listos para producción.",
    cta: "Diagnóstico AI ready",
    priority: "Validador de factibilidad y riesgo.",
  },
  {
    role: "CMO / Growth / CX",
    pain: "Crecer con eficiencia, personalización y mejor conversión comercial.",
    message: "Revenue & Growth AI para contenido, CRM, analítica y conversión.",
    cta: "Growth AI Assessment",
    priority: "Caso cercano al objetivo de marketing.",
  },
];

const agentNodes = [
  {
    id: "research",
    title: "Research",
    icon: MagnifyingGlass,
    color: "#0f9b5f",
    summary: "Cuentas, decisores, industrias y triggers.",
    detail: "Ordena fuentes públicas y señales comerciales para separar evidencia de inferencia antes de activar una cuenta.",
  },
  {
    id: "content",
    title: "Contenido",
    icon: Strategy,
    color: "#2b5bfc",
    summary: "POVs, briefs, one pagers e invitaciones.",
    detail: "Convierte el diagnóstico en mensajes por rol, cuidando que cada pieza tenga dolor, prueba y siguiente acción.",
  },
  {
    id: "activation",
    title: "Activación",
    icon: Target,
    color: "#c4a25a",
    summary: "LinkedIn, briefings y follow ups.",
    detail: "Prioriza cuentas con señales reales y mantiene seguimiento comercial en 24 a 48 horas.",
  },
  {
    id: "measurement",
    title: "Medición",
    icon: ChartLineUp,
    color: "#1ea6c8",
    summary: "UTMs, CRM, dashboard y aprendizaje.",
    detail: "Traduce interacciones en lectura ejecutiva: qué se escala, qué se pausa y qué oportunidad se abre.",
  },
];

const bets = [
  {
    title: "ABM ligero en LinkedIn",
    score: 92,
    proof: "Convierte LinkedIn en inteligencia comercial, no solo en vitrina de reputación.",
    cta: "Ver ejecución",
    detail: "Crear una lista de 100 a 150 cuentas enterprise, mapear tres a cinco decisores por cuenta y registrar señales en un ABM sheet. Cada pieza debe cerrar con una pregunta o CTA consultivo.",
    flow: ["Cuentas", "Decisores", "Dolor", "Pieza", "Follow up"],
  },
  {
    title: "Neo AI Lab briefings",
    score: 88,
    proof: "Transforma el Lab en experiencia ejecutiva y motor de demanda.",
    cta: "Ver formato",
    detail: "Briefings cerrados de 75 a 90 minutos para grupos pequeños de decisores. Incluyen POV por vertical, demo corta, discusión guiada y mapeo de oportunidades por cuenta.",
    flow: ["Invitación", "POV", "Demo", "Mapa", "SLA 24h"],
  },
  {
    title: "AI Opportunity Scan",
    score: 82,
    proof: "Reduce fricción porque ofrece una primera reunión con resultado claro.",
    cta: "Ver matriz",
    detail: "Sesión de 60 a 90 minutos con matriz preliminar de oportunidades, impacto esperado, datos necesarios, riesgos y siguiente paso. Crea valor antes de vender y califica mejor la cuenta.",
    flow: ["Research", "Sesión", "Matriz", "Piloto", "Nurturing"],
  },
];

const roadmap = [
  ["Días 1 a 30", "Instalar sistema", "ICP, lista de 100 cuentas, 300 contactos, landing, primer briefing y dashboard base.", "La semana cuatro debe cerrar con una decisión: qué escalar, ajustar o pausar."],
  ["Días 31 a 60", "Escalar lo que responde", "Nueva vertical, 8 a 10 piezas basadas en aprendizaje, pauta sobre ganadoras y caso anonimizado.", "La web evidencia aprendizaje comercial, no solo ejecución de calendario."],
  ["Días 61 a 90", "Convertir y decidir", "Evento premium, campaña por vertical, cuentas calientes, playbook comercial y reporte de continuidad.", "El trimestre termina conectando marketing con oportunidades y pipeline."],
];

const funnelStages = [
  ["Cuentas objetivo", "150 a 200", "Existe foco y criterio de priorización.", "#12884e"],
  ["Decisores mapeados", "500 a 700", "La comunicación cubre al buying committee.", "#2b5bfc"],
  ["Contactos activados", "250 a 350", "Hay cadencia e interacciones medibles.", "#1ea6c8"],
  ["Respuestas relevantes", "30 a 45", "Hay señales que justifican follow up.", "#c4a25a"],
  ["Reuniones exploratorias", "18 a 25", "El contenido está creando conversaciones.", "#e8752d"],
  ["Oportunidades", "4 a 6", "El marketing empieza a influir pipeline.", "#0e6b3a"],
];

const budget = [
  ["Pauta LinkedIn", 900, "#2b5bfc", "Amplificar piezas ganadoras e invitaciones."],
  ["Herramientas", 600, "#0f9b5f", "Formularios, ABM sheet y utilidades IA."],
  ["Producción", 700, "#e8752d", "Edición, subtítulos y piezas premium."],
  ["Evento cerrado", 500, "#1ea6c8", "Coffee, materiales y soporte logístico."],
  ["Contingencia", 300, "#b14adf", "Pruebas rápidas y ajustes."],
];

const team = [
  ["Research y ABM", "Cuentas, decisores, triggers e investigación asistida por IA.", "Lista priorizada con razón de contacto."],
  ["Contenido y diseño", "Posts, one pagers, briefs y piezas por decisor.", "Piezas por rol decisor y vertical."],
  ["Growth operations", "UTMs, formularios, CRM, dashboard y seguimiento.", "Reporte de pipeline y alertas."],
];

const aiTraceability = [
  {
    component: "Orquestador agéntico",
    contribution: "Convirtió el brief en roadmap, fuentes, narrativa y presentación.",
    judgment: "No se aceptó una estructura genérica. Todo se ordenó contra entregables, tiempo disponible y capacidad real de ejecución.",
  },
  {
    component: "Diagnóstico digital",
    contribution: "Revisó web, LinkedIn público, noticias, credenciales y propuesta de servicios.",
    judgment: "Se separó lo verificable de lo inferido. La visibilidad pública no se trató como fotografía completa de NEO.",
  },
  {
    component: "Benchmark competitivo",
    contribution: "Comparó a NEO con referentes de consultoría IA, data y transformación.",
    judgment: "No se copiaron tácticas globales. Se tradujeron patrones a acciones posibles para 90 días y bajo presupuesto controlado.",
  },
  {
    component: "ICP y medición",
    contribution: "Estructuró buying committee, dolores, mensajes, KPIs y metas iniciales.",
    judgment: "Se evitó precisión falsa: las metas se plantean como hipótesis a recalibrar con CRM histórico.",
  },
  {
    component: "Visuales y artefactos",
    contribution: "Generó recursos para explicar sistema, roadmap, embudo y presupuesto.",
    judgment: "Los visuales se usan como apoyo explicativo, no como evidencia documental.",
  },
  {
    component: "Red team",
    contribution: "Criticó la propuesta contra foco, negocio, medición, IA aplicada y claridad ejecutiva.",
    judgment: "Ayudó a cortar alcance, reconocer riesgos y reforzar argumentos antes de presentar.",
  },
];

const aiValueArguments = [
  {
    title: "Research to insight",
    argument: "La IA permitió pasar de información dispersa a una lectura accionable. El punto crítico fue no confundir presencia pública con realidad interna; por eso el diagnóstico sostiene solo lo que puede respaldarse con fuentes y declara como supuesto lo que requiere validación con CRM, comercial o liderazgo.",
  },
  {
    title: "Benchmark competitivo",
    argument: "El valor no fue imitar a Accenture, BCG, Deloitte, Globant o NTT DATA. La IA ayudó a detectar patrones de categoría, como research, mensajes por rol, activos de demanda y diagnósticos de entrada; el criterio consistió en reducirlos a tácticas ejecutables por NEO en 90 días.",
  },
  {
    title: "ICP y medición",
    argument: "La IA propuso segmentos posibles, pero la decisión fue priorizar el buying committee con mayor probabilidad de activar oportunidades. Esto evita medir el plan solo por alcance o contenido publicado y lo lleva hacia conversaciones, leads calificados y pipeline influenciado.",
  },
  {
    title: "Content studio y ABM asistido",
    argument: "La IA es útil para versionar mensajes por rol, industria y momento comercial. Su riesgo natural es producir contenido correcto pero genérico; por eso el plan exige que cada pieza tenga dolor, prueba, pregunta consultiva y siguiente acción comercial.",
  },
];

const sourceLinks = [
  {
    title: "Drive",
    type: "Repositorio de fuentes",
    tag: "Recopilada",
    featured: true,
    href: "https://drive.google.com/drive/folders/1cPBwfAHTJ9x1oNKBK5uG6HqRjQ6MGIBC?usp=drive_link",
    note: "Contiene brief, documentos de soporte y trazabilidad usados para sustentar la entrega.",
  },
  {
    title: "Documento narrativo actualizado",
    type: "Base del pitch",
    tag: "Recopilada",
    href: "https://docs.google.com/document/d/1Jh66-SwpCpQ4CShAMLMeMRKpJ27C9SZG/edit?usp=drivesdk&ouid=103268548770989719301&rtpof=true&sd=true",
    note: "Documento maestro desde el que se adaptó la narrativa de la web.",
  },
  {
    title: "Web oficial de NEO",
    type: "Fuente oficial",
    tag: "Información pública",
    href: "https://neoconsulting.ai/",
    note: "Posicionamiento, credenciales, servicios y señales de propuesta de valor.",
  },
  {
    title: "LinkedIn público de NEO",
    type: "Canal público",
    tag: "Información pública",
    href: "https://pe.linkedin.com/company/neo-consulting",
    note: "Lectura de reputación, especialidades, audiencia visible y oportunidad de activación.",
  },
  {
    title: "Nota Gestión sobre NEO",
    type: "Prensa",
    tag: "Información pública",
    href: "https://gestion.pe/g-de-gestion/reportaje/neo-consulting-alista-primeras-adquisiciones-de-empresas-y-entra-a-francia-para-2027-noticia/",
    note: "Contexto de crecimiento, foco enterprise y Neo AI Lab como activo comercial.",
  },
  {
    title: "Perfil B Corp",
    type: "Reputación corporativa",
    tag: "Información pública",
    href: "https://www.bcorporation.net/en-us/find-a-b-corp/company/neo-consulting/",
    note: "Señal de confianza, gobierno y reputación para compradores enterprise.",
  },
];

const traceabilityRows = [
  ["Brief del caso", "Define entregables, restricciones, presupuesto, equipo y criterio de evaluación."],
  ["Research público", "Sustenta diagnóstico, lectura de brechas y oportunidades de posicionamiento."],
  ["Benchmark AI/data", "Traduce patrones de consultoras globales a tácticas posibles para NEO en 90 días."],
  ["ICP y decisores", "Conecta dolores, mensajes y CTAs con CEO, CDO, CIO y CMO."],
  ["Modelo de métricas", "Aterriza el plan en conversaciones, reuniones y oportunidades influenciadas."],
  ["Anexo IA", "Explica cómo la IA amplió investigación, síntesis, visualización y red team crítico."],
];

function useRevealOnScroll() {
  useEffect(() => {
    const items = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="site-nav" aria-label="Navegación principal">
      <button className="logo-button" onClick={() => scrollTo("top")} aria-label="Volver al inicio">
        <img src="/assets/brand/neo-logo-navy-on-white.png" alt="NEO Consulting" />
      </button>
      <nav className="nav-links" aria-label="Secciones">
        {navItems.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{label}</button>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-button" aria-label="Tema visual"><Moon size={18} weight="bold" /></button>
        <button className="primary-mini" onClick={() => scrollTo("ia")}>Ver IA <ArrowUpRight size={15} weight="bold" /></button>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionHeader({ eyebrow, title, copy, narrow = false }) {
  return (
    <div className={narrow ? "section-header narrow" : "section-header"} data-reveal>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <div className="hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Business case Consultor Jr Marketing AI</p>
          <h1>Plan de marketing AI para convertir credibilidad en oportunidades comerciales.</h1>
          <p>Una web narrativa para explicar, con estilo NEO, cómo un equipo pequeño puede usar IA para investigar mejor, activar decisores y medir pipeline en 90 días.</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#sistema">Ver sistema <ArrowUpRight size={20} weight="bold" /></a>
            <a className="text-link" href="#roadmap">Recorrer plan</a>
          </div>
        </div>
        <div className="hero-panel" data-reveal>
          <img className="brand-tile" src="/assets/brand/neo-logo-white-on-navy.png" alt="Logo NEO sobre navy" />
          <div className="signal-card">
            <span>Objetivo día 90</span>
            <strong>4 a 6 oportunidades</strong>
            <p>Abiertas o influenciadas por marketing.</p>
          </div>
          <div className="signal-row">
            <div><b>150 a 200</b><span>cuentas objetivo</span></div>
            <div><b>18 a 25</b><span>reuniones exploratorias</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Diagnosis() {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const selected = diagnosticRows[active];
  const goTo = (nextIndex) => {
    setActive((nextIndex + diagnosticRows.length) % diagnosticRows.length);
    setFlipped(false);
  };

  return (
    <section id="diagnostico" className="section diagnosis-section">
      <SectionHeader
        eyebrow="Diagnóstico"
        title="NEO no parte de cero: la brecha está en convertir autoridad en demanda."
        copy="El research muestra una consultora con credenciales enterprise, servicios AI aplicados a negocio y un activo diferencial en Neo AI Lab. La oportunidad no es inventar posicionamiento, sino ordenar la prueba para abrir conversaciones comerciales."
      />
      <div className="diagnosis-layout">
        <article className="diagnosis-narrative" data-reveal>
          <span>Lectura ejecutiva</span>
          <p>
            La web oficial ya comunica consultoría estratégica en inteligencia artificial y organiza la oferta en adopción AI, tecnología y governance de data, Revenue & Growth AI y Staffing + AI.
          </p>
          <p>
            Esa base es valiosa porque conecta IA con ventas, eficiencia, datos confiables, compliance, adopción y talento; es decir, habla de negocio y no solo de tecnología.
          </p>
          <p>
            La fricción aparece en la conversión: la prueba existe, pero debe empaquetarse por decisor, industria y problema para que un ejecutivo entienda qué conversación debe iniciar con NEO.
          </p>
        </article>
        <div className="diagnosis-signals" data-reveal>
          {diagnosticSignals.map(([metric, meaning], index) => (
            <article key={metric} style={{ "--delay": `${index * 80}ms` }}>
              <strong>{metric}</strong>
              <p>{meaning}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="diagnosis-carousel" data-reveal>
        <div className="interaction-hint diagnosis-hint" aria-hidden="true">
          <Sparkle size={16} weight="bold" />
          <span>Click para revelar</span>
        </div>
        <button className="carousel-arrow prev" onClick={() => goTo(active - 1)} aria-label="Anterior diagnóstico">
          <CaretLeft size={22} weight="bold" />
        </button>
        <button
          className={flipped ? "diagnosis-flip-card flipped" : "diagnosis-flip-card"}
          onClick={() => setFlipped((value) => !value)}
          aria-label={`Revelar diagnóstico de ${selected.area}`}
        >
          <span className="diagnosis-card-face front">
            <small>{String(active + 1).padStart(2, "0")} / {String(diagnosticRows.length).padStart(2, "0")}</small>
            <strong>{selected.area}</strong>
            <em>Click para ver lectura completa</em>
          </span>
          <span className="diagnosis-card-face back">
            <span className="diagnosis-flow-step works">
              <small>Funciona</small>
              <b>{selected.works}</b>
            </span>
            <span className="diagnosis-flow-step gap">
              <small>Falta</small>
              <b>{selected.gap}</b>
            </span>
            <span className="diagnosis-flow-step move">
              <small>Cambio inicial</small>
              <b>{selected.move}</b>
            </span>
          </span>
        </button>
        <button className="carousel-arrow next" onClick={() => goTo(active + 1)} aria-label="Siguiente diagnóstico">
          <CaretRight size={22} weight="bold" />
        </button>
        <div className="carousel-dots" aria-label="Seleccionar diagnóstico">
          {diagnosticRows.map((row, index) => (
            <button
              key={row.area}
              className={active === index ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`Ver ${row.area}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Benchmark() {
  const [active, setActive] = useState(0);
  const selected = benchmarkPatterns[active];

  return (
    <section id="benchmark" className="section benchmark-section">
      <SectionHeader
        eyebrow="Lectura competitiva"
        title="Los referentes convierten expertise en activos de demanda."
        copy="El benchmark no se usa para copiar a firmas globales, sino para identificar patrones transferibles a NEO en 90 días: research, playbooks, casos, diagnósticos, demos y CTAs por madurez."
      />
      <div className="benchmark-layout">
        <div className="benchmark-track" data-reveal>
          {benchmarkPatterns.map((item, index) => (
            <button
              key={item.ref}
              className={active === index ? "benchmark-node active" : "benchmark-node"}
              onClick={() => setActive(index)}
              style={{ "--delay": `${index * 70}ms` }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.ref}</strong>
            </button>
          ))}
        </div>
        <article className="benchmark-reader" data-reveal>
          <span>Patrón observable</span>
          <h3>{selected.ref}</h3>
          <p>{selected.pattern}</p>
          <div className="translation-card">
            <small>Adaptación para NEO</small>
            <strong>{selected.adaptation}</strong>
          </div>
          <p className="reader-note">{selected.lesson}</p>
        </article>
      </div>
    </section>
  );
}

function Audience() {
  const [active, setActive] = useState(0);
  const selected = audienceSegments[active];

  return (
    <section id="audiencia" className="section audience-section">
      <SectionHeader
        eyebrow="Audiencia prioritaria"
        title="La propuesta debe hablarle al buying committee, no a un buyer único."
        copy="En empresas grandes, la decisión de IA combina visión, datos, tecnología, negocio, adopción y riesgo. Por eso la web convierte cada rol en una ruta de conversación distinta."
      />
      <div className="audience-layout">
        <div className="audience-orbit" data-reveal aria-label="Buying committee interactivo">
          <div className="interaction-hint audience-hint" aria-hidden="true">
            <Sparkle size={16} weight="bold" />
            <span>Hover / click</span>
          </div>
          <div className="audience-center">
            <Target size={30} weight="bold" />
            <strong>Buying committee</strong>
            <span>dolor, mensaje y CTA por rol</span>
          </div>
          {audienceSegments.map((segment, index) => (
            <button
              key={segment.role}
              className={`audience-node audience-${index + 1} ${active === index ? "active" : ""}`}
              style={{ "--hint-delay": `${index * 420}ms` }}
              onClick={() => setActive(index)}
            >
              <strong>{segment.role.split(" / ")[0]}</strong>
              <span>{segment.cta}</span>
            </button>
          ))}
        </div>
        <article className="audience-reader" data-reveal>
          <span>{selected.priority}</span>
          <h3>{selected.role}</h3>
          <dl>
            <div>
              <dt>Dolor</dt>
              <dd>{selected.pain}</dd>
            </div>
            <div>
              <dt>Mensaje</dt>
              <dd>{selected.message}</dd>
            </div>
            <div>
              <dt>CTA</dt>
              <dd>{selected.cta}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function AgenticSystem() {
  const [active, setActive] = useState(agentNodes[0].id);
  const selected = agentNodes.find((node) => node.id === active) ?? agentNodes[0];
  const Icon = selected.icon;

  return (
    <section id="sistema" className="section system-section">
      <SectionHeader
        eyebrow="Sistema agéntico"
        title="La IA opera alrededor del criterio, no en lugar del criterio."
        copy="Al hacer scroll, el sistema revela sus capas: research, contenido, activación y medición. Cada agente produce insumos; el consultor decide."
      />
      <div className="agentic-layout" data-reveal>
        <div className="agent-map" aria-label="Sistema agéntico interactivo">
          <div className="interaction-hint" aria-hidden="true">
            <Sparkle size={16} weight="bold" />
            <span>Hover / click</span>
          </div>
          <div className="agent-center">
            <CircleNotch size={34} weight="bold" />
            <strong>Consultor Jr</strong>
            <span>criterio y QA final</span>
          </div>
          {agentNodes.map((node, index) => {
            const NodeIcon = node.icon;
            return (
              <button
                key={node.id}
                className={`agent-node node-${index + 1} ${active === node.id ? "active" : ""}`}
                style={{ "--node-color": node.color, "--hint-delay": `${index * 420}ms` }}
                onClick={() => setActive(node.id)}
              >
                <NodeIcon size={24} weight="bold" />
                <strong>{node.title}</strong>
                <span>{node.summary}</span>
              </button>
            );
          })}
        </div>
        <article className="agent-detail">
          <span style={{ color: selected.color }}>Capa activa</span>
          <Icon size={30} weight="bold" />
          <h3>{selected.title}</h3>
          <p>{selected.detail}</p>
          <small>Interactúa con cada nodo para cambiar la lectura del sistema.</small>
        </article>
      </div>
    </section>
  );
}

function Bets() {
  const [active, setActive] = useState(0);
  const selected = bets[active];

  return (
    <section id="apuestas" className="section bets-section">
      <SectionHeader
        eyebrow="Apuestas priorizadas"
        title="Tres apuestas bastan si cada una empuja una conversación comercial."
        copy="La web debe explicar por qué se eligen estas acciones y no una lista larga de tácticas."
      />
      <div className="bets-grid">
        <div className="bet-list" data-reveal>
          {bets.map((bet, index) => (
            <button key={bet.title} className={active === index ? "bet-row active" : "bet-row"} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{bet.title}</strong>
              <em>{bet.score}</em>
            </button>
          ))}
        </div>
        <article className="bet-detail" data-reveal>
          <div className="score-ring" style={{ "--score": `${selected.score * 3.6}deg` }}>
            <strong>{selected.score}</strong>
            <span>score</span>
          </div>
          <h3>{selected.title}</h3>
          <strong className="bet-proof">{selected.proof}</strong>
          <p>{selected.detail}</p>
          <div className="bet-flow" aria-label="Flujo de la apuesta">
            {selected.flow.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
          <a href="#roadmap">{selected.cta} <ArrowUpRight size={18} weight="bold" /></a>
        </article>
      </div>
    </section>
  );
}

function Roadmap() {
  const [active, setActive] = useState(0);
  return (
    <section id="roadmap" className="section roadmap-section">
      <SectionHeader
        eyebrow="Roadmap 30 60 90"
        title="Instalar, escalar y decidir sin perder aprendizaje semanal."
        copy="Cada etapa tiene una salida concreta. El scroll anima la línea para que la ejecución se lea como una ruta, no como una lista."
      />
      <div className="roadmap-wrap" data-reveal>
        <div className="roadmap-line" style={{ "--progress": `${(active + 1) / roadmap.length}` }} />
        {roadmap.map((item, index) => (
          <button key={item[0]} className={active === index ? "road-card active" : "road-card"} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)}>
            <span>{item[0]}</span>
            <h3>{item[1]}</h3>
            <p>{item[2]}</p>
            <small>{item[3]}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function FunnelViz() {
  const [active, setActive] = useState(0);
  const current = funnelStages[active];

  return (
    <section id="medicion" className="section measurement-section">
      <SectionHeader
        eyebrow="Medición"
        title="El éxito se mide por conversaciones y oportunidades, no por publicaciones."
        copy="El funnel es interactivo: cada etapa explica qué debe mirar gerencia para decidir si el plan escala."
      />
      <div className="measurement-grid">
        <div className="funnel-viz" data-reveal>
          {funnelStages.map(([label, value, reading, color], index) => (
            <button
              key={label}
              className={active === index ? "funnel-stage active" : "funnel-stage"}
              style={{ "--stage-color": color, "--stage-width": `${100 - index * 9}%` }}
              onClick={() => setActive(index)}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </button>
          ))}
        </div>
        <article className="metric-reader" data-reveal>
          <span>Lectura ejecutiva</span>
          <h3>{current[0]}</h3>
          <strong>{current[1]}</strong>
          <p>{current[2]}</p>
          <div className="metric-note">
            <Funnel size={22} weight="bold" />
            <span>Haz click en cada etapa del embudo para cambiar la lectura.</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function BudgetAndTeam() {
  const [active, setActive] = useState(0);
  const selected = budget[active];
  const gradient = useMemo(() => {
    let start = 0;
    const total = budget.reduce((sum, item) => sum + item[1], 0);
    return budget.map((item) => {
      const deg = (item[1] / total) * 360;
      const slice = `${item[2]} ${start}deg ${start + deg}deg`;
      start += deg;
      return slice;
    }).join(", ");
  }, []);

  return (
    <section className="section operations-section">
      <SectionHeader
        eyebrow="Operación"
        title="S/ 3,000 mensuales funcionan como prueba controlada."
        copy="El presupuesto y el equipo se entienden mejor juntos: poco dinero, roles claros y aprendizaje cada semana."
      />
      <div className="ops-grid">
        <div className="budget-card" data-reveal>
          <div className="interaction-hint budget-hint" aria-hidden="true">
            <Sparkle size={16} weight="bold" />
            <span>Click en rubros</span>
          </div>
          <div className="budget-total">
            <span>Presupuesto mensual</span>
            <strong>S/ 3,000</strong>
          </div>
          <div className="donut" style={{ background: `conic-gradient(${gradient})` }}>
            <div aria-hidden="true" />
          </div>
          <div className="budget-list">
            {budget.map((item, index) => (
              <button
                key={item[0]}
                className={active === index ? "budget-item active" : "budget-item"}
                style={{ "--hint-delay": `${index * 360}ms` }}
                onClick={() => setActive(index)}
              >
                <i style={{ background: item[2] }} />
                <span>{item[0]}</span>
                <strong><small>S/</small>{item[1].toLocaleString("es-PE")}</strong>
              </button>
            ))}
          </div>
          <p className="budget-copy">{selected[3]}</p>
        </div>
        <div className="team-table" data-reveal>
          {team.map(([role, responsibility, output]) => (
            <article key={role}>
              <strong>{role}</strong>
              <p>{responsibility}</p>
              <span>{output}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiAppendix() {
  return (
    <section id="ia" className="section ai-section">
      <SectionHeader
        eyebrow="Anexo como se usó la IA"
        title="La IA funcionó como ampliación del criterio, no como reemplazo."
        copy="La sección final defiende cómo se usó IA con criterio. No es un inventario de herramientas; es una explicación de valor y riesgos controlados."
      />
      <div className="ai-trace-grid" data-reveal>
        {aiTraceability.map((item, index) => (
          <article key={item.component} className="ai-trace-card" style={{ "--delay": `${index * 70}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.component}</h3>
            <p>{item.contribution}</p>
            <strong>{item.judgment}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiValue() {
  const [active, setActive] = useState(0);
  const selected = aiValueArguments[active];

  return (
    <section id="ia-valor" className="section ai-value-section">
      <SectionHeader
        eyebrow="Por qué estos flujos elevan la propuesta"
        title="El aporte de IA se defiende por mejores decisiones, no por más producción."
      />
      <div className="ai-value-layout">
        <div className="ai-value-rail" data-reveal>
          <div className="interaction-hint ai-value-hint" aria-hidden="true">
            <Sparkle size={16} weight="bold" />
            <span>Click en flujos</span>
          </div>
          {aiValueArguments.map((item, index) => (
            <button
              key={item.title}
              className={active === index ? "ai-value-tab active" : "ai-value-tab"}
              style={{ "--hint-delay": `${index * 380}ms` }}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <article className="ai-value-reader" data-reveal>
          <span>Argumento activo</span>
          <h3>{selected.title}</h3>
          <p>{selected.argument}</p>
        </article>
      </div>
    </section>
  );
}

function SourcesTraceability() {
  return (
    <section id="fuentes" className="section sources-section">
      <SectionHeader
        eyebrow="Fuentes y trazabilidad"
        title="Cada decisión del plan se conecta con una fuente, un uso y un límite."
      />
      <div className="sources-layout">
        <div className="source-cards" data-reveal>
          {sourceLinks.map((source, index) => (
            <a
              key={source.title}
              className={source.featured ? "source-card featured" : "source-card"}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              style={{ "--delay": `${index * 60}ms` }}
            >
              <div className="source-meta">
                <span>{source.type}</span>
                <small>{source.tag}</small>
              </div>
              <strong>{source.title}</strong>
              <p>{source.note}</p>
              <em>abrir fuente <ArrowUpRight size={16} weight="bold" /></em>
            </a>
          ))}
        </div>
        <article className="traceability-roadmap" data-reveal>
          <span>Mapa de uso</span>
          <h3>De evidencia a decisión</h3>
          <div className="traceability-list">
            {traceabilityRows.map(([source, use], index) => (
              <div key={source} style={{ "--delay": `${index * 130}ms` }}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{source}</strong>
                <p>{use}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <footer className="closing">
      <div className="closing-content" data-reveal>
        <img src="/assets/brand/neo-logo-white-on-navy.png" alt="NEO Consulting" />
        <h2>Menos ruido. Más conversaciones calificadas.</h2>
        <p>Esta web resume el caso como una experiencia ejecutiva: diagnóstico claro, sistema agéntico, apuestas priorizadas, roadmap, medición y anexo IA defendible.</p>
        <a href="#top">Volver al inicio <ArrowUpRight size={18} weight="bold" /></a>
      </div>
    </footer>
  );
}

export function App() {
  useRevealOnScroll();

  return (
    <main>
      <Hero />
      <Diagnosis />
      <Benchmark />
      <Audience />
      <AgenticSystem />
      <Bets />
      <Roadmap />
      <FunnelViz />
      <BudgetAndTeam />
      <AiAppendix />
      <AiValue />
      <SourcesTraceability />
      <Closing />
    </main>
  );
}
