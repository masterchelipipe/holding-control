import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#020617",
          panel: "#0f172a",
          panel2: "#111c34",
          border: "#1e293b",
          emerald: "#10b981",
          cyan: "#22d3ee",
          purple: "#a78bfa",
        },
      },
      boxShadow: {
        glow: "0 0 25px 0 rgba(16, 185, 129, 0.15)",
        "glow-cyan": "0 0 25px 0 rgba(34, 211, 238, 0.15)",
        "glow-purple": "0 0 25px 0 rgba(167, 139, 250, 0.15)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        floatPing: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float-ping": "floatPing 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;