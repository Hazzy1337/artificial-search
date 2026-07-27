import Link from "next/link"

import { tr } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

type FooterProps = {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-amber-200/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-stone-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{tr(locale, "Artificial Search uses demo data and a transparent scoring model.", "Artificial Search использует демо-данные и прозрачную модель оценки.")}</p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-amber-100" href="/models">
            {tr(locale, "Models", "Модели")}
          </Link>
          <Link className="hover:text-amber-100" href="/mcp">
            {tr(locale, "MCP risk", "Риски MCP")}
          </Link>
          <Link className="hover:text-amber-100" href="/pricing">
            {tr(locale, "Pricing", "Тарифы")}
          </Link>
          <Link className="hover:text-amber-100" href="/docs">
            {tr(locale, "Docs", "Документы")}
          </Link>
          <Link className="hover:text-amber-100" href="/qa">
            QA
          </Link>
        </div>
      </div>
    </footer>
  )
}
