"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { recommendations } from "@/lib/data"
import { getRecommendedStack } from "@/lib/scoring"
import type { RecommendationTask } from "@/lib/types"

export function RecommendationWizard() {
  const [task, setTask] = useState<RecommendationTask>("large-codebase")
  const stack = getRecommendedStack(task)

  const config = useMemo(() => {
    const mcpServers = Object.fromEntries(
      stack.mcp.slice(0, 4).map((server) => {
        const key = server.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        return [
          key,
          {
            command: "npx",
            args: [`@artificial-search/${key}-mcp`],
          },
        ]
      })
    )

    return JSON.stringify({ mcpServers }, null, 2)
  }, [stack])

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="luxury-panel rounded-lg p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-50">
          <Sparkles aria-hidden="true" className="size-5 text-amber-200" />
          Find Best AI Stack
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-400">Choose a workflow and Artificial Search will assemble a demo stack.</p>
        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-stone-200" htmlFor="task-select">
            Task
          </label>
          <Select onValueChange={(value) => setTask(value as RecommendationTask)} value={task}>
            <SelectTrigger className="h-10 w-full border-amber-200/15 bg-black/30 text-stone-100" id="task-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-amber-200/15 bg-[#08070b]">
              {recommendations.map((item) => (
                <SelectItem key={item.task} value={item.task}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-stone-50">{stack.label}</h3>
            <p className="mt-1 text-sm text-stone-400">Recommended stack</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            Demo recommendation
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <StackField label="Model" value={stack.model} />
          <StackField label="Agent" value={stack.agent} />
          <StackField label="Skill Pack" value={stack.skillPack} />
          <StackField label="MCP" value={stack.mcp.join(", ")} />
        </div>
        <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3 text-sm text-amber-100">
          <p className="flex items-start gap-2">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {stack.warning}
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-stone-200">Why this stack</p>
          <ul className="grid gap-2 text-sm text-stone-400 sm:grid-cols-3">
            {stack.reasoning.map((item) => (
              <li className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-stone-200">Generated mcp.json</p>
          <Textarea className="min-h-44 border-amber-200/15 bg-black/35 font-mono text-xs text-stone-200" readOnly value={config} />
        </div>
      </div>
    </div>
  )
}

function StackField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-amber-200/10 bg-white/[0.045] p-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-stone-100">{value}</p>
    </div>
  )
}
