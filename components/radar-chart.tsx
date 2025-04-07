"use client"

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "@/components/ui/chart"

interface RadarChartProps {
  data: any[]
}

export default function InventoryRadarChart({ data }: RadarChartProps) {
  // Process data for radar chart
  const categories = [...new Set(data.map((item) => item.category))].slice(0, 6)

  const radarData = categories.map((category) => {
    const categoryItems = data.filter((item) => item.category === category)
    const totalInventory = categoryItems.reduce((sum, item) => sum + Number(item.inventoryLevel), 0)
    const totalSold = categoryItems.reduce((sum, item) => sum + Number(item.unitsSold), 0)

    return {
      category,
      inventory: totalInventory,
      sold: totalSold,
      ratio: totalSold > 0 ? (totalSold / totalInventory) * 100 : 0,
    }
  })

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="category" tick={{ fill: "#6B7280", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={{ fill: "#6B7280", fontSize: 10 }} />

          <Radar name="Inventory Level" dataKey="inventory" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.5} />

          <Radar name="Units Sold" dataKey="sold" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />

          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

