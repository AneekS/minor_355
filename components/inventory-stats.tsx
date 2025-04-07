import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDollarSign, Package, TrendingUp, AlertTriangle } from "lucide-react"

export default function InventoryStats({ items, isLoading }) {
  // Calculate statistics
  const totalItems = items.length
  const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const lowStockItems = items.filter((item) => item.quantity < 5).length
  const averagePrice = totalItems > 0 ? totalValue / totalItems : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{totalItems}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{lowStockItems}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

