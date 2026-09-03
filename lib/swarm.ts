export type AgentStatus = "active" | "busy" | "standby";

export interface Channel {
  name: string;
  kind: "chat" | "webhook" | "db" | "portals" | "worksheets" | "social" | "market";
  connected: boolean;
}

// Jerarquía piramidal V2
export type Division =
  | "MASTERRENT"
  | "TERRANOVA"
  | "TRADING"
  | "CREATIVE"
  | "PERSONAL"
  | "EJECUTIVO";

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string; // tailwind accent token family
  tagline: string;
  status: AgentStatus;
  /** División funcional a la que pertenece */
  division: Division;
  /** Nivel jerárquico: 1 = CEO, 2 = Director de división, 3 = Especialista/Subagente */
  level: 1 | 2 | 3;
  /** A quién reporta / con quién habla directamente (ids de agentes u "gonzalo") */
  reportsTo: string[];
  /** Staff V2 local (skills) — subagentes una-fuente */
  isStaff?: boolean;
  coreSkills: string[];
  responsibilities: string[];
  projects: string[];
  connectedChannels: Channel[];
}

// ============================================================
// Nivel 0 — PROPIETARIO (fuera del swarm, único canal = Lorenzo)
// ============================================================
export interface Owner {
  id: string;
  name: string;
  role: string;
  emoji: string;
  note: string;
}

export const owner: Owner = {
  id: "gonzalo",
  name: "Don Gonzalo",
  role: "Propietario · Nexus Holding",
  emoji: "🏛️",
  note: "Habla SOLO con Lorenzo — canal único, nadie más del swarm.",
};

