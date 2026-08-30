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
