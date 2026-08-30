"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Lightbulb, MessageSquareText, MessagesSquare, Timer } from "lucide-react";
import { debates, agents, type Debate } from "@/lib/swarm";
import { AgentAvatar, PageHeading, a } from "@/components/ui";

const FILTERS = ["todos", "en curso", "cerrado", "decisión"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS_STYLE: Record<Debate["status"], string> = {
  "en curso": "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  cerrado: "border-slate-600 bg-slate-700/40 text-slate-300",
  decisión: "border-purple-500/40 bg-purple-500/10 text-purple-300",
};

export default function DirectorioPage() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "todos" ? debates : debates.filter((d) => d.status === filter)),
    [filter]
  );

  const active = selected
    ? debates.find((d) => d.id === selected) ?? filtered[0]
    : filtered[0];

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="💬"
        title="Sala de Directorio / Live Debates"
        subtitle="Deliberaciones y consultas cruzadas recientes entre los agentes del holding."
      />

      {/* filter tabs */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setSelected(null);
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-slate-500">
          {filtered.length} debate(s)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* feed */}
        <div className="space-y-3 lg:col-span-2">
          {filtered.map((d) => {
            const c = STATUS_STYLE[d.status];
            const isSel = active?.id === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelected(d.id)}
                className={`glass w-full p-4 text-left transition-all ${isSel ? "border-emerald-500/50 shadow-glow" : ""}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`chip ${c}`}>{d.status}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Timer className="h-3 w-3" />
                    {d.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{d.participantsEmoji.join(" + ")}</span>
                  <div className="font-semibold text-white">{d.title}</div>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">{d.summary}</p>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div className="glass flex flex-col p-5 lg:col-span-3">
          {active ? (
            <>
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className={`chip ${STATUS_STYLE[active.status]}`}>{active.status}</span>
                  <h3 className="mt-2 text-lg font-bold text-white">{active.title}</h3>
                  <div className="mt-1 text-sm text-slate-400">{active.topic}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {active.participants.map((id) => {
                    const ag = agents.find((x) => x.id === id)!;
                    return <AgentAvatar key={id} agent={ag} pulse />;
                  })}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-xs">
                <MessagesSquare className="h-4 w-4 text-cyan-300" />
                <span className="text-slate-500">
                  Consulta cruzada entre{" "}
                  <span className="text-cyan-300">
                    {active.participants
                      .map((id) => agents.find((x) => x.id === id)?.name)
                      .join(" + ")}
                  </span>
                </span>
              </div>

              {/* transcript */}
              <div className="mb-5 space-y-3">
                {active.participants.map((id, idx) => {
                  const ag = agents.find((x) => x.id === id)!;
                  const c = a(ag.color);
                  return (
                    <div key={id} className="flex items-start gap-3">
                      <AgentAvatar agent={ag} size="sm" />
                      <div className="flex-1">
                        <div className={`mb-1 text-xs font-semibold ${c.text}`}>
                          {ag.name} · {ag.role.split("&")[0].trim()}
                        </div>
                        <div className="glass-strong rounded-xl rounded-tl-sm p-3 text-sm text-slate-300">
                          {idx === 0
                            ? `"Consulta inicial: necesito revisión sobre ${active.topic.toLowerCase()}."`
                            : `"Recibido, ${ag.name === "Felipe" ? "Matías" : "Valentina"}. Estimo el impacto y propongo acciones. Adjunto propuesta de mitigación y siguientes pasos."`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Resumen
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{active.summary}</p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
                  Insights / Decisiones
                </div>
                <ul className="space-y-2">
                  {active.insights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      {active.status === "decisión" ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      )}
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
              <MessageSquareText className="mb-3 h-10 w-10 text-slate-600" />
              <p className="text-slate-400">No hay debates en este filtro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}