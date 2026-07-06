import { SkillPackCard } from "@/components/skills/SkillPackCard"
import { Badge } from "@/components/ui/badge"
import { skillPacks } from "@/lib/data"

export default function SkillsPage() {
  const featuredPack = skillPacks.find((pack) => pack.highlighted)

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Skill packs</p>
        <h1 className="text-3xl font-semibold text-stone-50">Premium skill packs</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Productized rules, prompts, MCP config and workflow templates for repeatable agent behavior.
        </p>
      </section>

      {featuredPack ? (
        <section className="luxury-panel rounded-lg p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-amber-200/25 bg-amber-200/10 text-amber-100" variant="outline">
              Featured pack
            </Badge>
            <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
              {featuredPack.tier}
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
