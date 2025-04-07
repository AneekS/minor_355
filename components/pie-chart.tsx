"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "@/components/ui/chart"

interface PieChartProps {
  data: any[]
}

export default function InventoryPieChart({ data }: PieChartProps) {
  // Process data for pie chart - distribution by store
  const storeData = data.reduce((acc, item) => {
    const storeId = item.storeId
    if (!acc[storeId]) {
      acc[storeId] = {
        name: storeId,
        value: 0,
      }
    }
    acc[storeId].value += Number(item.unitsSold)
    return acc
  }, {})

  const pieData = Object.values(storeData)

  // Calculate percentages
  const total = pieData.reduce((sum: number, item: any) => sum + item.value, 0)
  pieData.forEach((item: any) => {
    item.percent = ((item.value / total) * 100).toFixed(1)
  })

  // Colors for the pie chart
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Units Sold: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-semibold">{payload[0].payload.percent}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${percent}%`}
          >
            {pieData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

