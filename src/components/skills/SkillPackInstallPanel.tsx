"use client"

import { useMemo, useState } from "react"
import { Check, Clipboard, Download, Terminal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { tr } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

type SkillPackInstallPanelProps = {
  accessible: boolean
  locale: Locale
  manifestJson?: string
  packId: string
  requiredPlan: string
}

export function SkillPackInstallPanel({ accessible, locale, manifestJson, packId, requiredPlan }: SkillPackInstallPanelProps) {
  const [copied, setCopied] = useState(false)
  const fileName = `${packId}.skillpack.json`
  const installCommand = `node scripts/install-skill-pack.mjs ./${fileName}`
  const downloadHref = useMemo(
    () => `/api/skill-packs/${packId}/manifest`,
    [packId]
  )
  const displayJson = useMemo(
    () => manifestJson ?? JSON.stringify({ error: "Locked", requiredPlan }, null, 2),
    [manifestJson, requiredPlan]
  )

  async function copyCommand() {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  if (!accessible) {
    return (
      <section className="luxury-panel rounded-lg p-5">
        <div className="flex items-center gap-2 text-stone-50">
          <Terminal aria-hidden="true" className="size-4 text-amber-200" />
          <h2 className="text-lg font-semibold">{tr(locale, "Install Skill Pack", "Установить skill pack")}</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400">
          {tr(
            locale,
            "This pack is locked. Unlock it first, then download the skillpack manifest and run the local installer.",
            "Этот пак закрыт. Сначала открой доступ, затем скачай skillpack manifest и запусти локальный installer."
          )}
        </p>
        <p className="mt-2 text-sm text-amber-100">{tr(locale, "Required plan", "Нужный тариф")}: {requiredPlan}</p>
        <Button asChild className="mt-4 w-full sm:w-fit" variant="outline">
          <Link href="/pricing">{tr(locale, "View Pricing", "Смотреть тарифы")}</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="luxury-panel rounded-lg p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-stone-50">
            <Terminal aria-hidden="true" className="size-4 text-amber-200" />
            <h2 className="text-lg font-semibold">{tr(locale, "Install Skill Pack", "Установить skill pack")}</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-400">
            {tr(
              locale,
              "Download through the server-checked manifest API, run the installer from this project root, then restart Codex.",
              "Скачай через серверно-проверенный manifest API, запусти installer из корня проекта и перезапусти Codex."
            )}
          </p>
        </div>
        <Button asChild className="w-full sm:w-fit">
          <a download={fileName} href={downloadHref}>
            <Download aria-hidden="true" className="size-4" />
            {tr(locale, "Download JSON", "Скачать JSON")}
          </a>
        </Button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          <div className="rounded-lg border border-stone-300/15 bg-black/25 p-4">
            <p className="text-sm font-medium text-stone-200">{tr(locale, "Install command", "Команда установки")}</p>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-amber-200/10 bg-black/40 p-3 text-xs text-amber-100">
              {installCommand}
            </pre>
            <Button className="mt-3 w-full" onClick={copyCommand} type="button" variant="outline">
              {copied ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
              {copied ? tr(locale, "Copied", "Скопировано") : tr(locale, "Copy Command", "Копировать команду")}
            </Button>
          </div>

          <div className="rounded-lg border border-stone-300/15 bg-white/[0.035] p-4 text-sm leading-6 text-stone-300">
            {tr(locale, "Codex skills install into", "Codex skills устанавливаются в")}{" "}
            <span className="font-mono text-stone-100">$CODEX_HOME/skills</span>.{" "}
            {tr(locale, "The installer does not overwrite existing skill folders.", "Installer не перезаписывает существующие папки skills.")}
          </div>
        </div>

        <Textarea
          className="min-h-96 border-amber-200/15 bg-black/35 font-mono text-xs text-stone-200"
          readOnly
          value={displayJson}
        />
      </div>
    </section>
  )
}
