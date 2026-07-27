import { db } from "@/lib/db"
import { fromPrismaPlanValue, toPrismaPlanValue } from "@/lib/plans"
import type { DemoUser, PlanName } from "@/lib/types"

const demoUserEmail = process.env.DEMO_USER_EMAIL ?? "demo@artificial-search.com"

export async function getDemoUser(): Promise<DemoUser> {
  const existingUser = await db.user.findUnique({
    where: { email: demoUserEmail },
  })

  const user =
    existingUser ??
    (await db.user.create({
      data: {
        name: "Demo User",
        email: demoUserEmail,
        plan: "FREE",
      },
    }))

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: fromPrismaPlanValue(user.plan),
  }
}

export async function changeDemoSubscription(plan: PlanName): Promise<DemoUser> {
  const user = await db.user.upsert({
    where: { email: demoUserEmail },
    update: {
      plan: toPrismaPlanValue(plan),
      name: "Demo User",
    },
    create: {
      name: "Demo User",
      email: demoUserEmail,
      plan: toPrismaPlanValue(plan),
    },
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: fromPrismaPlanValue(user.plan),
  }
}
