import { Plus, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"

export default function WalletPage() {
  return (
      <div className="p-8">
        <DashboardLayout><br />
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Wallet</h1>

        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-8 text-white mb-8 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <Info className="w-6 h-6 text-white/80" />
          </div>

          <div className="mb-6">
            <div className="bg-white/20 rounded-lg h-6 w-48 mb-4"></div>
            <div className="text-sm text-white/80 mb-2">Total Balance</div>
          </div>

          <Button className="bg-white text-green-600 hover:bg-gray-100">Add fund</Button>
        </div>

        {/* Wallet History */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Wallet History</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              All Transaction
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600">No transactions yet</h3>
            <p className="text-gray-500 mt-2">Your wallet transactions will appear here</p>
          </div>
        </div>
        </DashboardLayout>
      </div>
  )
}
