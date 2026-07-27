import { ArrowLeft, CheckCircle2, Lock, Package, Sparkles, Unlock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PowerScoreBar } from "@/components/dashboard/PowerScoreBar"
import { SkillPackInstallPanel } from "@/components/skills/SkillPackInstallPanel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCatalogSkillPack } from "@/lib/catalog"
import { getDemoUser } from "@/lib/demoUser"
import { tr } from "@/lib/i18n"
import { getCurrentLocale } from "@/lib/i18nServer"
import { withSkillPackAccess } from "@/lib/plans"
import { createSkillPackManifestJson } from "@/lib/skillPackManifest"

type SkillPackDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Skill Pack Details",
  description: "Skill pack details, demo entitlement state and gated manifest download for Artificial Search.",
}

export default async function SkillPackDetailPage({ params }: SkillPackDetailPageProps) {
  const { id } = await params
  const [locale, user, pack] = await Promise.all([getCurrentLocale(), getDemoUser(), getCatalogSkillPack(id)])

  if (!pack) {
    notFound()
  }

  const packView = withSkillPackAccess(user.plan, pack)
  const StatusIcon = packView.locked ? Lock : Unlock
  const manifestJson = packView.accessible ? createSkillPackManifestJson(packView) : undefined

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Button asChild className="w-fit border-stone-300/20 bg-white/[0.04] text-stone-200 hover:bg-white/[0.08]" variant="outline">
        <Link href="/skills">
          <ArrowLeft aria-hidden="true" className="size-4" />
          {tr(locale, "Skill packs", "Наборы скиллов")}
        </Link>
      </Button>

      <section className="luxury-panel rounded-lg p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-amber-200/25 bg-amber-200/10 text-amber-100" variant="outline">
            <StatusIcon aria-hidden="true" className="size-3" />
            {packView.locked ? tr(locale, "Locked", "Закрыт") : tr(locale, "Available", "Доступен")}
          </Badge>
          <Badge className="border-stone-300/20 bg-white/[0.055] text-stone-200" variant="outline">
            {tr(locale, "Required plan", "Нужный тариф")}: {packView.requiredPlan}
          </Badge>
          <Badge className="border-cyan-200/25 bg-cyan-200/10 text-cyan-100" variant="outline">
            {tr(locale, "Demo user", "Демо пользователь")}: {user.plan}
          </Badge>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-amber-100">
              <Package aria-hidden="true" className="size-4" />
              {tr(locale, "Skill Pack", "Набор скиллов")}
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold text-stone-50 sm:text-4xl">{packView.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-300">{packView.summary}</p>
          </div>

          <div className="rounded-lg border border-stone-300/15 bg-black/25 p-4">
            <PowerScoreBar label={tr(locale, "Compatibility", "Совместимость")} value={packView.compatibilityScore} />
            {packView.locked ? (
              <Button asChild className="mt-4 w-full" variant="outline">
                <Link href="/pricing">{tr(locale, "View Pricing", "Смотреть тарифы")}</Link>
              </Button>
            ) : (
              <Button asChild className="mt-4 w-full">
                <Link href="/recommend">{tr(locale, "Build Stack With This Pack", "Собрать стек с этим паком")}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DetailPanel title={tr(locale, "Compatible Models", "Совместимые модели")} items={packView.compatibleModels} />
        <DetailPanel title={tr(locale, "Inside The Pack", "Внутри пака")} items={packView.inside} />
        <DetailPanel title={tr(locale, "Included Workflows", "Включенные workflow")} items={packView.features} />
      </section>

      <SkillPackInstallPanel
        accessible={packView.accessible}
        locale={locale}
        manifestJson={manifestJson}
        packId={packView.id}
        requiredPlan={packView.requiredPlan}
      />

      <section className="luxury-panel rounded-lg p-5">
        <div className="flex items-center gap-2 text-stone-50">
          <Sparkles aria-hidden="true" className="size-4 text-amber-200" />
          <h2 className="text-lg font-semibold">{tr(locale, "How to use it", "Как использовать")}</h2>
        </div>
        <div className="mt-4 grid gap-3 text-sm text-stone-300 md:grid-cols-3">
          <UsageStep
            text={tr(
              locale,
              "Pick the model and agent that match the task pressure: coding, documents, automation or private local work.",
              "Выбери модель и агента под тип задачи: кодинг, документы, автоматизация или приватная локальная работа."
            )}
          />
          <UsageStep
            text={tr(
              locale,
              "Attach only the MCP servers needed for that workflow and verify permissions before exposing files or secrets.",
              "Подключай только MCP серверы, нужные для workflow, и проверяй permissions до доступа к файлам или секретам."
            )}
          />
          <UsageStep
            text={tr(
              locale,
              "Run the pack checklist before delivery so prompts, rules and validation steps stay consistent.",
              "Перед сдачей прогоняй checklist пака, чтобы prompts, rules и проверки оставались последовательными."
            )}
          />
        </div>
      </section>
    </main>
  )
}

function DetailPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="luxury-panel rounded-lg p-5">
      <h2 className="text-base font-semibold text-stone-50">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-stone-300">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-200" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function UsageStep({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-stone-300/15 bg-white/[0.035] p-4 leading-6">
      {text}
    </div>
  )
}
