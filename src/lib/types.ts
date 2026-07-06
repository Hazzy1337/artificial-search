export type Trend = "up" | "down" | "stable"

export type ModelCategory = "closed" | "open" | "local"

export type PriceLevel = "Low" | "Medium" | "High" | "Premium"

export type AiModel = {
  id: string
  name: string
  provider: string
  category: ModelCategory
  intelligence: number
  coding: number
  reasoning: number
  vision: number
  agentPower: number
  speed: number
  costEfficiency: number
  contextWindow: string
  contextTokens: number
  supportsVision: boolean
  supportsTools: boolean
  priceLevel: PriceLevel
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  trend: Trend
  movement24h: number
}

export type AiAgent = {
  id: string
  name: string
  provider: string
  taskSuccess: number
  codebaseUnderstanding: number
  toolUse: number
  autonomy: number
  recoveryAfterError: number
  costEfficiency: number
  costLevel: PriceLevel
  bestFor: string[]
  weaknesses: string[]
  notes: string
  trend: Trend
}

export type RiskLevel = "Low" | "Medium" | "High"

export type McpCategory =
  | "CodeGraph"
  | "Filesystem"
  | "Git"
  | "GitHub"
  | "Browser"
  | "Database"
  | "Docs"
  | "Memory"
  | "Project Analyzer"
  | "Security / Sandbox"

export type McpServer = {
  id: string
  name: string
  category: McpCategory
  description: string
  compatibleWith: string[]
  riskLevel: RiskLevel
  setupDifficulty: "Easy" | "Medium" | "Hard"
  access: "Free" | "Premium" | "Pro"
  rating: number
  permissions: string[]
  verifiedCommand?: {
    command: string
    args: string[]
  }
  isPlaceholder?: boolean
}

export type SkillPackTier = "Free" | "Premium" | "Pro"

export type SkillPack = {
  id: string
  name: string
  summary: string
  compatibleModels: string[]
  inside: string[]
  features: string[]
  tier: SkillPackTier
  compatibilityScore: number
  locked: boolean
  highlighted?: boolean
}

export type SkillPackInstallFile = {
  path: string
  content: string
}

export type SkillPackInstallSkill = {
  id: string
  name: string
  description: string
  files: SkillPackInstallFile[]
}

export type SkillPackInstallManifest = {
  schemaVersion: 1
  kind: "artificial-search.skill-pack"
  id: string
  name: string
  summary: string
  tier: SkillPackTier
  compatibilityScore: number
  notice: string
  install: {
    target: "$CODEX_HOME/skills"
    command: string
    steps: string[]
  }
  skills: SkillPackInstallSkill[]
}

export type RecommendationTask =
  | "write-code"
  | "fix-bugs"
  | "large-codebase"
  | "analyze-documents"
  | "business-automation"
  | "generate-images"
  | "research"
  | "cheap-api"
  | "local-private-ai"

export type RecommendedStack = {
  task: RecommendationTask
  label: string
  model: string
  agent: string
  mcp: string[]
  skillPack: string
  warning: string
  reasoning: string[]
  alternatives: string[]
  keywords: string[]
}

export type PowerIndexPoint = {
  day: string
  gpt55: number
  claude: number
  gemini: number
  deepseek: number
  qwen: number
}

export type PowerIndexSeries = {
  key: keyof Omit<PowerIndexPoint, "day">
  name: string
  color: string
}

export type PricingPlan = {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  tier: SkillPackTier | "Business"
  highlighted?: boolean
}
