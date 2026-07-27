import { NextResponse } from "next/server"

import { getCatalogSkillPack } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"
import { canAccessSkillPack } from "@/lib/plans"
import { createSkillPackManifest } from "@/lib/skillPackManifest"

type SkillPackManifestRouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, { params }: SkillPackManifestRouteContext) {
  const { id } = await params
  const [user, pack] = await Promise.all([getDemoUser(), getCatalogSkillPack(id)])

  if (!pack) {
    return NextResponse.json({ error: "Skill pack not found" }, { status: 404 })
  }

  if (!canAccessSkillPack(user.plan, pack)) {
    return NextResponse.json(
      {
        error: "Skill pack is locked",
        userPlan: user.plan,
        requiredPlan: pack.tier,
      },
      { status: 403 }
    )
  }

  return NextResponse.json(createSkillPackManifest(pack), {
    headers: {
      "Content-Disposition": `attachment; filename="${pack.id}.skillpack.json"`,
    },
  })
}
