import type {
  AiAgent as DbAiAgent,
  AiModel as DbAiModel,
  McpServer as DbMcpServer,
  QaTestCase as DbQaTestCase,
  SkillPack as DbSkillPack,
} from "@prisma/client"

import { fromPrismaPlanValue } from "@/lib/plans"
import type { AiAgent, AiModel, CatalogStatus, McpCategory, McpServer, QaTestCase, RiskLevel, SkillPack } from "@/lib/types"

export function mapAiModel(row: DbAiModel): AiModel {
  return {
    id: row.id,
    name: row.name,
    provider: row.provider,
    category: row.category as AiModel["category"],
    intelligence: row.intelligence,
    coding: row.coding,
    reasoning: row.reasoning,
    vision: row.vision,
    agentPower: row.agentPower,
    speed: row.speed,
    costEfficiency: row.costEfficiency,
    contextWindow: row.contextWindow,
    contextTokens: row.contextTokens,
    supportsVision: row.supportsVision,
    supportsTools: row.supportsTools,
    priceLevel: row.priceLevel as AiModel["priceLevel"],
    strengths: parseStringArray(row.strengthsJson),
    weaknesses: parseStringArray(row.weaknessesJson),
    bestFor: parseStringArray(row.bestForJson),
    trend: row.trend as AiModel["trend"],
    movement24h: row.movement24h,
  }
}

export function mapAiAgent(row: DbAiAgent): AiAgent {
  return {
    id: row.id,
    name: row.name,
    provider: row.provider,
    taskSuccess: row.taskSuccess,
    codebaseUnderstanding: row.codebaseUnderstanding,
    toolUse: row.toolUse,
    autonomy: row.autonomy,
    recoveryAfterError: row.recoveryAfterError,
    costEfficiency: row.costEfficiency,
    costLevel: row.costLevel as AiAgent["costLevel"],
    bestFor: parseStringArray(row.bestForJson),
    weaknesses: parseStringArray(row.weaknessesJson),
    notes: row.notes,
    trend: row.trend as AiAgent["trend"],
  }
}

export function mapMcpServer(row: DbMcpServer): McpServer {
  return {
    id: row.id,
    name: row.name,
    category: row.category as McpCategory,
    description: row.description,
    compatibleWith: parseStringArray(row.compatibleJson),
    riskLevel: row.riskLevel as RiskLevel,
    setupDifficulty: row.setupDifficulty as McpServer["setupDifficulty"],
    access: fromPrismaPlanValue(row.access),
    rating: row.rating,
    permissions: parseStringArray(row.permissionsJson),
    sourceUrl: row.sourceUrl ?? undefined,
    status: row.status as CatalogStatus,
    riskNotes: parseStringArray(row.riskNotesJson),
    recommendedFor: parseStringArray(row.recommendedJson),
    isPlaceholder: row.status !== "verified",
  }
}

export function mapSkillPack(row: DbSkillPack): SkillPack {
  return {
    id: row.id,
    name: row.name,
    summary: row.summary,
    compatibleModels: parseStringArray(row.compatibleJson),
    inside: parseStringArray(row.insideJson),
    features: parseStringArray(row.featuresJson),
    tier: fromPrismaPlanValue(row.tier),
    compatibilityScore: row.compatibilityScore,
    highlighted: row.highlighted,
    sourceUrl: row.sourceUrl ?? undefined,
    status: row.status as CatalogStatus,
    riskNotes: parseStringArray(row.riskNotesJson),
    recommendedFor: parseStringArray(row.recommendedJson),
  }
}

export function mapQaTestCase(row: DbQaTestCase): QaTestCase {
  return {
    id: row.id,
    title: row.title,
    area: row.area,
    steps: parseStringArray(row.stepsJson),
    expected: row.expected,
    status: row.status,
    severity: row.severity,
    notes: row.notes ?? undefined,
  }
}

function parseStringArray(value: string) {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}
