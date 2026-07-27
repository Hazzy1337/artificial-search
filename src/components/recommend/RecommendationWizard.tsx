"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertTriangle, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mcpServers, recommendations } from "@/lib/data"
import {
  recommendationAlternatives,
  recommendationKeywords,
  recommendationLabel,
  recommendationReasoning,
  recommendationWarning,
  tr,
} from "@/lib/i18n"
import { createDemoMcpConfig } from "@/lib/mcpConfig"
import { canAccessSkillPack } from "@/lib/plans"
import { findRecommendationByQuery, getRecommendedStack } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { PlanName, RecommendationTask, RecommendedStack, SkillPack } from "@/lib/types"
import type { McpServer } from "@/lib/types"

type RecommendationWizardProps = {
  locale: Locale
  skillPacks: SkillPack[]
  userPlan: PlanName
}

export function RecommendationWizard({ locale, skillPacks, userPlan }: RecommendationWizardProps) {
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
            {tr(locale, "Search for an AI stack", "Поиск AI стека")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            {tr(locale, "MVP keyword matching. No external AI API is called.", "MVP-подбор по ключевым словам. Внешний AI API не вызывается.")}
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
              placeholder={tr(
                locale,
                "What do you want AI to do? Example: Fix bugs in a large Next.js codebase",
                "Что должен сделать AI? Например: исправить баги в большом Next.js проекте"
              )}
              value={query}
            />
            <Button className="h-11 bg-cyan-200 text-stone-950 hover:bg-cyan-100" onClick={submitSearch}>
              <Search aria-hidden="true" />
              {tr(locale, "Search", "Найти")}
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
              <span className="font-medium">{recommendationLabel(locale, item)}</span>
              <span className="mt-1 block text-xs text-stone-500">{recommendationKeywords(locale, item).slice(0, 3).join(", ")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-stone-50">{recommendationLabel(locale, stack)}</h3>
            <p className="mt-1 text-sm text-stone-400">{tr(locale, "Recommended stack preview", "Предпросмотр рекомендуемого стека")}</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            {tr(locale, "MVP recommendation logic", "MVP-логика рекомендаций")}
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <StackField label={tr(locale, "Recommended Model", "Рекомендуемая модель")} value={stack.model} />
          <StackField label={tr(locale, "Recommended Agent", "Рекомендуемый агент")} value={stack.agent} />
          <StackField
            label={tr(locale, "Recommended Skill Pack", "Рекомендуемый skill pack")}
            value={
              recommendedPack
                ? `${stack.skillPack} (${
                    recommendedPackAccessible
                      ? tr(locale, "accessible", "доступен")
                      : `${tr(locale, "requires", "нужен тариф")} ${recommendedPack.tier}`
                  })`
                : `${stack.skillPack} (${tr(locale, "not found in catalog", "не найден в каталоге")})`
            }
          />
          <StackField label={tr(locale, "Recommended MCP Servers", "Рекомендуемые MCP серверы")} value={selectedServers.map((server) => server.name).join(", ")} />
        </div>
        <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3 text-sm text-amber-100">
          <p className="flex items-start gap-2">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {recommendationWarning(locale, stack)}
          </p>
          {!recommendedPackAccessible && recommendedPack ? (
            <p className="mt-2">
              {tr(
                locale,
                `Demo user plan is ${userPlan}. This skill pack requires ${recommendedPack.tier}; upgrade before downloading its manifest.`,
                `Тариф demo user: ${userPlan}. Этому skill pack нужен ${recommendedPack.tier}; улучши тариф перед скачиванием manifest.`
              )}
            </p>
          ) : null}
        </div>
        <ResultList title={tr(locale, "Why this stack", "Почему этот стек")} items={recommendationReasoning(locale, stack)} />
        <ResultList title={tr(locale, "Alternatives", "Альтернативы")} items={recommendationAlternatives(locale, stack)} />
        <div className="mt-4 space-y-2">
          <div>
            <p className="text-sm font-medium text-stone-200">{tr(locale, "Generated demo mcp.json", "Сгенерированный demo mcp.json")}</p>
            <p className="mt-1 text-xs text-stone-500">
              {tr(
                locale,
                "Demo config - verify package names before installing. Placeholder commands are not installable claims.",
                "Демо-конфиг - проверь package names перед установкой. Placeholder-команды не являются installable claims."
              )}
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
