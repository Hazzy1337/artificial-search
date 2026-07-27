import { NextResponse } from "next/server"

import { getCatalogSkillPacks } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"
import { withSkillPackAccess } from "@/lib/plans"

export async function GET() {
  const [user, packs] = await Promise.all([getDemoUser(), getCatalogSkillPacks()])
  const skillPacks = packs.map((pack) => withSkillPackAccess(user.plan, pack))

  return NextResponse.json({ user, skillPacks })
}
