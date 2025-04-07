"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
import { CustomChartTooltip, formatDateLabel } from "@/components/ui/custom-chart-tooltip"

interface OrderOverviewChartProps {
  data: any[]
}

export default function OrderOverviewChart({ data }: OrderOverviewChartProps) {
  // Process data for bar chart - orders by date
  const ordersByDate = data.reduce((acc, item) => {
    const date = item.date
    if (!acc[date]) {
      acc[date] = {
        date,
        orders: 0,
        sales: 0,
      }
    }
    acc[date].orders += Number(item.unitsSold)
    acc[date].sales += Number(item.unitsSold) * Number(item.price)
    return acc
  }, {})

  // Convert to array and sort by date
  const chartData = Object.values(ordersByDate)
    .sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number)
      const [dayB, monthB, yearB] = b.date.split("-").map(Number)
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
    })
    .slice(-7) // Show last 7 days

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={formatDateLabel}
          />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomChartTooltip labelFormatter={formatDateLabel} />} />
          <Legend />
          <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="sales" name="Sales ($)" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

