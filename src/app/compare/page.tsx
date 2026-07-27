import type { Metadata } from "next"

import { CompareSelector } from "@/components/compare/CompareSelector"
import { getCatalogAgents, getCatalogModels } from "@/lib/catalog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare seeded AI models and agents by normalized demo scoring.",
}

export default async function ComparePage() {
  const [models, agents] = await Promise.all([getCatalogModels(), getCatalogAgents()])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Compare</p>
        <h1 className="text-3xl font-semibold text-stone-50">Compare models and agents</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Select two to four subjects and compare intelligence, coding, agent power, speed, cost, context, vision and tool use.
        </p>
      </section>
      <CompareSelector agents={agents} models={models} />
    </main>
  )
}
