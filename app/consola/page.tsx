"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleDot,
  Command,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { agents, type DispatchResult } from "@/lib/swarm";
import { a, PageHeading } from "@/components/ui";

const EXAMPLES = [
  "Necesito contratar Google Ads para el radier de hormigón y preparar el reel de marketing",
  "Revisa el impacto tributario de las ganancias de trading de esta semana y provisiona para el F22",
  "Optimiza el flujo de arriendos de MasterRent y genera el DTE electrónico",
];

export default function ConsolaPage() {
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<DispatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function dispatch(text: string) {
    const cmd = text.trim();
    if (!cmd) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/swarm/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cmd }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = (await res.json()) as DispatchResult;
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al despachar");
    } finally {
      setBusy(false);
    }
  }

  const stageIdx =
    result?.stages.reduce((acc, s) => Math.max(acc, 0), 0) ?? 0;

  return (
    <div className="animate-fade-in">
      <PageHeading
        emoji="🎮"
        title="Consola de Mando / Despacho"
        subtitle="Don Gonzalo dicta una orden; Lorenzo la descompone y delega al swarm."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* input */}
        <div className="glass flex flex-col gap-4 p-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Command className="h-4 w-4 text-emerald-300" />
            <span className="text-sm font-semibold text-white">Escribir orden</span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="Ej: Necesito un reel de marketing para el proyecto de radieres y revisar la tributación del trading…"
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            onClick={() => dispatch(prompt)}
            disabled={busy || !prompt.trim()}
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-300 shadow-glow transition-colors hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Enviar al CEO Lorenzo
          </button>

          <div className="mt-1">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ejemplos rápidos
            </div>
            <div className="space-y-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setPrompt(ex);
                    dispatch(ex);
                  }}
                  disabled={busy}
                  className="flex w-full items-start gap-2 rounded-lg border border-slate-800 bg-slate-800/40 p-2.5 text-left text-xs text-slate-300 transition-colors hover:border-slate-600 hover:text-white disabled:opacity-50"
                >
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* result */}
        <div className="glass flex flex-col p-5 lg:col-span-3">
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {!result && !busy && (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-3xl shadow-glow">
                👑
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400" />
                </span>
              </div>
              <p className="text-slate-400">
                Lorenzo está a la espera de su orden, Don Gonzalo.
              </p>
            </div>
          )}

          {busy && !result && (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <Loader2 className="mb-3 h-10 w-10 animate-spin text-emerald-400" />
              <p className="text-slate-400">Descomponiendo y delegando…</p>
            </div>
          )}

          {result && (
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Despacho procesado
                  </div>
                  <div className="text-sm font-semibold text-white">"{result.command}"</div>
                </div>
                <span className="chip shrink-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  por @lorenzo
                </span>
              </div>

              <p className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-300">
                {result.summary}
              </p>

              {/* stages */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-cyan-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Flujo de trabajo
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {result.stages.map((s, i) => {
                    const done = i < stageIdx; // simulated progression
                    const current = i === 0;
                    return (
                      <div
                        key={s.name}
                        className={`rounded-lg border p-3 ${
                          current
                            ? "border-emerald-500/40 bg-emerald-500/10"
                            : "border-slate-800 bg-slate-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : current ? (
                            <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                          ) : (
                            <CircleDot className="h-4 w-4 text-slate-600" />
                          )}
                          <span className="text-sm font-semibold capitalize text-white">
                            {s.name}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{s.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* decomposition */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Descomposición de Lorenzo
                </div>
                <ol className="space-y-1.5">
                  {result.decomposition.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-[10px] text-slate-400">
                        {i + 1}
                      </span>
                      {d}
                    </li>
                  ))}
                </ol>
              </div>

              {/* assignments */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-emerald-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Delegación ({result.assignments.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {result.assignments.map((asg) => {
                    const ag = agents.find((x) => x.id === asg.agentId);
                    const color = ag ? ag.color : "emerald";
                    const c = a(color);
                    return (
                      <div key={asg.agentId + asg.task} className="glass-strong p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{asg.emoji}</span>
                          <div className="min-w-0">
                            <div className={`text-sm font-semibold ${c.text}`}>
                              {ag?.name ?? asg.agentId}
                            </div>
                            <div className="text-[11px] text-slate-400">{ag?.role}</div>
                          </div>
                          <span className="chip ml-auto capitalize">{asg.status}</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-300">{asg.task}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}