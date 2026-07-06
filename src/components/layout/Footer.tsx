import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-amber-200/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-stone-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Artificial Search uses demo data and a transparent scoring model.</p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-amber-100" href="/models">
            Models
          </Link>
          <Link className="hover:text-amber-100" href="/mcp">
            MCP risk
          </Link>
          <Link className="hover:text-amber-100" href="/pricing">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  )
}
