import { NextResponse } from "next/server"

import { skillPacks } from "@/lib/data"
import { createSkillPackManifest } from "@/lib/skillPackManifest"

type SkillPackManifestRouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, { params }: SkillPackManifestRouteContext) {
  const { id } = await params
  const pack = skillPacks.find((item) => item.id === id)

  if (!pack) {
    return NextResponse.json({ error: "Skill pack not found" }, { status: 404 })
  }

  if (pack.locked) {
    return NextResponse.json({ error: "Skill pack is locked" }, { status: 403 })
  }

  return NextResponse.json(createSkillPackManifest(pack), {
    headers: {
      "Content-Disposition": `attachment; filename="${pack.id}.skillpack.json"`,
    },
  })
}
