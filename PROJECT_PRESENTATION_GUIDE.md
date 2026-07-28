# Artificial Search - документация для презентации

Этот документ не является страницей сайта. Он нужен как шпаргалка на втором мониторе: что говорить, что показывать в браузере и какие файлы открыть в коде.

## Быстрый старт перед показом

Локальный адрес:

```text
http://127.0.0.1:3000
```

Команды проверки:

```bash
npm run lint
npm run build
npm run smoke
npm run qa
```

Если надо заново подготовить базу:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Демо-пользователь:

```text
demo@artificial-search.com
```

## Короткая речь на 2-3 минуты

Здравствуйте, мой проект называется Artificial Search.

Проблема проекта в том, что разработчику сейчас сложно выбрать правильную AI-комбинацию под конкретную задачу. Есть модели, AI-агенты, MCP-серверы, skill packs, разные уровни риска и разные цены. Если выбрать неправильный стек, можно потерять время, получить слабый результат или открыть агенту слишком широкие permissions.

Artificial Search решает это как fullstack AI-stack marketplace и recommendation dashboard. На сайте можно сравнить AI-модели, AI-агентов, MCP-серверы и наборы скиллов. Для каждой категории есть рейтинги, фильтры, демо-оценки и предупреждения по рискам.

Главная техническая часть проекта - это не просто статический интерфейс. Данные сидят в SQLite через Prisma, есть seed-скрипт, API routes, demo user и demo subscription. Skill packs закрыты по тарифам Free, Premium и Pro. Доступ проверяется на сервере, поэтому нельзя просто обойти locked-кнопку во фронтенде и скачать manifest напрямую.

Frontend сделан на Next.js App Router, TypeScript, Tailwind CSS и React components. Backend сделан через Next API route handlers. База описана в Prisma schema. QA покрыт smoke и qa scripts, включая route checks, API checks, entitlement checks, subscription flow, browser console checks и mobile overflow.

Дополнительно я добавил два языка: English и Russian. Переключатель языка сохраняет выбор в cookie через API route, а серверные страницы читают locale и рендерят интерфейс на нужном языке.

Дальше проект можно развивать в production: заменить demo user на реальную авторизацию, SQLite на Postgres, добавить Stripe, real benchmark data и настоящую систему установки/проверки MCP-серверов.

## План демонстрации в браузере

Открой сайт:

```text
http://127.0.0.1:3000
```

Показывай в таком порядке.

### 1. Главная страница `/`

Что показать:

- название Artificial Search;
- строку поиска задачи;
- quick prompts;
- preview рекомендованного stack;
- карточки лидеров;
- chart demo intelligence index;
- leaderboard AI-моделей.

Что сказать:

Проект не просто показывает список моделей. Он пытается подобрать полный AI stack под задачу: model, agent, MCP servers и skill pack. Данные пока seeded/demo, поэтому на сайте честно указано, что это не real-time ranking.

Код для показа:

```text
src/app/page.tsx
src/components/dashboard/HeroSection.tsx
src/components/dashboard/LeaderboardTable.tsx
src/lib/scoring.ts
src/lib/data/recommendations.ts
```

Ключевая идея в коде:

- `page.tsx` берет модели, агентов и MCP через server helpers;
- `HeroSection` является client component, потому что там ввод, кнопки и navigation;
- `findRecommendationByQuery()` подбирает recommendation по ключевым словам;
- scoring функции считают demo score.

### 2. Переключение языка EN/RU

Что показать:

- кнопки `EN` и `RU` в navbar;
- переключить на русский;
- показать, что интерфейс меняется без отдельного URL `/ru`;
- открыть `/models`, `/pricing`, `/skills`, чтобы показать, что язык сохраняется.

Что сказать:

Я сделал легкий i18n слой без тяжелой библиотеки. Выбор языка сохраняется в cookie. Серверные страницы читают cookie и передают `locale` в компоненты. Клиентские компоненты не импортируют `next/headers`, чтобы не нарушать границу client/server.

Код для показа:

