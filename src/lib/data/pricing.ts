import type { PricingPlan } from "@/lib/types"

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "0 EUR",
    description: "Public leaderboard and lightweight comparison for quick decisions.",
    features: ["AI leaderboard", "Basic model comparison", "Public MCP list", "Limited recommendations"],
    cta: "Start Free",
    tier: "Free",
  },
  {
    id: "premium",
    name: "Premium",
    price: "12 EUR/month",
    description: "Premium skill packs and practical setup guides for solo builders.",
    features: ["Premium skill packs", "MCP setup guides", "Compatibility matrix", "AI stack recommendations", "Update alerts"],
    cta: "Upgrade",
    tier: "Premium",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "29 EUR/month",
    description: "Advanced workflows for teams that run agents across real projects.",
    features: ["All skill packs", "MCP config generator", "CodeGraph templates", "Advanced agent workflows", "Project analyzer mock", "Priority updates"],
    cta: "Upgrade to Pro",
    tier: "Pro",
  },
  {
    id: "business",
    name: "Business",
    price: "Custom",
    description: "Private configs, policy templates and consulting for controlled deployments.",
    features: ["Team access", "Private MCP configs", "Security policy templates", "Audit logs placeholder", "Custom AI stack consulting"],
    cta: "Contact Sales",
    tier: "Business",
  },
]

