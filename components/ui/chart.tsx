"use client"
import {
  ResponsiveContainer as RechartsResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
} from "recharts"

export const ResponsiveContainer = RechartsResponsiveContainer
export const AreaChart = RechartsAreaChart
export const Area = RechartsArea
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const CartesianGrid = RechartsCartesianGrid
export const Tooltip = RechartsTooltip
export const Legend = RechartsLegend
export const Line = RechartsLine
export const LineChart = RechartsLineChart
export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const PieChart = require("recharts").PieChart
export const Pie = require("recharts").Pie
export const Cell = require("recharts").Cell
export const RadarChart = require("recharts").RadarChart
export const PolarGrid = require("recharts").PolarGrid
export const PolarAngleAxis = require("recharts").PolarAngleAxis
export const PolarRadiusAxis = require("recharts").PolarRadiusAxis
export const Radar = require("recharts").Radar

export const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
            <span className="font-bold text-muted-foreground">{payload[0].value}</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}

