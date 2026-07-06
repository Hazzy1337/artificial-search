import { PricingCard } from "@/components/pricing/PricingCard"
import { Badge } from "@/components/ui/badge"
import { pricingPlans } from "@/lib/data/pricing"

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Pricing</p>
        <h1 className="text-3xl font-semibold text-stone-50">Plans for AI stack intelligence</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          The billing flow is a mock placeholder. Stripe belongs in `src/lib/billing.ts` once real products exist.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      <section className="luxury-panel rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            Premium mechanics
          </Badge>
          <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
            Stripe placeholder
          </Badge>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-300">
          Premium and Pro CTAs route through a placeholder checkout URL. Real entitlement checks should later gate Pro skill
          packs, MCP config generator exports, update alerts and private project analyzer results.
        </p>
      </section>
    </main>
  )
}
