import { cookies } from "next/headers"

import { localeCookieName, normalizeLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return normalizeLocale(cookieStore.get(localeCookieName)?.value)
}
