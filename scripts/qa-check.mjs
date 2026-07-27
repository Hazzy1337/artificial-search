import { chromium } from "playwright-core"

import { browserSetupMessage, checkHttpStatus, findBrowserExecutable } from "./browser-utils.mjs"

const baseUrl = process.env.QA_BASE_URL ?? process.env.SMOKE_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000"

const requiredRoutes = [
  "/",
  "/models",
  "/agents",
  "/mcp",
  "/skills",
  "/skills/ai-coding-starter",
  "/compare",
  "/recommend",
  "/pricing",
  "/docs",
  "/docs/architecture",
  "/docs/security",
  "/docs/qa",
  "/docs/presentation",
  "/qa",
]

const requiredApiRoutes = [
  "/api/models",
  "/api/agents",
  "/api/mcp-servers",
  "/api/skill-packs",
  "/api/skill-packs/ai-coding-starter",
  "/api/recommendations",
  "/api/qa",
  "/api/me",
]

const results = {
  routeStatuses: [],
  apiStatuses: [],
  entitlementChecks: [],
  localeChecks: [],
  subscriptionChecks: [],
  browserChecks: [],
  browserChecksSkipped: false,
}

try {
  for (const route of requiredRoutes) {
    results.routeStatuses.push(await checkHttpStatus(baseUrl, route))
  }

  for (const route of requiredApiRoutes) {
    results.apiStatuses.push(await checkHttpStatus(baseUrl, route))
  }

  results.localeChecks.push(await changeLocale("ru"))
  results.localeChecks.push(await changeLocale("en"))

  await changePlan("Free")
  results.entitlementChecks.push(await expectStatus("/api/skill-packs/ai-coding-starter/manifest", 200, "Free manifest accessible"))
  results.entitlementChecks.push(await expectStatus("/api/skill-packs/large-codebase-refactor/manifest", 403, "Pro manifest locked for Free"))

  const premiumUser = await changePlan("Premium")
  results.subscriptionChecks.push({
    name: "POST /api/subscription/change Premium",
    ok: premiumUser.user?.plan === "Premium",
    value: premiumUser.user?.plan,
  })

  const meAfterPremium = await getJson("/api/me")
  results.subscriptionChecks.push({
    name: "GET /api/me returns Premium",
    ok: meAfterPremium.user?.plan === "Premium",
    value: meAfterPremium.user?.plan,
  })

  await changePlan("Free")
} catch (error) {
  console.error(
    JSON.stringify(
      {
        error: "QA API checks failed. Make sure the app is running and the database is pushed/seeded.",
        baseUrl,
        detail: error instanceof Error ? error.message : String(error),
        results,
      },
      null,
      2
    )
  )
  process.exit(1)
}

const browserPath = findBrowserExecutable()

if (!browserPath) {
  results.browserChecksSkipped = true
  results.browserSetup = browserSetupMessage()
} else {
  const browser = await chromium.launch({ executablePath: browserPath, headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  const consoleErrors = []

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text())
    }
  })

  for (const route of ["/", "/models", "/mcp", "/skills", "/pricing", "/recommend"]) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 1000 }, isMobile: true, deviceScaleFactor: 1 })
  await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
  const mobileMetrics = await mobile.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }))

  await browser.close()

  const hasHorizontalOverflow =
    mobileMetrics.scrollWidth > mobileMetrics.innerWidth || mobileMetrics.bodyScrollWidth > mobileMetrics.innerWidth

  results.browserChecks.push({
    name: "No console errors on main routes",
    ok: consoleErrors.length === 0,
    value: consoleErrors,
  })
  results.browserChecks.push({
    name: "No horizontal overflow on mobile homepage",
    ok: !hasHorizontalOverflow,
    value: mobileMetrics,
  })
}

const failed = [
  ...results.routeStatuses.filter((item) => item.status !== 200),
  ...results.apiStatuses.filter((item) => item.status !== 200),
  ...results.entitlementChecks.filter((item) => !item.ok),
  ...results.localeChecks.filter((item) => !item.ok),
  ...results.subscriptionChecks.filter((item) => !item.ok),
  ...results.browserChecks.filter((item) => !item.ok),
]

if (failed.length) {
  console.error(JSON.stringify({ ok: false, failed, results }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({ ok: true, results }, null, 2))

async function changePlan(plan) {
  return getJson("/api/subscription/change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  })
}

async function changeLocale(locale) {
  const response = await fetch(`${baseUrl}/api/locale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locale }),
  })
  const payload = await response.json()
  const setCookie = response.headers.get("set-cookie") ?? ""

  return {
    name: `POST /api/locale ${locale}`,
    ok: response.status === 200 && payload.locale === locale && setCookie.includes(`artificial_search_locale=${locale}`),
    status: response.status,
    value: payload.locale,
  }
}

async function expectStatus(route, expectedStatus, name) {
  const result = await checkHttpStatus(baseUrl, route)
  return {
    name,
    ok: result.status === expectedStatus,
    expectedStatus,
    status: result.status,
  }
}

async function getJson(route, init) {
  const response = await fetch(`${baseUrl}${route}`, init)

  if (!response.ok) {
    throw new Error(`${route} returned ${response.status}`)
  }

  return response.json()
}
