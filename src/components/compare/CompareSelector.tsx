"use client"

import { useMemo, useState } from "react"

import { ComparisonTable } from "@/components/compare/ComparisonTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateAgentScore, calculateOverallScore } from "@/lib/scoring"
import type { AiAgent, AiModel } from "@/lib/types"

const defaultSelection = ["model:gpt-5-5", "model:claude-opus-sonnet", "agent:codex", "agent:claude-code"]

type CompareSelectorProps = {
  agents: AiAgent[]
  models: AiModel[]
}

export function CompareSelector({ agents, models }: CompareSelectorProps) {
  const [selectedIds, setSelectedIds] = useState(defaultSelection)
  const subjectOptions = useMemo(
    () => [
      ...models.map((model) => ({ id: `model:${model.id}`, label: model.name, type: "Model" as const })),
      ...agents.map((agent) => ({ id: `agent:${agent.id}`, label: agent.name, type: "Agent" as const })),
    ],
    [agents, models]
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
            cost: `${model.costEfficiency} / ${model.priceLevel}`,
            context: model.contextWindow,
            vision: model.supportsVision ? String(model.vision) : "No",
            toolUse: model.supportsTools ? "Yes" : "Limited",
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
          intelligence: "Agent dependent",
          coding: String(agent.taskSuccess),
          agentPower: String(calculateAgentScore(agent)),
          speed: "Host dependent",
          cost: `${agent.costEfficiency} / ${agent.costLevel}`,
          context: "Model dependent",
          vision: "Model dependent",
          toolUse: String(agent.toolUse),
          strengths: agent.bestFor.join(", "),
          bestUseCase: agent.bestFor.join(", "),
          weaknesses: agent.weaknesses.join(", "),
          score: String(calculateAgentScore(agent)),
        }
      }),
    [agents, models, selectedIds]
  )

  const rows = [
    { metric: "Provider", values: subjects.map((item) => item.provider) },
    { metric: "Intelligence", values: subjects.map((item) => item.intelligence) },
    { metric: "Coding", values: subjects.map((item) => item.coding) },
    { metric: "Agent Power", values: subjects.map((item) => item.agentPower) },
    { metric: "Speed", values: subjects.map((item) => item.speed) },
    { metric: "Cost", values: subjects.map((item) => item.cost) },
    { metric: "Context Window", values: subjects.map((item) => item.context) },
    { metric: "Vision", values: subjects.map((item) => item.vision) },
    { metric: "Tool Use", values: subjects.map((item) => item.toolUse) },
    { metric: "Strengths", values: subjects.map((item) => item.strengths) },
    { metric: "Overall", values: subjects.map((item) => item.score) },
    { metric: "Best For", values: subjects.map((item) => item.bestUseCase) },
    { metric: "Weaknesses", values: subjects.map((item) => item.weaknesses) },
  ]

  function updateSelection(index: number, value: string) {
    setSelectedIds((current) => current.map((item, currentIndex) => (currentIndex === index ? value : item)))
  }

  return (
    <div className="space-y-6">
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-50">Select 2-4 models or agents</h2>
            <p className="mt-1 text-sm text-stone-400">The MVP comparison uses normalized demo scores.</p>
          </div>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Demo comparison
          </Badge>
          <Button
            className="border-cyan-200/20 bg-white/[0.035] text-cyan-100 hover:bg-cyan-200/10"
            onClick={() => setSelectedIds(defaultSelection)}
            size="sm"
            variant="outline"
          >
            Reset comparison
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
        <ComparisonTable columns={subjects.map((item) => item.name)} rows={rows} />
      </div>
    </div>
  )
}
