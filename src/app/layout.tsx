import type { Metadata, Viewport } from "next"
import { Fira_Code, Inter } from "next/font/google"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { PremiumBackground } from "@/components/layout/PremiumBackground"
import { siteUrl } from "@/lib/site"
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Artificial Search",
    template: "%s | Artificial Search",
  },
  description:
    "Course MVP AI-stack marketplace and recommendation dashboard with seeded data, demo subscriptions and gated skill-pack manifests.",
  keywords: ["AI stack", "AI models", "AI agents", "MCP servers", "skill packs", "course MVP", "Next.js", "Prisma"],
  authors: [{ name: "Sergej Gordeev" }],
  creator: "Sergej Gordeev",
  openGraph: {
    title: "Artificial Search",
    description:
      "Seeded fullstack SaaS-style MVP for comparing AI models, agents, MCP servers and coding skill packs.",
    url: siteUrl,
    siteName: "Artificial Search",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Search",
    description: "Course MVP AI-stack marketplace with demo subscription access and server-side skill gating.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
