export type AgentStatus = "active" | "busy" | "standby";

export interface Channel {
  name: string;
  kind: "chat" | "webhook" | "db" | "portals" | "worksheets" | "social" | "market";
  connected: boolean;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string; // tailwind accent token family
  tagline: string;
  status: AgentStatus;
  coreSkills: string[];
  responsibilities: string[];
  projects: string[];
  connectedChannels: Channel[];
}

export const agents: Agent[] = [
  {
    id: "lorenzo",
    name: "Lorenzo",
    emoji: "👑",
    role: "CEO & Lead Orchestrator",
    color: "emerald",
    tagline: "Estrategia, descomposición de tareas y reporte consolidado.",
    status: "active",
    coreSkills: ["Estrategia", "Task Decomposition", "Orquestación", "Reportes"],
    responsibilities: [
      "Descompone órdenes de Don Gonzalo en deliverable accionables",
      "Coordina a los 8 agentes del swarm",
      "Consolida informes ejecutivos diarios",
    ],
    projects: ["Swarm completo", "Consolidado Holding"],
    connectedChannels: [{ name: "Sala Directorio", kind: "chat", connected: true }],
  },
  {
    id: "lucas",
    name: "Lucas",
    emoji: "💻",
    role: "Backend & Cloud Architect",
    color: "cyan",
    tagline: "PostgreSQL · Prisma ORM · APIs REST · Linux Server · DTE SII.",
    status: "active",
    coreSkills: ["PostgreSQL", "Prisma ORM", "Neon DB", "APIs & Webhooks", "DTE SII"],
    responsibilities: [
      "Mantiene backend de MasterRent, TradeX y Terranova",
      "Arquitectura de base de datos y migraciones seguras",
      "Integra APIs de facturación y pagos",
    ],
    projects: ["MasterRent", "TradeX", "Obra Control", "Terranova Web"],
    connectedChannels: [
      { name: "Neon DB", kind: "db", connected: true },
      { name: "Servidores Linux", kind: "webhook", connected: true },
    ],
  },
  {
    id: "camila",
    name: "Camila",
    emoji: "🎨",
    role: "Lead Frontend & UI/UX Designer",
    color: "pink",
    tagline: "Next.js 14 · Tailwind CSS · UI/UX Mobile First · Framer Motion.",
    status: "active",
    coreSkills: ["Next.js 14", "Tailwind CSS", "UI/UX Design", "Framer Motion", "Dashboard UI"],
    responsibilities: [
      "Diseño de interfaces visuales de alto impacto y velocidad",
      "Experiencia de usuario fluida para clientes y administradores",
      "Componentes responsivos y accesibles para web y mobile",
    ],
    projects: ["Holding Control", "MasterRent App", "TradeX", "Terranova Web"],
    connectedChannels: [
      { name: "Vercel UI", kind: "webhook", connected: true },
      { name: "Design System", kind: "worksheets", connected: true },
    ],
  },
  {
    id: "bruno",
    name: "Bruno",
    emoji: "🕵️",
    role: "Head of OSINT, Web Scraping & Research",
    color: "indigo",
    tagline: "Scrapling · Bypass Cloudflare · Mercado Público · Búsqueda Profunda.",
    status: "active",
    coreSkills: ["Scrapling", "Stealth Scraping", "Bypass Cloudflare", "Mercado Público", "OSINT"],
    responsibilities: [
      "Extracción automatizada de datos de proveedores, precios y licitaciones",
      "Búsqueda profunda de información técnica y financiera",
      "Bypass seguro de protecciones antibot y recopilación limpia",
    ],
    projects: ["Mercado Público / ChileCompra", "Scraping Precios", "Radar Financiero"],
    connectedChannels: [
      { name: "Mercado Público", kind: "portals", connected: true },
      { name: "Web Crawlers", kind: "market", connected: true },
    ],
  },
  {
    id: "felipe",
    name: "Felipe",
    emoji: "📊",
    role: "CFO & Especialista Tributario Chile",
    color: "amber",
    tagline: "Compliance SII (F22, DJ 1929), estructuración SpA y planificación.",
    status: "active",
    coreSkills: ["SII", "F22", "DJ 1929", "Structuring SpA", "Cash Flow"],
    responsibilities: [
      "Cumplimiento tributario ante el SII (F22, DJ 1929)",
      "Estructuración societaria (SpA)",
      "Planificación financiera y flujo de caja",
    ],
    projects: ["MasterRent SpA", "Consolidado Holding", "Tributario TradeX"],
    connectedChannels: [
      { name: "SII", kind: "portals", connected: true },
      { name: "Contabilidad", kind: "worksheets", connected: true },
    ],
  },
  {
    id: "matias",
    name: "Matías",
    emoji: "📈",
    role: "Head of Quantitative Trading",
    color: "purple",
    tagline: "Alpaca API · Overnight Tech/IA · Core Long · Filtro Cornejo.",
    status: "active",
    coreSkills: ["Alpaca API", "Overnight Tech/IA", "Core Long", "Filtro Cornejo", "Risk Control"],
    responsibilities: [
      "Opera la estrategia Overnight Tech/IA y Core Long",
      "Monitorea trailing stops al 5% y stops al 3%",
      "Audita métricas de rendimiento y drawdown",
    ],
    projects: ["TradeX", "Alpaca Portfolio"],
    connectedChannels: [
      { name: "Alpaca Markets", kind: "market", connected: true },
      { name: "Yahoo Finance API", kind: "market", connected: true },
    ],
  },
  {
    id: "valentina",
    name: "Valentina",
    emoji: "📣",
    role: "CMO & Growth/Media Director",
    color: "rose",
    tagline: "Google Ads · Meta Ads · Producción Video Reels · Copywriting · SEO.",
    status: "active",
    coreSkills: ["Google Ads", "Meta Ads", "Video Reels", "Copywriting", "SEO Local"],
    responsibilities: [
      "Pauta digital de Terranova y MasterRent",
      "Generación de videos publicitarios y copys comerciales",
      "Posicionamiento SEO en Google Maps y web",
    ],
    projects: ["Terranova Obras", "MasterRent SpA", "Videos Redes"],
    connectedChannels: [
      { name: "Google Ads", kind: "social", connected: true },
      { name: "Meta Business", kind: "social", connected: true },
    ],
  },
  {
    id: "rodrigo",
    name: "Rodrigo",
    emoji: "🏗️",
    role: "COO & Lead Civil Engineer",
    color: "orange",
    tagline: "Obras civiles · Radieres y pavimentos · Dosificación H20/H25 · Flota.",
    status: "active",
    coreSkills: ["Hormigón H20/H25", "Pavimentación", "Cubicaciones", "MasterRent Ops", "OGUC"],
    responsibilities: [
      "Especificaciones técnicas de pavimentos y radieres",
      "Control de tiempos (72h), compactación y cotas milimétricas",
      "Supervisión operativa de equipos MasterRent",
    ],
    projects: ["Terranova Obras", "MasterRent Ops", "Obra Control"],
    connectedChannels: [
      { name: "Faenas Terreno", kind: "chat", connected: true },
      { name: "Bodega Hualpén", kind: "webhook", connected: true },
    ],
  },
];

