import { format } from "date-fns"

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  labelFormatter?: (label: string) => string
}

export const CustomChartTooltip = ({ active, payload, label, labelFormatter }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const formattedLabel = labelFormatter ? labelFormatter(label) : label

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-600 mb-2">{formattedLabel}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            <p className="text-sm text-gray-500">
              {entry.name}:{" "}
              <span className="font-semibold text-gray-800">
                {entry.name.includes("$") ? "$" : ""}
                {entry.value.toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export const formatDateLabel = (dateStr: string) => {
  // Check if the date is in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split("-").map(Number)
    return format(new Date(year, month - 1, day), "MMM d, yyyy")
  }
  return dateStr
}

