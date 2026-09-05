"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Gauge,
  Layers3,
  MessageSquareText,
  Network,
  Radio,
  TrendingUp,
} from "lucide-react";
import { agents, owner } from "@/lib/swarm";
import { NexusLogo } from "@/components/Logo";

const NAV = [
  {
    href: "/organigrama",
    label: "Organigrama & Red",
    emoji: "🏢",
    icon: Network,
  },
  {
    href: "/directorio",
    label: "Sala de Directorio",
    emoji: "💬",
    icon: MessageSquareText,
  },
  {
    href: "/proyectos",
    label: "Matriz de Proyectos",
    emoji: "📁",
    icon: Layers3,
  },
  {
    href: "/trading",
    label: "Cartera Trading",
    emoji: "📈",
    icon: TrendingUp,
  },
  {
    href: "/consola",
    label: "Consola de Mando",
    emoji: "🎮",
    icon: Gauge,
  },
];

export function Header() {
  const pathname = usePathname();
  const activeCount = agents.filter((a) => a.status === "active").length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex flex-col gap-3 py-3">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/organigrama" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/40 bg-slate-950 shadow-glow-gold">
              <NexusLogo size={30} />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-400" />
              </span>
            </div>
            <div>
              <div className="font-mono text-sm font-bold tracking-tight text-white uppercase">
                Holding Control
              </div>
              <div className="text-[11px] text-slate-400">
                Nexus <span className="text-gold-300">·</span>{" "}
                {owner.name} → Lorenzo → {agents.length} agentes
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="font-mono">{agents.length} Agentes</span>
            </div>
            <div className="chip">
              <Database className="h-3.5 w-3.5 text-cyan-300" />
              <span className="font-mono">$100k Alpaca + Web + Rentals</span>
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-glow"
                    : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden md:inline">{item.label}</span>
                <Icon
                  className={`h-4 w-4 md:hidden ${
                    active ? "text-emerald-300" : "text-slate-500"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}