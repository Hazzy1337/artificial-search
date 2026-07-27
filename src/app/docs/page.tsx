import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Docs",
  description: "Artificial Search project overview, features and tech stack for the course presentation.",
}

export default function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Docs</p>
        <h1 className="text-3xl font-semibold text-stone-50">Artificial Search documentation</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Artificial Search is a fullstack AI-stack marketplace and recommendation dashboard for developers.
        </p>
      </section>

      <DocBlock title="Problem">
        Developers have too many AI models, agents, MCP servers and workflow patterns to choose from. The wrong stack can
        waste time, expose files or produce weak results.
      </DocBlock>
      <DocBlock title="Solution">
        The app compares seeded AI catalog data, recommends stack combinations and gates downloadable skill-pack manifests
        behind a database-backed demo subscription plan.
      </DocBlock>
      <DocBlock title="Main features">
        Model and agent comparison, MCP risk catalog, skill packs, recommendation wizard, demo subscription flow, server-side
        access checks, API routes, QA scripts and documentation pages.
      </DocBlock>
      <DocBlock title="Tech stack">
        Next.js App Router, TypeScript, Tailwind CSS, Prisma, SQLite, Next API routes and Playwright-based smoke checks.
      </DocBlock>

      <section className="grid gap-3 sm:grid-cols-2">
        {[
          ["/docs/architecture", "Architecture"],
          ["/docs/security", "Security"],
          ["/docs/qa", "QA docs"],
          ["/docs/presentation", "Presentation script"],
        ].map(([href, label]) => (
          <Link className="luxury-panel rounded-lg p-4 text-stone-100 hover:text-amber-100" href={href} key={href}>
            {label}
          </Link>
        ))}
      </section>
    </main>
  )
}

function DocBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="luxury-panel rounded-lg p-5">
      <h2 className="text-lg font-semibold text-stone-50">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-300">{children}</p>
    </section>
  )
}
