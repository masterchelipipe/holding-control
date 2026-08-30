import type { Agent } from "@/lib/swarm";

// Tailwind accent-class mapping per agent color.
export const accent: Record<string, Record<string, string>> = {
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    ring: "ring-emerald-400/40",
    solid: "bg-emerald-400/90",
    shadow: "shadow-glow",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/40",
    ring: "ring-cyan-400/40",
    solid: "bg-cyan-400/90",
    shadow: "shadow-glow-cyan",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    ring: "ring-amber-400/40",
    solid: "bg-amber-400/90",
    shadow: "shadow-glow",
  },
  purple: {
    text: "text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/40",
    ring: "ring-purple-400/40",
    solid: "bg-purple-400/90",
    shadow: "shadow-glow-purple",
  },
  pink: {
    text: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/40",
    ring: "ring-pink-400/40",
    solid: "bg-pink-400/90",
    shadow: "shadow-glow",
  },
  orange: {
    text: "text-orange-300",
    bg: "bg-orange-500/10",
    border: "border-orange-500/40",
    ring: "ring-orange-400/40",
    solid: "bg-orange-400/90",
    shadow: "shadow-glow",
  },
};

export const a = (color: string) =>
  accent[color] ?? accent.emerald;

export function AgentAvatar({
  agent,
  size = "md",
  pulse = false,
}: {
  agent: Pick<Agent, "emoji" | "color">;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}) {
  const c = a(agent.color);
  const dims =
    size === "sm"
      ? "h-8 w-8 text-base"
      : size === "lg"
        ? "h-14 w-14 text-2xl"
        : "h-10 w-10 text-xl";
  return (
    <div className={`relative flex ${dims} items-center justify-center rounded-xl border ${c.border} ${c.bg}`}>
      <span>{agent.emoji}</span>
      {pulse && (
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
      )}
    </div>
  );
}

export function PageHeading({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-xl">
        {emoji}
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h1>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}