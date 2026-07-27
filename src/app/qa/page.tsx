import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { getQaTestCases } from "@/lib/catalog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "QA",
  description: "Seeded QA test cases for Artificial Search course MVP.",
}

export default async function QaPage() {
  const testCases = await getQaTestCases()

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-amber-100">QA</p>
        <h1 className="text-3xl font-semibold text-stone-50">QA test cases</h1>
        <p className="max-w-3xl text-sm leading-6 text-stone-400">
          Seeded test cases for presentation: access checks, subscription flow, route checks and mobile overflow.
        </p>
      </section>

      <div className="grid gap-4">
        {testCases.map((testCase) => (
          <section className="luxury-panel rounded-lg p-5" key={testCase.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-stone-50">{testCase.title}</h2>
                <p className="mt-1 text-sm text-stone-400">{testCase.area}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-cyan-200/20 bg-cyan-200/10 text-cyan-100" variant="outline">
                  {testCase.status}
                </Badge>
                <Badge className="border-amber-200/20 bg-amber-200/10 text-amber-100" variant="outline">
                  {testCase.severity}
                </Badge>
              </div>
            </div>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-stone-300">
              {testCase.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-stone-300">Expected: {testCase.expected}</p>
            {testCase.notes ? <p className="mt-2 text-sm text-stone-400">Notes: {testCase.notes}</p> : null}
          </section>
        ))}
      </div>
    </main>
  )
}
