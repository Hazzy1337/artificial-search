import type { PlanName, SkillPack } from "@/lib/types"

export const planOrder: Record<PlanName, number> = {
  Free: 0,
  Premium: 1,
  Pro: 2,
}

export function canAccessTier(userPlan: PlanName, requiredTier: PlanName) {
  return planOrder[userPlan] >= planOrder[requiredTier]
}

export function canAccessSkillPack(userPlan: PlanName, pack: Pick<SkillPack, "tier">) {
  return canAccessTier(userPlan, pack.tier)
}

export function normalizePlan(value: unknown): PlanName | null {
  if (value === "Free" || value === "FREE" || value === "free") {
    return "Free"
  }

  if (value === "Premium" || value === "PREMIUM" || value === "premium") {
    return "Premium"
  }

  if (value === "Pro" || value === "PRO" || value === "pro") {
    return "Pro"
  }

  return null
}

export function toPrismaPlanValue(plan: PlanName) {
  if (plan === "Pro") {
    return "PRO" as const
  }

  if (plan === "Premium") {
    return "PREMIUM" as const
  }

  return "FREE" as const
}

export function fromPrismaPlanValue(plan: "FREE" | "PREMIUM" | "PRO"): PlanName {
  if (plan === "PRO") {
    return "Pro"
  }

  if (plan === "PREMIUM") {
    return "Premium"
  }

  return "Free"
}

export function withSkillPackAccess<T extends SkillPack>(userPlan: PlanName, pack: T) {
  const accessible = canAccessSkillPack(userPlan, pack)

  return {
    ...pack,
    accessible,
    locked: !accessible,
    requiredPlan: pack.tier,
  }
}
