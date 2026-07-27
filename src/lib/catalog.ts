import { aiAgents as fallbackAgents, aiModels as fallbackModels, mcpServers as fallbackMcpServers, qaTestCases, skillPacks as fallbackSkillPacks } from "@/lib/data"
import { db } from "@/lib/db"
import { mapAiAgent, mapAiModel, mapMcpServer, mapQaTestCase, mapSkillPack } from "@/lib/dbMappers"

export async function getCatalogModels() {
  try {
    const rows = await db.aiModel.findMany()
    return rows.length ? rows.map(mapAiModel) : fallbackModels
  } catch {
    return fallbackModels
  }
}

export async function getCatalogAgents() {
  try {
    const rows = await db.aiAgent.findMany()
    return rows.length ? rows.map(mapAiAgent) : fallbackAgents
  } catch {
    return fallbackAgents
  }
}

export async function getCatalogMcpServers() {
  try {
    const rows = await db.mcpServer.findMany({
      orderBy: [{ rating: "desc" }, { name: "asc" }],
    })
    return rows.length ? rows.map(mapMcpServer) : fallbackMcpServers
  } catch {
    return fallbackMcpServers
  }
}

export async function getCatalogSkillPacks() {
  try {
    const rows = await db.skillPack.findMany({
      orderBy: [{ highlighted: "desc" }, { compatibilityScore: "desc" }, { name: "asc" }],
    })
    return rows.length ? rows.map(mapSkillPack) : fallbackSkillPacks
  } catch {
    return fallbackSkillPacks
  }
}

export async function getCatalogSkillPack(id: string) {
  const packs = await getCatalogSkillPacks()
  return packs.find((pack) => pack.id === id) ?? null
}

export async function getQaTestCases() {
  try {
    const rows = await db.qaTestCase.findMany({
      orderBy: [{ severity: "asc" }, { title: "asc" }],
    })
    return rows.length ? rows.map(mapQaTestCase) : qaTestCases
  } catch {
    return qaTestCases
  }
}
