import { spawnSync } from "node:child_process"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.warn("DATABASE_URL is not set; skipping Prisma db push and seed.")
  process.exit(0)
}

if (!/^postgres(?:ql)?:\/\//.test(databaseUrl)) {
  console.error("DATABASE_URL must be a PostgreSQL connection string for production deploys.")
  process.exit(1)
}

run("prisma", ["db", "push"])
run("prisma", ["db", "seed"])

function run(command, args) {
  const executable = process.platform === "win32" ? `${command}.cmd` : command
  const result = spawnSync(executable, args, {
    stdio: "inherit",
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
