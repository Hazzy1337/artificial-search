import { CheckCircle2, CreditCard, Lock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tr } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n"
import type { PlanName, PricingPlan } from "@/lib/types"

type PricingCardProps = {
  currentPlan: PlanName
  locale: Locale
  onChangePlan: (plan: PlanName) => void
  pendingPlan: PlanName | null
  plan: PricingPlan
}

export function PricingCard({ currentPlan, locale, onChangePlan, pendingPlan, plan }: PricingCardProps) {
  const selectablePlan = getSelectablePlan(plan.tier)
  const selectable = Boolean(selectablePlan)
  const active = selectable && currentPlan === plan.tier
  const pending = selectable && pendingPlan === plan.tier
  const copy = getPlanCopy(locale, plan)

  return (
    <Card className={cn("luxury-panel rounded-lg", plan.highlighted && "border-amber-200/45 shadow-[0_28px_90px_rgba(231,200,115,0.14)]")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-stone-50">{copy.name}</CardTitle>
            <p className="mt-2 text-2xl font-semibold text-stone-50">{copy.price}</p>
          </div>
          <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
            {active ? <CreditCard aria-hidden="true" className="size-3" /> : <Lock aria-hidden="true" className="size-3" />}
            {active ? tr(locale, "Active", "Активен") : plan.tier}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-stone-400">{copy.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm text-stone-300">
          {copy.features.map((feature) => (
            <li className="flex gap-2" key={feature}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 text-emerald-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={cn("w-full", plan.highlighted && "bg-amber-300 text-stone-950 hover:bg-amber-200")}
          disabled={!selectable || active || pending}
          onClick={() => {
            if (selectablePlan) {
              onChangePlan(selectablePlan)
            }
          }}
          type="button"
          variant={active || !selectable ? "outline" : "default"}
        >
          {pending
            ? tr(locale, "Updating...", "Обновление...")
            : active
              ? tr(locale, "Current plan", "Текущий тариф")
              : selectable
                ? copy.cta
                : tr(locale, "Contact sales later", "Связаться позже")}
        </Button>
      </CardContent>
    </Card>
  )
}

function getSelectablePlan(value: PricingPlan["tier"]): PlanName | null {
  if (value === "Free" || value === "Premium" || value === "Pro") {
    return value
  }

  return null
}

function getPlanCopy(locale: Locale, plan: PricingPlan) {
  if (locale !== "ru") {
    return plan
  }

  const copies: Record<string, Pick<PricingPlan, "name" | "price" | "description" | "features" | "cta">> = {
    free: {
      name: "Free",
      price: "0 EUR",
      description: "Публичный рейтинг и базовое сравнение для быстрых решений.",
      features: ["AI рейтинг", "Базовое сравнение моделей", "Публичный MCP список", "Ограниченные рекомендации"],
      cta: "Начать Free",
    },
    premium: {
      name: "Premium",
      price: "12 EUR/месяц",
      description: "Premium skill packs и практические setup-гайды для solo builders.",
      features: ["Premium skill packs", "MCP setup-гайды", "Матрица совместимости", "AI stack рекомендации", "Update alerts"],
      cta: "Улучшить тариф",
    },
    pro: {
      name: "Pro",
      price: "29 EUR/месяц",
      description: "Продвинутые workflow для команд, которые запускают агентов на реальных проектах.",
      features: ["Все skill packs", "MCP config generator", "CodeGraph templates", "Advanced agent workflows", "Project analyzer mock", "Priority updates"],
      cta: "Перейти на Pro",
    },
    business: {
      name: "Business",
      price: "По запросу",
      description: "Приватные configs, policy templates и consulting для controlled deployments.",
      features: ["Team access", "Private MCP configs", "Security policy templates", "Audit logs placeholder", "Custom AI stack consulting"],
      cta: "Связаться",
    },
  }

  return {
    ...plan,
    ...(copies[plan.id] ?? {}),
  }
}
