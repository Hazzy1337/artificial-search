import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.next/**", "**/prisma/dev.db", "**/prisma/dev.db-*"],
      }
    }

    return config
  },
}

export default nextConfig
