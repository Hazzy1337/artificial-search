import { NextResponse } from "next/server"

import { changeDemoSubscription } from "@/lib/demoUser"
import { normalizePlan } from "@/lib/plans"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const plan = normalizePlan((body as { plan?: unknown }).plan)

  if (!plan) {
    return NextResponse.json({ error: "plan must be Free, Premium or Pro" }, { status: 400 })
  }

  const user = await changeDemoSubscription(plan)

  return NextResponse.json({
    user,
    note: "Demo subscription flow for course project",
  })
}
