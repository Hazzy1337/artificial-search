import { NextResponse } from "next/server"

import { getQaTestCases } from "@/lib/catalog"

export async function GET() {
  const testCases = await getQaTestCases()
  return NextResponse.json({ testCases })
}
