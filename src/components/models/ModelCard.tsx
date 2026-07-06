import { Brain, CheckCircle2, XCircle } from "lucide-react"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateOverallScore } from "@/lib/scoring"
import type { AiModel } from "@/lib/types"

type ModelCardProps = {
  model: AiModel
}

export function ModelCard({ model }: ModelCardProps) {
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
          <Badge variant="outline">{model.category}</Badge>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {model.priceLevel}
          </Badge>
          <Badge className="border-stone-300/20 text-stone-300" variant="outline">
            {model.contextWindow} context
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <PowerScoreBar label="Coding" value={model.coding} />
          <PowerScoreBar label="Reasoning" value={model.reasoning} />
          <PowerScoreBar label="Agent Power" value={model.agentPower} />
          <PowerScoreBar label="Cost Efficiency" value={model.costEfficiency} />
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 font-medium text-emerald-100">
              <CheckCircle2 aria-hidden="true" className="size-4" />
              Strengths
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
              Weaknesses
            </p>
            <ul className="space-y-1 text-stone-400">
              {model.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">Best use cases</p>
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
