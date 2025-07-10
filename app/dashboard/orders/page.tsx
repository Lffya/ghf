"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Ongoing")

  const tabs = ["Ongoing", "Previous", "Subscription"]

  return (
      <div className="p-8">
        <DashboardLayout><br />
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8 pt-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600">No Order found</h3>
            </div>
          </div>
        </div>
        </DashboardLayout>
      </div>
  )
}
