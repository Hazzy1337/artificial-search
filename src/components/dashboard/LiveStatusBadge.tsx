import { Activity } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type LiveStatusBadgeProps = {
  label?: string
}

export function LiveStatusBadge({ label = "Demo data" }: LiveStatusBadgeProps) {
  return (
    <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200" variant="outline">
      <Activity aria-hidden="true" className="size-3" />
      {label}
    </Badge>
  )
}
