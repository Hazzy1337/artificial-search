import { aiAgents, aiModels, mcpServers, powerIndexData, recommendations, skillPacks } from "@/lib/data"

// Replace these adapters with authenticated API calls when real telemetry,
// benchmark feeds, Stripe entitlements or MCP registries are available.
export async function getArtificialSearchSnapshot() {
  return {
    models: aiModels,
    agents: aiAgents,
    mcpServers,
    skillPacks,
    recommendations,
    powerIndexData,
    source: "demo-data",
  }
}
