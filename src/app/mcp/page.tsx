import { AlertTriangle } from "lucide-react"

import { McpConfigGenerator } from "@/components/mcp/McpConfigGenerator"
import { McpDirectory } from "@/components/mcp/McpDirectory"
import { mcpServers } from "@/lib/data"

export default function McpPage() {
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
          MCP servers may access files, shell commands, APIs and private project data. Verify permissions, run unknown
          servers in a sandbox and never expose secrets.
        </p>
      </section>

      <McpDirectory servers={mcpServers} />

      <McpConfigGenerator />
    </main>
  )
}
