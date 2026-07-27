import type { Metadata } from "next"

import { PricingPlansClient } from "@/components/pricing/PricingPlansClient"
import { Badge } from "@/components/ui/badge"
import { pricingPlans } from "@/lib/data/pricing"
import { getDemoUser } from "@/lib/demoUser"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Demo Free, Premium and Pro subscription plans for Artificial Search course MVP.",
}

export default async function PricingPage() {
  const user = await getDemoUser()

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Pricing</p>
        <h1 className="text-3xl font-semibold text-stone-50">Plans for AI stack intelligence</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Demo subscription flow for course project. No real Stripe payment is used.
        </p>
      </section>

      <PricingPlansClient initialUser={user} plans={pricingPlans} />

      <section className="luxury-panel rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Premium mechanics
          </Badge>
          <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
            SQLite-backed demo
          </Badge>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-300">
          Pricing buttons update the demo user plan through `POST /api/subscription/change`. Real payments and Stripe
          checkout are intentionally out of scope for this course MVP.
        </p>
      </section>
    </main>
  )
}
