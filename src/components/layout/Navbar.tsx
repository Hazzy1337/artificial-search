"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, Brain, CreditCard, GitCompare, Menu, Package, Puzzle, Sparkles, Stars } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/models", label: "Models", icon: Brain },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/mcp", label: "MCP", icon: Puzzle },
  { href: "/skills", label: "Skills", icon: Package },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/recommend", label: "Recommend", icon: Sparkles },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-sm font-semibold text-stone-50" href="/">
          <span className="grid size-8 place-items-center rounded-lg border border-amber-200/30 bg-amber-200/10 text-amber-100 shadow-[0_0_30px_rgba(231,200,115,0.18)]">
            <Stars aria-hidden="true" className="size-4" />
          </span>
          Artificial Search
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
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
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild className="border-amber-200/30 bg-white/5 text-amber-100 hover:bg-amber-200/10" variant="outline">
            <Link href="/recommend">Find Stack</Link>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lg:hidden">
            <Button aria-label="Open navigation menu" size="icon" variant="outline">
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
                    {item.label}
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
