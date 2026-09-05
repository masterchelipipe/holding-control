"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Loader2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Wallet,
  Clock,
} from "lucide-react";
import { PageHeading } from "@/components/ui";

// Tipos espejo de /api/swarm/trading
interface Stop {
  symbol: string;
  side: string;
  type: string;
  limitPrice: number | null;
  stopPrice: number | null;
  trailPercent: number | null;
  status: string;
  submittedCLT: string | null;
}
interface Position {
  symbol: string;
  qty: number;
  avgEntry: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPl: number;
  unrealizedPlPct: number;
  strategyTag: string;
  buyDateCLT: string | null;
  stop: Stop | null;
}
interface Movement {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  qty: number;
  price: number;
  type: string;
  status: string;
  submittedCLT: string | null;
  filledCLT: string | null;
}
interface TradingData {
  ok: boolean;
  error?: string;
  source?: string;
  updatedAtCLT: string | null;
  timezone?: string;
  equity?: number;
  cash?: number;
  portfolioValue?: number;
  buyingPower?: number;
  totalUnrealizedPl?: number;
  dayChange?: number;
  positions?: Position[];
  movements?: Movement[];
  stops?: Stop[];
  counts?: { positions: number; openStops: number; movements: number };
}

const fmtUSD = (n: number | undefined, sign = false) => {
  if (n === undefined || isNaN(n)) return "—";
  const s = n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return sign && n > 0 ? `+${s}` : s;
};