export interface Debate {
  id: string;
  title: string;
  topic: string;
  status: "en curso" | "cerrado" | "decisión";
  participants: string[]; // agent ids
  participantsEmoji: string[];
  timestamp: string;
  summary: string;
  insights: string[];
}

export const debates: Debate[] = [
  {
    id: "d1",
    title: "Impacto tributario de las ganancias Overnight",
    topic: "Tributación de utilidades por trading internacional (Retención / Global Complementario).",
    status: "decisión",
    participants: ["felipe", "matias"],
    participantsEmoji: ["📊", "📈"],
    timestamp: "hace 2 h",
    summary:
      "Matías reportó utilidades Overnight acumuladas; Felipe evaluó la exposición al Impuesto a la Renta y recomendó separar utilidades realizadas vs no realizadas y provisionar para F22.",
    insights: [
      "Provisionar 25% sobre utilidades no realizadas.",
      "Documentar cada cierre para respaldar la DJ 1929.",
    ],
  },
  {
    id: "d2",
    title: "Reel publicitario del radier: copy + proofing",
    topic: "Producción del reel de marketing del proyecto de radieres.",
    status: "en curso",
    participants: ["valentina", "rodrigo"],
    participantsEmoji: ["📣", "🏗️"],
    timestamp: "hace 45 min",
    summary:
      "Valentina pidió el proofing técnico de los radieres; Rodrigo entregó dosificaciones, espesores y tiempos de curado para que el guion no exagere garantías.",
    insights: [
      "Usar 'dosificación certificada' en el copy.",
      "Rodrigo aprobará el guion final antes de publicación.",
    ],
  },
  {
    id: "d3",
    title: "Nueva UI/UX y Web Scraping de Licitaciones",
    topic: "Integración de scrapping de Mercado Público en el dashboard con diseño de Camila.",
    status: "en curso",
    participants: ["camila", "bruno", "lucas"],
    participantsEmoji: ["🎨", "🕵️", "💻"],
    timestamp: "hace 20 min",
    summary:
      "Bruno montó el spider de ChileCompra y Lucas lo conectó a la base de datos; Camila diseñó la vista responsiva con filtros rápidos.",
    insights: [
      "Alertas automáticas en menos de 5 segundos.",
      "UI limpia y sin recargas innecesarias.",
    ],
  },
];

