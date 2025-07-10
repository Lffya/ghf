import { Search } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"

export default function CouponsPage() {
  return (
    
      <div className="p-8">
        <DashboardLayout>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">My Coupons</h1>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600">No Coupon Found</h3>
          </div>
        </div>
        </DashboardLayout>
      </div>
    
  )
}
