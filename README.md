# Holding Control · Nexus Multi-Agent Swarm Dashboard

Dashboard web del **equipo ejecutivo autónomo** de Don Gonzalo, construido con
**Next.js 14 (App Router)**, **Tailwind CSS** y **Lucide React**, con tema
**Dark Tech** (Slate 950 · acentos Emerald/Cyan/Purple · tarjetas glassmorphism).

## Swarm (6 agentes activos)

| Agente | Rol | Foco |
|--------|-----|------|
| 👑 Lorenzo | CEO & Lead Orchestrator | Estrategia, descomposición, reporte consolidado |
| 💻 Lucas | CTO & Lead Engineer | Next.js 14, TypeScript, Prisma, Neon, webhooks, APIs |
| 📊 Felipe | CFO & Especialista Tributario | SII (F22, DJ 1929), SpA, planificación, cash flow |
| 📈 Matías | Head of Quantitative Trading | Alpaca, overnight Tech/IA, Core Long, Filtro Cornejo |
| 📣 Valentina | CMO & Growth/Media Director | Google/Meta Ads, video AI reels, SEO & copy |
| 🏗️ Rodrigo | COO & Lead Civil Engineer | Obras, hormigón, radieres, cubicaciones, MasterRent Ops |

## Páginas

- `/organigrama` — 🏢 Mapa interactivo de la red de agentes (nodos pulsantes, enrutado).
- `/directorio` — 💬 Sala de Directorio / Live Debates (deliberaciones y consultas cruzadas).
- `/proyectos` — 📁 Matriz de Proyectos: Terranova, MasterRent SpA, TradeX, Obra Control/Matex.
- `/consola` — 🎮 Consola de Mando / Despacho (descomposición y delegación del CEO).

## API Routes

- `GET /api/swarm/agents` — 6 agentes con specs, skills, status y canales.
- `GET /api/swarm/debates` — deliberaciones estructuradas recientes.
- `GET /api/swarm/projects` — estado del portafolio.
- `POST /api/swarm/dispatch` — recibe `{ prompt }` y simula el ruteo/delegación del CEO.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción (verificado)
npm start        # servidor de producción
```

## Vercel

Listo para despliegue: la app es 100% estática + rutas API. Conecta el repo y
Vercel detecta automáticamente Next.js (`npm run build`).