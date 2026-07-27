import { AgentCard } from "@/components/agents/AgentCard"
import { ComparisonTable } from "@/components/compare/ComparisonTable"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { getCatalogAgents } from "@/lib/catalog"
import { priceLevelText, tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"
import { calculateAgentScore } from "@/lib/scoring"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "AI Agents",
  description: "Seeded AI agent comparison for coding workflows, tool use and recovery after errors.",
}

export default async function AgentsPage() {
  const locale = await getCurrentLocale()
  const aiAgents = await getCatalogAgents()
  const columns = aiAgents.slice(0, 4).map((agent) => agent.name)
  const rows = [
    { metric: tr(locale, "Task Success", "Успех задач"), values: aiAgents.slice(0, 4).map((agent) => String(agent.taskSuccess)) },
    { metric: tr(locale, "Codebase Understanding", "Понимание кодовой базы"), values: aiAgents.slice(0, 4).map((agent) => String(agent.codebaseUnderstanding)) },
    { metric: tr(locale, "Tool Use", "Работа с tools"), values: aiAgents.slice(0, 4).map((agent) => String(agent.toolUse)) },
    { metric: tr(locale, "Autonomy", "Автономность"), values: aiAgents.slice(0, 4).map((agent) => String(agent.autonomy)) },
    { metric: tr(locale, "Recovery after Error", "Восстановление после ошибки"), values: aiAgents.slice(0, 4).map((agent) => String(agent.recoveryAfterError)) },
    { metric: tr(locale, "Cost", "Стоимость"), values: aiAgents.slice(0, 4).map((agent) => `${agent.costEfficiency} / ${priceLevelText(locale, agent.costLevel)}`) },
    { metric: tr(locale, "Overall", "Общий"), values: aiAgents.slice(0, 4).map((agent) => String(calculateAgentScore(agent))) },
  ]

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Agents", "Агенты")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">
          {tr(locale, "Same model, different agent, different result.", "Одна модель, другой агент, другой результат.")}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "Agent wrappers change how well a model reads code, uses tools, recovers from errors and finishes multi-step work.",
            "Агентская оболочка меняет то, как модель читает код, использует tools, восстанавливается после ошибок и доводит многошаговую работу до конца."
          )}
        </p>
      </section>
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "Agent comparison snapshot", "Срез сравнения агентов")}</h2>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {tr(locale, "Demo data", "Демо-данные")}
          </Badge>
        </div>
        <ComparisonTable columns={columns} locale={locale} rows={rows} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {aiAgents.map((agent) => (
          <AgentCard agent={agent} key={agent.id} locale={locale} />
        ))}
      </div>
    </main>
  )
}
