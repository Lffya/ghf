import { Star, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"

export default function LoyaltyPage() {
  return (
    
      <div className="p-8">
        <DashboardLayout><br />
        {/* Loyalty Points Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-6xl font-bold mb-2">0</div>
          <div className="text-white/80">Total Point</div>
        </div>

        {/* How to use */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to use</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Convert your loyalty point to wallet money.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Minimum 0 points required to convert into currency
            </li>
          </ul>
        </div>

        {/* Point History */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Point History</h2>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600">No Data Found</h3>
          </div>
        </div>
        </DashboardLayout>
      </div>
  )
}