export interface Project {
  id: string;
  name: string;
  emoji: string;
  company: string;
  status: "Activo" | "En desarrollo" | "En vigilancia" | "Planificado";
  color: string;
  description: string;
  progress: number;
  agents: { id: string; emoji: string }[];
  modules: { name: string; state: "operativo" | "en progreso" | "backlog" }[];
}

export const projects: Project[] = [
  {
    id: "terranova",
    name: "Terranova",
    emoji: "🏠",
    company: "Obras & Proyectos",
    status: "Activo",
    color: "orange",
    description: "Obras civiles, radieres, hormigón y construcciones en la Región del Biobío.",
    progress: 78,
    agents: [
      { id: "rodrigo", emoji: "🏗️" },
      { id: "valentina", emoji: "📣" },
      { id: "camila", emoji: "🎨" },
    ],
    modules: [
      { name: "Web", state: "operativo" },
      { name: "Ads & SEO", state: "operativo" },
      { name: "Bitácora", state: "en progreso" },
    ],
  },
  {
    id: "masterrent",
    name: "MasterRent",
    emoji: "🛠️",
    company: "MasterRent SpA",
    status: "Activo",
    color: "cyan",
    description: "App de arriendos de herramientas y maquinaria menor + inventario + DTE SII.",
    progress: 85,
    agents: [
      { id: "lucas", emoji: "💻" },
      { id: "camila", emoji: "🎨" },
      { id: "felipe", emoji: "📊" },
      { id: "rodrigo", emoji: "🏗️" },
    ],
    modules: [
      { name: "App", state: "operativo" },
      { name: "Inventario", state: "operativo" },
      { name: "Arriendos", state: "operativo" },
      { name: "DTE SII", state: "en progreso" },
    ],
  },
  {
    id: "tradex",
    name: "TradeX",
    emoji: "📈",
    company: "Trading",
    status: "Activo",
    color: "purple",
    description: "Portafolio Alpaca $100k · Estrategia Overnight Tech/IA · Filtro Cornejo.",
    progress: 62,
    agents: [
      { id: "matias", emoji: "📈" },
      { id: "felipe", emoji: "📊" },
      { id: "lucas", emoji: "💻" },
    ],
    modules: [
      { name: "Alpaca Portfolio", state: "operativo" },
      { name: "Overnight Gap", state: "operativo" },
      { name: "Filtro Cornejo", state: "operativo" },
    ],
  },
  {
    id: "obra-control",
    name: "Obra Control",
    emoji: "📋",
    company: "Matex",
    status: "En desarrollo",
    color: "emerald",
    description: "ERP SaaS para constructoras: control de avances, cubicaciones y bitácoras.",
    progress: 25,
    agents: [
      { id: "lucas", emoji: "💻" },
      { id: "camila", emoji: "🎨" },
      { id: "rodrigo", emoji: "🏗️" },
      { id: "bruno", emoji: "🕵️" },
    ],
    modules: [
      { name: "Arquitectura BD", state: "operativo" },
      { name: "Módulo Cubicaciones", state: "en progreso" },
      { name: "Bitácora Digital", state: "backlog" },
    ],
  },
];

export function agentById(id: string): Agent | undefined {
  return agents.find((a) => a.id.toLowerCase() === id.toLowerCase());
}

export interface DispatchStage {
  agentId: string;
  agentName: string;
  agentEmoji: string;
  action: string;
  detail: string;
  deliverable: string;
  estimatedCost: string;
}

export interface DispatchResult {
  detectedProject: string;
  intent: string;
  leadAgent: string;
  stages: DispatchStage[];
  supervisorCheck: string;
  summary: string;
}