export default function TradingPage() {
  const [data, setData] = useState<TradingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/swarm/trading", { cache: "no-store" });
      const json = (await res.json()) as TradingData;
      if (!res.ok || json.ok === false) {
        setErr(json.error ?? `HTTP ${res.status}`);
      }
      setData(json);
      setLastFetch(
        new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error al consultar cartera");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ul = (p: Position) => p.unrealizedPl;

  return (
    <div className="space-y-6">
      <PageHeading
        emoji="📈"
        title="Cartera de Trading — TradeX"
        subtitle="Posiciones, compras/ventas y stops desde la API real de Alpaca (Paper). Todas las fechas en hora CLT (UTC−4)."
      />

      {/* ===== BANNER ¡ÚLTIMA ACTUALIZACIÓN! ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-500/40 bg-gold-500/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gold-400" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              Última actualización
            </div>
            <div className="font-mono text-lg font-bold text-white">
              {data?.updatedAtCLT ?? "…"}
            </div>
            <div className="text-[11px] text-slate-400">
              {data?.timezone ?? "Hora de Chile (CLT, UTC−4)"} · fuente {data?.source ?? "Alpaca"}
            </div>
          </div>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-gold-300 transition hover:bg-slate-900 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refrescar
        </button>
      </div>

      {err && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-800/50 bg-rose-950/30 p-4 text-sm text-rose-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div className="font-semibold">No se pudo leer la cartera</div>
            <div className="text-rose-200/80">{err}</div>
          </div>
        </div>
      )}

      {/* ===== KPIs ===== */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Equity total" value={fmtUSD(data?.equity)} icon={<Wallet className="h-4 w-4 text-emerald-300" />} />
        <Kpi label="Caja disponible" value={fmtUSD(data?.cash)} icon={<Wallet className="h-4 w-4 text-cyan-300" />} />
        <Kpi
          label="P&L no realizado"
          value={fmtUSD(data?.totalUnrealizedPl, true)}
          tone={(data?.totalUnrealizedPl ?? 0) >= 0 ? "up" : "down"}
        />
        <Kpi label="Nº posiciones" value={String(data?.counts?.positions ?? 0)} icon={<Wallet className="h-4 w-4 text-gold-300" />} />
      </div>

      {/* ===== POSICIONES ACTUALES ===== */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Posiciones actuales
          <span className="ml-2 text-slate-600">({data?.counts?.positions ?? 0})</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <Th>Symbol</Th>
                <Th>Tag</Th>
                <Th className="text-right">Qty</Th>
                <Th className="text-right">Entrada</Th>
                <Th className="text-right">Precio</Th>
                <Th className="text-right">P&L</Th>
                <Th>Compra CLT</Th>
                <Th>Stop</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(data?.positions ?? []).length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    Sin posiciones abiertas.
                  </td>
                </tr>
              )}
              {loading &&
                [0, 1].map((i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-3 w-16 rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))}
              {(data?.positions ?? []).map((p) => (
                <tr key={p.symbol} className="transition-colors hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-mono font-bold text-white">{p.symbol}</td>
                  <td className="px-4 py-3">
                    <span className="chip">{p.strategyTag}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-200">{p.qty}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-300">{p.avgEntry ? fmtUSD(p.avgEntry) : "—"}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-200">{fmtUSD(p.currentPrice)}</td>
                  <td className={`px-4 py-3 text-right font-mono ${ul(p) >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                    {fmtUSD(ul(p), true)}{" "}
                    <span className="text-[10px]">({(p.unrealizedPlPct * 100).toFixed(2)}%)</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-300">{p.buyDateCLT ?? "—"}</td>
                  <td className="px-4 py-3">
                    {p.stop ? (
                      <span className="inline-flex items-center gap-1.5 chip border-emerald-500/40 text-emerald-300">
                        <ShieldCheck className="h-3 w-3" />
                        {stopLabel(p.stop)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 chip border-rose-500/40 text-rose-300">
                        <ShieldAlert className="h-3 w-3" />
                        SIN STOP
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== ÚLTIMOS MOVIMIENTOS ===== */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Últimos movimientos
          <span className="ml-2 text-slate-600">({data?.counts?.movements ?? 0})</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <Th>Fecha CLT</Th>
                <Th>Symbol</Th>
                <Th>Acción</Th>
                <Th className="text-right">Qty</Th>
                <Th className="text-right">Precio</Th>
                <Th>Tipo</Th>
                <Th>Estado</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(data?.movements ?? []).length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Sin movimientos recientes.
                  </td>
                </tr>
              )}
              {(data?.movements ?? []).map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-mono text-[12px] text-white">{m.filledCLT ?? m.submittedCLT ?? "—"}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-100">{m.symbol}</td>
                  <td className="px-4 py-3">
                    {m.side === "buy" ? (
                      <span className="inline-flex items-center gap-1 chip border-emerald-500/40 text-emerald-300">
                        <ArrowDownCircle className="h-3 w-3" /> Compra
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 chip border-rose-500/40 text-rose-300">
                        <ArrowUpCircle className="h-3 w-3" /> Venta
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-200">{m.qty}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-200">{fmtUSD(m.price)}</td>
                  <td className="px-4 py-3 text-slate-400">{m.type}</td>
                  <td className="px-4 py-3 text-slate-400">{m.status}</td>
                </tr>
              ))}
              {loading &&
                [0, 1].map((i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-3 w-16 rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {lastFetch && (
        <p className="text-right text-[11px] text-slate-600">
          Consulta local al API: {lastFetch} · veras en CLT
        </p>
      )}
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
  icon?: React.ReactNode;
}) {
  const toneCls =
    tone === "up" ? "text-emerald-300" : tone === "down" ? "text-rose-300" : "text-white";
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
        {icon}
        {label}
      </div>
      <div className={`font-mono text-xl font-bold ${toneCls}`}>{value}</div>
    </div>
  );
}

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={`px-4 py-3 font-medium ${className ?? ""}`}>{children}</th>;
}

function stopLabel(s: Stop): string {
  if (s.trailPercent) return `trail ${s.trailPercent}%`;
  if (s.stopPrice) return `stop ${s.stopPrice.toFixed(2)}`;
  if (s.limitPrice) return `limit ${s.limitPrice.toFixed(2)}`;
  return s.type;
}