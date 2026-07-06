"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { PowerIndexPoint } from "@/lib/types"

type TrendChartProps = {
  data: PowerIndexPoint[]
}

const series = [
  { key: "gpt55", name: "GPT-5.5", color: "#e7c873" },
  { key: "claude", name: "Claude", color: "#b7a1ff" },
  { key: "gemini", name: "Gemini", color: "#6ee7f2" },
  { key: "deepseek", name: "DeepSeek", color: "#5fe0a6" },
  { key: "qwen", name: "Qwen", color: "#ef9557" },
] as const

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="h-[320px] w-full" aria-label="AI Power Index Over Time chart">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data} margin={{ bottom: 8, left: -20, right: 8, top: 8 }}>
          <XAxis dataKey="day" stroke="#a7a29a" tickLine={false} />
          <YAxis domain={[60, 100]} stroke="#a7a29a" tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "#08070b",
              border: "1px solid rgba(231, 200, 115, 0.22)",
              borderRadius: "8px",
              color: "#f6f3ec",
            }}
            cursor={{ stroke: "rgba(231, 200, 115, 0.22)" }}
          />
          {series.map((item) => (
            <Line
              activeDot={{ r: 5 }}
              dataKey={item.key}
              dot={false}
              isAnimationActive={false}
              key={item.key}
              name={item.name}
              stroke={item.color}
              strokeWidth={2}
              type="monotone"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