```text
src/lib/i18n.ts
src/lib/i18nServer.ts
src/app/api/locale/route.ts
src/app/layout.tsx
src/components/layout/Navbar.tsx
```

На что обратить внимание:

- `i18n.ts` содержит тип `Locale`, helper `tr()` и словари;
- `i18nServer.ts` отдельно читает cookies через `next/headers`;
- `/api/locale` ставит cookie `artificial_search_locale`;
- `layout.tsx` ставит `<html lang={locale}>`;
- `Navbar` вызывает `router.refresh()` после смены языка.

### 3. Models `/models`

Что показать:

- фильтры Overall, Coding, Reasoning, Vision, Long Context, Cheap, Fast, Open Source;
- карточки моделей;
- таблицу после фильтра.

Что сказать:

Страница показывает, что разные модели хороши в разных задачах. Например, одна может быть сильной в coding, другая в long context, третья в cost efficiency. Поэтому общий рейтинг не является единственным способом выбора.

Код для показа:

```text
src/app/models/page.tsx
src/components/models/ModelsExplorer.tsx
src/components/models/ModelCard.tsx
src/lib/data/models.ts
src/lib/scoring.ts
```

Техническая часть:

- `ModelsExplorer` держит выбранный фильтр в `useState`;
- `sortByCategory()` сортирует или фильтрует модели;
- `ModelCard` показывает strengths, weaknesses и best use cases.

### 4. Agents `/agents`

Что показать:

- comparison snapshot;
- карточки агентов;
- метрики Task Success, Codebase Understanding, Tool Use, Autonomy, Recovery, Cost.

Что сказать:

Одна и та же модель может дать разный результат в разных агентских оболочках. Поэтому проект отдельно сравнивает AI agents, а не только модели.

Код для показа:

```text
src/app/agents/page.tsx
src/components/agents/AgentCard.tsx
src/components/compare/ComparisonTable.tsx
src/lib/data/agents.ts
```

Техническая часть:

- `calculateAgentScore()` считает общий score агента;
- `ComparisonTable` переиспользуется для разных таблиц;
- данные агентов seeded, но читаются через catalog helpers.

### 5. MCP `/mcp`

Что показать:

- красный security warning;
- фильтры Category и Risk;
- карточки MCP servers;
- permissions и risk notes;
- generator demo `mcp.json`.

Что сказать:

MCP-серверы полезны, но опасны. Они могут давать агенту доступ к файлам, browser automation, database, GitHub или network. Поэтому проект явно показывает risk level, permissions, setup difficulty, status и source link, если он есть.

Код для показа:

```text
src/app/mcp/page.tsx
src/components/mcp/McpDirectory.tsx
src/components/mcp/McpCard.tsx
src/components/mcp/McpConfigGenerator.tsx
src/lib/mcpConfig.ts
src/lib/data/mcpServers.ts
```

Техническая часть:

- `McpDirectory` фильтрует entries по category/risk;
- `McpCard` показывает permission risk;
- `McpConfigGenerator` генерирует demo config на основе выбранных servers.

Важно сказать честно:

Команды MCP в проекте являются demo/placeholder, если явно не verified. Это отмечено в UI и в generated config.

### 6. Skill Packs `/skills`

Что показать:

- список skill packs;
- badges Accessible/Locked;
- Required plan;
- кнопку View Pack;
- Download Manifest для доступных паков;
- Upgrade для закрытых паков.

Что сказать:

Skill pack - это набор правил, prompts, workflow templates и validation steps. Они нужны, чтобы агент работал не хаотично, а по стабильному процессу.

Код для показа:

```text
src/app/skills/page.tsx
src/app/skills/[id]/page.tsx
src/components/skills/SkillPackCard.tsx
src/components/skills/SkillPackInstallPanel.tsx
src/lib/data/skillPacks.ts
src/lib/skillPackManifest.ts
```

Техническая часть:

- страница получает demo user и skill packs;
- `withSkillPackAccess()` добавляет `accessible`, `locked`, `requiredPlan`;
- detail page показывает manifest/install panel;
- manifest генерируется через `createSkillPackManifest()`.

