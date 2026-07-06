import { Lock, Package, Unlock } from "lucide-react"
import Link from "next/link"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { SkillPack } from "@/lib/types"

type SkillPackCardProps = {
  pack: SkillPack
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
      {pack.locked ? <div className="pointer-events-none absolute inset-0 z-10 rounded-lg bg-black/20 backdrop-blur-[1px]" /> : null}
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-stone-50">
              <Package aria-hidden="true" className="size-4 text-amber-200" />
              {pack.name}
            </CardTitle>
            <p className="mt-1 text-sm text-stone-400">{pack.summary}</p>
          </div>
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            <LockIcon aria-hidden="true" className="size-3" />
            {pack.tier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <PowerScoreBar label="Compatibility" value={pack.compatibilityScore} />
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">For models</p>
          <div className="flex flex-wrap gap-2">
            {pack.compatibleModels.map((item) => (
              <Badge className="border-stone-300/20 text-stone-300" key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-stone-200">Inside</p>
          <div className="flex flex-wrap gap-2">
            {pack.inside.map((item) => (
              <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" key={item} variant="outline">
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
        {pack.locked ? (
          <Button className="w-full" disabled variant="outline">
            Locked
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/skills/${pack.id}`}>View Pack</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
