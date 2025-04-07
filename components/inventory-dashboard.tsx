"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, RefreshCw, Upload, Download } from "lucide-react"
import InventoryStats from "./inventory-stats"
import InventoryTable from "./inventory-table"
import AddItemForm from "./add-item-form"
import PredictionChart from "./prediction-chart"

export default function InventoryDashboard() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/items")
      if (!response.ok) {
        throw new Error("Failed to fetch inventory data")
      }
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching inventory:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch("http://localhost:8000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })

      if (!response.ok) {
        throw new Error("Failed to add item")
      }

      fetchInventory()
      setOpenAddDialog(false)
    } catch (err) {
      console.error("Error adding item:", err)
      setError(err.message)
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete item")
      }

      fetchInventory()
    } catch (err) {
      console.error("Error deleting item:", err)
      setError(err.message)
    }
  }

  const handleImportCSV = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:8000/api/import", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to import CSV")
      }

      fetchInventory()
    } catch (err) {
      console.error("Error importing CSV:", err)
      setError(err.message)
    }
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/export")
      if (!response.ok) {
        throw new Error("Failed to export data")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "inventory_export.csv"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Error exporting data:", err)
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button onClick={fetchInventory} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <label htmlFor="csv-upload" className="cursor-pointer">
            <Button variant="outline" size="sm" className="relative">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
              <input id="csv-upload" type="file" accept=".csv" className="sr-only" onChange={handleImportCSV} />
            </Button>
          </label>
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>Enter the details of the new inventory item.</DialogDescription>
              </DialogHeader>
              <AddItemForm onSubmit={handleAddItem} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <InventoryStats items={items} isLoading={isLoading} />

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory</CardTitle>
              <CardDescription>Manage your inventory items. Add, edit, or remove items as needed.</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryTable
                items={items}
                isLoading={isLoading}
                onDelete={handleDeleteItem}
                onRefresh={fetchInventory}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Analytics</CardTitle>
              <CardDescription>Visual representation of your inventory data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={items}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#8884d8" name="Quantity" />
                    <Bar dataKey="price" fill="#82ca9d" name="Price ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Demand Predictions</CardTitle>
              <CardDescription>ML-based predictions for inventory demand.</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionChart items={items} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

