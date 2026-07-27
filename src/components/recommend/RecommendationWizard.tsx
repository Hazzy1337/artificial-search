"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertTriangle, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mcpServers, recommendations } from "@/lib/data"
import { createDemoMcpConfig } from "@/lib/mcpConfig"
import { canAccessSkillPack } from "@/lib/plans"
import { findRecommendationByQuery, getRecommendedStack } from "@/lib/scoring"
import type { PlanName, RecommendationTask, RecommendedStack, SkillPack } from "@/lib/types"
import type { McpServer } from "@/lib/types"

type RecommendationWizardProps = {
  skillPacks: SkillPack[]
  userPlan: PlanName
}

export function RecommendationWizard({ skillPacks, userPlan }: RecommendationWizardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""
  const initialTask = (() => {
    const taskParam = searchParams.get("task")

    if (isRecommendationTask(taskParam)) {
      return taskParam
    }

    if (initialQuery) {
      return findRecommendationByQuery(initialQuery).task
    }

    return "large-codebase"
  })()
  const [query, setQuery] = useState(initialQuery)
  const [task, setTask] = useState<RecommendationTask>(initialTask)

  const stack = getRecommendedStack(task)
  const selectedServers = useMemo(
    () =>
      stack.mcp
        .map((serverId) => mcpServers.find((server) => server.id === serverId))
        .filter((server): server is McpServer => Boolean(server)),
    [stack]
  )
  const config = useMemo(() => createDemoMcpConfig(selectedServers), [selectedServers])
  const recommendedPack = skillPacks.find((pack) => pack.name === stack.skillPack)
  const recommendedPackAccessible = recommendedPack ? canAccessSkillPack(userPlan, recommendedPack) : false

  function selectStack(nextStack: RecommendedStack, nextQuery?: string) {
    setTask(nextStack.task)

    if (nextQuery !== undefined) {
      setQuery(nextQuery)
      router.replace(`/recommend?task=${nextStack.task}&q=${encodeURIComponent(nextQuery)}`)
      return
    }

    router.replace(`/recommend?task=${nextStack.task}`)
  }

  function submitSearch() {
    const nextStack = findRecommendationByQuery(query)
    selectStack(nextStack, query)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div className="luxury-panel rounded-lg p-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-50">
            <Sparkles aria-hidden="true" className="size-5 text-cyan-200" />
            Search for an AI stack
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            MVP keyword matching. No external AI API is called.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Input
              className="h-11 border-cyan-200/20 bg-black/35 text-stone-100 placeholder:text-stone-500 focus-visible:ring-cyan-200/40"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitSearch()
                }
              }}
              placeholder="What do you want AI to do? Example: Fix bugs in a large Next.js codebase"
              value={query}
            />
            <Button className="h-11 bg-cyan-200 text-stone-950 hover:bg-cyan-100" onClick={submitSearch}>
              <Search aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {recommendations.map((item) => (
            <button
              className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                item.task === stack.task
                  ? "border-cyan-200/40 bg-cyan-200/10 text-cyan-50"
                  : "border-amber-200/10 bg-white/[0.04] text-stone-300 hover:border-cyan-200/25 hover:bg-cyan-200/5"
              }`}
              key={item.task}
              onClick={() => selectStack(item)}
              type="button"
            >
              <span className="font-medium">{item.label}</span>
              <span className="mt-1 block text-xs text-stone-500">{item.keywords.slice(0, 3).join(", ")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-stone-50">{stack.label}</h3>
            <p className="mt-1 text-sm text-stone-400">Recommended stack preview</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            MVP recommendation logic
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <StackField label="Recommended Model" value={stack.model} />
          <StackField label="Recommended Agent" value={stack.agent} />
          <StackField
            label="Recommended Skill Pack"
            value={
              recommendedPack
                ? `${stack.skillPack} (${recommendedPackAccessible ? "accessible" : `requires ${recommendedPack.tier}`})`
                : `${stack.skillPack} (not found in catalog)`
            }
          />
          <StackField label="Recommended MCP Servers" value={selectedServers.map((server) => server.name).join(", ")} />
        </div>
        <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3 text-sm text-amber-100">
          <p className="flex items-start gap-2">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {stack.warning}
          </p>
          {!recommendedPackAccessible && recommendedPack ? (
            <p className="mt-2">
              Demo user plan is {userPlan}. This skill pack requires {recommendedPack.tier}; upgrade before downloading its manifest.
            </p>
          ) : null}
        </div>
        <ResultList title="Why this stack" items={stack.reasoning} />
        <ResultList title="Alternatives" items={stack.alternatives} />
        <div className="mt-4 space-y-2">
          <div>
            <p className="text-sm font-medium text-stone-200">Generated demo mcp.json</p>
            <p className="mt-1 text-xs text-stone-500">
              Demo config - verify package names before installing. Placeholder commands are not installable claims.
            </p>
          </div>
          <Textarea className="min-h-64 border-cyan-200/15 bg-black/35 font-mono text-xs text-stone-200" readOnly value={config} />
        </div>
      </div>
    </div>
  )
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-stone-200">{title}</p>
      <ul className="grid gap-2 text-sm text-stone-400 sm:grid-cols-3">
        {items.map((item) => (
          <li className="rounded-lg border border-cyan-200/10 bg-white/[0.04] p-3" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StackField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cyan-200/10 bg-white/[0.04] p-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-stone-100">{value}</p>
    </div>
  )
}

function isRecommendationTask(value: string | null): value is RecommendationTask {
  return recommendations.some((stack) => stack.task === value)
}
