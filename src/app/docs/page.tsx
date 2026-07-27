import type { Metadata } from "next"
import Link from "next/link"

import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const metadata: Metadata = {
  title: "Docs",
  description: "Artificial Search project overview, features and tech stack for the course presentation.",
}

export default async function DocsPage() {
  const locale = await getCurrentLocale()

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Docs", "Документы")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "Artificial Search documentation", "Документация Artificial Search")}</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "Artificial Search is a fullstack AI-stack marketplace and recommendation dashboard for developers.",
            "Artificial Search это fullstack marketplace AI-стеков и recommendation dashboard для разработчиков."
          )}
        </p>
      </section>

      <DocBlock title={tr(locale, "Problem", "Проблема")}>
        {tr(
          locale,
          "Developers have too many AI models, agents, MCP servers and workflow patterns to choose from. The wrong stack can waste time, expose files or produce weak results.",
          "У разработчиков слишком много AI моделей, агентов, MCP серверов и workflow patterns на выбор. Неправильный стек тратит время, раскрывает файлы или дает слабый результат."
        )}
      </DocBlock>
      <DocBlock title={tr(locale, "Solution", "Решение")}>
        {tr(
          locale,
          "The app compares seeded AI catalog data, recommends stack combinations and gates downloadable skill-pack manifests behind a database-backed demo subscription plan.",
          "Приложение сравнивает seeded AI catalog data, рекомендует комбинации стека и закрывает скачивание skill-pack manifests через demo subscription plan в базе."
        )}
      </DocBlock>
      <DocBlock title={tr(locale, "Main features", "Основные возможности")}>
        {tr(
          locale,
          "Model and agent comparison, MCP risk catalog, skill packs, recommendation wizard, demo subscription flow, server-side access checks, API routes, QA scripts and documentation pages.",
          "Сравнение моделей и агентов, MCP risk catalog, skill packs, recommendation wizard, demo subscription flow, server-side access checks, API routes, QA scripts и страницы документации."
        )}
      </DocBlock>
      <DocBlock title={tr(locale, "Tech stack", "Технический стек")}>
        Next.js App Router, TypeScript, Tailwind CSS, Prisma, SQLite, Next API routes and Playwright-based smoke checks.
      </DocBlock>

      <section className="grid gap-3 sm:grid-cols-2">
        {[
          ["/docs/architecture", tr(locale, "Architecture", "Архитектура")],
          ["/docs/security", tr(locale, "Security", "Безопасность")],
          ["/docs/qa", tr(locale, "QA docs", "QA документы")],
          ["/docs/presentation", tr(locale, "Presentation script", "Скрипт презентации")],
        ].map(([href, label]) => (
          <Link className="luxury-panel rounded-lg p-4 text-stone-100 hover:text-amber-100" href={href} key={href}>
            {label}
          </Link>
        ))}
      </section>
    </main>
  )
}

function DocBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="luxury-panel rounded-lg p-5">
      <h2 className="text-lg font-semibold text-stone-50">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-300">{children}</p>
    </section>
  )
}
