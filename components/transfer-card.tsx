import { Package, ArrowRight } from "lucide-react"

export default function TransferCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Transfer</h2>
      <p className="text-sm text-gray-600 mb-4">You have 1 transfer waiting to be received</p>

      <div className="flex items-center">
        <div className="w-12 h-12 mr-4 bg-blue-100 rounded-md flex items-center justify-center">
          <Package className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Beats Studio Pro</p>
          <div className="flex items-center text-sm text-gray-600">
            <span>Texas warehouse</span>
            <ArrowRight className="w-3 h-3 mx-2" />
            <span>IT Dept.</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">20 pcs</div>
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded">
        VIEW TRANSFER
      </button>
    </div>
  )
}

