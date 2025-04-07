import { Home, DollarSign, BarChart2, ShoppingBag, Package, Users, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-60 bg-[#1a1a1a] text-white flex flex-col h-screen">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wide">INVENTORY360</h1>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <DollarSign className="w-5 h-5 mr-3" />
              <span>Sell</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-between px-6 py-3 text-gray-300 hover:bg-gray-800">
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 mr-3" />
                <span>Reporting</span>
              </div>
              <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <ShoppingBag className="w-5 h-5 mr-3" />
              <span>Catalog</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <Package className="w-5 h-5 mr-3" />
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <Users className="w-5 h-5 mr-3" />
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800">
              <Settings className="w-5 h-5 mr-3" />
              <span>Setup</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
            S
          </div>
          <div>
            <p className="text-sm font-medium">Sasha Merkel</p>
          </div>
        </div>
      </div>
    </div>
  )
}

