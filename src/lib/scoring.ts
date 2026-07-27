import { recommendations } from "@/lib/data/recommendations"
import type { AiAgent, AiModel, RecommendationTask } from "@/lib/types"

export type ModelSortCategory =
  | "overall"
  | "coding"
  | "reasoning"
  | "vision"
  | "long-context"
  | "cheap"
  | "fast"
  | "open-source"

export function calculateOverallScore(model: AiModel) {
  return roundScore(
    model.intelligence * 0.3 +
      model.coding * 0.25 +
      model.agentPower * 0.2 +
      model.speed * 0.1 +
      model.costEfficiency * 0.15
  )
}

export function calculateAgentScore(agent: AiAgent) {
  return roundScore(
    agent.taskSuccess * 0.28 +
      agent.codebaseUnderstanding * 0.22 +
      agent.toolUse * 0.18 +
      agent.autonomy * 0.16 +
      agent.recoveryAfterError * 0.1 +
      agent.costEfficiency * 0.06
  )
}

export function calculatePricePowerScore(model: AiModel) {
  return roundScore(model.costEfficiency * 0.55 + calculateOverallScore(model) * 0.45)
}

export function sortByCategory(models: AiModel[], category: ModelSortCategory) {
  const sortable = [...models]

  if (category === "coding") {
    return sortable.sort((a, b) => b.coding - a.coding)
  }

  if (category === "reasoning") {
    return sortable.sort((a, b) => b.reasoning - a.reasoning)
  }

  if (category === "vision") {
    return sortable.filter((model) => model.supportsVision).sort((a, b) => b.vision - a.vision)
  }

  if (category === "long-context") {
    return sortable
      .filter((model) => model.contextTokens >= 200_000)
      .sort((a, b) => b.contextTokens - a.contextTokens)
  }

  if (category === "cheap") {
    return sortable.sort((a, b) => calculatePricePowerScore(b) - calculatePricePowerScore(a))
  }

  if (category === "fast") {
    return sortable.sort((a, b) => b.speed - a.speed)
  }

  if (category === "open-source") {
    return sortable
      .filter((model) => model.category === "open" || model.category === "local")
      .sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))
  }

  return sortable.sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))
}

export function getRecommendedStack(task: RecommendationTask) {
  return recommendations.find((stack) => stack.task === task) ?? recommendations[0]
}

export function findRecommendationByQuery(query: string) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return getRecommendedStack("large-codebase")
  }

  const exactTask = recommendations.find((stack) => stack.task === normalizedQuery)

  if (exactTask) {
    return exactTask
  }

  const scored = recommendations
    .map((stack) => {
      const searchable = [stack.label, stack.task, ...stack.keywords].map(normalizeSearchText)
      const score = searchable.reduce((total, term) => {
        if (!term) {
          return total
        }

        if (normalizedQuery === term) {
          return total + 12
        }

        if (normalizedQuery.includes(term) || term.includes(normalizedQuery)) {
          return total + 6
        }

        const wordMatches = term.split(" ").filter((word) => normalizedQuery.includes(word)).length
        return total + wordMatches
      }, 0)

      return { stack, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]?.score > 0 ? scored[0].stack : getRecommendedStack("research")
}

function roundScore(value: number) {
  return Math.round(value * 10) / 10
}

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim()
}