export function simulateDispatch(prompt: string): DispatchResult {
  const p = prompt.toLowerCase();

  if (p.includes("trading") || p.includes("alpaca") || p.includes("overnight") || p.includes("cornejo") || p.includes("acciones")) {
    return {
      detectedProject: "TradeX — Trading Cuantitativo",
      intent: "Optimización de estrategia algorítmica y control de riesgo",
      leadAgent: "Matías 📈",
      stages: [
        {
          agentId: "matias",
          agentName: "Matías",
          agentEmoji: "📈",
          action: "Ejecución Cuantitativa",
          detail: "Descarga de datos reales, cálculo de momentum técnico y colocación de Stops.",
          deliverable: "Órdenes calculadas y auditadas en Paper/Real",
          estimatedCost: "$0.0002 USD",
        },
        {
          agentId: "felipe",
          agentName: "Felipe",
          agentEmoji: "📊",
          action: "Auditoría Tributaria SII",
          detail: "Conversión a Dólar Observado y cálculo de provisión F22 / DJ 1929.",
          deliverable: "Registro en tributario_sii.py",
          estimatedCost: "$0.0001 USD",
        },
      ],
      supervisorCheck: "Harness: Confirmados Stops al 5% GTC y 3% DAY sin violaciones de margen.",
      summary: "Estrategia ruteada a Matías y auditada por Felipe.",
    };
  }

  if (p.includes("scrap") || p.includes("buscar") || p.includes("licitacion") || p.includes("chilecompra") || p.includes("mercado publico") || p.includes("proveedor")) {
    return {
      detectedProject: "Inteligencia de Mercado & Scraping",
      intent: "Extracción y análisis de datos externos / licitaciones",
      leadAgent: "Bruno 🕵️",
      stages: [
        {
          agentId: "bruno",
          agentName: "Bruno",
          agentEmoji: "🕵️",
          action: "Extracción Stealth con Scrapling",
          detail: "Crawling seguro de portales, bypass de Cloudflare y recopilación de datos.",
          deliverable: "Dataset estructurado JSON / CSV",
          estimatedCost: "$0.0003 USD",
        },
        {
          agentId: "camila",
          agentName: "Camila",
          agentEmoji: "🎨",
          action: "Visualización UI/UX",
          detail: "Creación de tabla responsiva con filtros rápidos de búsqueda.",
          deliverable: "Vista web integrada",
          estimatedCost: "$0.0002 USD",
        },
      ],
      supervisorCheck: "Harness: Validación de esquema JSON y cero duplicados.",
      summary: "Extracción delegada a Bruno con visualización de Camila.",
    };
  }

  if (p.includes("radier") || p.includes("hormigon") || p.includes("terranova") || p.includes("pavimento") || p.includes("obra") || p.includes("presupuesto")) {
    return {
      detectedProject: "Terranova — Obras & Pavimentos",
      intent: "Cubicación técnica, presupuesto y campaña publicitaria",
      leadAgent: "Rodrigo 🏗️",
      stages: [
        {
          agentId: "rodrigo",
          agentName: "Rodrigo",
          agentEmoji: "🏗️",
          action: "Ingeniería & Cubicación",
          detail: "Cálculo de m³, dosificación H20/H25, espesores y plazos 72h.",
          deliverable: "Ficha técnica de faena",
          estimatedCost: "$0.0002 USD",
        },
        {
          agentId: "valentina",
          agentName: "Valentina",
          agentEmoji: "📣",
          action: "Campaña Publicitaria",
          detail: "Redacción de copys persuasivos y montaje de reel con fotos reales.",
          deliverable: "Video vertical 9:16 + Campaña Google/Meta Ads",
          estimatedCost: "$0.0003 USD",
        },
      ],
      supervisorCheck: "Harness: Parámetros técnicos contrastados con normativa OGUC.",
      summary: "Especificación técnica de Rodrigo entregada a Valentina para marketing.",
    };
  }

  return {
    detectedProject: "MasterRent SpA / Obra Control",
    intent: "Desarrollo de software y arquitectura Fullstack",
    leadAgent: "Lucas 💻",
    stages: [
      {
        agentId: "lucas",
        agentName: "Lucas",
        agentEmoji: "💻",
        action: "Backend & Base de Datos",
        detail: "Modelado Prisma, endpoints REST y conexión a PostgreSQL en Neon.",
        deliverable: "APIs y migraciones listas",
        estimatedCost: "$0.0003 USD",
      },
      {
        agentId: "camila",
        agentName: "Camila",
        agentEmoji: "🎨",
        action: "Frontend & UI/UX Design",
        detail: "Diseño de componentes Next.js 14 con Tailwind CSS responsivo.",
        deliverable: "Vistas interactivas de alta velocidad",
        estimatedCost: "$0.0002 USD",
      },
    ],
    supervisorCheck: "Harness: Type-check npx tsc sin errores y build verificado.",
    summary: "Desarrollo coordinado entre Lucas (Backend) y Camila (Frontend UI/UX).",
  };
}
