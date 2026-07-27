import { NextResponse } from "next/server"

import { localeCookieName, normalizeLocale } from "@/lib/i18n"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const locale = normalizeLocale((body as { locale?: unknown }).locale)
  const response = NextResponse.json({ locale })

  response.cookies.set(localeCookieName, locale, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  return response
}
