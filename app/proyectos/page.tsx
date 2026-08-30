"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CircleDot, FolderOpen, Layers, TrendingUp } from "lucide-react";
import { projects, type Project } from "@/lib/swarm";
import { a, PageHeading } from "@/components/ui";

const STATUS_STYLE: Record<Project["status"], string> = {
  Activo: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  "En desarrollo": "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  "En vigilancia": "border-amber-500/40 bg-amber-500/10 text-amber-300",
  Planificado: "border-purple-500/40 bg-purple-500/10 text-purple-300",
};

const STATE_STYLE = {
  operativo: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "en progreso": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  backlog: "bg-slate-700/40 text-slate-400 border-slate-600",
} as const;

export default function ProyectosPage() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  const totals = useMemo(
    () => ({
      count: projects.length,
      avg: Math.round(
        projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
      ),
    }),
    []
  );

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="📁"
        title="Matriz de Proyectos & Empresas"
        subtitle="Portafolio del holding: Terranova, MasterRent, TradeX y Obra Control / Matex."
      />

      {/* summary strip */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass flex items-center gap-3 p-4">
          <Building2 className="h-5 w-5 text-cyan-300" />
          <div>
            <div className="font-mono text-xl font-bold text-white">{projects.length}</div>
            <div className="text-xs text-slate-400">Empresas / Proyectos</div>
          </div>
        </div>
        <div className="glass flex items-center gap-3 p-4">
          <CircleDot className="h-5 w-5 text-emerald-300" />
          <div>
            <div className="font-mono text-xl font-bold text-white">
              {projects.filter((p) => p.status === "Activo").length}
            </div>
            <div className="text-xs text-slate-400">Activos</div>
          </div>
        </div>
        <div className="glass flex items-center gap-3 p-4">
          <Layers className="h-5 w-5 text-purple-300" />
          <div>
            <div className="font-mono text-xl font-bold text-white">{totals.avg}%</div>
            <div className="text-xs text-slate-400">Avance promedio</div>
          </div>
        </div>
        <div className="glass flex items-center gap-3 p-4">
          <TrendingUp className="h-5 w-5 text-amber-300" />
          <div>
            <div className="font-mono text-xl font-bold text-white">
              $100k<span className="text-sm text-slate-400">+</span>
            </div>
            <div className="text-xs text-slate-400">Activos monitoreados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* project cards */}
        <div className="space-y-3 lg:col-span-2">
          {projects.map((p) => {
            const c = a(p.color);
            const isSel = activeId === p.id;
            const sel = active.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`glass w-full p-5 text-left transition-all ${
                  isSel ? "border-emerald-500/50 shadow-glow" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${c.border} ${c.bg}`}>
                      {p.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{p.name}</span>
                        {sel && <span className="text-emerald-400">●</span>}
                      </div>
                      <div className="text-xs text-slate-400">{p.company}</div>
                    </div>
                  </div>
                  <span className={`chip ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                </div>

                <p className="mt-3 text-sm text-slate-300">{p.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  {p.agents.map((ag) => (
                    <span key={ag.id} title={ag.id} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/70 text-sm">
                      {ag.emoji}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-xs text-slate-500">
                    {p.progress}% avance
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        <div className="glass flex flex-col p-5">
          {active && (
            <>
              <div className="mb-4 flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${a(active.color).border} ${a(active.color).bg}`}>
                  {active.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white">{active.name}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <FolderOpen className="h-3 w-3" />
                    {active.company}
                  </div>
                </div>
                <span className={`chip ml-auto ${STATUS_STYLE[active.status]}`}>
                  {active.status}
                </span>
              </div>

              {/* progress bar */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Avance general</span>
                  <span className="font-mono text-white">{active.progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 transition-all"
                    style={{ width: `${active.progress}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Módulos
                </div>
                <div className="space-y-2">
                  {active.modules.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/40 px-3 py-2"
                    >
                      <span className="text-sm text-slate-200">{m.name}</span>
                      <span className={`chip capitalize ${STATE_STYLE[m.state]}`}>
                        {m.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Agentes involucrados
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {active.agents.map((ag) => {
                    const agentColor =
                      {
                        rodrigo: "orange",
                        valentina: "pink",
                        lucas: "cyan",
                        felipe: "amber",
                        matias: "purple",
                        lorenzo: "emerald",
                      }[ag.id] ?? "emerald";
                    return (
                      <Link
                        key={ag.id}
                        href="/organigrama"
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                      >
                        <span className="text-sm">{ag.emoji}</span>
                        <span className="capitalize">
                          {ag.id === "rodrigo" ? "Rodrigo" : ag.id === "valentina" ? "Valentina" : ag.id === "lucas" ? "Lucas" : ag.id === "felipe" ? "Felipe" : ag.id === "matias" ? "Matías" : "Lorenzo"}
                        </span>
                        <span className={`h-1.5 w-1.5 rounded-full ${a(agentColor).solid}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}