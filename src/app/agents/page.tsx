import { AgentCard } from "@/components/agents/AgentCard"
import { ComparisonTable } from "@/components/compare/ComparisonTable"
import { Badge } from "@/components/ui/badge"
import { aiAgents } from "@/lib/data"
import { calculateAgentScore } from "@/lib/scoring"

export default function AgentsPage() {
  const columns = aiAgents.slice(0, 4).map((agent) => agent.name)
  const rows = [
    { metric: "Task Success", values: aiAgents.slice(0, 4).map((agent) => String(agent.taskSuccess)) },
    { metric: "Codebase Understanding", values: aiAgents.slice(0, 4).map((agent) => String(agent.codebaseUnderstanding)) },
    { metric: "Tool Use", values: aiAgents.slice(0, 4).map((agent) => String(agent.toolUse)) },
    { metric: "Autonomy", values: aiAgents.slice(0, 4).map((agent) => String(agent.autonomy)) },
    { metric: "Recovery after Error", values: aiAgents.slice(0, 4).map((agent) => String(agent.recoveryAfterError)) },
    { metric: "Cost", values: aiAgents.slice(0, 4).map((agent) => `${agent.costEfficiency} / ${agent.costLevel}`) },
    { metric: "Overall", values: aiAgents.slice(0, 4).map((agent) => String(calculateAgentScore(agent))) },
  ]

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Agents</p>
        <h1 className="text-3xl font-semibold text-stone-50">Same model, different agent, different result.</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Agent wrappers change how well a model reads code, uses tools, recovers from errors and finishes multi-step work.
        </p>
      </section>
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-stone-50">Agent comparison snapshot</h2>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Demo data
          </Badge>
        </div>
        <ComparisonTable columns={columns} rows={rows} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {aiAgents.map((agent) => (
          <AgentCard agent={agent} key={agent.id} />
        ))}
      </div>
    </main>
  )
}
