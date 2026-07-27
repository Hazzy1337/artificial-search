import { NextResponse } from "next/server"

import { getCatalogModels } from "@/lib/catalog"

export async function GET() {
  const models = await getCatalogModels()
  return NextResponse.json({ models })
}
