import type { Metadata } from "next"

import { ModelsExplorer } from "@/components/models/ModelsExplorer"
import { getCatalogModels } from "@/lib/catalog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "AI Models",
  description: "Seeded AI model comparison for the Artificial Search course MVP.",
}

export default async function ModelsPage() {
  const aiModels = await getCatalogModels()

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <PageIntro
        eyebrow="Models"
        title="AI model ratings"
        description="Compare model fit by overall score, coding, reasoning, vision, context, speed and price/power. Values are demo data for MVP evaluation."
      />
      <ModelsExplorer models={aiModels} />
    </main>
  )
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="space-y-2">
      <p className="text-sm font-medium text-amber-100">{eyebrow}</p>
      <h1 className="text-3xl font-semibold text-stone-50">{title}</h1>
      <p className="max-w-3xl text-sm leading-6 text-stone-400">{description}</p>
    </section>
  )
}
