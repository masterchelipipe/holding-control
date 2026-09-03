import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { agents } from "@/lib/swarm";

export const metadata: Metadata = {
  title: "Holding Control · Nexus Swarm",
  description:
    "Dashboard del equipo ejecutivo autónomo de Don Gonzalo: pirámide Propietario → Lorenzo (CEO) → 5 divisiones → especialistas y subagentes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6">
          <Header />
          <main className="flex-1 pb-16">{children}</main>
          <footer className="border-t border-slate-800/70 py-6 text-xs text-slate-500">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                Holding Control · Nexus Multi-Agent Swarm —{" "}
                <span className="text-emerald-400">{agents.length} agentes activos</span>{" "}
                · <span className="text-gold-400">Don Gonzalo → Lorenzo</span>
              </span>
              <span className="font-mono">Desplegado por Don Gonzalo's Executive Team</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}