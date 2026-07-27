import { AlertTriangle } from "lucide-react"
import type { Metadata } from "next"

import { McpConfigGenerator } from "@/components/mcp/McpConfigGenerator"
import { McpDirectory } from "@/components/mcp/McpDirectory"
import { getCatalogAgents, getCatalogMcpServers, getCatalogSkillPacks } from "@/lib/catalog"
import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "MCP Servers",
  description: "MCP server catalog with seeded status, risk labels, permissions and placeholder warnings.",
}

export default async function McpPage() {
  const locale = await getCurrentLocale()
  const [agents, mcpServers, skillPacks] = await Promise.all([getCatalogAgents(), getCatalogMcpServers(), getCatalogSkillPacks()])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">MCP</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "MCP Server Marketplace", "Маркетплейс MCP серверов")}</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "Compare MCP servers by category, compatibility, setup difficulty, access tier and permission risk.",
            "Сравнивай MCP серверы по категории, совместимости, сложности настройки, тарифу доступа и риску permissions."
          )}
        </p>
      </section>

      <section className="rounded-lg border border-red-400/30 bg-red-400/10 p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-red-100">
          <AlertTriangle aria-hidden="true" className="size-5" />
          {tr(locale, "Security warning", "Предупреждение безопасности")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-red-100/90">
          {tr(
            locale,
            "MCP servers may access files, shell commands, APIs and private project data. Verify permissions, run unknown servers in a sandbox and never expose secrets.",
            "MCP серверы могут получать доступ к файлам, shell-командам, API и приватным данным проекта. Проверяй permissions, запускай неизвестные серверы в sandbox и не раскрывай секреты."
          )}
        </p>
      </section>

      <McpDirectory locale={locale} servers={mcpServers} />

      <McpConfigGenerator agents={agents} locale={locale} mcpServers={mcpServers} skillPacks={skillPacks} />
    </main>
  )
}
