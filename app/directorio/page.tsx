"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  MessageSquareText,
  MessagesSquare,
  Radio,
  Timer,
} from "lucide-react";
import { debates as fallbackDebates, agents, agentById, type Debate } from "@/lib/swarm";
import { AgentAvatar, PageHeading, a } from "@/components/ui";

const FILTERS = ["todos", "en curso", "cerrado", "decisión"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS_STYLE: Record<Debate["status"], string> = {
  "en curso": "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  cerrado: "border-slate-600 bg-slate-700/40 text-slate-300",
  decisión: "border-purple-500/40 bg-purple-500/10 text-purple-300",
};

function rel(iso: string) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return iso;
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `hace ${s} s`;
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  return `hace ${Math.floor(s / 86400)} d`;
}

export default function DirectorioPage() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [selected, setSelected] = useState<string | null>(null);
  const [live, setLive] = useState<Debate[] | null>(null);
  const [source, setSource] = useState<"vivo" | "static">("vivo");

  useEffect(() => {
    fetch("/api/swarm/debates")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && Array.isArray(j.debates) && j.debates.length) {
          setLive(j.debates);
          setSource("vivo");
        }
        // si el blackboard no trae más, se queda el espejo estático del mismo canal
      })
      .catch(() => setSource("static"));
  }, []);

  const list = live ?? fallbackDebates;

  const filtered = useMemo(
    () => (filter === "todos" ? list : list.filter((d) => d.status === filter)),
    [filter, list]
  );

  const active = selected
    ? list.find((d) => d.id === selected) ?? filtered[0]
    : filtered[0];

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="💬"
        title="Sala de Directorio / Pizarra del Holding"
        subtitle="Blackboard compartido: mensajes, consultas y decisiones entre agentes del holding (espejo de blackboard.json)."
      />

      {/* estado del canal / pizarra */}
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
        <Radio className="h-4 w-4 animate-pulse text-emerald-400" />
        <span className="text-xs text-slate-300">
          Canal <span className="font-mono text-emerald-300">sala-de-directorio</span>
        </span>
        <span className="text-slate-600">·</span>
        <span className="text-xs text-slate-400">
          {list.length} entradas en la pizarra{source === "vivo" ? " · sincronizado con /api/swarm/debates" : ""}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          {list
            .filter((d) => d.status === "en curso")
            .map((d) => (
              <span key={d.id} className="chip border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                {d.participantsEmoji.join("+")}
              </span>
            ))}
        </span>
      </div>

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
                ? "border-gold-500/50 bg-gold-500/10 text-gold-300"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-slate-500">{filtered.length} entrada(s)</span>
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
                className={`glass w-full p-4 text-left transition-all ${isSel ? "border-gold-500/50 shadow-glow-gold" : ""}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`chip ${c}`}>{d.status}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Timer className="h-3 w-3" />
                    {d.ts ? rel(d.ts) : d.timestamp}
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

        {/* detalle */}
        <div className="glass flex flex-col p-5 lg:col-span-3">
          {active ? (
            <>
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className={`chip ${STATUS_STYLE[active.status]}`}>{active.status}</span>
                  <h3 className="mt-2 text-lg font-bold text-white">{active.title}</h3>
                  <div className="mt-1 text-sm text-slate-400">{active.topic}</div>
                  <div className="mt-1 flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Timer className="h-3 w-3" />
                    {active.ts ? `${rel(active.ts)} · ${new Date(active.ts).toLocaleString("es-CL")}` : active.timestamp}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {active.participants.map((id) => {
                    const ag = agents.find((x) => x.id === id)!;
                    const col = a(ag?.color ?? "emerald");
                    return (
                      <div key={id} title={ag?.name ?? id}>
                        {ag ? <AgentAvatar agent={ag} pulse /> : <span className="chip">{id}</span>}
                        <span className={`sr-only ${col.text}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-xs">
                <MessagesSquare className="h-4 w-4 text-cyan-300" />
                <span className="text-slate-500">
                  Consulta cruzada entre{" "}
                  <span className="text-cyan-300">
                    {active.participants
                      .map((id) => agentById(id)?.name ?? id)
                      .join(" + ")}
                  </span>
                </span>
              </div>

              {/* transcript */}
              <div className="mb-5 space-y-3">
                {active.participants.map((id, idx) => {
                  const ag = agentById(id);
                  if (!ag) return null;
                  const col = a(ag.color);
                  return (
                    <div key={id} className="flex items-start gap-3">
                      <AgentAvatar agent={ag} size="sm" />
                      <div className="flex-1">
                        <div className={`mb-1 text-xs font-semibold ${col.text}`}>
                          {ag.name} · {ag.role.split("·")[0].trim()}
                        </div>
                        <div className="glass-strong rounded-xl rounded-tl-sm p-3 text-sm text-slate-300">
                          {idx === 0
                            ? `"Consulta inicial: necesito revisión sobre ${active.topic.toLowerCase()}."`
                            : `"Recibido. Estimo el impacto y propongo acciones. Adjunto propuesta de mitigación y siguientes pasos conservando mi fuente única."`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Resumen</div>
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
              <p className="text-slate-400">No hay entradas en este filtro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}