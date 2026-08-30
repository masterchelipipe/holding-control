import { NextResponse } from "next/server";
import { projects } from "@/lib/swarm";

export const dynamic = "force-static";

export async function GET() {
  const avg =
    Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) ||
    0;
  return NextResponse.json({
    portfolio: "Matriz de Proyectos & Empresas",
    totalProjects: projects.length,
    active: projects.filter((p) => p.status === "Activo").length,
    avgProgress: avg,
    projects,
  });
}