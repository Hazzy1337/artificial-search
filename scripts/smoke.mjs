import { chromium } from "playwright-core"

const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000"
const routes = ["/", "/models", "/agents", "/mcp", "/skills", "/compare", "/recommend", "/pricing"]

const browser = await chromium.launch({ executablePath: edgePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const errors = []

page.on("console", (message) => {
  if (message.type() === "error") {
    errors.push(message.text())
  }
})

const statuses = []

for (const route of routes) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
  statuses.push(`${response?.status() ?? "no-response"} ${route}`)
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

const failedStatuses = statuses.filter((status) => !status.startsWith("200 "))
const hasHorizontalOverflow =
  mobileMetrics.scrollWidth > mobileMetrics.innerWidth || mobileMetrics.bodyScrollWidth > mobileMetrics.innerWidth

if (failedStatuses.length || errors.length || hasHorizontalOverflow || recommendH1 !== "Find Best AI Stack") {
  console.error(JSON.stringify({ statuses, errors, mobileMetrics, recommendH1 }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({ statuses, mobileMetrics, recommendH1 }, null, 2))
