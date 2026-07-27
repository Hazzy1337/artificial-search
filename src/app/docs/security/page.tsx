import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security",
  description: "Artificial Search demo security model, MCP warnings and server-side entitlement checks.",
}

export default function SecurityDocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">Security</p>
        <h1 className="text-3xl font-semibold text-stone-50">Security model</h1>
      </section>

      <SecurityBlock title="Demo subscription access">
        The app uses one database-backed demo user. Free, Premium and Pro plan changes are stored in SQLite and are clearly
        labeled as a course demo flow, not real payment processing.
      </SecurityBlock>
      <SecurityBlock title="Server-side entitlement checks">
        Skill manifest APIs check the current demo user plan on the server. Frontend lock labels are not trusted for access.
      </SecurityBlock>
      <SecurityBlock title="MCP risk labels">
        MCP entries show risk level, permissions, status and risk notes. Unknown MCP servers can read files, run tools or
        expose private data if permissions are too broad.
      </SecurityBlock>
      <SecurityBlock title="Secrets handling">
        The repository includes `.env.example` only. Tokens and private `.env` files must stay out of git.
      </SecurityBlock>
      <SecurityBlock title="Future production improvements">
        Replace demo user with real auth, use Postgres, add real billing webhooks, audit logs, rate limits and scoped MCP
        sandbox enforcement.
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
