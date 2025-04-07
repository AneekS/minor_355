// Function to parse CSV data
export function parseCSVData(csvData: string) {
  if (!csvData) return []

  const lines = csvData.trim().split("\n")
  if (lines.length <= 1) return []

  const headers = lines[0].split(",")

  return lines.slice(1).map((line) => {
    const values = line.split(",")
    const item: any = {
      // Initialize with default values to prevent undefined errors
      productId: "",
      category: "",
      storeId: "",
      region: "",
      inventoryLevel: 0,
      unitsSold: 0,
      price: 0,
      demandForecast: 0,
    }

    headers.forEach((header, index) => {
      // Convert header to camelCase
      const key = header
        .trim()
        .replace(/\s+/g, "")
        .replace(/\/(.)/g, (_, char) => char.toUpperCase())
      const firstChar = key.charAt(0).toLowerCase()
      const camelCaseKey = firstChar + key.slice(1)

      // Handle potential undefined values
      if (values[index] !== undefined) {
        item[camelCaseKey] = values[index]?.trim() || ""
      }
    })

    return item
  })
}

// Function to aggregate data for charts
export function aggregateData(data: any[]) {
  // Group by date
  const groupedByDate = data.reduce((acc, item) => {
    const date = item.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  // Calculate daily sales
  const dailySales = Object.keys(groupedByDate)
    .map((date) => {
      const items = groupedByDate[date]
      const totalSales = items.reduce((sum, item) => {
        return sum + Number(item.unitsSold || 0) * Number(item.price || 0)
      }, 0)

      return {
        date,
        totalSales: Math.round(totalSales * 100) / 100,
      }
    })
    .sort((a, b) => {
      // Sort by date (assuming format is DD-MM-YYYY)
      const [dayA, monthA, yearA] = a.date.split("-").map(Number)
      const [dayB, monthB, yearB] = b.date.split("-").map(Number)
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
    })

  // Group by month
  const groupedByMonth = data.reduce((acc, item) => {
    if (!item.date) return acc

    const [day, month, year] = item.date.split("-")
    const monthYear = `${month}-${year}`
    if (!acc[monthYear]) {
      acc[monthYear] = []
    }
    acc[monthYear].push(item)
    return acc
  }, {})

  // Calculate monthly sales
  const monthlySales = Object.keys(groupedByMonth)
    .map((monthYear) => {
      const items = groupedByMonth[monthYear]
      const totalSales = items.reduce((sum, item) => {
        return sum + Number(item.unitsSold || 0) * Number(item.price || 0)
      }, 0)

      return {
        monthYear,
        totalSales: Math.round(totalSales * 100) / 100,
      }
    })
    .sort((a, b) => {
      // Sort by month-year
      const [monthA, yearA] = a.monthYear.split("-")
      const [monthB, yearB] = b.monthYear.split("-")
      return new Date(`${yearA}-${monthA}-01`).getTime() - new Date(`${yearB}-${monthB}-01`).getTime()
    })

  return { dailySales, monthlySales }
}

// Function to calculate stats
export function calculateStats(data: any[], storeFilter: string) {
  // Filter by store if needed
  const filteredData = storeFilter === "All Outlets" ? data : data.filter((item) => item.storeId === storeFilter)

  // Calculate total sales
  const totalSales = filteredData.reduce((sum, item) => {
    return sum + Number(item.unitsSold || 0) * Number(item.price || 0)
  }, 0)

  // Calculate last month comparison (for demo purposes, using 10% of total)
  const lastMonthComparison = totalSales * 0.1

  // Calculate average sale value
  const totalTransactions = filteredData.reduce((sum, item) => sum + Number(item.unitsSold || 0), 0)
  const averageSaleValue = totalTransactions > 0 ? totalSales / totalTransactions : 0

  // Calculate average items per sale (for demo purposes)
  const averageItemsPerSale = 2.8

  // Calculate items last month comparison
  const itemsLastMonthComparison = 0.95

  return {
    totalSales,
    lastMonthComparison,
    averageSaleValue,
    averageItemsPerSale,
    itemsLastMonthComparison,
  }
}

