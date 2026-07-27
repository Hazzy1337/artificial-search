import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Presentation",
  description: "Two to three minute presentation script for Artificial Search.",
}

export default function PresentationDocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Presentation</p>
        <h1 className="text-3xl font-semibold text-stone-50">2-3 minute speech template</h1>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <pre className="whitespace-pre-wrap text-sm leading-7 text-stone-300">
{`Hello, my project is called Artificial Search.

The problem is that developers have many AI models, coding agents, MCP servers and prompt or skill packs, but it is hard to choose the right combination for a concrete programming task.

My solution is a fullstack AI-stack marketplace and recommendation dashboard. It compares seeded AI models, agents, MCP servers and coding skill packs. It also has a demo subscription system, so some skill pack manifests are only downloadable when the demo user has the required plan.

I implemented the frontend with Next.js App Router, TypeScript and Tailwind CSS. The backend uses Next API routes. The database layer uses Prisma with SQLite for the local demo. I added seed data for models, agents, MCP servers, skill packs, a demo user and QA test cases.

One technical difficulty was skill access control. At first the UI used static locked values, which was not secure because a user could call the manifest API directly. I fixed this by moving the entitlement check to the server. The API reads the demo user plan from the database and returns 403 if the plan is not enough.

I also added SEO files, documentation pages, QA scripts and a presentation page. Later this project could be improved with real authentication, Stripe payments, Postgres in production and live benchmark data.`}
        </pre>
      </section>
    </main>
  )
}
