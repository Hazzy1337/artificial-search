import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Architecture",
  description: "Artificial Search frontend, backend, database and API route architecture.",
}

const apiRoutes = [
  "GET /api/models",
  "GET /api/agents",
  "GET /api/mcp-servers",
  "GET /api/skill-packs",
  "GET /api/skill-packs/[id]",
  "GET /api/skill-packs/[id]/manifest",
  "GET /api/recommendations",
  "GET /api/qa",
  "GET /api/me",
  "POST /api/subscription/change",
]

export default function ArchitectureDocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Architecture</p>
        <h1 className="text-3xl font-semibold text-stone-50">Fullstack structure</h1>
      </section>

      <section className="luxury-panel rounded-lg p-5 text-sm leading-6 text-stone-300">
        <p>Frontend: Next.js App Router, TypeScript, Tailwind CSS and reusable React components.</p>
        <p>Backend: Next API route handlers under `src/app/api`.</p>
        <p>Database: Prisma Client with SQLite for local course demo.</p>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">Data flow</h2>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-stone-300/15 bg-black/35 p-4 text-xs leading-6 text-stone-300">
{`Browser UI
  -> Next.js page / client component
  -> Next API route or server helper
  -> Prisma Client
  -> SQLite dev.db
  -> JSON / rendered UI`}
        </pre>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">API routes</h2>
        <ul className="mt-3 grid gap-2 text-sm text-stone-300 sm:grid-cols-2">
          {apiRoutes.map((route) => (
            <li className="rounded-lg border border-stone-300/15 bg-white/[0.035] p-3 font-mono text-xs" key={route}>
              {route}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
