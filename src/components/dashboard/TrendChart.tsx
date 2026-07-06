"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { PowerIndexPoint, PowerIndexSeries } from "@/lib/types"

type TrendChartProps = {
  data: PowerIndexPoint[]
  series: PowerIndexSeries[]
}

export function TrendChart({ data, series }: TrendChartProps) {
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
