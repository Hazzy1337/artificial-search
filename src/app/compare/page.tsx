import type { Metadata } from "next"

import { CompareSelector } from "@/components/compare/CompareSelector"
import { getCatalogAgents, getCatalogModels } from "@/lib/catalog"
import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare seeded AI models and agents by normalized demo scoring.",
}

export default async function ComparePage() {
  const [locale, models, agents] = await Promise.all([getCurrentLocale(), getCatalogModels(), getCatalogAgents()])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Compare", "Сравнение")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "Compare models and agents", "Сравнить модели и агентов")}</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "Select two to four subjects and compare intelligence, coding, agent power, speed, cost, context, vision and tool use.",
            "Выбери от двух до четырех объектов и сравни intelligence, coding, силу агента, скорость, стоимость, контекст, vision и tool use."
          )}
        </p>
      </section>
      <CompareSelector agents={agents} locale={locale} models={models} />
    </main>
  )
}
