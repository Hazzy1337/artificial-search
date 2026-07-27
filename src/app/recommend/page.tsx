import { Suspense } from "react"
import type { Metadata } from "next"

import { RecommendationWizard } from "@/components/recommend/RecommendationWizard"
import { getCatalogSkillPacks } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Recommendations",
  description: "Prototype AI stack recommendations with visible demo-plan skill access notes.",
}

export default async function RecommendPage() {
  const [user, skillPacks] = await Promise.all([getDemoUser(), getCatalogSkillPacks()])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Recommend</p>
        <h1 className="text-3xl font-semibold text-stone-50">Find Best AI Stack</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Pick a task and get a demo recommendation for model, agent, MCP servers and skill pack.
        </p>
      </section>
      <Suspense fallback={<div className="luxury-panel rounded-lg p-4 text-sm text-stone-300">Loading recommendation wizard...</div>}>
        <RecommendationWizard skillPacks={skillPacks} userPlan={user.plan} />
      </Suspense>
    </main>
  )
}
