import { AlertTriangle } from "lucide-react"

import { McpConfigGenerator } from "@/components/mcp/McpConfigGenerator"
import { McpCard } from "@/components/mcp/McpCard"
import { Badge } from "@/components/ui/badge"
import { mcpServers } from "@/lib/data"

export default function McpPage() {
  const categories = Array.from(new Set(mcpServers.map((server) => server.category)))

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">MCP</p>
        <h1 className="text-3xl font-semibold text-stone-50">MCP Server Marketplace</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Compare MCP servers by category, compatibility, setup difficulty, access tier and permission risk.
        </p>
      </section>

      <section className="rounded-lg border border-red-400/30 bg-red-400/10 p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-red-100">
          <AlertTriangle aria-hidden="true" className="size-5" />
          Security warning
        </h2>
        <p className="mt-2 text-sm leading-6 text-red-100/90">
          MCP servers can access files, commands, APIs and projects. Artificial Search shows risk level, permissions and sandbox
          recommendations so teams can avoid granting broad access by accident.
        </p>
      </section>

      <section className="luxury-panel rounded-lg p-4">
        <h2 className="mb-3 text-lg font-semibold text-stone-50">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {mcpServers.map((server) => (
          <McpCard key={server.id} server={server} />
        ))}
      </div>

      <McpConfigGenerator />
    </main>
  )
}
