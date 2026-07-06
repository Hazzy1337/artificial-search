"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import { LeaderboardTable } from "@/components/dashboard/LeaderboardTable"
import { ModelCard } from "@/components/models/ModelCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ModelSortCategory } from "@/lib/scoring"
import { sortByCategory } from "@/lib/scoring"
import type { AiModel } from "@/lib/types"
import { cn } from "@/lib/utils"

type ModelsExplorerProps = {
  models: AiModel[]
}

const filters: Array<{ label: string; value: ModelSortCategory }> = [
  { label: "Overall", value: "overall" },
  { label: "Coding", value: "coding" },
  { label: "Reasoning", value: "reasoning" },
  { label: "Vision", value: "vision" },
  { label: "Long Context", value: "long-context" },
  { label: "Cheap", value: "cheap" },
  { label: "Fast", value: "fast" },
  { label: "Open Source", value: "open-source" },
]

export function ModelsExplorer({ models }: ModelsExplorerProps) {
  const [filter, setFilter] = useState<ModelSortCategory>("overall")
  const visibleModels = useMemo(() => sortByCategory(models, filter), [filter, models])

  return (
    <div className="space-y-6">
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-50">
              <SlidersHorizontal aria-hidden="true" className="size-5 text-amber-200" />
              Model filters
            </h2>
            <p className="mt-1 text-sm text-stone-400">Sort and narrow the demo model board by task profile.</p>
          </div>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Demo data
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              className={cn(
                "border-amber-200/15 bg-white/[0.035] text-stone-300 hover:bg-amber-200/10 hover:text-amber-50",
                filter === item.value && "border-amber-200/40 bg-amber-200/15 text-amber-100"
              )}
              key={item.value}
              onClick={() => setFilter(item.value)}
              size="sm"
              variant="outline"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {visibleModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>

      <div className="luxury-panel rounded-lg p-4">
        <h2 className="mb-4 text-lg font-semibold text-stone-50">Filtered table</h2>
        <LeaderboardTable models={visibleModels} />
      </div>
    </div>
  )
}
