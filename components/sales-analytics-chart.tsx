"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { CustomChartTooltip, formatDateLabel } from "@/components/ui/custom-chart-tooltip"

interface SalesAnalyticsChartProps {
  data: any[]
}

export default function SalesAnalyticsChart({ data }: SalesAnalyticsChartProps) {
  const [activeMetrics, setActiveMetrics] = useState({
    sales: true,
    units: true,
    forecast: true,
  })

  const toggleMetric = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }))
  }

  // Process data for the chart
  const chartData = data.reduce((acc, item) => {
    const date = item.date
    if (!acc[date]) {
      acc[date] = {
        date,
        sales: 0,
        units: 0,
        forecast: 0,
      }
    }

    // Calculate sales
    const itemSales = Number(item.unitsSold) * Number(item.price)
    acc[date].sales += itemSales
    acc[date].units += Number(item.unitsSold)
    acc[date].forecast += Number(item.demandForecast)

    return acc
  }, {})

  // Convert to array and sort by date
  const processedData = Object.values(chartData)
    .sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number)
      const [dayB, monthB, yearB] = b.date.split("-").map(Number)
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
    })
    .slice(-14) // Show last 14 days

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => toggleMetric("sales")}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            activeMetrics.sales ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"
          }`}
        >
          Sales
        </button>
        <button
          onClick={() => toggleMetric("units")}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            activeMetrics.units ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
          }`}
        >
          Units Sold
        </button>
        <button
          onClick={() => toggleMetric("forecast")}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            activeMetrics.forecast ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-500"
          }`}
        >
          Forecast
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={formatDateLabel}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip content={<CustomChartTooltip labelFormatter={formatDateLabel} />} />
            <Legend />

            {activeMetrics.sales && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="Sales ($)"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}

            {activeMetrics.units && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="units"
                name="Units Sold"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}

            {activeMetrics.forecast && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="#8B5CF6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

