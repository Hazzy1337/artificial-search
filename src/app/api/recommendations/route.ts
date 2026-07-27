import { NextResponse } from "next/server"

import { getCatalogSkillPacks } from "@/lib/catalog"
import { recommendations } from "@/lib/data"
import { getDemoUser } from "@/lib/demoUser"
import { canAccessSkillPack } from "@/lib/plans"

export async function GET() {
  const [user, skillPacks] = await Promise.all([getDemoUser(), getCatalogSkillPacks()])

  const recommendationsWithAccess = recommendations.map((recommendation) => {
    const pack = skillPacks.find((item) => item.name === recommendation.skillPack)
    const accessible = pack ? canAccessSkillPack(user.plan, pack) : false

    return {
      ...recommendation,
      skillPackAccess: pack
        ? {
            id: pack.id,
            tier: pack.tier,
            accessible,
            requiredPlan: pack.tier,
          }
        : null,
    }
  })

  return NextResponse.json({ user, recommendations: recommendationsWithAccess })
}
