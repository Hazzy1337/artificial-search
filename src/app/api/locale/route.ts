import { NextResponse } from "next/server"

import { localeCookieName, normalizeLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(localeCookieName, locale, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })
}

function safeReturnPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/"
  }

  return value
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale = normalizeLocale(url.searchParams.get("locale"))
  const returnTo = safeReturnPath(url.searchParams.get("returnTo"))
  const response = new NextResponse(null, {
    headers: {
      Location: returnTo,
    },
    status: 303,
  })

  setLocaleCookie(response, locale)

  return response
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const locale = normalizeLocale((body as { locale?: unknown }).locale)
  const response = NextResponse.json({ locale })

  setLocaleCookie(response, locale)

  return response
}
