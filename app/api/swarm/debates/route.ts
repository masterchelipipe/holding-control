import { NextResponse } from "next/server";
import { debates } from "@/lib/swarm";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    channel: "sala-de-directorio",
    total: debates.length,
    live: debates.filter((d) => d.status === "en curso").length,
    debates,
  });
}