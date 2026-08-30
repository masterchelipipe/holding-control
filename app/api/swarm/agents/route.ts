import { NextResponse } from "next/server";
import { agents } from "@/lib/swarm";

export const dynamic = "force-static";

export async function GET() {
  const metadata = {
    holding: "Holding Control",
    platform: "Nexus Multi-Agent Swarm",
    totalAgents: agents.length,
    activeAgents: agents.filter((a) => a.status === "active").length,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    metadata,
    agents,
  });
}