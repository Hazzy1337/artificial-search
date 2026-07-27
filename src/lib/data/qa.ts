import type { QaTestCase } from "@/lib/types"

export const qaTestCases: QaTestCase[] = [
  {
    id: "free-user-can-download-free-skill-manifest",
    title: "Free user can download Free skill manifest",
    area: "Skill access",
    steps: ["Set demo plan to Free", "Request /api/skill-packs/ai-coding-starter/manifest"],
    expected: "API returns 200 and a skill-pack manifest JSON.",
    status: "passed",
    severity: "high",
    notes: "Covers server-side entitlement for accessible packs.",
  },
  {
    id: "free-user-cannot-download-pro-skill-manifest",
    title: "Free user cannot download Pro skill manifest",
    area: "Skill access",
    steps: ["Set demo plan to Free", "Request /api/skill-packs/large-codebase-refactor/manifest"],
    expected: "API returns 403 with required plan information.",
    status: "passed",
    severity: "critical",
    notes: "Prevents frontend-only locking bypass.",
  },
  {
    id: "pricing-plan-change-persists-in-database",
    title: "Pricing plan change persists in database",
    area: "Subscription demo",
    steps: ["POST /api/subscription/change with Premium", "GET /api/me"],
    expected: "GET /api/me returns the demo user with Premium plan.",
    status: "passed",
    severity: "high",
    notes: "Demo flow replaces placeholder checkout links.",
  },
  {
    id: "mobile-homepage-has-no-horizontal-overflow",
    title: "Mobile homepage has no horizontal overflow",
    area: "Frontend QA",
    steps: ["Open homepage at 390px viewport", "Compare document scroll width to viewport width"],
    expected: "Scroll width is not larger than viewport width.",
    status: "passed",
    severity: "medium",
    notes: "Covered by smoke/qa scripts when a browser executable is available.",
  },
]
