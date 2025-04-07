import { Package } from "lucide-react"

export default function PurchaseOrders() {
  // Sample product images (in a real app, these would be actual product images)
  const products = [
    { id: 1, name: "Headphones" },
    { id: 2, name: "Earbuds" },
    { id: 3, name: "Smartphone" },
    { id: 4, name: "Laptop" },
    { id: 5, name: "Tablet" },
    { id: 6, name: "Smartwatch" },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Purchase Orders</h2>
      <p className="text-sm text-gray-600 mb-4">You have 6 dispatched orders waiting to be received</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {products.map((product) => (
          <div key={product.id} className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
            <Package className="w-6 h-6 text-green-500" />
          </div>
        ))}
      </div>

      <button className="w-full mt-2 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors rounded">
        VIEW DISPATCHED ORDERS
      </button>
    </div>
  )
}

