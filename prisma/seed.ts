import { PrismaClient, Plan } from "@prisma/client"

import { aiAgents } from "../src/lib/data/agents"
import { aiModels } from "../src/lib/data/models"
import { mcpServers } from "../src/lib/data/mcpServers"
import { skillPacks } from "../src/lib/data/skillPacks"

const prisma = new PrismaClient()

const demoEmail = process.env.DEMO_USER_EMAIL ?? "demo@artificial-search.com"

const qaCases = [
  {
    title: "Free user can download Free skill manifest",
    area: "Skill access",
    steps: ["Set demo plan to Free", "Request /api/skill-packs/ai-coding-starter/manifest"],
    expected: "API returns 200 and a skill-pack manifest JSON.",
    status: "passed",
    severity: "high",
    notes: "Covers server-side entitlement for accessible packs.",
  },
  {
    title: "Free user cannot download Pro skill manifest",
    area: "Skill access",
    steps: ["Set demo plan to Free", "Request /api/skill-packs/large-codebase-refactor/manifest"],
    expected: "API returns 403 with required plan information.",
    status: "passed",
    severity: "critical",
    notes: "Prevents frontend-only locking bypass.",
  },
  {
    title: "Pricing plan change persists in database",
    area: "Subscription demo",
    steps: ["POST /api/subscription/change with Premium", "GET /api/me"],
    expected: "GET /api/me returns the demo user with Premium plan.",
    status: "passed",
    severity: "high",
    notes: "Demo flow replaces placeholder checkout links.",
  },
  {
    title: "Mobile homepage has no horizontal overflow",
    area: "Frontend QA",
    steps: ["Open homepage at 390px viewport", "Compare document scroll width to viewport width"],
    expected: "Scroll width is not larger than viewport width.",
    status: "passed",
    severity: "medium",
    notes: "Covered by smoke/qa scripts when a browser executable is available.",
  },
]

async function main() {
  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      name: "Demo User",
    },
    create: {
      name: "Demo User",
      email: demoEmail,
      plan: Plan.FREE,
    },
  })

  for (const model of aiModels) {
    const { strengths, weaknesses, bestFor, ...modelFields } = model
    await prisma.aiModel.upsert({
      where: { id: model.id },
      update: {
        ...modelFields,
        strengthsJson: JSON.stringify(strengths),
        weaknessesJson: JSON.stringify(weaknesses),
        bestForJson: JSON.stringify(bestFor),
      },
      create: {
        ...modelFields,
        strengthsJson: JSON.stringify(strengths),
        weaknessesJson: JSON.stringify(weaknesses),
        bestForJson: JSON.stringify(bestFor),
      },
    })
  }

  for (const agent of aiAgents) {
    const { bestFor, weaknesses, ...agentFields } = agent
    await prisma.aiAgent.upsert({
      where: { id: agent.id },
      update: {
        ...agentFields,
        bestForJson: JSON.stringify(bestFor),
        weaknessesJson: JSON.stringify(weaknesses),
      },
      create: {
        ...agentFields,
        bestForJson: JSON.stringify(bestFor),
        weaknessesJson: JSON.stringify(weaknesses),
      },
    })
  }

  for (const server of mcpServers) {
    await prisma.mcpServer.upsert({
      where: { id: server.id },
      update: {
        id: server.id,
        name: server.name,
        category: server.category,
        description: server.description,
        compatibleJson: JSON.stringify(server.compatibleWith),
        riskLevel: server.riskLevel,
        setupDifficulty: server.setupDifficulty,
        access: toPrismaPlan(server.access),
        rating: server.rating,
        permissionsJson: JSON.stringify(server.permissions),
        sourceUrl: server.sourceUrl,
        status: server.status,
        riskNotesJson: JSON.stringify(server.riskNotes),
        recommendedJson: JSON.stringify(server.recommendedFor),
      },
      create: {
        id: server.id,
        name: server.name,
        category: server.category,
        description: server.description,
        compatibleJson: JSON.stringify(server.compatibleWith),
        riskLevel: server.riskLevel,
        setupDifficulty: server.setupDifficulty,
        access: toPrismaPlan(server.access),
        rating: server.rating,
        permissionsJson: JSON.stringify(server.permissions),
        sourceUrl: server.sourceUrl,
        status: server.status,
        riskNotesJson: JSON.stringify(server.riskNotes),
        recommendedJson: JSON.stringify(server.recommendedFor),
      },
    })
  }

  for (const pack of skillPacks) {
    await prisma.skillPack.upsert({
      where: { id: pack.id },
      update: {
        id: pack.id,
        name: pack.name,
        summary: pack.summary,
        compatibleJson: JSON.stringify(pack.compatibleModels),
        insideJson: JSON.stringify(pack.inside),
        featuresJson: JSON.stringify(pack.features),
        tier: toPrismaPlan(pack.tier),
        compatibilityScore: pack.compatibilityScore,
        highlighted: pack.highlighted ?? false,
        sourceUrl: pack.sourceUrl,
        status: pack.status,
        riskNotesJson: JSON.stringify(pack.riskNotes),
        recommendedJson: JSON.stringify(pack.recommendedFor),
      },
      create: {
        id: pack.id,
        name: pack.name,
        summary: pack.summary,
        compatibleJson: JSON.stringify(pack.compatibleModels),
        insideJson: JSON.stringify(pack.inside),
        featuresJson: JSON.stringify(pack.features),
        tier: toPrismaPlan(pack.tier),
        compatibilityScore: pack.compatibilityScore,
        highlighted: pack.highlighted ?? false,
        sourceUrl: pack.sourceUrl,
        status: pack.status,
        riskNotesJson: JSON.stringify(pack.riskNotes),
        recommendedJson: JSON.stringify(pack.recommendedFor),
      },
    })
  }

  for (const testCase of qaCases) {
    const { steps, ...testCaseFields } = testCase
    await prisma.qaTestCase.upsert({
      where: {
        id: slugify(testCase.title),
      },
      update: {
        ...testCaseFields,
        stepsJson: JSON.stringify(steps),
      },
      create: {
        id: slugify(testCase.title),
        ...testCaseFields,
        stepsJson: JSON.stringify(steps),
      },
    })
  }
}

function toPrismaPlan(plan: "Free" | "Premium" | "Pro") {
  if (plan === "Pro") {
    return Plan.PRO
  }

  if (plan === "Premium") {
    return Plan.PREMIUM
  }

  return Plan.FREE
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
