import type { Metadata } from "next"

import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const metadata: Metadata = {
  title: "Presentation",
  description: "Two to three minute presentation script for Artificial Search.",
}

export default async function PresentationDocsPage() {
  const locale = await getCurrentLocale()
  const speech = tr(
    locale,
    `Hello, my project is called Artificial Search.

The problem is that developers have many AI models, coding agents, MCP servers and prompt or skill packs, but it is hard to choose the right combination for a concrete programming task.

My solution is a fullstack AI-stack marketplace and recommendation dashboard. It compares seeded AI models, agents, MCP servers and coding skill packs. It also has a demo subscription system, so some skill pack manifests are only downloadable when the demo user has the required plan.

I implemented the frontend with Next.js App Router, TypeScript and Tailwind CSS. The backend uses Next API routes. The database layer uses Prisma with SQLite for the local demo. I added seed data for models, agents, MCP servers, skill packs, a demo user and QA test cases.

One technical difficulty was skill access control. At first the UI used static locked values, which was not secure because a user could call the manifest API directly. I fixed this by moving the entitlement check to the server. The API reads the demo user plan from the database and returns 403 if the plan is not enough.

I also added SEO files, documentation pages, QA scripts and a presentation page. Later this project could be improved with real authentication, Stripe payments, Postgres in production and live benchmark data.`,
    `Здравствуйте, мой проект называется Artificial Search.

Проблема в том, что у разработчиков слишком много AI моделей, coding agents, MCP серверов и prompt или skill packs, но сложно выбрать правильную комбинацию под конкретную programming task.

Мое решение это fullstack AI-stack marketplace и recommendation dashboard. Он сравнивает seeded AI models, agents, MCP servers и coding skill packs. Также есть demo subscription system, поэтому некоторые skill pack manifests можно скачать только если demo user имеет нужный тариф.

Frontend сделан на Next.js App Router, TypeScript и Tailwind CSS. Backend использует Next API routes. Database layer построен на Prisma с SQLite для локального demo. Я добавил seed data для models, agents, MCP servers, skill packs, demo user и QA test cases.

Одна техническая сложность была в skill access control. Сначала UI использовал static locked values, и это было небезопасно, потому что user мог вызвать manifest API напрямую. Я исправил это, перенеся entitlement check на сервер. API читает demo user plan из database и возвращает 403, если тарифа недостаточно.

Также я добавил SEO files, documentation pages, QA scripts, bilingual UI и presentation page. Дальше проект можно улучшить real authentication, Stripe payments, Postgres in production и live benchmark data.`
  )

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Presentation", "Презентация")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "2-3 minute speech template", "Шаблон речи на 2-3 минуты")}</h1>
      </section>

      <section className="luxury-panel rounded-lg p-5">
        <pre className="whitespace-pre-wrap text-sm leading-7 text-stone-300">{speech}</pre>
      </section>
    </main>
  )
}
