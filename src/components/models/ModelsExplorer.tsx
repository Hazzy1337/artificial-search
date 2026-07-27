"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import { LeaderboardTable } from "@/components/dashboard/LeaderboardTable"
import { ModelCard } from "@/components/models/ModelCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { tr } from "@/lib/i18n"
import type { ModelSortCategory } from "@/lib/scoring"
import { sortByCategory } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { AiModel } from "@/lib/types"
import { cn } from "@/lib/utils"

type ModelsExplorerProps = {
  locale: Locale
  models: AiModel[]
}

const filters: Array<{ labelEn: string; labelRu: string; value: ModelSortCategory }> = [
  { labelEn: "Overall", labelRu: "Общий", value: "overall" },
  { labelEn: "Coding", labelRu: "Кодинг", value: "coding" },
  { labelEn: "Reasoning", labelRu: "Reasoning", value: "reasoning" },
  { labelEn: "Vision", labelRu: "Зрение", value: "vision" },
  { labelEn: "Long Context", labelRu: "Длинный контекст", value: "long-context" },
  { labelEn: "Cheap", labelRu: "Бюджетные", value: "cheap" },
  { labelEn: "Fast", labelRu: "Быстрые", value: "fast" },
  { labelEn: "Open Source", labelRu: "Open Source", value: "open-source" },
]

export function ModelsExplorer({ locale, models }: ModelsExplorerProps) {
  const [filter, setFilter] = useState<ModelSortCategory>("overall")
  const visibleModels = useMemo(() => sortByCategory(models, filter), [filter, models])

  return (
    <div className="space-y-6">
      <div className="luxury-panel rounded-lg p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-50">
              <SlidersHorizontal aria-hidden="true" className="size-5 text-amber-200" />
              {tr(locale, "Model filters", "Фильтры моделей")}
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {tr(locale, "Sort and narrow the demo model board by task profile.", "Сортируй демо-рейтинг моделей под профиль задачи.")}
            </p>
          </div>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {tr(locale, "Demo data", "Демо-данные")}
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
              {tr(locale, item.labelEn, item.labelRu)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {visibleModels.map((model) => (
          <ModelCard key={model.id} locale={locale} model={model} />
        ))}
      </div>

      <div className="luxury-panel rounded-lg p-4">
        <h2 className="mb-4 text-lg font-semibold text-stone-50">{tr(locale, "Filtered table", "Отфильтрованная таблица")}</h2>
        <LeaderboardTable locale={locale} models={visibleModels} preserveOrder />
      </div>
    </div>
  )
}
