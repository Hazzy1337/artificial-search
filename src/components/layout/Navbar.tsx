"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bot, Brain, CreditCard, GitCompare, Menu, Package, Puzzle, Sparkles, Stars } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { tr } from "@/lib/i18n"
import type { DemoUser, PlanName } from "@/lib/types"
import type { Locale } from "@/lib/i18n"

const navItems = [
  { href: "/models", labelEn: "Models", labelRu: "Модели", icon: Brain },
  { href: "/agents", labelEn: "Agents", labelRu: "Агенты", icon: Bot },
  { href: "/mcp", labelEn: "MCP", labelRu: "MCP", icon: Puzzle },
  { href: "/skills", labelEn: "Skills", labelRu: "Скиллы", icon: Package },
  { href: "/compare", labelEn: "Compare", labelRu: "Сравнение", icon: GitCompare },
  { href: "/recommend", labelEn: "Recommend", labelRu: "Подбор", icon: Sparkles },
  { href: "/pricing", labelEn: "Pricing", labelRu: "Тарифы", icon: CreditCard },
]

type NavbarProps = {
  locale: Locale
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [plan, setPlan] = useState<PlanName | null>(null)

  useEffect(() => {
    let active = true

    async function loadUser() {
      try {
        const response = await fetch("/api/me")
        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as { user: DemoUser }
        if (active) {
          setPlan(payload.user.plan)
        }
      } catch {
        // The badge is non-critical; pages and API routes still enforce access server-side.
      }
    }

    function handlePlanChanged(event: Event) {
      const user = (event as CustomEvent<DemoUser>).detail
      if (user?.plan) {
        setPlan(user.plan)
      }
    }

    loadUser()
    window.addEventListener("artificial-search-plan-changed", handlePlanChanged)

    return () => {
      active = false
      window.removeEventListener("artificial-search-plan-changed", handlePlanChanged)
    }
  }, [])

  async function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    await fetch("/api/locale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locale: nextLocale }),
    })
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-sm font-semibold text-stone-50" href="/">
          <span className="grid size-8 place-items-center rounded-lg border border-amber-200/30 bg-amber-200/10 text-amber-100 shadow-[0_0_30px_rgba(231,200,115,0.18)]">
            <Stars aria-hidden="true" className="size-4" />
          </span>
          <span className="hidden sm:inline">Artificial Search</span>
        </Link>

        <nav aria-label={tr(locale, "Primary navigation", "Основная навигация")} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-stone-300 transition-colors hover:bg-white/8 hover:text-stone-50",
                  active && "bg-amber-200/10 text-amber-100"
                )}
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden="true" className="size-4" />
                {tr(locale, item.labelEn, item.labelRu)}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            className="rounded-lg border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs font-medium text-cyan-100"
            href="/pricing"
          >
            {tr(locale, "Demo user", "Демо пользователь")}: {plan ?? "..."}
          </Link>
          <LanguageSwitch locale={locale} onChange={changeLocale} />
          <Button asChild className="border-amber-200/30 bg-white/5 text-amber-100 hover:bg-amber-200/10" variant="outline">
            <Link href="/recommend">{tr(locale, "Find Stack", "Подобрать стек")}</Link>
          </Button>
        </div>

        <Link
          className="ml-auto rounded-lg border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-2 text-xs font-medium text-cyan-100 sm:hidden"
          href="/pricing"
        >
          {plan ?? "..."}
        </Link>
        <div className="sm:hidden">
          <LanguageSwitch locale={locale} onChange={changeLocale} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lg:hidden">
            <Button aria-label={tr(locale, "Open navigation menu", "Открыть меню")} size="icon" variant="outline">
              <Menu aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 border-amber-200/15 bg-[#08070b]/95">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <DropdownMenuItem asChild key={item.href}>
                  <Link className="cursor-pointer text-stone-100" href={item.href}>
                    <Icon aria-hidden="true" />
                    {tr(locale, item.labelEn, item.labelRu)}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function LanguageSwitch({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  return (
    <div className="inline-flex h-10 overflow-hidden rounded-lg border border-stone-300/20 bg-white/[0.04]">
      {(["en", "ru"] as const).map((item) => (
        <button
          aria-pressed={locale === item}
          className={cn(
            "min-w-10 px-2 text-xs font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-stone-50",
            locale === item && "bg-cyan-200/15 text-cyan-100"
          )}
          key={item}
          onClick={() => onChange(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
