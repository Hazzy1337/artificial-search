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
import { calculateAgentScore, calculateOverallScore, calculatePricePowerScore } from "@/lib/scoring"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Artificial Search",
  description: "Course MVP AI-stack marketplace and recommendation dashboard with seeded data and demo subscription access.",
}

export default async function Home() {
  const [aiModels, aiAgents, mcpServers] = await Promise.all([getCatalogModels(), getCatalogAgents(), getCatalogMcpServers()])
  const bestOverall = [...aiModels].sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))[0]
  const bestCodingAgent = [...aiAgents].sort((a, b) => calculateAgentScore(b) - calculateAgentScore(a))[0]
  const bestPricePower = [...aiModels].sort((a, b) => calculatePricePowerScore(b) - calculatePricePowerScore(a))[0]
  const bestMcpStack = [...mcpServers].sort((a, b) => b.rating - a.rating)[0]
  const biggestMover = [...aiModels].sort((a, b) => b.movement24h - a.movement24h)[0]

  const leaders = [
    {
      title: "Best Overall Model",
      value: bestOverall.name,
      detail: bestOverall.provider,
      score: calculateOverallScore(bestOverall),
      icon: Brain,
    },
    {
      title: "Best Coding Agent",
      value: bestCodingAgent.name,
      detail: bestCodingAgent.provider,
      score: calculateAgentScore(bestCodingAgent),
      icon: Bot,
    },
    {
      title: "Best Price/Power",
      value: bestPricePower.name,
      detail: bestPricePower.priceLevel,
      score: calculatePricePowerScore(bestPricePower),
      icon: TrendingUp,
    },
    {
      title: "Best MCP Stack",
      value: bestMcpStack.name,
      detail: bestMcpStack.category,
      score: bestMcpStack.rating,
      icon: Puzzle,
    },
    {
      title: "Biggest Mover 24h",
      value: biggestMover.name,
      detail: `${biggestMover.movement24h > 0 ? "+" : ""}${biggestMover.movement24h}% demo delta`,
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
      <HeroSection />

      <section className="space-y-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-stone-50">Prototype leaders</h2>
            <p className="mt-1 text-sm text-stone-400">Demo leaders across models, agents, MCP and movement signals. Not real-time yet.</p>
          </div>
          <Badge className="border-amber-200/30 bg-amber-200/10 text-amber-100" variant="outline">
            Demo data
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
            <h2 className="text-xl font-semibold text-stone-50">Demo Intelligence Index Over Time</h2>
            <p className="mt-1 text-sm text-stone-400">Mock weekly trend, normalized to a 0-100 demo index.</p>
          </div>
          <TrendChart data={powerIndexData} series={powerIndexSeries} />
        </div>
        <div className="luxury-panel min-w-0 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-50">Top AI Models in Prototype Scoring</h2>
            <p className="mt-1 text-sm text-stone-400">Ranked by the demo scoring formula from the task file.</p>
          </div>
          <LeaderboardTable models={aiModels} />
        </div>
      </section>

      <section className="py-6">
        <div className="luxury-panel rounded-lg p-5">
          <h2 className="text-2xl font-semibold text-stone-50">Not just a leaderboard</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-300">
            Artificial Search compares models, AI agents, MCP servers, skill packs and concrete workflows. A model can be strong in
            reasoning but weak as an agent host; an agent can use tools well but need a safer MCP permission profile; a
            workflow can need a focused pack like Large Codebase Refactor or Business Document Agent Pack rather than a generic prompt.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {["Models", "Agents", "MCP risk", "Skill packs"].map((item) => (
              <div className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-4" key={item}>
                <p className="font-medium text-stone-100">{item}</p>
                <p className="mt-2 text-sm text-stone-400">Demo scoring, filters and practical fit signals.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
