import { NextResponse } from "next/server";
import { simulateDispatch } from "@/lib/swarm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let prompt: string;
  try {
    const body = await req.json();
    prompt = typeof body?.prompt === "string" ? body.prompt : "";
  } catch {
    prompt = "";
  }

  if (!prompt.trim()) {
    return NextResponse.json(
      { error: "Se requiere el campo 'prompt'." },
      { status: 400 }
    );
  }

  const result = simulateDispatch(prompt);
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    method: "POST",
    description:
      "Recibe { prompt: string } y devuelve el despacho y delegación del CEO Lorenzo.",
    contract: "POST /api/swarm/dispatch  body={ prompt }",
  });
}