### 7. Server-side access check

Что показать:

Открыть доступный manifest:

```text
http://127.0.0.1:3000/api/skill-packs/ai-coding-starter/manifest
```

Открыть Pro manifest на Free-плане:

```text
http://127.0.0.1:3000/api/skill-packs/large-codebase-refactor/manifest
```

Ожидаемый результат для Pro manifest на Free:

```json
{
  "error": "Skill pack is locked",
  "userPlan": "Free",
  "requiredPlan": "Pro"
}
```

Что сказать:

Это важная backend часть. UI lock не считается защитой. Даже если пользователь напрямую вызывает API route, сервер проверяет demo user plan и возвращает `403`, если plan недостаточный.

Код для показа:

```text
src/app/api/skill-packs/[id]/manifest/route.ts
src/lib/plans.ts
src/lib/demoUser.ts
```

Ключевая логика:

```ts
if (!canAccessSkillPack(user.plan, pack)) {
  return NextResponse.json(
    {
      error: "Skill pack is locked",
      userPlan: user.plan,
      requiredPlan: pack.tier,
    },
    { status: 403 }
  )
}
```

### 8. Pricing `/pricing`

Что показать:

- текущий demo plan;
- Free, Premium, Pro, Business;
- нажать Upgrade на Premium или Pro;
- вернуться в `/skills`, показать что locked/accessible изменился.

Что сказать:

Это demo subscription flow, не real Stripe. Кнопки тарифов вызывают API route и сохраняют plan в SQLite. Это нужно для демонстрации fullstack behavior: frontend action -> API route -> database update -> UI refresh.

Код для показа:

```text
src/app/pricing/page.tsx
src/components/pricing/PricingPlansClient.tsx
src/components/pricing/PricingCard.tsx
src/app/api/subscription/change/route.ts
src/lib/demoUser.ts
```

Ключевая логика:

- client component отправляет `POST /api/subscription/change`;
- API валидирует plan через `normalizePlan()`;
- `changeDemoSubscription()` делает `upsert` в Prisma;
- navbar получает updated plan через custom event и refresh.

### 9. Recommend `/recommend`

Что показать:

- ввести задачу: `исправить баги в большом Next.js проекте`;
- нажать Search;
- показать recommended model, agent, skill pack, MCP servers;
- показать warning и generated demo `mcp.json`.

Что сказать:

Recommendation wizard делает MVP keyword matching. Сейчас это не внешний AI API, а прозрачная логика на seeded data. Это честнее для course MVP: можно показать, как работает алгоритм, и не зависеть от стороннего сервиса во время презентации.

Код для показа:

```text
src/app/recommend/page.tsx
src/components/recommend/RecommendationWizard.tsx
src/lib/data/recommendations.ts
src/lib/scoring.ts
```

Ключевая логика:

- query нормализуется через Unicode-aware regexp, поэтому русский текст тоже работает;
- stack выбирается по score совпадений keywords;
- UI показывает access warning, если recommended skill pack закрыт текущим тарифом.

### 10. Compare `/compare`

Что показать:

- четыре select controls;
- сравнить модели и агентов в одной таблице;
- нажать Reset comparison.

Что сказать:

Compare нужен для быстрого сравнения нескольких вариантов. Он объединяет models и agents в один normalized table, хотя данные у них разные.

Код для показа:

```text
src/app/compare/page.tsx
src/components/compare/CompareSelector.tsx
src/components/compare/ComparisonTable.tsx
```

### 11. QA `/qa`

Что показать:

- seeded QA test cases;
- statuses/severity;
- steps и expected result.

Что сказать:

QA page показывает тест-кейсы внутри продукта. Отдельно есть реальные scripts, которые проверяют routes, API, subscription, entitlement, console errors и mobile overflow.

Код для показа:

```text
src/app/qa/page.tsx
src/lib/data/qa.ts
scripts/smoke.mjs
scripts/qa-check.mjs
scripts/browser-utils.mjs
```

