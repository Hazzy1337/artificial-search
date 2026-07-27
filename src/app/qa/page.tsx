import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { getQaTestCases } from "@/lib/catalog"
import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"
import type { Locale } from "@/lib/i18n"
import type { QaTestCase } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "QA",
  description: "Seeded QA test cases for Artificial Search course MVP.",
}

export default async function QaPage() {
  const [locale, testCases] = await Promise.all([getCurrentLocale(), getQaTestCases()])

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">QA</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "QA test cases", "QA тест-кейсы")}</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "Seeded test cases for presentation: access checks, subscription flow, route checks and mobile overflow.",
            "Seeded тест-кейсы для презентации: проверки доступа, flow подписки, routes и mobile overflow."
          )}
        </p>
      </section>

      <div className="grid gap-4">
        {testCases.map((testCase) => {
          const copy = getQaCopy(locale, testCase)

          return (
            <section className="luxury-panel rounded-lg p-5" key={testCase.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-50">{copy.title}</h2>
                <p className="mt-1 text-sm text-stone-400">{copy.area}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-cyan-200/20 bg-cyan-200/10 text-cyan-100" variant="outline">
                  {copy.status}
                </Badge>
                <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
                  {copy.severity}
                </Badge>
              </div>
            </div>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-stone-300">
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-stone-300">{tr(locale, "Expected", "Ожидается")}: {copy.expected}</p>
            {copy.notes ? <p className="mt-2 text-sm text-stone-400">{tr(locale, "Notes", "Заметки")}: {copy.notes}</p> : null}
          </section>
          )
        })}
      </div>
    </main>
  )
}

function getQaCopy(locale: Locale, testCase: QaTestCase): QaTestCase {
  if (locale !== "ru") {
    return testCase
  }

  const copies: Record<string, Partial<QaTestCase>> = {
    "free-user-can-download-free-skill-manifest": {
      title: "Free user может скачать Free skill manifest",
      area: "Доступ к skills",
      steps: ["Поставить demo plan в Free", "Запросить /api/skill-packs/ai-coding-starter/manifest"],
      expected: "API возвращает 200 и skill-pack manifest JSON.",
      status: "passed",
      severity: "high",
      notes: "Покрывает server-side entitlement для доступных паков.",
    },
    "free-user-cannot-download-pro-skill-manifest": {
      title: "Free user не может скачать Pro skill manifest",
      area: "Доступ к skills",
      steps: ["Поставить demo plan в Free", "Запросить /api/skill-packs/large-codebase-refactor/manifest"],
      expected: "API возвращает 403 с информацией о нужном тарифе.",
      status: "passed",
      severity: "critical",
      notes: "Защищает от обхода frontend-only locking.",
    },
    "pricing-plan-change-persists-in-database": {
      title: "Смена тарифа сохраняется в database",
      area: "Демо-подписка",
      steps: ["POST /api/subscription/change с Premium", "GET /api/me"],
      expected: "GET /api/me возвращает demo user с Premium plan.",
      status: "passed",
      severity: "high",
      notes: "Demo flow заменяет placeholder checkout links.",
    },
    "mobile-homepage-has-no-horizontal-overflow": {
      title: "Mobile homepage без горизонтального overflow",
      area: "Frontend QA",
      steps: ["Открыть homepage на viewport 390px", "Сравнить document scroll width с viewport width"],
      expected: "Scroll width не больше viewport width.",
      status: "passed",
      severity: "medium",
      notes: "Покрывается smoke/qa scripts, если локально есть browser executable.",
    },
  }

  return {
    ...testCase,
    ...(copies[testCase.id] ?? {}),
  }
}
