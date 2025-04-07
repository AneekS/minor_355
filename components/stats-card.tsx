import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: ReactNode
  color: string
}

export default function StatsCard({ title, value, change, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {change !== undefined && (
            <p className={`text-xs mt-1 flex items-center ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
              <span className="text-gray-500 ml-1">vs last month</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

