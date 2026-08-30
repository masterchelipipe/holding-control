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
import { PageHeading } from "@/components/ui";

const EXAMPLES = [
  "Necesito una campaña de Google Ads y video publicitario para radier de hormigón en Concepción",
  "Revisa el impacto tributario de las ganancias de Alpaca y provisiona para el F22 ante el SII",
  "Scrapear portales de licitaciones de Mercado Público para obras civiles y mostrarlo en una tabla",
  "Construir nueva interfaz UI/UX en Next.js 14 para la app de arriendos MasterRent",
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
      if (!res.ok) throw new Error("Error en el despacho");
      const data: DispatchResult = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fallo al comunicar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeading
        title="Consola de Mando & Despacho de Órdenes"
        subtitle="Usted habla con Lorenzo (CEO) y el sistema analiza, descompone y delega a los 8 directores especialistas de forma automática."
        badge="Live Routing"
      />

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(prompt);
          }}
          className="space-y-4"
        >
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Instrucción u Orden General para el Holding
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Necesito revisar el impacto tributario de Alpaca y preparar el nuevo reel de radieres con fotos reales..."
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 py-1 font-medium">Ejemplos rápidos:</span>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPrompt(ex);
                    dispatch(ex);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-800/50 px-2.5 py-1 text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition"
                >
                  {ex.slice(0, 35)}...
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={busy || !prompt.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/50 hover:bg-emerald-500 disabled:opacity-50 transition"
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Orquestando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Despachar Orden
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-800/50 bg-rose-950/30 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Proyecto Detectado:
              </span>
              <h3 className="text-lg font-bold text-white">{result.detectedProject}</h3>
              <p className="text-xs text-slate-400">Intención: {result.intent}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Líder Asignado:</span>
              <div className="text-sm font-bold text-slate-200">{result.leadAgent}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Plan de Ejecución por Especialistas (Swarm Stages)
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {result.stages.map((stg, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stg.agentEmoji}</span>
                      <span className="text-sm font-bold text-white">{stg.agentName}</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                      {stg.action}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{stg.detail}</p>
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>📦 {stg.deliverable}</span>
                    <span className="text-amber-400 font-mono">Costo: {stg.estimatedCost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{result.supervisorCheck}</span>
            </div>
            <span className="text-slate-400">Supervisado por Lorenzo 👑</span>
          </div>
        </div>
      )}
    </div>
  );
}
