"use client"

import { useState, useEffect } from "react"
import InventoryTable from "./inventory-table"
import TransferCard from "./transfer-card"
import PurchaseOrders from "./purchase-orders"
import { parseCSVData, aggregateData, calculateStats } from "@/lib/data-utils"
import inventoryData from "@/data/inventory-data"
import SalesAnalyticsChart from "./sales-analytics-chart"
import StatsCard from "./stats-card"
import InventoryRadarChart from "./radar-chart"
import InventoryPieChart from "./pie-chart"
import OrderOverviewChart from "./order-overview-chart"
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("This Month")
  const [outletFilter, setOutletFilter] = useState("All Outlets")
  const [data, setData] = useState([])
  const [stats, setStats] = useState({
    totalSales: 0,
    lastMonthComparison: 0,
    averageSaleValue: 0,
    averageItemsPerSale: 0,
    itemsLastMonthComparison: 0,
    totalOrders: 0,
    totalVisitors: 0,
  })
  const [salesData, setSalesData] = useState([])
  const [salesTargets, setSalesTargets] = useState({
    yourSalesTarget: 800.8,
    averageSalesTarget: 61.34,
    averageItemsPerSale: 8,
    lastMonthSalesTargetDiff: -20.95,
    lastMonthItemsPerSaleDiff: 0.08,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Parse the CSV data
      const parsedData = parseCSVData(inventoryData)
      setData(parsedData)

      // Calculate aggregated data for charts
      const { dailySales, monthlySales } = aggregateData(parsedData)

      // Set sales data for charts based on time filter
      if (timeFilter === "Today") {
        setSalesData(dailySales.slice(-1))
      } else if (timeFilter === "This Week") {
        setSalesData(dailySales.slice(-7))
      } else {
        setSalesData(dailySales.slice(-30))
      }

      // Calculate stats
      const calculatedStats = calculateStats(parsedData, outletFilter)

      // Add additional stats
      const totalOrders = parsedData.reduce((sum, item) => {
        return sum + (item.storeId === outletFilter || outletFilter === "All Outlets" ? 1 : 0)
      }, 0)

      const totalVisitors = Math.round(totalOrders * 2.7) // Simulated visitor count

      setStats({
        ...calculatedStats,
        totalOrders,
        totalVisitors,
      })

      setIsLoading(false)
    } catch (err) {
      console.error("Error processing data:", err)
      setError(err.message)
      setIsLoading(false)
    }
  }, [timeFilter, outletFilter])

  return (
    <div className="flex h-screen">
      {/* Sidebar Image */}
      <div className="w-60 h-screen">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jjOO0Rl2k3z6ASbPh6It5WtGioFoIj.png"
          alt="INVENTORY360 Sidebar"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 overflow-auto bg-[#f5f5f5]">
        <div className="p-8 max-w-[1200px] mx-auto">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-[#1a1a1a]">Order Statistics</h1>
              <div className="flex">
                <div className="flex rounded-lg overflow-hidden border border-gray-200 mr-4">
                  <button
                    className={`px-4 py-2 text-sm ${timeFilter === "Today" ? "bg-white" : "bg-gray-100"}`}
                    onClick={() => setTimeFilter("Today")}
                  >
                    Today
                  </button>
                  <button
                    className={`px-4 py-2 text-sm ${timeFilter === "This Week" ? "bg-white" : "bg-gray-100"}`}
                    onClick={() => setTimeFilter("This Week")}
                  >
                    This Week
                  </button>
                  <button
                    className={`px-4 py-2 text-sm ${timeFilter === "This Month" ? "bg-white" : "bg-gray-100"}`}
                    onClick={() => setTimeFilter("This Month")}
                  >
                    This Month
                  </button>
                </div>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm"
                    value={outletFilter}
                    onChange={(e) => setOutletFilter(e.target.value)}
                  >
                    <option>All Outlets</option>
                    <option>S001</option>
                    <option>S002</option>
                    <option>S003</option>
                    <option>S004</option>
                    <option>S005</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Today's Sales"
                value={`$${stats.totalSales.toFixed(2)}`}
                change={12.5}
                icon={<DollarSign className="h-6 w-6 text-white" />}
                color="bg-blue-500"
              />
              <StatsCard
                title="Today's Orders"
                value={stats.totalOrders}
                change={17.8}
                icon={<ShoppingBag className="h-6 w-6 text-white" />}
                color="bg-cyan-500"
              />
              <StatsCard
                title="Today's Revenue"
                value={`$${(stats.totalSales * 0.7).toFixed(2)}`}
                change={-2.7}
                icon={<TrendingUp className="h-6 w-6 text-white" />}
                color="bg-rose-500"
              />
              <StatsCard
                title="Today's Visitors"
                value={stats.totalVisitors}
                change={10.9}
                icon={<Users className="h-6 w-6 text-white" />}
                color="bg-amber-500"
              />
            </div>

            {/* Order Overview and Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Order Overview</h2>
                <OrderOverviewChart data={data} />
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Inventory Analytics</h2>
                <InventoryRadarChart data={data} />
              </div>
            </div>

            {/* Sales Analytics and Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Sales Analytics</h2>
                  <div className="text-sm text-gray-500">Interactive metrics</div>
                </div>
                <SalesAnalyticsChart data={data} />
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Orders by Store</h2>
                <InventoryPieChart data={data} />
              </div>
            </div>

            {/* Transfer and Purchase Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransferCard />
              <PurchaseOrders />
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Inventory Details</h2>
              <InventoryTable data={data} storeFilter={outletFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

