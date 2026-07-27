import { AlertTriangle, ExternalLink, Puzzle, Shield } from "lucide-react"

import { ScoreBadge } from "@/components/dashboard/ScoreBadge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { riskText, statusText, tr, tv } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import type { McpServer, RiskLevel } from "@/lib/types"

type McpCardProps = {
  locale?: Locale
  server: McpServer
}

const riskClass: Record<RiskLevel, string> = {
  Low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  High: "border-red-400/30 bg-red-400/10 text-red-100",
}

export function McpCard({ locale = "en", server }: McpCardProps) {
  return (
    <Card className="luxury-panel rounded-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-stone-50">
              <Puzzle aria-hidden="true" className="size-4 text-amber-200" />
              {server.name}
            </CardTitle>
            <p className="mt-1 text-sm text-stone-400">{server.category}</p>
          </div>
          <ScoreBadge score={server.rating} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-stone-300">{server.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge className={riskClass[server.riskLevel]} variant="outline">
            <AlertTriangle aria-hidden="true" className="size-3" />
            {riskText(locale, server.riskLevel)} {tr(locale, "risk", "риск")}
          </Badge>
          <Badge className="border-stone-300/20 text-stone-300" variant="outline">
            {tv(locale, server.setupDifficulty)} {tr(locale, "setup", "настройка")}
          </Badge>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            {server.access}
          </Badge>
          <Badge
            className={
              server.status === "verified"
                ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                : server.status === "placeholder"
                  ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
                : "border-stone-300/20 bg-white/[0.055] text-stone-200"
            }
            variant="outline"
          >
            {tr(locale, "status", "статус")}: {statusText(locale, server.status)}
          </Badge>
        </div>
        {server.sourceUrl ? (
          <a
            className="inline-flex items-center gap-1.5 text-sm text-cyan-100 transition-colors hover:text-cyan-50"
            href={server.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            {tr(locale, "Source link", "Ссылка на источник")}
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        ) : null}
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">{tr(locale, "Compatible with", "Совместимо с")}</p>
          <div className="flex flex-wrap gap-2">
            {server.compatibleWith.map((item) => (
              <Badge className="border-stone-300/20 text-stone-300" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">{tr(locale, "Recommended for", "Рекомендуется для")}</p>
          <div className="flex flex-wrap gap-2">
            {server.recommendedFor.map((item) => (
              <Badge className="border-cyan-200/15 text-cyan-100" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-stone-200">
            <Shield aria-hidden="true" className="size-4" />
            {tr(locale, "Permissions", "Permissions")}
          </p>
          <ul className="space-y-1 text-sm text-stone-400">
            {server.permissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">{tr(locale, "Risk notes", "Заметки по рискам")}</p>
          <ul className="space-y-1 text-sm text-stone-400">
            {server.riskNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
