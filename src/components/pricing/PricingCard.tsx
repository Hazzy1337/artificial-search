import Link from "next/link"
import { CheckCircle2, Lock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createCheckoutSessionPlaceholder } from "@/lib/billing"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "@/lib/types"

type PricingCardProps = {
  plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={cn("luxury-panel rounded-lg", plan.highlighted && "border-amber-200/45 shadow-[0_28px_90px_rgba(231,200,115,0.14)]")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-stone-50">{plan.name}</CardTitle>
            <p className="mt-2 text-2xl font-semibold text-stone-50">{plan.price}</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            <Lock aria-hidden="true" className="size-3" />
            {plan.tier}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-stone-400">{plan.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm text-stone-300">
          {plan.features.map((feature) => (
            <li className="flex gap-2" key={feature}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 text-emerald-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className={cn("w-full", plan.highlighted && "bg-amber-300 text-stone-950 hover:bg-amber-200")}>
          <Link href={createCheckoutSessionPlaceholder(plan.id)}>{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
