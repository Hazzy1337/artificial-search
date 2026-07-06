"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findRecommendationByQuery } from "@/lib/scoring"

const quickPrompts = [
  "Fix bugs in a large codebase",
  "Build a SaaS dashboard",
  "Analyze contracts",
  "Find MCP tools for coding",
  "Choose cheap API model",
]

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("Fix bugs in a large Next.js codebase")
  const preview = useMemo(() => findRecommendationByQuery(query), [query])

  function submitSearch(nextQuery = query) {
    const stack = findRecommendationByQuery(nextQuery)
    router.push(`/recommend?task=${stack.task}&q=${encodeURIComponent(nextQuery)}`)
  }

  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100" variant="outline">
            <Sparkles aria-hidden="true" className="size-3" />
            AI stack search
          </Badge>
          <span className="rounded-full border border-amber-200/25 bg-amber-200/10 px-2.5 py-1 text-xs text-amber-100">
            Demo data · Not real-time yet
          </span>
        </div>
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-100/80">AI search intelligence layer</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-normal text-stone-50 sm:text-6xl lg:text-7xl">
            Artificial Search
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-stone-200">
            Find the best AI model, agent, MCP server and skill pack for your task.
          </p>
        </div>

        <div className="luxury-panel rounded-lg p-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              className="h-12 border-cyan-200/20 bg-black/35 text-base text-stone-100 placeholder:text-stone-500 focus-visible:ring-cyan-200/40"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitSearch()
                }
              }}
              placeholder="What do you want AI to do? Example: Fix bugs in a large Next.js codebase"
              value={query}
            />
            <Button className="h-12 bg-cyan-200 px-5 text-stone-950 hover:bg-cyan-100" onClick={() => submitSearch()}>
              <Search aria-hidden="true" />
              Search
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                className="rounded-full border border-amber-200/15 bg-white/[0.04] px-3 py-1.5 text-xs text-stone-300 transition-colors hover:border-cyan-200/30 hover:bg-cyan-200/10 hover:text-cyan-50"
                key={prompt}
                onClick={() => {
                  setQuery(prompt)
                  submitSearch(prompt)
                }}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="luxury-panel rounded-lg p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-stone-100">Recommended stack preview</p>
            <p className="text-xs text-stone-400">Prototype keyword matching from demo data</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            Mock scoring
          </Badge>
        </div>
        <div className="grid gap-3">
          <PreviewField label="Task" value={preview.label} />
          <PreviewField label="Model" value={preview.model} />
          <PreviewField label="Agent" value={preview.agent} />
          <PreviewField label="Skill Pack" value={preview.skillPack} />
        </div>
        <button
          className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-100 transition-colors hover:text-cyan-50"
          onClick={() => submitSearch()}
          type="button"
        >
          Open recommendation
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </section>
  )
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cyan-200/10 bg-white/[0.04] p-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-stone-50">{value}</p>
    </div>
  )
}
