import { ArrowUpRight, Minus, TrendingDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Trend } from "@/lib/types"

type ScoreBadgeProps = {
  score: number
  trend?: Trend
  label?: string
}

export function ScoreBadge({ score, trend, label }: ScoreBadgeProps) {
  const tone =
    score >= 90
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
      : score >= 82
        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
        : "border-amber-400/30 bg-amber-400/10 text-amber-100"

  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? TrendingDown : Minus

  return (
    <Badge className={tone} variant="outline">
      {trend ? <TrendIcon aria-hidden="true" className="size-3" /> : null}
      {label ? `${label}: ` : null}
      {score.toFixed(1)}
    </Badge>
  )
}

