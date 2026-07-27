import { Download, Lock, Package, Unlock } from "lucide-react"
import Link from "next/link"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { SkillPackAccessView } from "@/lib/types"

type SkillPackCardProps = {
  pack: SkillPackAccessView
}

export function SkillPackCard({ pack }: SkillPackCardProps) {
  const LockIcon = pack.locked ? Lock : Unlock

  return (
    <Card
      className={cn(
        "luxury-panel relative rounded-lg",
        pack.highlighted && "border-amber-200/45 shadow-[0_28px_90px_rgba(231,200,115,0.14)]"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-stone-50">
              <Package aria-hidden="true" className="size-4 text-amber-200" />
              {pack.name}
            </CardTitle>
            <p className="mt-1 text-sm text-stone-400">{pack.summary}</p>
          </div>
          <Badge className={pack.accessible ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-red-300/30 bg-red-300/10 text-red-100"} variant="outline">
            <LockIcon aria-hidden="true" className="size-3" />
            {pack.accessible ? "Accessible" : "Locked"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Required plan: {pack.requiredPlan}
          </Badge>
          <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
            {pack.status}
          </Badge>
        </div>
        <PowerScoreBar label="Compatibility" value={pack.compatibilityScore} />
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">Recommended for</p>
          <div className="flex flex-wrap gap-2">
            {pack.recommendedFor.map((item) => (
              <Badge className="border-stone-300/20 text-stone-300" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">Features</p>
          <ul className="grid gap-1 text-sm text-stone-400 sm:grid-cols-2">
            {pack.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button asChild className="w-full">
            <Link href={`/skills/${pack.id}`}>View Pack</Link>
          </Button>
          {pack.accessible ? (
            <Button asChild className="w-full" variant="outline">
              <a href={`/api/skill-packs/${pack.id}/manifest`}>
                <Download aria-hidden="true" className="size-4" />
                Download Manifest
              </a>
            </Button>
          ) : (
            <Button asChild className="w-full" variant="outline">
              <Link href={`/pricing?required=${pack.requiredPlan}`}>Upgrade</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
