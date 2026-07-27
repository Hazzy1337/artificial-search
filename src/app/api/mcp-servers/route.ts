import { NextResponse } from "next/server"

import { getCatalogMcpServers } from "@/lib/catalog"

export async function GET() {
  const mcpServers = await getCatalogMcpServers()
  return NextResponse.json({ mcpServers })
}
