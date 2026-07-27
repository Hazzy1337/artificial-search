import { Brain, CheckCircle2, XCircle } from "lucide-react"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { priceLevelText, tr, tv } from "@/lib/i18n"
import { calculateOverallScore } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { AiModel } from "@/lib/types"

type ModelCardProps = {
  locale?: Locale
  model: AiModel
}

export function ModelCard({ locale = "en", model }: ModelCardProps) {
  return (
    <Card className="luxury-panel rounded-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-stone-50">
              <Brain aria-hidden="true" className="size-4 text-amber-200" />
              {model.name}
            </CardTitle>
            <p className="text-sm text-stone-400">{model.provider}</p>
          </div>
          <ScoreBadge score={calculateOverallScore(model)} trend={model.trend} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{tv(locale, model.category)}</Badge>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {priceLevelText(locale, model.priceLevel)}
          </Badge>
          <Badge className="border-stone-300/20 text-stone-300" variant="outline">
            {model.contextWindow} {tr(locale, "context", "контекст")}
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <PowerScoreBar label={tr(locale, "Coding", "Кодинг")} value={model.coding} />
          <PowerScoreBar label={tr(locale, "Reasoning", "Reasoning")} value={model.reasoning} />
          <PowerScoreBar label={tr(locale, "Agent Power", "Сила агента")} value={model.agentPower} />
          <PowerScoreBar label={tr(locale, "Cost Efficiency", "Эффективность цены")} value={model.costEfficiency} />
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 font-medium text-emerald-100">
              <CheckCircle2 aria-hidden="true" className="size-4" />
              {tr(locale, "Strengths", "Сильные стороны")}
            </p>
            <ul className="space-y-1 text-stone-400">
              {model.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 font-medium text-amber-100">
              <XCircle aria-hidden="true" className="size-4" />
              {tr(locale, "Weaknesses", "Слабые стороны")}
            </p>
            <ul className="space-y-1 text-stone-400">
              {model.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">{tr(locale, "Best use cases", "Лучшие сценарии")}</p>
          <div className="flex flex-wrap gap-2">
            {model.bestFor.map((item) => (
              <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
