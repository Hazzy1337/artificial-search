import type { Metadata } from "next"
import Link from "next/link"

import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const metadata: Metadata = {
  title: "QA Documentation",
  description: "QA checklist, smoke checks and bugs fixed for Artificial Search.",
}

export default async function QaDocsPage() {
  const locale = await getCurrentLocale()

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "QA docs", "QA документы")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "QA checklist and bugs fixed", "QA checklist и исправленные баги")}</h1>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "Smoke test explanation", "Описание smoke test")}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          {tr(
            locale,
            "`npm run smoke` checks core page routes, API manifest status, the recommendation page title and mobile overflow. Browser checks are skipped with a clear message if no local browser executable is found.",
            "`npm run smoke` проверяет основные page routes, API manifest status, title страницы рекомендаций и mobile overflow. Browser checks пропускаются с понятным сообщением, если локально не найден browser executable."
          )}
        </p>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "Bugs found and fixed", "Найденные и исправленные баги")}</h2>
        <ul className="mt-3 space-y-2 text-sm text-stone-300">
          <li>{tr(locale, "`View Pack` was a button without navigation. It now links to `/skills/[id]`.", "`View Pack` был кнопкой без навигации. Теперь он ведет на `/skills/[id]`.")}</li>
          <li>{tr(locale, "Skill locking was static. It now uses database-backed demo plan checks.", "Skill locking был статическим. Теперь используются проверки demo plan из базы.")}</li>
          <li>{tr(locale, "Pricing CTAs were placeholder links. They now update the demo subscription through an API route.", "Pricing CTAs были placeholder links. Теперь они обновляют demo subscription через API route.")}</li>
          <li>{tr(locale, "Smoke tests used a hardcoded Edge path. The scripts now search for a browser or print setup instructions.", "Smoke tests использовали hardcoded Edge path. Теперь scripts ищут browser или выводят instructions.")}</li>
        </ul>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <h2 className="text-lg font-semibold text-stone-50">{tr(locale, "Database test cases", "Тест-кейсы из database")}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          {tr(locale, "Seeded QA cases are available on the", "Seeded QA cases доступны на")}{" "}
          <Link className="text-cyan-100 hover:text-cyan-50" href="/qa">
            {tr(locale, "QA page", "QA странице")}
          </Link>{" "}
          {tr(locale, "and through `GET /api/qa`.", "и через `GET /api/qa`.")}
        </p>
      </section>
    </main>
  )
}
