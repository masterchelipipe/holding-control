import { NextResponse } from "next/server";
import fs from "fs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ---------------------------------------------------------------
// Fuente real: Alpaca Paper Trading (misma que monitor_cartera_tags.py)
// Toda hora se entrega en CLT (UTC−4) explícitamente (regla MATÍAS-TRADING).
// ---------------------------------------------------------------

const BASE = "https://paper-api.alpaca.markets/v2";
const CLT_OFFSET_MS = 4 * 60 * 60 * 1000; // UTC → Chile Standard Time (UTC-4)

function rawEnv() {
  // 1) process.env directo
  const direct = {
    api: process.env.ALPACA_API_KEY ?? "",
    secret: process.env.ALPACA_SECRET_KEY ?? "",
  };
  if (direct.api && direct.secret) return direct;

  // 2) fallback: ~/.hermes/.env (donde viven las credenciales Alpaca del holding)
  try {
    const txt = fs.readFileSync("/home/masterpipe/.hermes/.env", "utf8");
    let api = "";
    let secret = "";
    for (const line of txt.split("\n")) {
      const m = line.trim().match(/^\s*([A-Z0-9_]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (!m) continue;
      if (m[1] === "ALPACA_API_KEY") api = m[2];
      if (m[1] === "ALPACA_SECRET_KEY") secret = m[2];
    }
    if (api && secret) return { api, secret };
  } catch {
    /* no dots — seguir */
  }
  return { api: "", secret: "" };
}

async function alpaca(path: string, api: string, secret: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "APCA-API-KEY-ID": api,
      "APCA-API-SECRET-KEY": secret,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Alpaca ${path} → HTTP ${res.status}: ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

// HH:MM (:SS) manual, sin lib de timezone — sello CLT
function formatCLT(d: Date, withSeconds = false): string {
  const p = (n: number) => String(n).padStart(2, "0");
  const hhmmss = withSeconds
    ? `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
    : `${p(d.getHours())}:${p(d.getMinutes())}`;
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${hhmmss}`;
}

function toCLT(iso: string | undefined | null, withSeconds = false): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return formatCLT(new Date(d.getTime() - CLT_OFFSET_MS), withSeconds);
}

// Tag de estrategia por símbolo (mismo criterio liviano del monitor)
const LONG_LEGACY = new Set(["AAPL", "AMZN", "GLD", "GOOGL", "META", "MSFT", "NVDA", "QQQ", "SPY"]);
function tag(sym: string): string {
  return LONG_LEGACY.has(sym.toUpperCase()) ? "LG · Long Core" : "GESTIÓN";
}

export async function GET() {
  const creds = rawEnv();
  if (!creds.api || !creds.secret) {
    return NextResponse.json(
      {
        source: "alpaca-paper",
        ok: false,
        error: "Sin credenciales ALPACA disponibles en process.env ni ~/.hermes/.env",
        updatedAtCLT: null,
      },
      { status: 503 }
    );
  }
  const { api, secret } = creds;

  try {
    const [account, positions, allOrders, openOrders] = await Promise.all([
      alpaca("/account", api, secret),
      alpaca("/positions", api, secret),
      alpaca("/orders?status=all&limit=200", api, secret),
      alpaca("/orders?status=open&limit=100", api, secret),
    ]);

    // últimas compras por símbolo (para fecha de entrada CLT de cada posición)
    const latestBuyBySymbol = new Map<string, string>();
    for (const o of allOrders ?? []) {
      if (o.side === "buy" && ["filled", "partially_filled"].includes(o.status)) {
        const key = o.symbol.toUpperCase();
        const t = o.filled_at ?? o.submitted_at;
        if (!latestBuyBySymbol.has(key) || (t && t > latestBuyBySymbol.get(key)!)) {
          latestBuyBySymbol.set(key, t);
        }
      }
    }

    // últimos movimientos (compras/ventas concretadas) con fecha CLT
    const filled = (allOrders ?? []).filter(
      (o: any) => o.status === "filled" || o.status === "partially_filled"
    );
    // incluir también como movimientos los stops abiertos cuando NO hay llenado reciente
    const movements = filled.slice(0, 10).map((o: any) => ({
      id: o.id,
      symbol: o.symbol.toUpperCase(),
      side: o.side === "buy" ? "buy" : "sell",
      qty: Number(o.filled_qty ?? o.qty ?? 0),
      price: Number(o.filled_avg_price ?? o.limit_price ?? 0),
      type: o.type,
      status: o.status,
      submittedCLT: toCLT(o.submitted_at, true),
      filledCLT: toCLT(o.filled_at, true),
    }));

    // stops activos (órdenes de venta abiertas: stop / trailing_stop / stop_limit)
    const stops = (openOrders ?? [])
      .filter((o: any) => /sell|stop/.test(o.side + o.type))
      .map((o: any) => ({
        symbol: o.symbol.toUpperCase(),
        side: o.side,
        type: o.type,
        limitPrice: o.limit_price ? Number(o.limit_price) : null,
        stopPrice: o.stop_price ? Number(o.stop_price) : null,
        trailPercent: o.trail_percent ? Number(o.trail_percent) : null,
        status: o.status,
        submittedCLT: toCLT(o.submitted_at, true),
      }));

    const posList = (positions ?? []).map((p: any) => {
      const sym = p.symbol.toUpperCase();
      const cur = Number(p.current_price);
      const rp = Number(p.unrealized_plpc ?? 0);
      const buyIso = latestBuyBySymbol.get(sym) ?? p.created_at ?? null;
      return {
        symbol: sym,
        qty: Number(p.qty ?? 0),
        avgEntry: Number(p.avg_entry_price ?? 0),
        currentPrice: cur,
        marketValue: Number(p.market_value ?? 0),
        unrealizedPl: Number(p.unrealized_pl ?? 0),
        unrealizedPlPct: rp,
        strategyTag: tag(sym),
        buyDateCLT: toCLT(buyIso),
        stop: stops.find((s: any) => s.symbol === sym) ?? null,
      };
    });

    const totalPl = posList.reduce(
      (s: number, p: { unrealizedPl: number }) => s + p.unrealizedPl,
      0
    );

    return NextResponse.json({
      source: "alpaca-paper",
      ok: true,
      updatedAtISO: new Date().toISOString(),
      updatedAtCLT: formatCLT(new Date(), true) + " CLT",
      timezone: "Hora de Chile (CLT, UTC−4)",
      equity: Number(account?.equity ?? 0),
      cash: Number(account?.cash ?? 0),
      portfolioValue: Number(account?.portfolio_value ?? 0),
      buyingPower: Number(account?.buying_power ?? 0),
      dayChange: Number(account?.equity_change ?? 0),
      totalUnrealizedPl: totalPl,
      positions: posList,
      movements,
      stops,
      counts: {
        positions: posList.length,
        openStops: stops.length,
        movements: movements.length,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        source: "alpaca-paper",
        ok: false,
        error: e instanceof Error ? e.message : "Error desconocido consultando Alpaca",
        updatedAtCLT: formatCLT(new Date(), true) + " CLT",
      },
      { status: 502 }
    );
  }
}