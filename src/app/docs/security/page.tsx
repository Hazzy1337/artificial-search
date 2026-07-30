import type { Metadata } from "next"

import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"

export const metadata: Metadata = {
  title: "Security",
  description: "Artificial Search demo security model, MCP warnings and server-side entitlement checks.",
}

export default async function SecurityDocsPage() {
  const locale = await getCurrentLocale()

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">{tr(locale, "Security", "Безопасность")}</p>
        <h1 className="text-3xl font-semibold text-stone-50">{tr(locale, "Security model", "Модель безопасности")}</h1>
      </section>

      <SecurityBlock title={tr(locale, "Demo subscription access", "Доступ demo subscription")}>
        {tr(
          locale,
          "The app uses one database-backed demo user. Free, Premium and Pro plan changes are stored in the production database and are clearly labeled as a course demo flow, not real payment processing.",
          "Приложение использует одного demo user из базы. Изменения планов Free, Premium и Pro сохраняются в production-базе и явно помечены как course demo flow, а не реальные платежи."
        )}
      </SecurityBlock>
      <SecurityBlock title={tr(locale, "Server-side entitlement checks", "Server-side проверки доступа")}>
        {tr(
          locale,
          "Skill manifest APIs check the current demo user plan on the server. Frontend lock labels are not trusted for access.",
          "Skill manifest APIs проверяют текущий demo user plan на сервере. Frontend lock labels не считаются источником доступа."
        )}
      </SecurityBlock>
      <SecurityBlock title={tr(locale, "MCP risk labels", "MCP risk labels")}>
        {tr(
          locale,
          "MCP entries show risk level, permissions, status and risk notes. Unknown MCP servers can read files, run tools or expose private data if permissions are too broad.",
          "MCP entries показывают risk level, permissions, status и risk notes. Неизвестные MCP серверы могут читать файлы, запускать tools или раскрывать приватные данные, если permissions слишком широкие."
        )}
      </SecurityBlock>
      <SecurityBlock title={tr(locale, "Secrets handling", "Обработка секретов")}>
        {tr(
          locale,
          "The repository includes `.env.example` only. Tokens and private `.env` files must stay out of git.",
          "В репозитории есть только `.env.example`. Tokens и приватные `.env` файлы не должны попадать в git."
        )}
      </SecurityBlock>
      <SecurityBlock title={tr(locale, "Future production improvements", "Будущие production улучшения")}>
        {tr(
          locale,
          "Replace demo user with real auth, use Postgres, add real billing webhooks, audit logs, rate limits and scoped MCP sandbox enforcement.",
          "Заменить demo user на real auth, использовать Postgres, добавить real billing webhooks, audit logs, rate limits и scoped MCP sandbox enforcement."
        )}
      </SecurityBlock>
    </main>
  )
}

function SecurityBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="luxury-panel rounded-lg p-5">
      <h2 className="text-lg font-semibold text-stone-50">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-300">{children}</p>
    </section>
  )
}