## Архитектура проекта

Общий flow:

```text
Browser UI
  -> Next.js App Router page
  -> React client component, если нужен state/input/click
  -> Next API route или server helper
  -> Prisma Client
  -> SQLite dev.db
  -> JSON response или rendered UI
```

Главные слои:

- `src/app` - routes, pages, API route handlers.
- `src/components` - reusable UI components.
- `src/lib/data` - seeded demo data.
- `src/lib/catalog.ts` - чтение catalog data из DB с fallback на seeded data.
- `src/lib/db.ts` - Prisma client.
- `src/lib/dbMappers.ts` - mapping Prisma rows -> app types.
- `src/lib/scoring.ts` - score formulas и recommendation matching.
- `src/lib/plans.ts` - plan order и entitlement logic.
- `src/lib/demoUser.ts` - demo user и subscription update.
- `src/lib/i18n.ts` / `src/lib/i18nServer.ts` - EN/RU locale support.
- `prisma/schema.prisma` - database schema.
- `prisma/seed.ts` - seed database.
- `scripts` - QA/smoke/install helpers.

## База данных

Файл схемы:

```text
prisma/schema.prisma
```

Основные модели:

- `User` - demo user, email, plan.
- `AiModel` - AI models и score-related поля.
- `AiAgent` - agent metrics.
- `McpServer` - MCP catalog, permissions, risk.
- `SkillPack` - packs, required tier, features.
- `QaTestCase` - seeded QA cases.

Почему SQLite:

- проект легко запустить локально;
- подходит для course demo;
- не нужен внешний database provider;
- production можно заменить на Postgres.

Важно объяснить:

Некоторые массивы в Prisma хранятся как JSON strings (`strengthsJson`, `permissionsJson`, `featuresJson`). Это компромисс для SQLite и простого MVP.

## API routes

Основные GET routes:

```text
GET /api/models
GET /api/agents
GET /api/mcp-servers
GET /api/skill-packs
GET /api/skill-packs/[id]
GET /api/skill-packs/[id]/manifest
GET /api/recommendations
GET /api/qa
GET /api/me
```

Основные POST routes:

```text
POST /api/subscription/change
POST /api/locale
```

Что показать в коде:

- API routes находятся в `src/app/api`;
- каждый route возвращает `NextResponse.json(...)`;
- mutation routes валидируют JSON body;
- manifest route делает server-side entitlement check.

## Scoring logic

Файл:

```text
src/lib/scoring.ts
```

Model score:

```text
intelligence * 0.30
coding * 0.25
agentPower * 0.20
speed * 0.10
costEfficiency * 0.15
```

Agent score:

```text
taskSuccess * 0.28
codebaseUnderstanding * 0.22
toolUse * 0.18
autonomy * 0.16
recoveryAfterError * 0.10
costEfficiency * 0.06
```

Price/power score:

```text
costEfficiency * 0.55 + overallScore * 0.45
```

Что сказать:

Формула простая и прозрачная. Это важнее для MVP, чем скрытая AI-магия. Пользователь понимает, почему один вариант выше другого.

## Два языка

Файлы:

```text
src/lib/i18n.ts
src/lib/i18nServer.ts
src/app/api/locale/route.ts
src/components/layout/Navbar.tsx
src/app/layout.tsx
```

Как работает:

1. Пользователь нажимает EN или RU.
2. Navbar отправляет `POST /api/locale`.
3. API ставит cookie `artificial_search_locale`.
4. `router.refresh()` обновляет серверный render.
5. `layout.tsx` читает locale и выставляет `<html lang="ru">` или `<html lang="en">`.
6. Pages передают `locale` в компоненты.

Почему `i18nServer.ts` отдельно:

`next/headers` можно импортировать только в Server Components/server code. Клиентские компоненты используют `i18n.ts`, где нет server-only imports.

## QA и проверки

Файлы:

```text
scripts/smoke.mjs
scripts/qa-check.mjs
scripts/browser-utils.mjs
```

