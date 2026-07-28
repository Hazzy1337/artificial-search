import { chromium } from "playwright-core"

import { browserSetupMessage, checkHttpStatus, findBrowserExecutable } from "./browser-utils.mjs"

const baseUrl = process.env.SMOKE_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000"
const routes = ["/", "/models", "/agents", "/mcp", "/skills", "/skills/ai-coding-starter", "/compare", "/recommend", "/pricing", "/docs", "/qa"]
const apiRoutes = ["/api/models", "/api/agents", "/api/mcp-servers", "/api/skill-packs", "/api/recommendations", "/api/qa", "/api/me"]

const routeStatuses = []

try {
  for (const route of [...routes, ...apiRoutes]) {
    routeStatuses.push(await checkHttpStatus(baseUrl, route))
  }

  const manifestStatus = await checkHttpStatus(baseUrl, "/api/skill-packs/ai-coding-starter/manifest")
  routeStatuses.push(manifestStatus)
} catch (error) {
  console.error(
    JSON.stringify(
      {
        error: "Smoke test could not reach the app. Start it with npm run dev or npm run start.",
        baseUrl,
        detail: error instanceof Error ? error.message : String(error),
      },
      null,
      2
    )
  )
  process.exit(1)
}

const browserPath = findBrowserExecutable()

if (!browserPath) {
  const failedStatuses = routeStatuses.filter((item) => !item.ok)
  console.log(
    JSON.stringify(
      {
        routeStatuses,
        browserChecksSkipped: true,
        browserSetup: browserSetupMessage(),
      },
      null,
      2
    )
  )
  process.exit(failedStatuses.length ? 1 : 0)
}

const browser = await chromium.launch({ executablePath: browserPath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const errors = []

page.on("console", (message) => {
  const text = message.text()

  if (message.type() === "error" && !isIgnorableDevConsoleError(text)) {
    errors.push(text)
  }
})

for (const route of routes) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
}

await page.goto(`${baseUrl}/recommend?task=large-codebase`, { waitUntil: "networkidle" })
const recommendH1 = await page.locator("h1").textContent()

const mobile = await browser.newPage({ viewport: { width: 390, height: 1000 }, isMobile: true, deviceScaleFactor: 1 })
await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
const mobileMetrics = await mobile.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  bodyScrollWidth: document.body.scrollWidth,
}))

await browser.close()

const failedStatuses = routeStatuses.filter((item) => !item.ok)
const hasHorizontalOverflow =
  mobileMetrics.scrollWidth > mobileMetrics.innerWidth || mobileMetrics.bodyScrollWidth > mobileMetrics.innerWidth

if (failedStatuses.length || errors.length || hasHorizontalOverflow || recommendH1 !== "Find Best AI Stack") {
  console.error(JSON.stringify({ routeStatuses, errors, mobileMetrics, recommendH1 }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({ routeStatuses, mobileMetrics, recommendH1, browserPath }, null, 2))

function isIgnorableDevConsoleError(message) {
  return message.includes("/_next/webpack-hmr") && message.includes("WebSocket connection")
}
