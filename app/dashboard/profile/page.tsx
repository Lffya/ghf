"use client"

import { Edit, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"

export default function ProfilePage() {
  return (
    
      <div className="p-8">
        <DashboardLayout><br />
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-800 mb-2">0</div>
            <div className="text-gray-600 text-sm">Orders</div>
            <Package className="w-6 h-6 text-orange-500 mx-auto mt-2" />
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">₹0.00</div>
            <div className="text-gray-600 text-sm">Amount In Wallet</div>
            <Wallet className="w-6 h-6 text-blue-600 mx-auto mt-2" />
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-800 mb-2">0</div>
            <div className="text-gray-600 text-sm">Loyalty Points</div>
            <Star className="w-6 h-6 text-yellow-500 mx-auto mt-2" />
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-800 mb-2">0</div>
            <div className="text-gray-600 text-sm">Products In Wishlist</div>
            <Heart className="w-6 h-6 text-red-500 mx-auto mt-2" />
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <p className="text-gray-800 mt-1">rahul</p>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <p className="text-gray-800 mt-1">bot</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-800 mt-1">+918220864901</p>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800 mt-1">patrick.2005.joshua@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Addresses */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Add Address
            </Button>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Address Found!</h3>
            <p className="text-gray-600">Please add your address for better experience!</p>
          </div>
        </div>
        </DashboardLayout>
      </div>
    
  )
}

// Import missing components
import { Package, Wallet, Star, Heart } from "lucide-react"
