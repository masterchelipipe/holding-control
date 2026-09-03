"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Crown, MessageCircle, Network, Route } from "lucide-react";
import {
  agents,
  agentById,
  owner,
  directorsByDivision,
  specialistsByDivision,
  DIVISIONS,
  type Division,
} from "@/lib/swarm";
import { AgentAvatar, PageHeading, a } from "@/components/ui";
import { NexusLogo } from "@/components/Logo";

type FocusFilter = "all" | Division | "staff";

const FILTERS: { id: FocusFilter; label: string; emoji: string }[] = [
  { id: "all", label: "Toda la pirámide", emoji: "🏛️" },
  ...DIVISIONS.map((d) => ({ id: d.id as FocusFilter, label: d.label, emoji: d.emoji })),
  { id: "staff", label: "Staff V2 (subagentes)", emoji: "🧩" },
];

// ---- Árbol de nodos (owner → lorenzo → directores → especialistas) ----
type Pt = { x: number; y: number };

export default function OrganigramaPage() {
  const [focus, setFocus] = useState<FocusFilter>("all");
  const [hover, setHover] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pts, setPts] = useState<Record<string, Pt>>({});

  const ceo = agentById("lorenzo")!;

  useLayoutEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      if (!c) return;
      const cRect = c.getBoundingClientRect();
      const map: Record<string, Pt> = {};
      c.querySelectorAll<HTMLElement>("[data-node-id]").forEach((el) => {
        const id = el.dataset.nodeId!;
        const r = el.getBoundingClientRect();
        map[id] = {
          x: r.left + r.width / 2 - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        };
      });
      setPts(map);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 60);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [focus]);

  const w = pts ? [...Object.values(pts)].reduce((m, p) => Math.max(m, p.x), 0) : 100;
  const h = pts ? [...Object.values(pts)].reduce((m, p) => Math.max(m, p.y), 0) : 100;

  // edges: owner->lorenzo (solo canal), y cada reportsTo entre agentes
  const edges: [string, string][] = [["gonzalo", "lorenzo"]];
  for (const ag of agents) {
    for (const t of ag.reportsTo) {
      if (t === "gonzalo" && ag.id !== "lorenzo") continue; // propietario habla SOLO con Lorenzo
      if (t !== "gonzalo" && agentById(t)) edges.push([ag.id, t]);
    }
  }

  const dimAgent = (id: string) => {
    if (focus === "all") return false;
    const ag = agentById(id);
    if (!ag) return focus === "staff"; // owner: dim on staff view
    if (focus === "staff") return !ag.isStaff;
    return ag.division !== focus;
  };

  const activeAgent =
    (hover ? agentById(hover) : null) ?? ceo;

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="🏢"
        title="Organigrama Piramidal — Holding Nexus"
        subtitle="Don Gonzalo habla SOLO con Lorenzo (canal único); Lorenzo dirige 5 divisiones con especialistas y subagentes."
      />

      {/* filtros */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">Ver:</span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFocus(f.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              focus === f.id
                ? "border-gold-500/50 bg-gold-500/10 text-gold-300"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="mr-1">{f.emoji}</span>
            {f.label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[11px] text-slate-500 sm:inline">
          {agents.length} agentes · {agents.filter((a) => a.isStaff).length} subagentes Staff V2
        </span>
      </div>

      {/* ====== PIRÁMIDE ====== */}
      <div ref={containerRef} className="glass relative overflow-hidden p-4 sm:p-6">
        {/* fondo cuadriculado */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(30,41,59,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.4)_1px,transparent_1px)] [background-size:44px_44px]" />

        {/* conectores quién-habla-con-quién */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${Math.max(w, 10)} ${Math.max(h, 10)}`}
          preserveAspectRatio="none"
        >
          {edges.map(([from, to], i) => {
            const p1 = from === "gonzalo" ? pts["gonzalo"] : pts[from];
            const p2 = to === "gonzalo" ? pts["gonzalo"] : pts[to];
            if (!p1 || !p2) return null;
            const isOwn = from === "lorenzo" && to === "gonzalo";
            const isCm = from === "gonzalo"; // solo lorenzo
            const active = focus === "all" || !dimAgent(from) || !dimAgent(to);
            return (
              <line
                key={`e-${i}-${from}-${to}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isOwn || isCm ? "#d4af37" : active ? "#8b7cff" : "#1e293b"}
                strokeWidth={isOwn ? 2.4 : 1.6}
                strokeDasharray={isOwn ? "0" : "4 4"}
                strokeLinecap="round"
                opacity={active ? (isOwn ? 0.95 : 0.6) : 0.2}
              />
            );
          })}
        </svg>

        <div className="relative flex flex-col gap-2">
          {/* ===== NIVEL 0 · PROPIETARIO ===== */}
          <div className="flex justify-center">
            <OwnerNode dim={focus === "staff"} hover={hover} onHover={setHover} />
          </div>

          {/* banner de canal único */}
          <div className="flex justify-center">
            <div className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1 text-[11px] text-gold-300/90">
              <Crown className="h-3 w-3" />
              Canal único: propietario → Lorenzo. Nadie más habla directo con Don Gonzalo.
            </div>
          </div>

          {/* ===== NIVEL 1 · CEO ===== */}
          <div className="mt-2 flex justify-center">
            <AgentNode agent={ceo} size="lg" dim={dimAgent(ceo.id)} onHover={setHover} />
          </div>

          {/* ===== NIVEL 2+3 · DIVISIONES ===== */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {DIVISIONS.map((div) => {
              const ds = directorsByDivision(div.id);
              const ss = specialistsByDivision(div.id);
              const colActive = focus === "all" || focus === div.id || focus === "staff";
              return (
                <div key={div.id} className={`flex flex-col items-center gap-1.5 transition-opacity ${colActive ? "" : "opacity-40"}`}>
                  {/* director(s) */}
                  <div className="flex flex-col items-center gap-1.5">
                    {ds.map((d) => (
                      <AgentNode key={d.id} agent={d} size="md" dim={dimAgent(d.id)} onHover={setHover} tag={div.label} />
                    ))}
                  </div>

                  {/* conector vertical hacia subagentes */}
                  {ss.length > 0 && (
                    <div className="my-0.5 flex w-px flex-1 bg-gradient-to-b from-slate-600 to-slate-700/40" style={{ minHeight: 8 }} />
                  )}

                  {/* especialistas / subagentes */}
                  <div className="flex w-full flex-col items-center gap-1.5">
                    {ss.length === 0 && (
                      <span className="mt-1 px-2 text-center text-[9px] uppercase tracking-wider text-slate-600">
                        sin subagentes
                      </span>
                    )}
                    {ss.map((s) => (
                      <AgentNode key={s.id} agent={s} size="sm" dim={dimAgent(s.id)} onHover={setHover} tag={s.isStaff ? "staff" : undefined} />
                    ))}
                  </div>
                  <div className="mt-1 text-center text-[10px] text-slate-500">{div.purpose}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ====== DETALLE ====== */}
      <div className="glass mt-5 flex flex-col p-5">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Route className="h-4 w-4 text-gold-400" />
          <span className="text-sm font-semibold text-white">
            {hover ? `${agentById(hover)?.emoji} ${agentById(hover)?.name}` : "Detalle de agente"}
          </span>
        </div>

        {(() => {
          const agent = activeAgent;
          const c = a(agent.color);
          const reports = agent.reportsTo
            .map((id) => (id === "gonzalo" ? "Don Gonzalo" : agentById(id)?.name))
            .filter(Boolean);
          return (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* identidad */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <AgentAvatar agent={agent} size="lg" pulse={agent.status === "active"} />
                  <div>
                    <div className={`text-lg font-bold ${c.text}`}>{agent.name}</div>
                    <div className="text-sm text-slate-300">{agent.role}</div>
                    <div className="mt-1 text-xs text-slate-500">{agent.tagline}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="chip">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {agent.status}
                  </span>
                  <span className="chip">Nivel {agent.level}</span>
                  <span className="chip">{agent.division}</span>
                  {agent.isStaff && <span className="chip border-gold-500/40 bg-gold-500/10 text-gold-300">una-fuente</span>}
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <MessageCircle className={reports.length ? "h-3.5 w-3.5 text-gold-400" : "h-3.5 w-3.5 text-slate-600"} />
                    Habla directo con
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {reports.length ? (
                      reports.map((r) => (
                        <span key={r} className="chip">{r}</span>
                      ))
                    ) : (
                      <span className="chip text-slate-500">(canal solo vía Lorenzo)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* skills */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Habilidades</div>
                <div className="flex flex-wrap gap-1.5">
                  {agent.coreSkills.map((s) => (
                    <span key={s} className={`rounded-md px-2 py-0.5 text-xs ${c.bg} ${c.text}`}>{s}</span>
                  ))}
                </div>
                <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Responsabilidades</div>
                <ul className="space-y-1.5">
                  {agent.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.solid}`} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* proyectos */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Proyectos vinculados</div>
                <div className="flex flex-wrap gap-1.5">
                  {agent.projects.map((p) => (
                    <Link key={p} href="/proyectos" className="chip transition-colors hover:border-slate-600 hover:text-white">
                      {p} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ============================================================
// NODOS
// ============================================================

function OwnerNode({
  dim,
  hover,
  onHover,
}: {
  dim: boolean;
  hover: string | null;
  onHover: (id: string | null) => void;
}) {
  const isHover = hover === owner.id;
  return (
    <div
      data-node-id={owner.id}
      onMouseEnter={() => onHover(owner.id)}
      onMouseLeave={() => onHover(null)}
      className={`relative rounded-2xl border-2 border-gold-400/70 bg-gradient-to-b from-slate-900 to-[#0b1633] px-5 py-3 text-center shadow-glow-gold transition-all ${
        isHover ? "scale-105" : "scale-100"
      } ${dim ? "opacity-30" : "opacity-100"}`}
    >
      <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-2xl border border-gold-400/50" />
      <div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-xl border border-gold-400/40 bg-slate-950">
        <NexusLogo size={40} />
      </div>
      <div className="font-mono text-sm font-bold tracking-tight text-gold-300 uppercase">{owner.name}</div>
      <div className="text-[11px] text-slate-300">{owner.role}</div>
      <div className="mt-1 text-[10px] font-medium text-gold-300/80">🏛️ Habla SOLO con Lorenzo</div>
    </div>
  );
}

function AgentNode({
  agent,
  size = "md",
  dim = false,
  onHover,
  tag,
}: {
  agent: (typeof agents)[number];
  size?: "sm" | "md" | "lg";
  dim?: boolean;
  onHover?: (id: string | null) => void;
  tag?: string;
}) {
  const c = a(agent.color);
  const isLg = size === "lg";
  const isSm = size === "sm";

  return (
    <div
      data-node-id={agent.id}
      onMouseEnter={() => onHover?.(agent.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative rounded-xl border transition-all ${
        isLg
          ? "border-emerald-500/50 bg-slate-950/80 px-4 py-3 text-center shadow-glow"
          : isSm
            ? `border ${c.border} bg-slate-950/70 px-2.5 py-1.5 text-center`
            : `border ${c.border} bg-slate-950/70 px-3 py-2 text-center`
      } ${!isLg ? c.shadow : ""} hover:scale-105 ${dim ? "opacity-25" : "opacity-100"}`}
    >
      {isLg && <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-xl border border-emerald-400/50" />}
      <div className="flex items-center justify-center gap-2">
        <div
          className={`flex items-center justify-center rounded-lg border ${c.border} bg-slate-900/70 ${
            isSm ? "h-7 w-7 text-sm" : isLg ? "h-11 w-11 text-2xl" : "h-9 w-9 text-lg"
          }`}
        >
          {agent.emoji}
        </div>
        {!isSm && (
          <div className="text-left">
            <div className={`font-semibold leading-tight ${isLg ? "text-sm text-emerald-300" : "text-xs text-white"}`}>
              {agent.name}
            </div>
            <div className="text-[9px] leading-tight text-slate-400">{agent.role.split("·")[0].trim()}</div>
          </div>
        )}
      </div>
      {isSm && (
        <>
          <div className="mt-1 text-[11px] font-semibold leading-tight text-white">{agent.name}</div>
          <div className="text-[9px] leading-tight text-slate-400">{agent.role.split("·")[0].trim()}</div>
        </>
      )}
      {tag && (
        <span className="mt-1 inline-block rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-slate-400 ring-1 ring-slate-700">
          {tag}
        </span>
      )}
    </div>
  );
}