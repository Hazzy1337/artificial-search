import { ArrowUpRight, Minus, TrendingDown } from "lucide-react"

import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tr } from "@/lib/i18n"
import { calculateOverallScore } from "@/lib/scoring"
import type { Locale } from "@/lib/i18n"
import type { AiModel } from "@/lib/types"

type LeaderboardTableProps = {
  locale?: Locale
  models: AiModel[]
  preserveOrder?: boolean
}

export function LeaderboardTable({ locale = "en", models, preserveOrder }: LeaderboardTableProps) {
  const sorted = preserveOrder ? models : [...models].sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-amber-200/10 hover:bg-transparent">
          <TableHead>{tr(locale, "Rank", "Место")}</TableHead>
          <TableHead>{tr(locale, "Model", "Модель")}</TableHead>
          <TableHead>{tr(locale, "Provider", "Провайдер")}</TableHead>
          <TableHead>{tr(locale, "Intelligence", "Интеллект")}</TableHead>
          <TableHead>{tr(locale, "Coding", "Кодинг")}</TableHead>
          <TableHead>{tr(locale, "Agent Power", "Сила агента")}</TableHead>
          <TableHead>{tr(locale, "Speed", "Скорость")}</TableHead>
          <TableHead>{tr(locale, "Cost Efficiency", "Эффективность цены")}</TableHead>
          <TableHead>{tr(locale, "Context", "Контекст")}</TableHead>
          <TableHead>{tr(locale, "Overall Score", "Общая оценка")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((model, index) => {
          const TrendIcon =
            model.trend === "up" ? ArrowUpRight : model.trend === "down" ? TrendingDown : Minus

          return (
            <TableRow className="border-amber-200/10 hover:bg-white/[0.035]" key={model.id}>
              <TableCell className="font-mono text-stone-500">#{index + 1}</TableCell>
              <TableCell className="min-w-40 font-medium text-stone-50">
                <span className="inline-flex items-center gap-2">
                  <TrendIcon aria-hidden="true" className="size-4 text-amber-200" />
                  {model.name}
                </span>
              </TableCell>
              <TableCell className="text-stone-300">{model.provider}</TableCell>
              <TableCell>{model.intelligence}</TableCell>
              <TableCell>{model.coding}</TableCell>
              <TableCell>{model.agentPower}</TableCell>
              <TableCell>{model.speed}</TableCell>
              <TableCell>{model.costEfficiency}</TableCell>
              <TableCell>{model.contextWindow}</TableCell>
              <TableCell>
                <ScoreBadge score={calculateOverallScore(model)} trend={model.trend} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
