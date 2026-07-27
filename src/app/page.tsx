import { Bot, Brain, Package, Puzzle, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

import { HeroSection } from "@/components/dashboard/HeroSection"
import { LeaderboardTable } from "@/components/dashboard/LeaderboardTable"
import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { TrendChart } from "@/components/dashboard/TrendChart"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCatalogAgents, getCatalogMcpServers, getCatalogModels } from "@/lib/catalog"
import { powerIndexData, powerIndexSeries } from "@/lib/data"
import { priceLevelText, tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"
import { calculateAgentScore, calculateOverallScore, calculatePricePowerScore } from "@/lib/scoring"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Artificial Search",
  description: "Course MVP AI-stack marketplace and recommendation dashboard with seeded data and demo subscription access.",
}

export default async function Home() {
  const locale = await getCurrentLocale()
  const [aiModels, aiAgents, mcpServers] = await Promise.all([getCatalogModels(), getCatalogAgents(), getCatalogMcpServers()])
  const bestOverall = [...aiModels].sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))[0]
  const bestCodingAgent = [...aiAgents].sort((a, b) => calculateAgentScore(b) - calculateAgentScore(a))[0]
  const bestPricePower = [...aiModels].sort((a, b) => calculatePricePowerScore(b) - calculatePricePowerScore(a))[0]
  const bestMcpStack = [...mcpServers].sort((a, b) => b.rating - a.rating)[0]
  const biggestMover = [...aiModels].sort((a, b) => b.movement24h - a.movement24h)[0]

  const leaders = [
    {
      title: tr(locale, "Best Overall Model", "Лучшая модель"),
      value: bestOverall.name,
      detail: bestOverall.provider,
      score: calculateOverallScore(bestOverall),
      icon: Brain,
    },
    {
      title: tr(locale, "Best Coding Agent", "Лучший coding-агент"),
      value: bestCodingAgent.name,
      detail: bestCodingAgent.provider,
      score: calculateAgentScore(bestCodingAgent),
      icon: Bot,
    },
    {
      title: tr(locale, "Best Price/Power", "Лучшая цена/мощность"),
      value: bestPricePower.name,
      detail: priceLevelText(locale, bestPricePower.priceLevel),
      score: calculatePricePowerScore(bestPricePower),
      icon: TrendingUp,
    },
    {
      title: tr(locale, "Best MCP Stack", "Лучший MCP стек"),
      value: bestMcpStack.name,
      detail: bestMcpStack.category,
      score: bestMcpStack.rating,
      icon: Puzzle,
    },
    {
      title: tr(locale, "Biggest Mover 24h", "Главный рост за 24ч"),
      value: biggestMover.name,
      detail: `${biggestMover.movement24h > 0 ? "+" : ""}${biggestMover.movement24h}% ${tr(locale, "demo delta", "демо-изменение")}`,
      score: calculateOverallScore(biggestMover),
      icon: Package,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "SoftwareApplication"],
            name: "Artificial Search",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: siteUrl,
            description:
              "Course MVP AI-stack marketplace and recommendation dashboard with seeded demo data and subscription-gated skill pack manifests.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
          }),
        }}
        type="application/ld+json"
      />
      <HeroSection key={locale} locale={locale} />

      <section className="space-y-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-stone-50">{tr(locale, "Prototype leaders", "Лидеры прототипа")}</h2>
            <p className="mt-1 text-sm text-stone-400">
              {tr(locale, "Demo leaders across models, agents, MCP and movement signals. Not real-time yet.", "Демо-лидеры по моделям, агентам, MCP и сигналам изменения. Это ещё не real-time.")}
            </p>
          </div>
          <Badge className="border-amber-200/30 bg-amber-200/10 text-amber-100" variant="outline">
            {tr(locale, "Demo data", "Демо-данные")}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {leaders.map((leader) => {
            const Icon = leader.icon
            return (
              <Card className="luxury-panel rounded-lg" key={leader.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm text-stone-300">
                    <Icon aria-hidden="true" className="size-4 text-amber-200" />
                    {leader.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-lg font-semibold text-stone-50">{leader.value}</p>
                  <p className="text-sm text-stone-400">{leader.detail}</p>
                  <ScoreBadge score={leader.score} />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 py-6 xl:grid-cols-[minmax(380px,0.85fr)_minmax(0,1.65fr)]">
        <div className="luxury-panel min-w-0 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-50">{tr(locale, "Demo Intelligence Index Over Time", "Демо-индекс интеллекта по времени")}</h2>
            <p className="mt-1 text-sm text-stone-400">{tr(locale, "Mock weekly trend, normalized to a 0-100 demo index.", "Тестовый недельный тренд, нормализованный в демо-индекс 0-100.")}</p>
          </div>
          <TrendChart data={powerIndexData} series={powerIndexSeries} />
        </div>
        <div className="luxury-panel min-w-0 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-50">{tr(locale, "Top AI Models in Prototype Scoring", "Топ AI моделей по демо-оценке")}</h2>
            <p className="mt-1 text-sm text-stone-400">{tr(locale, "Ranked by the demo scoring formula from the task file.", "Рейтинг по демо-формуле оценки из задания.")}</p>
          </div>
          <LeaderboardTable locale={locale} models={aiModels} />
        </div>
      </section>

      <section className="py-6">
        <div className="luxury-panel rounded-lg p-5">
          <h2 className="text-2xl font-semibold text-stone-50">{tr(locale, "Not just a leaderboard", "Не просто рейтинг")}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-300">
            {tr(
              locale,
              "Artificial Search compares models, AI agents, MCP servers, skill packs and concrete workflows. A model can be strong in reasoning but weak as an agent host; an agent can use tools well but need a safer MCP permission profile; a workflow can need a focused pack rather than a generic prompt.",
              "Artificial Search сравнивает модели, AI-агентов, MCP серверы, наборы скиллов и конкретные рабочие процессы. Модель может быть сильной в reasoning, но слабой как host для агента; агент может хорошо использовать tools, но требовать более безопасный профиль MCP-доступов; workflow может требовать точный набор скиллов, а не общий prompt."
            )}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              [tr(locale, "Models", "Модели"), tr(locale, "Demo scoring, filters and practical fit signals.", "Демо-оценка, фильтры и сигналы практической пригодности.")],
              [tr(locale, "Agents", "Агенты"), tr(locale, "Demo scoring, filters and practical fit signals.", "Демо-оценка, фильтры и сигналы практической пригодности.")],
              [tr(locale, "MCP risk", "Риски MCP"), tr(locale, "Demo scoring, filters and practical fit signals.", "Демо-оценка, фильтры и сигналы практической пригодности.")],
              [tr(locale, "Skill packs", "Наборы скиллов"), tr(locale, "Demo scoring, filters and practical fit signals.", "Демо-оценка, фильтры и сигналы практической пригодности.")],
            ].map(([title, description]) => (
              <div className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-4" key={title}>
                <p className="font-medium text-stone-100">{title}</p>
                <p className="mt-2 text-sm text-stone-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
