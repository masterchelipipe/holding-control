"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Radio, Route } from "lucide-react";
import { agents, agentById } from "@/lib/swarm";
import { AgentAvatar, PageHeading, a } from "@/components/ui";

const SELECTABLE = ["all", ...agents.map((x) => x.id)] as const;
type Selectable = (typeof SELECTABLE)[number];

export default function OrganigramaPage() {
  const [focus, setFocus] = useState<Selectable>("all");
  const [hover, setHover] = useState<string | null>(null);

  const ceo = agents.find((x) => x.id === "lorenzo")!;
  const lieutenants = agents.filter((x) => x.id !== "lorenzo");

  const teamSrc = hover ? agentById(hover)?.emoji : "🏢";

  const centerLayout = useMemo(() => {
    const cx = 50;
    const cy = 46;
    return lieutenants.map((_, i) => {
      const angle = -90 + (360 / lieutenants.length) * i;
      const rad = (angle * Math.PI) / 180;
      const rx = 34;
      const ry = 32;
      return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad), angle };
    });
  }, []);

  const activeNode = (id: string) =>
    focus === "all" || focus === id;

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="🏢"
        title="Organigrama & Red de Agentes"
        subtitle="Mapa interactivo del equipo ejecutivo autónomo de Don Gonzalo."
      />

      {/* role heading */}
      <div className="glass mb-5 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-2xl shadow-glow">
            👑
          </div>
          <div>
            <div className="font-semibold text-white">Lorenzo — CEO & Lead Orchestrator</div>
            <div className="text-sm text-slate-400">
              Nodo central: descompone órdenes y coordina a los 6 agentes del swarm.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs text-emerald-300">LIVE · red activa</span>
        </div>
      </div>

      {/* filters */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">
          Ver:
        </span>
        <button
          onClick={() => setFocus("all")}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            focus === "all"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200"
          }`}
        >
          Todos
        </button>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setFocus(agent.id)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              focus === agent.id
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>{agent.emoji}</span>
            {agent.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Network map */}
        <div className="glass relative overflow-hidden p-4 lg:col-span-2">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(30,41,59,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.4)_1px,transparent_1px)] [background-size:44px_44px]" />
          <svg viewBox="0 0 100 100" className="relative w-full">
            <defs>
              <filter id="blur">
                <feGaussianBlur stdDeviation="0.3" />
              </filter>
            </defs>

            {/* edges */}
            {lieutenants.map((lt, i) => {
              const pos = centerLayout[i];
              const on = activeNode(lt.id);
              const dim = focus !== "all" && focus !== lt.id;
              return (
                <line
                  key={`l-${lt.id}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={50}
                  y2={46}
                  stroke={dim ? "#1e293b" : "#10b981"}
                  strokeWidth={on ? 0.9 : 0.4}
                  opacity={dim ? 0.25 : 0.6}
                  filter="url(#blur)"
                  strokeDasharray="2 2"
                />
              );
            })}

            {/* cross-consultation edges */}
            {[
              ["felipe", "matias"],
              ["valentina", "rodrigo"],
              ["lucas", "felipe"],
              ["matias", "lorenzo"],
            ].map(([from, to], i) => {
              const fa = agents.find((x) => x.id === from)!;
              const ta = agents.find((x) => x.id === to)!;
              const fp = centerLayout[lieutenants.indexOf(fa)];
              const tp = centerLayout[lieutenants.indexOf(ta)];
              if (!fp || !tp) return null;
              return (
                <line
                  key={`c-${i}`}
                  x1={fp.x}
                  y1={fp.y}
                  x2={tp.x}
                  y2={tp.y}
                  stroke="#a78bfa"
                  strokeWidth={0.35}
                  opacity={0.35}
                  strokeDasharray="1.5 3"
                />
              );
            })}
          </svg>

          {/* animated edge pulse (overlay) */}
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {lieutenants.map((lt, i) => {
              const pos = centerLayout[i];
              return (
                <circle key={`p-${lt.id}`} cx={pos.x} cy={pos.y} r={1.1} fill="none" stroke="#10b981" strokeWidth={0.15} className="origin-center animate-pulse" opacity={0.7} />
              );
            })}
          </svg>

          {/* wheel of lieutenants */}
          {lieutenants.map((agent, i) => {
            const pos = centerLayout[i];
            const on = activeNode(agent.id);
            const dim = focus !== "all" && focus !== agent.id;
            const c = a(agent.color);
            const isHover = hover === agent.id;
            return (
              <button
                key={agent.id}
                onMouseEnter={() => setHover(agent.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setFocus(focus === agent.id ? "all" : (agent.id as Selectable))}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-all ${
                  dim ? "opacity-25" : "opacity-100"
                } ${c.border} ${c.bg} ${c.shadow} ${
                  isHover || on ? "scale-105" : "scale-100"
                }`}
              >
                <div className="relative flex flex-col items-center gap-1 p-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-2xl">
                    {agent.emoji}
                    {on && (
                      <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white">{agent.name}</div>
                </div>
              </button>
            );
          })}

          {/* center CEO node */}
          <div
            onMouseEnter={() => setHover("lorenzo")}
            onMouseLeave={() => setHover(null)}
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative rounded-2xl border border-emerald-500/50 bg-slate-950/80 px-4 py-3 text-center shadow-glow">
              <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-2xl border border-emerald-400/60" />
              <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-2xl">
                {teamSrc}
              </div>
              <div className="text-sm font-bold text-emerald-300">
                Lorenzo · CEO
              </div>
              <div className="text-[10px] text-slate-400">Orquestador</div>
            </div>
          </div>
        </div>

        {/* detail panel */}
        <div className="glass flex flex-col p-5">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Route className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              {hover
                ? `${agentById(hover)?.emoji} ${agentById(hover)?.name}`
                : "Detalle de agente"}
            </span>
          </div>

          {(() => {
            const agent =
              (hover ? agentById(hover) : focus !== "all" ? agentById(focus) : null) ??
              ceo;
            const c = a(agent.color);
            return (
              <div className="flex flex-1 flex-col gap-4">
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
                  <span className="chip">{agent.projects.length} proyectos</span>
                  <span className="chip">{agent.connectedChannels.length} canales</span>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Habilidades
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.coreSkills.map((s) => (
                      <span key={s} className={`rounded-md px-2 py-0.5 text-xs ${c.bg} ${c.text}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Responsabilidades
                  </div>
                  <ul className="space-y-1.5">
                    {agent.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.solid}`} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Proyectos vinculados
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.projects.map((p) => (
                      <Link
                        key={p}
                        href="/proyectos"
                        className="chip transition-colors hover:border-slate-600 hover:text-white"
                      >
                        {p}
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}