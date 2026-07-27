import { existsSync } from "node:fs"

const envPathNames = ["PLAYWRIGHT_CHROME_PATH", "PLAYWRIGHT_EDGE_PATH", "CHROME_PATH", "EDGE_PATH"]

const commonBrowserPaths = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
]

export function findBrowserExecutable() {
  for (const envName of envPathNames) {
    const value = process.env[envName]
    if (value && existsSync(value)) {
      return value
    }
  }

  return commonBrowserPaths.find((browserPath) => existsSync(browserPath)) ?? null
}

export function browserSetupMessage() {
  return [
    "No Chrome/Edge/Chromium executable was found.",
    "Install a browser or set PLAYWRIGHT_CHROME_PATH to the executable path.",
    "Example PowerShell:",
    '$env:PLAYWRIGHT_CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"',
  ].join("\n")
}

export async function checkHttpStatus(baseUrl, route, init) {
  const response = await fetch(`${baseUrl}${route}`, init)
  return {
    route,
    status: response.status,
    ok: response.ok,
  }
}
