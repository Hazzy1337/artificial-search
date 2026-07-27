# Security Policy

## Project Security Model

Artificial Search is a course MVP with a database-backed demo user. It does not implement production authentication or real payments.

The important security boundary is server-side skill pack access:

- the UI may show Accessible or Locked;
- the API still checks the demo user's plan in SQLite;
- `/api/skill-packs/[id]/manifest` returns `403` when the plan is not enough.

## MCP Risk Explanation

MCP servers can be powerful and risky. Depending on permissions, they may read files, write files, call APIs, query databases, open browsers or run commands.

The catalog labels MCP entries by:

- status: `verified`, `community`, `placeholder`, `deprecated`;
- risk level;
- permissions;
- risk notes.

If an install command or package is not verified, Artificial Search marks it as `placeholder` and does not present it as installable.

## Demo Limitations

- No OAuth login.
- No real Stripe checkout.
- No production audit logs.
- SQLite is used for local demo only.
- Seeded scoring is not live benchmark data.

## Secrets Handling

Do not commit `.env`, tokens, API keys, database credentials or private MCP configs.

Use `.env.example` as a template:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DEMO_USER_EMAIL="demo@artificial-search.com"
```

## Reporting Process

For this course project, report issues through GitHub Issues or directly to the project owner.
