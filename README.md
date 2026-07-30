# Artificial Search

Artificial Search is a fullstack AI-stack marketplace and recommendation dashboard for developers.

## Problem

Developers have many AI models, coding agents, MCP servers and workflow skill packs to choose from. The wrong combination can waste time, expose private files or produce weak results.

## Solution

Artificial Search compares seeded AI models, agents, MCP servers and coding skill packs, then recommends practical AI stacks for programming tasks. It includes a database-backed demo subscription flow and server-side gated skill pack manifest downloads.

## Features

- AI model leaderboard and filters
- AI agent comparison
- MCP server catalog with risk labels and permissions
- Skill pack marketplace with Free, Premium and Pro access
- Demo subscription flow backed by PostgreSQL
- Gated skill pack manifest downloads
- Recommendation wizard with access warnings
- English/Russian UI language switch
- QA test cases and smoke scripts
- SEO metadata, sitemap and robots
- Documentation pages for project explanation
- Separate presentation guide: `PROJECT_PRESENTATION_GUIDE.md`

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL for production demo persistence
- Next API routes
- Playwright Core for optional browser QA

## Architecture

```text
Browser UI
  -> Next.js page / client component
  -> Next API route or server helper
  -> Prisma Client
  -> PostgreSQL
  -> JSON response or rendered UI
```

## Database

Prisma models:

- `User`
- `AiModel`
- `AiAgent`
- `McpServer`
- `SkillPack`
- `QaTestCase`

PostgreSQL is used for production persistence on Vercel. Seed scripts keep the course demo data reproducible.

## API Routes

- `GET /api/models`
- `GET /api/agents`
- `GET /api/mcp-servers`
- `GET /api/skill-packs`
- `GET /api/skill-packs/[id]`
- `GET /api/skill-packs/[id]/manifest`
- `GET /api/recommendations`
- `GET /api/qa`
- `GET /api/me`
- `POST /api/locale`
- `POST /api/subscription/change`

## Subscription Demo

There is one demo user:

```text
demo@artificial-search.com
```

Plans:

- Free
- Premium
- Pro

Pricing buttons call `POST /api/subscription/change` and persist the selected plan in PostgreSQL. This is a demo subscription flow for the course project, not a real payment integration.

## Security Notes

Skill pack access is checked on the server. The UI lock state is not trusted.

Access rules:

- Free can access Free packs
- Premium can access Free and Premium packs
- Pro can access all packs

MCP servers are labeled with status, risk level, permissions and risk notes. Unknown MCP servers can expose files, shell commands, APIs and private project data.

## QA

Run:

```bash
npm run lint
npm run build
npm run smoke
npm run qa
```

`smoke` and `qa` can use Chrome, Edge or Chromium. Set `PLAYWRIGHT_CHROME_PATH` if the browser is not found automatically.

## Local Setup

```bash
npm install
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Seed Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Run Project

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Run Lint/Build/Smoke

```bash
npm run lint
npm run build
npm run smoke
npm run qa
```

## Deployment

Vercel deploys the Next.js app and runs the production database deploy step through `npm run vercel-build`.

Required environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
NEXT_PUBLIC_APP_URL="https://www.artificial-search.com"
DEMO_USER_EMAIL="demo@artificial-search.com"
```

For production:

- create a Vercel Postgres, Prisma Postgres or Neon database;
- set `DATABASE_URL` in Vercel;
- set `NEXT_PUBLIC_APP_URL` to `https://www.artificial-search.com`;
- configure the domain in Vercel;
- add real auth and billing before accepting real users.

## Presentation Guide

Use the separate document:

```text
PROJECT_PRESENTATION_GUIDE.md
```

It contains the full Russian presentation script, feature walkthrough, code map and demo checklist.

## Short Presentation Notes

In 2-3 minutes, show:

1. Project name and problem.
2. Model/agent/MCP/skill pages.
3. Database seed and API route output.
4. Pricing demo plan change.
5. Locked Pro manifest returning `403` for Free user.
6. QA page and `npm run qa`.
7. One bug fixed: `View Pack` button and frontend-only skill locking.

## Known Limitations

- Seeded data, not live real-time rankings.
- Demo subscription, not real Stripe.
- Demo user, not OAuth.
- PostgreSQL is demo persistence, not a full production auth/billing model.
- MCP install commands are placeholders unless explicitly verified.
