import { NextResponse } from "next/server"

import { getCatalogSkillPack } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"
import { withSkillPackAccess } from "@/lib/plans"

type SkillPackRouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, { params }: SkillPackRouteContext) {
  const { id } = await params
  const [user, pack] = await Promise.all([getDemoUser(), getCatalogSkillPack(id)])

  if (!pack) {
    return NextResponse.json({ error: "Skill pack not found" }, { status: 404 })
  }

  return NextResponse.json({
    user,
    skillPack: withSkillPackAccess(user.plan, pack),
  })
}
