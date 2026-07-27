"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { PricingCard } from "@/components/pricing/PricingCard"
import { Badge } from "@/components/ui/badge"
import type { DemoUser, PlanName, PricingPlan } from "@/lib/types"

type PricingPlansClientProps = {
  initialUser: DemoUser
  plans: PricingPlan[]
}

export function PricingPlansClient({ initialUser, plans }: PricingPlansClientProps) {
  const router = useRouter()
  const [currentPlan, setCurrentPlan] = useState(initialUser.plan)
  const [pendingPlan, setPendingPlan] = useState<PlanName | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function changePlan(plan: PlanName) {
    setPendingPlan(plan)
    setError(null)

    try {
      const response = await fetch("/api/subscription/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        throw new Error(`Subscription update failed with ${response.status}`)
      }

      const payload = (await response.json()) as { user: DemoUser }
      setCurrentPlan(payload.user.plan)
      window.dispatchEvent(new CustomEvent("artificial-search-plan-changed", { detail: payload.user }))
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Subscription update failed")
    } finally {
      setPendingPlan(null)
    }
  }

  return (
    <div className="space-y-4">
      <section className="luxury-panel rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-50">Change demo plan</h2>
            <p className="mt-1 text-sm leading-6 text-stone-400">
              Demo subscription flow for course project. Plan changes are persisted in SQLite for the demo user.
            </p>
          </div>
          <Badge className="border-cyan-200/25 bg-cyan-200/10 text-cyan-100" variant="outline">
            Demo user: {currentPlan}
          </Badge>
        </div>
        {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}
      </section>

      <div className="grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard
            currentPlan={currentPlan}
            key={plan.id}
            onChangePlan={changePlan}
            pendingPlan={pendingPlan}
            plan={plan}
          />
        ))}
      </div>
    </div>
  )
}
