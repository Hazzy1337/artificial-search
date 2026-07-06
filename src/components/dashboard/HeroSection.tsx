import Link from "next/link"
import { ArrowRight, BarChart3, GitCompare, Sparkles } from "lucide-react"

import { LiveStatusBadge } from "@/components/dashboard/LiveStatusBadge"
import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { Button } from "@/components/ui/button"
import { aiModels } from "@/lib/data/models"
import { calculateOverallScore, calculatePricePowerScore } from "@/lib/scoring"

export function HeroSection() {
  const bestOverall = [...aiModels].sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))[0]
  const bestValue = [...aiModels].sort((a, b) => calculatePricePowerScore(b) - calculatePricePowerScore(a))[0]

  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <LiveStatusBadge />
          <span className="rounded-full border border-amber-200/25 bg-amber-200/10 px-2.5 py-1 text-xs text-amber-100 shadow-[0_0_28px_rgba(231,200,115,0.12)]">
            Demo scoring model
          </span>
        </div>
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-amber-100/80">AI search intelligence layer</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-normal text-stone-50 sm:text-6xl lg:text-7xl">
            Artificial Search
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-stone-200">
            Choose the strongest AI stack for your task with boardroom-grade clarity.
          </p>
          <p className="max-w-2xl text-sm leading-6 text-stone-400">
            Compare model intelligence, agent behavior, MCP risk and premium workflow packs inside one polished command center.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11 bg-amber-300 text-stone-950 shadow-[0_18px_60px_rgba(231,200,115,0.22)] hover:bg-amber-200" size="lg">
            <Link href="/compare">
              <GitCompare aria-hidden="true" />
              Compare Models
            </Link>
          </Button>
          <Button asChild className="h-11 border-amber-200/30 bg-white/5 text-amber-100 hover:bg-amber-200/10" size="lg" variant="outline">
            <Link href="/recommend">
              <Sparkles aria-hidden="true" />
              Find Best AI Stack
            </Link>
          </Button>
        </div>
      </div>

      <div className="luxury-panel rounded-lg p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-stone-100">Live board preview</p>
            <p className="text-xs text-stone-400">Mock telemetry, updated for MVP demo</p>
          </div>
          <BarChart3 aria-hidden="true" className="size-5 text-amber-200" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-4">
            <p className="text-xs text-stone-400">Best Overall Model</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="font-medium text-stone-50">{bestOverall.name}</span>
              <ScoreBadge score={calculateOverallScore(bestOverall)} trend={bestOverall.trend} />
            </div>
          </div>
          <div className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-4">
            <p className="text-xs text-stone-400">Best Price/Power</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="font-medium text-stone-50">{bestValue.name}</span>
              <ScoreBadge score={calculatePricePowerScore(bestValue)} trend={bestValue.trend} />
            </div>
          </div>
        </div>
        <Link className="mt-4 inline-flex items-center gap-2 text-sm text-amber-100 hover:text-amber-50" href="/models">
          Open full model table
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  )
}
