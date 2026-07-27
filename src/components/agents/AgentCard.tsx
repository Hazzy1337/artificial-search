import { Bot } from "lucide-react"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { priceLevelText, tr } from "@/lib/i18n"
import { calculateAgentScore } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { AiAgent } from "@/lib/types"

type AgentCardProps = {
  agent: AiAgent
  locale?: Locale
}

export function AgentCard({ agent, locale = "en" }: AgentCardProps) {
  return (
    <Card className="luxury-panel rounded-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-stone-50">
              <Bot aria-hidden="true" className="size-4 text-amber-200" />
              {agent.name}
            </CardTitle>
            <p className="mt-1 text-sm text-stone-400">{agent.provider}</p>
          </div>
          <ScoreBadge score={calculateAgentScore(agent)} trend={agent.trend} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-stone-300">{agent.notes}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <PowerScoreBar label={tr(locale, "Task Success", "Успех задач")} value={agent.taskSuccess} />
          <PowerScoreBar label={tr(locale, "Codebase Understanding", "Понимание кодовой базы")} value={agent.codebaseUnderstanding} />
          <PowerScoreBar label={tr(locale, "Tool Use", "Работа с tools")} value={agent.toolUse} />
          <PowerScoreBar label={tr(locale, "Autonomy", "Автономность")} value={agent.autonomy} />
          <PowerScoreBar label={tr(locale, "Recovery", "Восстановление")} value={agent.recoveryAfterError} />
          <PowerScoreBar label={`${tr(locale, "Cost", "Стоимость")} (${priceLevelText(locale, agent.costLevel)})`} value={agent.costEfficiency} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-stone-200">{tr(locale, "Best for", "Лучше всего для")}</p>
          <div className="flex flex-wrap gap-2">
            {agent.bestFor.map((item) => (
              <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-stone-200">{tr(locale, "Weaknesses", "Слабые стороны")}</p>
          <ul className="space-y-1 text-sm text-stone-400">
            {agent.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
