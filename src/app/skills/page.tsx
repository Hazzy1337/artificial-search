import type { Metadata } from "next"

import { SkillPackCard } from "@/components/skills/SkillPackCard"
import { Badge } from "@/components/ui/badge"
import { getCatalogSkillPacks } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"
import { withSkillPackAccess } from "@/lib/plans"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Skill Packs",
  description: "Seeded AI coding skill packs with server-side demo subscription access checks.",
}

export default async function SkillsPage() {
  const [user, packs] = await Promise.all([getDemoUser(), getCatalogSkillPacks()])
  const skillPacks = packs.map((pack) => withSkillPackAccess(user.plan, pack))
  const featuredPack = skillPacks.find((pack) => pack.highlighted)

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Skill packs</p>
        <h1 className="text-3xl font-semibold text-stone-50">Premium skill packs</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Productized rules, prompts, MCP config and workflow templates. Access is calculated from the demo user plan.
        </p>
        <Badge className="border-cyan-200/25 bg-cyan-200/10 text-cyan-100" variant="outline">
          Demo user: {user.plan}
        </Badge>
      </section>

      {featuredPack ? (
        <section className="luxury-panel rounded-lg p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-amber-200/25 bg-amber-200/10 text-amber-100" variant="outline">
              Featured pack
            </Badge>
            <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
              Required plan: {featuredPack.requiredPlan}
            </Badge>
            <Badge className={featuredPack.accessible ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-red-300/30 bg-red-300/10 text-red-100"} variant="outline">
              {featuredPack.accessible ? "Accessible" : "Locked"}
            </Badge>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-stone-50">{featuredPack.name}</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-stone-300">
            Built for high-signal document and decision workflows where the agent must extract risks, obligations,
            summaries and next actions without burying the user in raw text.
          </p>
        </section>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {skillPacks.map((pack) => (
          <SkillPackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </main>
  )
}
