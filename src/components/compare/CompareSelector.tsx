"use client"

import { useMemo, useState } from "react"

import { ComparisonTable } from "@/components/compare/ComparisonTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { priceLevelText, tr, tv } from "@/lib/i18n"
import { calculateAgentScore, calculateOverallScore } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { AiAgent, AiModel } from "@/lib/types"

const defaultSelection = ["model:gpt-5-5", "model:claude-opus-sonnet", "agent:codex", "agent:claude-code"]

type CompareSelectorProps = {
  agents: AiAgent[]
  locale: Locale
  models: AiModel[]
}

export function CompareSelector({ agents, locale, models }: CompareSelectorProps) {
  const [selectedIds, setSelectedIds] = useState(defaultSelection)
  const subjectOptions = useMemo(
    () => [
      ...models.map((model) => ({ id: `model:${model.id}`, label: model.name, type: tr(locale, "Model", "Модель") })),
      ...agents.map((agent) => ({ id: `agent:${agent.id}`, label: agent.name, type: tr(locale, "Agent", "Агент") })),
    ],
    [agents, locale, models]
  )

  const subjects = useMemo(
    () =>
      selectedIds.map((id) => {
        const [type, value] = id.split(":")

        if (type === "model") {
          const model = models.find((item) => item.id === value) ?? models[0]
          return {
            id,
            name: model.name,
            provider: model.provider,
            intelligence: String(model.intelligence),
            coding: String(model.coding),
            agentPower: String(model.agentPower),
            speed: String(model.speed),
            cost: `${model.costEfficiency} / ${priceLevelText(locale, model.priceLevel)}`,
            context: model.contextWindow,
            vision: model.supportsVision ? String(model.vision) : tv(locale, "No"),
            toolUse: model.supportsTools ? tv(locale, "Yes") : tv(locale, "Limited"),
            strengths: model.strengths.join(", "),
            bestUseCase: model.bestFor.join(", "),
            weaknesses: model.weaknesses.join(", "),
            score: String(calculateOverallScore(model)),
          }
        }

        const agent = agents.find((item) => item.id === value) ?? agents[0]
        return {
          id,
          name: agent.name,
          provider: agent.provider,
          intelligence: tv(locale, "Agent dependent"),
          coding: String(agent.taskSuccess),
          agentPower: String(calculateAgentScore(agent)),
          speed: tv(locale, "Host dependent"),
          cost: `${agent.costEfficiency} / ${priceLevelText(locale, agent.costLevel)}`,
          context: tv(locale, "Model dependent"),
          vision: tv(locale, "Model dependent"),
          toolUse: String(agent.toolUse),
          strengths: agent.bestFor.join(", "),
          bestUseCase: agent.bestFor.join(", "),
          weaknesses: agent.weaknesses.join(", "),
          score: String(calculateAgentScore(agent)),
        }
      }),
    [agents, locale, models, selectedIds]
  )

  const rows = [
    { metric: tr(locale, "Provider", "Провайдер"), values: subjects.map((item) => item.provider) },
    { metric: tr(locale, "Intelligence", "Интеллект"), values: subjects.map((item) => item.intelligence) },
    { metric: tr(locale, "Coding", "Кодинг"), values: subjects.map((item) => item.coding) },
    { metric: tr(locale, "Agent Power", "Сила агента"), values: subjects.map((item) => item.agentPower) },
    { metric: tr(locale, "Speed", "Скорость"), values: subjects.map((item) => item.speed) },
    { metric: tr(locale, "Cost", "Стоимость"), values: subjects.map((item) => item.cost) },
    { metric: tr(locale, "Context Window", "Окно контекста"), values: subjects.map((item) => item.context) },
    { metric: tr(locale, "Vision", "Зрение"), values: subjects.map((item) => item.vision) },
    { metric: tr(locale, "Tool Use", "Работа с tools"), values: subjects.map((item) => item.toolUse) },
    { metric: tr(locale, "Strengths", "Сильные стороны"), values: subjects.map((item) => item.strengths) },
    { metric: tr(locale, "Overall", "Общий"), values: subjects.map((item) => item.score) },
    { metric: tr(locale, "Best For", "Лучше всего для"), values: subjects.map((item) => item.bestUseCase) },
    { metric: tr(locale, "Weaknesses", "Слабые стороны"), values: subjects.map((item) => item.weaknesses) },
  ]

  function updateSelection(index: number, value: string) {
    setSelectedIds((current) => current.map((item, currentIndex) => (currentIndex === index ? value : item)))
  }

  return (
    <div className="space-y-6">
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "Select 2-4 models or agents", "Выбери 2-4 модели или агента")}</h2>
            <p className="mt-1 text-sm text-stone-400">{tr(locale, "The MVP comparison uses normalized demo scores.", "MVP-сравнение использует нормализованные демо-оценки.")}</p>
          </div>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {tr(locale, "Demo comparison", "Демо-сравнение")}
          </Badge>
          <Button
            className="border-cyan-200/20 bg-white/[0.035] text-cyan-100 hover:bg-cyan-200/10"
            onClick={() => setSelectedIds(defaultSelection)}
            size="sm"
            variant="outline"
          >
            {tr(locale, "Reset comparison", "Сбросить сравнение")}
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {selectedIds.map((selectedId, index) => (
            <Select key={`${selectedId}-${index}`} onValueChange={(value) => updateSelection(index, value)} value={selectedId}>
              <SelectTrigger className="h-10 w-full border-amber-200/15 bg-black/30 text-stone-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-amber-200/15 bg-[#08070b]">
                {subjectOptions.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label} - {item.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>
      <div className="luxury-panel rounded-lg p-4">
        <ComparisonTable columns={subjects.map((item) => item.name)} locale={locale} rows={rows} />
      </div>
    </div>
  )
}
