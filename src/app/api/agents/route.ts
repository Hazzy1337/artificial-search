import { NextResponse } from "next/server"

import { getCatalogAgents } from "@/lib/catalog"

export async function GET() {
  const agents = await getCatalogAgents()
  return NextResponse.json({ agents })
}
