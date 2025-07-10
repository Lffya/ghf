import { Copy, Share2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"

export default function ReferralPage() {
  return (
      <div className="p-8">
        <DashboardLayout><br />
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Referral Illustration */}
          <div className="text-center mb-8">
            <div className="w-64 h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <div className="text-6xl">💰</div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Refer your code to your friends and get <span className="font-bold">Get ₹0.00 on joining</span> for every
              referral!
            </h2>
          </div>

          {/* Referral Code */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg px-6 py-3">
                <span className="text-gray-500">Your referral code will appear here</span>
              </div>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">OR SHARE</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-400 hover:bg-blue-500 rounded-full w-12 h-12 p-0">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 rounded-full w-12 h-12 p-0">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-800 rounded-full w-12 h-12 p-0">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button className="bg-gray-600 hover:bg-gray-700 rounded-full w-12 h-12 p-0">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">?</span>
              </div>
              <h3 className="font-semibold text-gray-800">How you it works?</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <p className="text-gray-600">Invite and share your code to your friends & family members</p>
              </div>
            </div>
          </div>
        </div>
        </DashboardLayout>
      </div>
  )
}
