// Nexus Multi-Agent Swarm data layer for "Holding Control".

export type AgentStatus = "active" | "idle" | "standby";

export interface Channel {
  name: string;
  kind: string;
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
      "Coordina a los 6 agentes del swarm",
      "Consolida informes ejecutivos diarios",
    ],
    projects: ["Swarm completo", "Consolidado Holding"],
    connectedChannels: [{ name: "Sala Directorio", kind: "chat", connected: true }],
  },
  {
    id: "lucas",
    name: "Lucas",
    emoji: "💻",
    role: "CTO & Lead Engineer",
    color: "cyan",
    tagline: "Next.js 14 · TypeScript · Prisma · Neon DB · Webhooks · APIs.",
    status: "active",
    coreSkills: ["Next.js 14", "TypeScript", "Prisma", "Neon DB", "Webhooks"],
    responsibilities: [
      "Mantiene MasterRent app (Next.js + Prisma + Neon)",
      "Mantiene TradeX panel de trading",
      "Mantiene Terranova Web y futura Obra Control / Matex",
      "Integra APIs y webhooks",
    ],
    projects: ["MasterRent", "TradeX", "Terranova Web", "Obra Control"],
    connectedChannels: [
      { name: "API MasterRent", kind: "webhook", connected: true },
      { name: "Neon DB", kind: "db", connected: true },
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
    projects: ["MasterRent SpA", "Consolidado Holding"],
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
    coreSkills: ["Alpaca API", "Overnight Gap", "Core Long", "Filtro Cornejo", "Risk"],
    responsibilities: [
      "Opera estrategia Overnight Tech/IA vía Alpaca",
      "Posición Core Long de largo plazo",
      "Control de riesgo en tiempo real (Filtro Cornejo)",
    ],
    projects: ["TradeX", "Portafolio $100k"],
    connectedChannels: [
      { name: "Alpaca", kind: "api", connected: true },
      { name: "Market Data", kind: "feed", connected: true },
    ],
  },
  {
    id: "valentina",
    name: "Valentina",
    emoji: "📣",
    role: "CMO & Growth/Media Director",
    color: "pink",
    tagline: "Google Ads · Meta Ads · Video AI Reels · SEO · Copywriting.",
    status: "active",
    coreSkills: ["Google Ads", "Meta Ads", "Video AI Reels", "SEO", "Copywriting"],
    responsibilities: [
      "Campañas de Google Ads y Meta Ads",
      "Generación de reels con video AI",
      "SEO y copywriting para las marcas del holding",
    ],
    projects: ["Terranova", "MasterRent", "Consolidado Holding"],
    connectedChannels: [
      { name: "Google Ads", kind: "ads", connected: true },
      { name: "Meta Ads", kind: "ads", connected: true },
    ],
  },
  {
    id: "rodrigo",
    name: "Rodrigo",
    emoji: "🏗️",
    role: "COO & Lead Civil Engineer",
    color: "orange",
    tagline: "Obras civiles, dosificación de hormigón, radieres y cubicaciones.",
    status: "active",
    coreSkills: ["Obras Civiles", "Hormigón", "Radieres", "Cubicaciones", "MasterRent Ops"],
    responsibilities: [
      "Supervisa obras civiles y dosificación de hormigón",
      "Cubicaciones y radieres",
      "Operaciones MasterRent (arriendos de herramientas)",
    ],
    projects: ["Terranova Obras", "Obra Control", "MasterRent Ops"],
    connectedChannels: [
      { name: "Bitácora Obra", kind: "log", connected: true },
      { name: "MasterRent Ops", kind: "ops", connected: true },
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
    title: "Reel AI del radier: copy + proofing",
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
    title: "Despliegue de MasterRent a producción",
    topic: "App Web de arriendos + generación DTE (SII).",
    status: "cerrado",
    participants: ["lucas", "felipe"],
    participantsEmoji: ["💻", "📊"],
    timestamp: "hace 1 día",
    summary:
      "Lucas desplegó la nueva iteración de MasterRent en Vercel y conectó webhooks; Felipe validó el flujo de Documentos Tributarios Electrónicos antes del go-live.",
    insights: [
      "DTE emitidos en ambiente de certificación.",
      "Backup de inventario previo al corte.",
    ],
  },
  {
    id: "d4",
    title: "Estrategia Core Long para el trimestre",
    topic: "Composición y sizing de la posición núcleo de largo plazo.",
    status: "en curso",
    participants: ["matias", "lorenzo"],
    participantsEmoji: ["📈", "👑"],
    timestamp: "hace 3 h",
    summary:
      "Matías propuso rebalancear el Core Long en tecnología/IA; Lorenzo enrutó el análisis para validación de riesgo y dio visibilidad al plan en el consolidado diario.",
    insights: [
      "Mantener <15% del capital en un solo ticker.",
      "Revisar semanalmente el Filtro Cornejo.",
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
      { id: "lucas", emoji: "💻" },
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
    id: "obracontrol",
    name: "Obra Control",
    emoji: "🏗️",
    company: "Matex · Futuro ERP de Obras",
    status: "Planificado",
    color: "emerald",
    description: "Futuro ERP de gestión integral de obras y cubicaciones para el holding.",
    progress: 15,
    agents: [
      { id: "rodrigo", emoji: "🏗️" },
      { id: "lucas", emoji: "💻" },
      { id: "lorenzo", emoji: "👑" },
    ],
    modules: [
      { name: "Cubicaciones", state: "en progreso" },
      { name: "Dosificación", state: "backlog" },
      { name: "ERP Obras", state: "backlog" },
    ],
  },
];

// --- Dispatch simulation -----------------------------------------------------

const agentIdToKey = (id: string) => agents.find((a) => a.id === id);

export type DispatchStage =
  | "recepción"
  | "análisis"
  | "descomposición"
  | "delegación"
  | "ejecución"
  | "reporte";

export interface DispatchNode {
  agentId: string;
  emoji: string;
  task: string;
  status: "asignado" | "en progreso" | "completado";
}

export interface DispatchResult {
  command: string;
  receivedAt: string;
  orchestrator: string;
  summary: string;
  decomposition: string[];
  stages: { name: DispatchStage; description: string }[];
  assignments: DispatchNode[];
}

export function simulateDispatch(prompt: string): DispatchResult {
  const p = prompt.trim();
  const lower = p.toLowerCase();

  const matched: DispatchNode[] = [];

  const maybe = (id: string, keywords: string[], task: string) => {
    if (keywords.some((k) => lower.includes(k))) {
      matched.push({ agentId: id, emoji: agentIdToKey(id)?.emoji ?? "⚙️", task, status: "asignado" });
    }
  };

  maybe("lucas", ["app", "código", "desarrollo", "web", "api", "base de datos", "deploy", "bug"], "Implementar/ajustar desarrollo y desplegar.");
  maybe("felipe", ["impuesto", "tribut", "f22", "sii", "cash", "flujo", "gasto", "factura", "dte"], "Revisar impacto tributario y planificación financiera.");
  maybe("matias", ["invertir", "trading", "accion", "stock", "alpaca", "portfolio", "ibkr", "trade", "compra"], "Evaluar oportunidad de trading y controlar riesgo.");
  maybe("valentina", ["marketing", "ads", "publicidad", "seo", "copy", "reel", "video", "ventas", "campaña"], "Diseñar campaña, copy y producción de contenido.");
  maybe("rodrigo", ["radie", "hormigon", "obra", "construc", "cubicacion", "dosificacion", "cimento", "cotizacion obra"], "Preparar cubicación/dosificación y supervisión de obra.");

  const crisisRisk = /urgente|critico|hoy|inmediato|problema/.test(lower);

  if (matched.length === 0) {
    matched.push({
      agentId: "lorenzo",
      emoji: "👑",
      task: "Consolidar la orden, coordinar al swarm y preparar reporte ejecutivo.",
      status: "en progreso",
    });
  }

  const decomposition = [
    "Clasificar la petición por dominio (operaciones / finanzas / tecnología / comercial).",
    "Identificar agentes responsables primarios y de soporte.",
    "Definir entregables, dependencias y plazos.",
    "Empaquetar un reporte consolidado para Don Gonzalo.",
  ];

  const stages: { name: DispatchStage; description: string }[] = [
    { name: "recepción", description: "Capturar la orden desde la Consola de Mando." },
    { name: "análisis", description: "Lorenzo interpreta la intención y límites de la petición." },
    { name: "descomposición", description: "Fragmentar en tareas accionables y secuenciables." },
    { name: "delegación", description: `${matched.length} agente(s) asignado(s).` },
    { name: "ejecución", description: "Cada agente ejecuta su rol con sus canales conectados." },
    { name: "reporte", description: "Lorenzo consolida resultados y emite informe." },
  ];

  const summary = crisisRisk
    ? `Orden marcada como ${"URGENTE"}: ${matched.length} agente(s) activado(s). Lorenzo prioriza el flujo y solicita reporte inmediato a Don Gonzalo.`
    : `${matched.length} agente(s) recibieron tareas. Lorenzo (@lorenzo) lidera la descomposición y consolidación del reporte.`;

  return {
    command: p,
    receivedAt: new Date().toISOString(),
    orchestrator: "lorenzo",
    summary,
    decomposition,
    stages,
    assignments: matched,
  };
}

export function agentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}