"use client"

import { useState, useEffect } from "react"
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
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function PredictionChart({ items }) {
  const [predictions, setPredictions] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPredictions = async (itemId) => {
    if (!itemId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:8000/api/predictions/${itemId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch predictions")
      }

      const data = await response.json()
      setPredictions(data)
    } catch (err) {
      console.error("Error fetching predictions:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedItem) {
      fetchPredictions(selectedItem)
    }
  }, [selectedItem])

  const handleItemChange = (value) => {
    setSelectedItem(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-full sm:w-64">
          <Select value={selectedItem} onValueChange={handleItemChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => fetchPredictions(selectedItem)} disabled={!selectedItem || isLoading}>
          {isLoading ? "Loading..." : "Generate Prediction"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : predictions.length > 0 ? (
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={predictions}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Historical Demand" activeDot={{ r: 8 }} />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#82ca9d"
                name="Predicted Demand"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : selectedItem ? (
        <Card>
          <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
            Select an item and generate predictions to see demand forecast
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
            Select an item to generate demand predictions
          </CardContent>
        </Card>
      )}
    </div>
  )
}

