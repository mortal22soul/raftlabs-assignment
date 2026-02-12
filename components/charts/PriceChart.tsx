"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";

interface PriceChartProps {
  data: number[];
  color?: string;
}

export default function PriceChart({
  data,
  color = "#34d399",
}: PriceChartProps) {
  const chartData = data.map((price, index) => ({ index, price }));

  return (
    <div className="h-87.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={["auto", "auto"]} hide />

          <Tooltip
            contentStyle={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "8px",
              color: "#c9d1d9",
            }}
            itemStyle={{ color: "#c9d1d9" }}
            labelStyle={{ display: "none" }}
            formatter={(value: number | undefined) => [
              value !== undefined ? `$${value.toLocaleString()}` : "N/A",
              "Price",
            ]}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