`npm run smoke` проверяет:

- основные page routes;
- основные API routes;
- manifest для free skill pack;
- browser console errors;
- mobile horizontal overflow;
- title recommendation page.

`npm run qa` проверяет глубже:

- page routes;
- API routes;
- locale API;
- Free manifest доступен;
- Pro manifest закрыт для Free;
- subscription change сохраняется;
- `/api/me` возвращает новый plan;
- browser console errors;
- mobile overflow.

Что сказать:

QA не заменяет production tests, но для MVP это хороший набор проверок: backend, frontend, browser и mobile layout.

## Что открыть в VS Code во время защиты

Минимальный набор файлов:

```text
prisma/schema.prisma
prisma/seed.ts
src/app/page.tsx
src/components/dashboard/HeroSection.tsx
src/lib/scoring.ts
src/app/api/skill-packs/[id]/manifest/route.ts
src/lib/plans.ts
src/lib/demoUser.ts
src/app/api/subscription/change/route.ts
src/lib/i18n.ts
src/lib/i18nServer.ts
scripts/qa-check.mjs
```

Если времени мало, покажи только:

```text
prisma/schema.prisma
src/app/api/skill-packs/[id]/manifest/route.ts
src/lib/plans.ts
src/components/recommend/RecommendationWizard.tsx
scripts/qa-check.mjs
```

## Типичные вопросы и ответы

### Это реальные рейтинги AI-моделей?

Нет. Сейчас это seeded demo data для MVP. На сайте это подписано как demo data. В будущем можно подключить live benchmark data.

### Почему нет Stripe?

Потому что это course MVP. Я реализовал demo subscription flow, чтобы показать fullstack логику доступа. Реальные платежи можно добавить позже через Stripe checkout и webhooks.

### Почему SQLite?

SQLite проще для локальной демонстрации: не нужен внешний сервер базы. Для production лучше заменить на Postgres.

### Почему доступ к skill packs проверяется на сервере?

Потому что frontend lock можно обойти. Пользователь может напрямую вызвать API. Поэтому manifest API сам читает demo user plan и возвращает `403`, если plan недостаточный.

### Почему MCP требует risk labels?

MCP может дать агенту доступ к файлам, network, browser, database или shell commands. Это полезно, но потенциально опасно. Поэтому UI показывает permissions и risk notes.

### Почему перевод сделан без большой i18n-библиотеки?

Для MVP достаточно легкого словаря и cookie locale. Это меньше dependencies и проще объяснить. Если проект вырастет, можно перейти на полноценный i18n router/library.

### Почему recommendation wizard не вызывает настоящий AI API?

Чтобы MVP был стабильным на презентации и не зависел от внешнего API. Логика прозрачная: keyword matching и seeded recommendations. Позже можно заменить слой recommendation на AI/service backend.

## Финальный checklist перед презентацией

1. Запустить локально:

```bash
npm run dev
```

2. Проверить сайт:

```text
http://127.0.0.1:3000
```

3. Прогнать проверки:

```bash
npm run lint
npm run build
npm run smoke
npm run qa
```

4. Проверить demo user:

```text
http://127.0.0.1:3000/api/me
```

5. Перед показом лучше поставить Free plan, чтобы locked behavior был виден:

```bash
curl -X POST http://127.0.0.1:3000/api/subscription/change ^
  -H "Content-Type: application/json" ^
  -d "{\"plan\":\"Free\"}"
```

В PowerShell:

```powershell
Invoke-WebRequest -UseBasicParsing -Method POST http://127.0.0.1:3000/api/subscription/change -ContentType "application/json" -Body '{"plan":"Free"}'
```

## Самая сильная часть проекта для защиты

Главный акцент делай не на красоте интерфейса, а на fullstack связке:

```text
UI action
  -> API route
  -> validation
  -> Prisma/SQLite
  -> server-side access check
  -> UI refresh
  -> QA scripts verify it
```

Это показывает, что проект не просто нарисован, а действительно работает end-to-end.
