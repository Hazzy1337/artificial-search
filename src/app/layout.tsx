import type { Metadata, Viewport } from "next"
import { Fira_Code, Inter } from "next/font/google"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { PremiumBackground } from "@/components/layout/PremiumBackground"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Artificial Search",
  description: "Premium demo AI model, agent, MCP and skill-pack intelligence dashboard for artificial-search.com.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${inter.variable} ${firaCode.variable} dark h-full scroll-smooth antialiased`} lang="en">
      <body className="min-h-full bg-background text-foreground">
        <PremiumBackground />
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