// ============================================================
// AGENTES
// ============================================================
export const agents: Agent[] = [
  // ---------- NIVEL 1 · CEO ----------
  {
    id: "lorenzo",
    name: "Lorenzo",
    emoji: "👑",
    role: "CEO & Lead Orchestrator",
    color: "emerald",
    division: "EJECUTIVO",
    level: 1,
    reportsTo: ["gonzalo"],
    tagline: "Único canal directo de Don Gonzalo · estrategia, descomposición y reporte.",
    status: "active",
    coreSkills: ["Estrategia", "Task Decomposition", "Orquestación", "Reportes", "Retry máx 3"],
    responsibilities: [
      "Único agente que recibe órdenes directas de Don Gonzalo",
      "Descompone órdenes del propietario en deliverable accionables",
      "Coordina a los 20 agentes del swarm por división",
      "Consolida informes ejecutivos diarios con evidencia citada",
    ],
    projects: ["Swarm completo", "Consolidado Holding"],
    connectedChannels: [{ name: "Sala Directorio", kind: "chat", connected: true }],
  },

  // ---------- NIVEL 2 · STAFF MASTERRENT ----------
  {
    id: "felipe-db",
    name: "Felipe-DB",
    emoji: "🗄️",
    role: "Controller de Arriendos · Dirección MasterRent",
    color: "cyan",
    division: "MASTERRENT",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Conciliación de 13 hojas, arqueo maestro y gobierno de datos (una fuente).",
    status: "active",
    coreSkills: ["Conciliación 13 hojas", "Arqueo maestro", "NEV-1", "Fuente==OK+Cuarentena", "Gobernanza de datos"],
    responsibilities: [
      "No afirma una cifra total sin que el subagente de esa hoja la cite",
      "Reconciliación final: filas_fuente == filas_ok + filas_cuarentena",
      "Coordinador de validadores una-fuente de MasterRent",
    ],
    projects: ["MasterRent", "Excel MASTER", "Consolidado Holding"],
    connectedChannels: [
      { name: "Excel MASTER", kind: "worksheets", connected: true },
      { name: "Neon DB", kind: "db", connected: true },
    ],
  },

  // ---------- NIVEL 2 · STAFF TERRANOVA (codirección) ----------
  {
    id: "valentina",
    name: "Valentina",
    emoji: "📣",
    role: "CMO & Growth Media · Dirección Terranova",
    color: "rose",
    division: "TERRANOVA",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Google Ads · Meta Ads · Reels · Copywriting · SEO. Pauta ≠ web (se reportan por separado).",
    status: "active",
    coreSkills: ["Google Ads", "Meta Ads", "Video Reels", "Copywriting", "SEO Local", "Cotizador"],
    responsibilities: [
      "Pauta digital de Terranova y MasterRent",
      "Números de pauta (inversión) y de web (tráfico) nunca combinados",
      "Supervisa copys comerciales vía el cotizador (tarifario vigente)",
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
    role: "COO & Lead Civil Engineer · Codirección Terranova",
    color: "orange",
    division: "TERRANOVA",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Obras civiles · radieres · dosificación H20/H25 · SIPOC/VSM/DMAIC.",
    status: "active",
    coreSkills: ["Hormigón H20/H25", "Pavimentación", "Cubicaciones", "MasterRent Ops", "OGUC", "DMAIC"],
    responsibilities: [
      "Especificaciones técnicas de pavimentos y radieres",
      "Control de tiempos (72h), compactación y cotas",
      "Supervisión operativa de equipos MasterRent",
    ],
    projects: ["Terranova Obras", "MasterRent Ops", "Obra Control"],
    connectedChannels: [
      { name: "Faenas Terreno", kind: "chat", connected: true },
      { name: "Bodega Hualpén", kind: "webhook", connected: true },
    ],
  },

  // ---------- NIVEL 2 · STAFF TRADING ----------
  {
    id: "matias",
    name: "Matías",
    emoji: "📈",
    role: "Head of Quantitative Trading · Dirección Trading",
    color: "purple",
    division: "TRADING",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Alpaca API · Overnight Tech/IA · Core Long · Filtro Cornejo · riesgo.",
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

  // ---------- NIVEL 2 · STAFF CREATIVE ----------
  {
    id: "mateo",
    name: "Mateo",
    emoji: "🎨",
    role: "Director Creativo & Diseño Gráfico · Dirección Creative",
    color: "purple",
    division: "CREATIVE",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Branding, piezas gráficas y dirección de arte del holding.",
    status: "active",
    coreSkills: ["Branding", "Identidad Visual", "Piezas Gráficas", "Dirección de Arte"],
    responsibilities: [
      "Dirección de arte de Terranova, MasterRent y TradeX",
      "Consistencia de marca Nexus (azul oscuro + dorado)",
      "Revisa y aprueba piezas gráficas antes de publicación",
    ],
    projects: ["Branding Nexus", "Piezas Cobranza", "Folleto Industrial"],
    connectedChannels: [{ name: "Design System", kind: "worksheets", connected: true }],
  },
  {
    id: "dipac",
    name: "DIPAC",
    emoji: "✍️",
    role: "Copywriter Publicitario · Staff Creative",
    color: "amber",
    division: "CREATIVE",
    level: 2,
    reportsTo: ["lorenzo", "valentina"],
    tagline: "Copywriter publicitario especialista Terranova · publicidad & conversion.",
    status: "active",
    coreSkills: ["Copywriter Ads", "Landing Pages", "CTA & Conversión", "Marketplace Copy"],
    responsibilities: [
      "Redacción publicitaria para Terranova y MasterRent",
      "Copys de marketplace (Facebook/Instagram) con formato aprobado",
      "Filtro de intención de compra (anti-cliente-chico)",
    ],
    projects: ["Terranova Ads", "Marketplace MasterRent", "Landing Pages"],
    connectedChannels: [
      { name: "Meta Business", kind: "social", connected: true },
      { name: "Google Ads", kind: "social", connected: true },
    ],
  },

  // ---------- NIVEL 2 · STAFF PERSONAL ----------
  {
    id: "asistente-vida",
    name: "AI-Vida",
    emoji: "🧭",
    role: "Asistente Personal · Dirección Personal",
    color: "cyan",
    division: "PERSONAL",
    level: 2,
    reportsTo: ["lorenzo"],
    tagline: "Chief of Staff: vida, agenda y correos — 1 tema por correo.",
    status: "active",
    coreSkills: ["Agenda", "Gestión de correos", "Priorización", "Confirmación de conflictos"],
    responsibilities: [
      "Un tema por correo (regla de comunicación vigente)",
      "Gestión de agenda y confirmación de conflictos con validador-fechas",
      "Descarta correos mal dirigidos sin escalar",
    ],
    projects: ["Agenda Gnzalo", "Inbox Management", "Recordatorios"],
    connectedChannels: [{ name: "Gmail SMTP", kind: "webhook", connected: true }],
  },

  // ---------- NIVEL 3 · ESPECIALISTAS CORE ----------
  {
    id: "lucas",
    name: "Lucas",
    emoji: "💻",
    role: "Backend & Cloud Architect · Especialista",
    color: "cyan",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db", "lorenzo"],
    tagline: "PostgreSQL · Prisma ORM · APIs REST · Linux · DTE SII.",
    status: "active",
    coreSkills: ["PostgreSQL", "Prisma ORM", "Neon DB", "APIs & Webhooks", "DTE SII"],
    responsibilities: [
      "Backend de MasterRent, TradeX y Terranova",
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
    emoji: "🖥️",
    role: "Lead Frontend & UI/UX · Especialista",
    color: "pink",
    division: "TERRANOVA",
    level: 3,
    reportsTo: ["valentina", "lorenzo"],
    tagline: "Next.js 14 · Tailwind · UI/UX Mobile First · Framer Motion.",
    status: "active",
    coreSkills: ["Next.js 14", "Tailwind CSS", "UI/UX Design", "Framer Motion", "Dashboard UI"],
    responsibilities: [
      "Interfaz visual de alto impacto y velocidad",
      "Componentes responsivos y accesibles",
      "Dashboard Holding y apps de clientes",
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
    role: "Head of OSINT, Scraping & Research · Especialista",
    color: "indigo",
    division: "TERRANOVA",
    level: 3,
    reportsTo: ["lorenzo", "rodrigo"],
    tagline: "Scrapling · Bypass Cloudflare · Mercado Público · Búsqueda Profunda.",
    status: "active",
    coreSkills: ["Scrapling", "Stealth Scraping", "Bypass Cloudflare", "Mercado Público", "OSINT"],
    responsibilities: [
      "Extracción de datos de proveedores, precios y licitaciones",
      "Búsqueda profunda de información técnica y financiera",
      "Radar de licitaciones para Terranova",
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
    role: "CFO & Especialista Tributario Chile · Especialista",
    color: "amber",
    division: "TRADING",
    level: 3,
    reportsTo: ["matias", "lorenzo"],
    tagline: "Compliance SII (F22, DJ 1929), estructuración SpA y planificación.",
    status: "active",
    coreSkills: ["SII", "F22", "DJ 1929", "Structuring SpA", "Cash Flow", "Renta trading"],
    responsibilities: [
      "Cumplimiento tributario ante el SII (F22, DJ 1929)",
      "Auditoría de utilidades de trading y provisión de renta",
      "Estructuración societaria (SpA)",
    ],
    projects: ["MasterRent SpA", "Consolidado Holding", "Tributario TradeX"],
    connectedChannels: [
      { name: "SII", kind: "portals", connected: true },
      { name: "Contabilidad", kind: "worksheets", connected: true },
    ],
  },

  // ---------- NIVEL 3 · SUBAGENTES STAFF V2 · MASTERRENT ----------
  {
    id: "validador-fechas",
    name: "Val-Fechas",
    emoji: "📅",
    role: "Validador de Fechas · una-fuente",
    color: "cyan",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db"],
    isStaff: true,
    tagline: "Fuente única: columnas de fechas (inicio/vencimiento/término).",
    status: "active",
    coreSkills: ["Formato fecha chilena", "Detección de vencidos", "Solapes"],
    responsibilities: [
      "Valida formato chileno de fechas sin extrapolar montos",
      "Detecta vencidos y solapes",
    ],
    projects: ["Excel MASTER"],
    connectedChannels: [{ name: "Hoja Fechas", kind: "worksheets", connected: true }],
  },
  {
    id: "validador-pagos",
    name: "Val-Pagos",
    emoji: "💸",
    role: "Validador de Pagos · una-fuente",
    color: "cyan",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db"],
    isStaff: true,
    tagline: "Fuente única: columnas de pagos/abonos → {Fila, Monto, Estado}.",
    status: "active",
    coreSkills: ["Aritmética por fila", "Desglose verificable", "CLP + miles"],
    responsibilities: [
      "Monto por fila, no suma de memoria",
      "Devuelve {Fila, Monto, Estado}",
    ],
    projects: ["Excel MASTER"],
    connectedChannels: [{ name: "Hoja Pagos", kind: "worksheets", connected: true }],
  },
  {
    id: "validador-ruts",
    name: "Val-RUTs",
    emoji: "🪪",
    role: "Validador de RUTs · una-fuente",
    color: "cyan",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db"],
    isStaff: true,
    tagline: "Fuente única: columna RUT → dígito verificador (Módulo 11).",
    status: "active",
    coreSkills: ["Módulo 11", "Formato XX.XXX.XXX-X"],
    responsibilities: [
      "Valida dígito verificador",
      "Corrige formato sin tocar montos",
    ],
    projects: ["Excel MASTER"],
    connectedChannels: [{ name: "Hoja RUT", kind: "worksheets", connected: true }],
  },
  {
    id: "analista-mora",
    name: "Analista-Mora",
    emoji: "⏰",
    role: "Analista de Mora · una-fuente",
    color: "cyan",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db"],
    isStaff: true,
    tagline: "Fuente única: hoja Mora → total_mora = Σ filas verificable.",
    status: "active",
    coreSkills: ["Aging", "Total_mora Σ filas", "Cita fila/celda"],
    responsibilities: [
      "Aritmética en la hoja de mora",
      "Cita fila/celda exacta para cada monto",
    ],
    projects: ["Excel MASTER · Mora"],
    connectedChannels: [{ name: "Hoja Mora", kind: "worksheets", connected: true }],
  },
  {
    id: "fiscal-sii",
    name: "DTE-SII",
    emoji: "🧾",
    role: "Emisor/gestor DTE ante el SII",
    color: "amber",
    division: "MASTERRENT",
    level: 3,
    reportsTo: ["felipe-db"],
    isStaff: true,
    tagline: "Fuente única: folio SII + datos del arrendatario. Idempotencia de folio.",
    status: "active",
    coreSkills: ["DTE SII", "Idempotencia de folio", "Validación cruzada"],
    responsibilities: [
      "No emitir sin validación cruzada (emisión + receptor)",
      "Duplicado de folio = bloqueo",
    ],
    projects: ["MasterRent · DTE SII"],
    connectedChannels: [{ name: "SII", kind: "portals", connected: true }],
  },

  // ---------- NIVEL 3 · SUBAGENTES STAFF V2 · TERRANOVA ----------
  {
    id: "web-lead",
    name: "Web-Lead",
    emoji: "🌐",
    role: "Web & Captación Terranova · una-fuente",
    color: "orange",
    division: "TERRANOVA",
    level: 3,
    reportsTo: ["valentina"],
    isStaff: true,
    tagline: "Fuente única: repo Next.js + keyword/copy base. Deploy Vercel CI.",
    status: "active",
    coreSkills: ["Next.js", "Deploy CI/QA", "SEO por intención"],
    responsibilities: [
      "Web Terranova y captación de leads",
      "SEO por intención de compra estilo Camila",
    ],
    projects: ["Terranova Web"],
    connectedChannels: [{ name: "Vercel", kind: "webhook", connected: true }],
  },
  {
    id: "folleto-industrial",
    name: "Folleto-Ind",
    emoji: "📄",
    role: "Folleto Industrial · una-fuente",
    color: "orange",
    division: "TERRANOVA",
    level: 3,
    reportsTo: ["valentina"],
    isStaff: true,
    tagline: "Fuente única: assets de folleto/catálogo. Cotiza vía cotizador.",
    status: "active",
    coreSkills: ["Material comercial", "Catálogo", "Cotización"],
    responsibilities: [
      "Genera material comercial desde assets aprobados",
      "No inventa precios (usa el cotizador)",
    ],
    projects: ["Folleto Industrial Terranova"],
    connectedChannels: [{ name: "Assets Catálogo", kind: "worksheets", connected: true }],
  },
  {
    id: "obra-control",
    name: "Obra-Control",
    emoji: "📋",
    role: "Control de Obra · una-fuente",
    color: "orange",
    division: "TERRANOVA",
    level: 3,
    reportsTo: ["rodrigo"],
    isStaff: true,
    tagline: "Fuente única: proyecto/presupuesto Obra Control (CRM+ERP en cola).",
    status: "active",
    coreSkills: ["SIPOC", "VSM", "DMAIC", "Control de avances"],
    responsibilities: [
      "Control de avances, cubicaciones y bitácoras",
      "NUNCA cruza presupuesto con arriendos",
    ],
    projects: ["Obra Control"],
    connectedChannels: [{ name: "Presupuesto OC", kind: "worksheets", connected: true }],
  },
];

// ============================================================
// STAFF V2 — registro declarativo (divisiones, subagentes)
// ============================================================
export const DIVISIONS: {
  id: Division;
  label: string;
  emoji: string;
  color: string;
  purpose: string;
}[] = [
  { id: "MASTERRENT", label: "MasterRent", emoji: "🛠️", color: "cyan", purpose: "Arriendos · Excel MASTER · DTE/SII · WhatsApp" },
  { id: "TERRANOVA", label: "Terranova", emoji: "🏠", color: "orange", purpose: "Obras · Web · SEO · Pauta · Obra Control" },
  { id: "TRADING", label: "TradeX", emoji: "📈", color: "purple", purpose: "Quant · Alpaca · Renta & Compliance SII" },
  { id: "CREATIVE", label: "Creative", emoji: "🎨", color: "rose", purpose: "Dirección de arte · Copy publicitario · Marca" },
  { id: "PERSONAL", label: "Personal", emoji: "🧭", color: "cyan", purpose: "Vida · Agenda · Correos (1 tema por correo)" },
];

export function agentsByDivision(d: Division): Agent[] {
  return agents.filter((a) => a.division === d);
}

export function directorsByDivision(d: Division): Agent[] {
  return agents.filter((a) => a.division === d && a.level === 2);
}

export function specialistsByDivision(d: Division): Agent[] {
  return agents.filter((a) => a.division === d && a.level === 3);
}

// ============================================================
// DEBATES / SALA DE DIRECTORIO (espejo del blackboard.json)
// ============================================================
export interface Debate {
  id: string;
  title: string;
  topic: string;
  status: "en curso" | "cerrado" | "decisión";
  participants: string[]; // agent ids
  participantsEmoji: string[];
  timestamp: string; // relativo para UI
  ts: string; // ISO real
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
    ts: "2026-09-03T09:12:00-04:00",
    summary:
      "Matías reportó utilidades Overnight acumuladas; Felipe evaluó la exposición al Impuesto a la Renta y recomendó separar utilidades realizadas vs no realizadas y provisionar para F22.",
    insights: [
      "Provisionar 25% sobre utilidades no realizadas.",
      "Documentar cada cierre para respaldar la DJ 1929.",
    ],
  },
  {
    id: "d2",
    title: "Reel publicitario del radier: copy + proofing técnico",
    topic: "Producción del reel de marketing del proyecto de radieres.",
    status: "en curso",
    participants: ["valentina", "rodrigo"],
    participantsEmoji: ["📣", "🏗️"],
    timestamp: "hace 45 min",
    ts: "2026-09-03T11:05:00-04:00",
    summary:
      "Valentina pidió el proofing técnico de los radieres; Rodrigo entregó dosificaciones, espesores y tiempos de curado para que el guion no exagere garantías. DIPAC redactó el copy aprobado.",
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
    participantsEmoji: ["🖥️", "🕵️", "💻"],
    timestamp: "hace 20 min",
    ts: "2026-09-03T11:30:00-04:00",
    summary:
      "Bruno montó el spider de ChileCompra y Lucas lo conectó a la base de datos; Camila diseñó la vista responsiva con filtros rápidos. El lead de licitaciones alimenta a obra-control de Terranova.",
    insights: [
      "Alertas automáticas en menos de 5 segundos.",
      "UI limpia y sin recargas innecesarias.",
    ],
  },
  {
    id: "d4",
    title: "Arqueo maestro Excel MASTER — conciliación SEV-1",
    topic: "Validación de integridad de las 13 hojas tras el incidente de cifras del 02-sep.",
    status: "decisión",
    participants: ["felipe-db", "analista-mora", "validador-pagos"],
    participantsEmoji: ["🗄️", "⏰", "💸"],
    timestamp: "hace 3 h",
    ts: "2026-09-03T08:40:00-04:00",
    summary:
      "Felipe-DB ejecutó el arqueo maestro contra los parciales de cada validador una-fuente. filas_fuente == filas_ok + filas_cuarentena verificada; mora total cuadrada con cita por fila.",
    insights: [
      "Reconciliación Fuente == Éxitos + Cuarentena confirmada.",
      "Ningún subagente mezcló cifras de hojas distintas.",
    ],
  },
  {
    id: "d5",
    title: "Nuevo copy de marketplace para el radier",
    topic: "Copy publicitario aprobado para Facebook/Instagram del proyecto de radieres.",
    status: "decisión",
    participants: ["dipac", "valentina"],
    participantsEmoji: ["✍️", "📣"],
    timestamp: "hace 1 h",
    ts: "2026-09-03T10:15:00-04:00",
    summary:
      "DIPAC redactó el copy con formato de marketplace aprobado, filtrando por intención de compra real. Valentina lo aprobó para pauta Google/Meta.",
    insights: [
      "Copy con CTA de conversión y cifras de dosificación certificada.",
      "Filtro de intención de compra aplicado (anti-cliente-chico).",
    ],
  },
  {
    id: "d6",
    title: "Confirmación de agenda / conflicto de fechas",
    topic: "Conflicto de agenda del propietario detectado entre visita técnica y reunión bancaria.",
    status: "cerrado",
    participants: ["asistente-vida", "validador-fechas"],
    participantsEmoji: ["🧭", "📅"],
    timestamp: "hace 5 h",
    ts: "2026-09-03T06:20:00-04:00",
    summary:
      "El asistente personal detectó solape de fechas y confirmó con validador-fechas antes de proponer el cambio. Evitó escalar el conflicto sin evidencia.",
    insights: [
      "Conflictos de agenda siempre confirmados contra la fuente de fechas.",
      "Un tema por correo, sin mezclar otros asuntos.",
    ],
  },
];

export function debateById(id: string): Debate | undefined {
  return debates.find((d) => d.id.toLowerCase() === id.toLowerCase());
}

// ============================================================
// PROYECTOS
// ============================================================
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
      { id: "camila", emoji: "🖥️" },
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
      { id: "camila", emoji: "🖥️" },
      { id: "felipe-db", emoji: "🗄️" },
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
      { id: "camila", emoji: "🖥️" },
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
          agentEmoji: "🖥️",
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
          agentId: "dipac",
          agentName: "DIPAC",
          agentEmoji: "✍️",
          action: "Campaña Publicitaria & Copy",
          detail: "Redacción de copys persuasivos con intención de compra y montaje del reel.",
          deliverable: "Video vertical 9:16 + Campaña Google/Meta Ads",
          estimatedCost: "$0.0003 USD",
        },
      ],
      supervisorCheck: "Harness: Parámetros técnicos contrastados con normativa OGUC.",
      summary: "Especificación técnica de Rodrigo entregada a DIPAC/Valentina para marketing.",
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
        agentEmoji: "🖥️",
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