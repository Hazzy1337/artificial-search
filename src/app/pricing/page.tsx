import type { Metadata } from "next"

import { PricingPlansClient } from "@/components/pricing/PricingPlansClient"
import { Badge } from "@/components/ui/badge"
import { pricingPlans } from "@/lib/data/pricing"
import { getDemoUser } from "@/lib/demoUser"
import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Demo Free, Premium and Pro subscription plans for Artificial Search course MVP.",
}

export default async function PricingPage() {
  const [locale, user] = await Promise.all([getCurrentLocale(), getDemoUser()])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Pricing", "Тарифы")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "Plans for AI stack intelligence", "Тарифы для AI stack intelligence")}</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(locale, "Demo subscription flow for course project. No real Stripe payment is used.", "Демо-подписка для курсового проекта. Реальный Stripe-платеж не используется.")}
        </p>
      </section>

      <PricingPlansClient initialUser={user} locale={locale} plans={pricingPlans} />

      <section className="luxury-panel rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-amber-300/30 bg-amber-300/10 text-amber-100" variant="outline">
            {tr(locale, "Premium mechanics", "Механика Premium")}
          </Badge>
          <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
            {tr(locale, "Database-backed demo", "Демо через базу данных")}
          </Badge>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-stone-300">
          {tr(
            locale,
              "Pricing buttons update the demo user plan through `POST /api/subscription/change`. Real payments and Stripe checkout are intentionally out of scope for this course MVP.",
              "Кнопки тарифов обновляют план demo user через `POST /api/subscription/change`. Реальные платежи и Stripe checkout намеренно вне scope этого MVP."
          )}
        </p>
      </section>
    </main>
  )
}
