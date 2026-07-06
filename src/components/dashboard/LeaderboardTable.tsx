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
import { calculateOverallScore } from "@/lib/scoring"
import type { AiModel } from "@/lib/types"

type LeaderboardTableProps = {
  models: AiModel[]
}

export function LeaderboardTable({ models }: LeaderboardTableProps) {
  const sorted = [...models].sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-amber-200/10 hover:bg-transparent">
          <TableHead>Rank</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Intelligence</TableHead>
          <TableHead>Coding</TableHead>
          <TableHead>Agent Power</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Cost Efficiency</TableHead>
          <TableHead>Context</TableHead>
          <TableHead>Overall Score</TableHead>
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
