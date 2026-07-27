"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"

import { McpCard } from "@/components/mcp/McpCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { tr, tv } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import type { McpCategory, McpServer, RiskLevel } from "@/lib/types"
import { cn } from "@/lib/utils"

type McpDirectoryProps = {
  locale: Locale
  servers: McpServer[]
}

const riskFilters: Array<RiskLevel | "All"> = ["All", "Low", "Medium", "High"]

export function McpDirectory({ locale, servers }: McpDirectoryProps) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(servers.map((server) => server.category)))] as Array<McpCategory | "All">, [servers])
  const [category, setCategory] = useState<McpCategory | "All">("All")
  const [risk, setRisk] = useState<RiskLevel | "All">("All")

  const filteredServers = useMemo(
    () =>
      servers.filter((server) => {
        const categoryMatches = category === "All" || server.category === category
        const riskMatches = risk === "All" || server.riskLevel === risk
        return categoryMatches && riskMatches
      }),
    [category, risk, servers]
  )

  return (
    <div className="space-y-4">
      <section className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "MCP directory filters", "Фильтры MCP каталога")}</h2>
            <p className="mt-1 text-sm text-stone-400">
              {tr(locale, "Filter demo directory entries by category and permission risk.", "Фильтруй демо-каталог по категории и риску permissions.")}
            </p>
          </div>
          <Badge className="border-amber-200/25 bg-amber-200/10 text-amber-100" variant="outline">
            {tr(locale, "Demo directory", "Демо-каталог")}
          </Badge>
        </div>
        <div className="space-y-3">
          <FilterRow label={tr(locale, "Category", "Категория")}>
            {categories.map((item) => (
              <FilterButton active={category === item} key={item} onClick={() => setCategory(item)}>
                {tv(locale, item)}
              </FilterButton>
            ))}
          </FilterRow>
          <FilterRow label={tr(locale, "Risk", "Риск")}>
            {riskFilters.map((item) => (
              <FilterButton active={risk === item} key={item} onClick={() => setRisk(item)}>
                {tv(locale, item)}
              </FilterButton>
            ))}
          </FilterRow>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredServers.map((server) => (
          <McpCard key={server.id} locale={locale} server={server} />
        ))}
      </div>
    </div>
  )
}

function FilterRow({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-stone-200">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <Button
      className={cn(
        "border-cyan-200/15 bg-white/[0.035] text-stone-300 hover:bg-cyan-200/10 hover:text-cyan-50",
        active && "border-cyan-200/40 bg-cyan-200/15 text-cyan-50"
      )}
      onClick={onClick}
      size="sm"
      variant="outline"
    >
      {children}
    </Button>
  )
}
