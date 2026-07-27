import { NextResponse } from "next/server"

import { getDemoUser } from "@/lib/demoUser"

export async function GET() {
  const user = await getDemoUser()

  return NextResponse.json({
    user,
    note: "Demo subscription flow for course project",
  })
}
