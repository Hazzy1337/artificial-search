import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "QA Documentation",
  description: "QA checklist, smoke checks and bugs fixed for Artificial Search.",
}

export default function QaDocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">QA docs</p>
        <h1 className="text-3xl font-semibold text-stone-50">QA checklist and bugs fixed</h1>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">Smoke test explanation</h2>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          `npm run smoke` checks core page routes, API manifest status, the recommendation page title and mobile overflow.
          Browser checks are skipped with a clear message if no local browser executable is found.
        </p>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">Bugs found and fixed</h2>
        <ul className="mt-3 space-y-2 text-sm text-stone-300">
          <li>`View Pack` was a button without navigation. It now links to `/skills/[id]`.</li>
          <li>Skill locking was static. It now uses database-backed demo plan checks.</li>
          <li>Pricing CTAs were placeholder links. They now update the demo subscription through an API route.</li>
          <li>Smoke tests used a hardcoded Edge path. The scripts now search for a browser or print setup instructions.</li>
        </ul>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">Database test cases</h2>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          Seeded QA cases are available on the <Link className="text-cyan-100 hover:text-cyan-50" href="/qa">QA page</Link> and through `GET /api/qa`.
        </p>
      </section>
    </main>
  )
}
