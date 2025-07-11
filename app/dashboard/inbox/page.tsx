"use client"

import { useState } from "react"
import { Search, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/DashboardLayout"

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("Seller")

  const tabs = ["Seller", "Delivery Man", "Nutrition"]

  return (
    
      <div className="p-8">
        <DashboardLayout><br />
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 bg-green-50 border-green-200 focus:border-green-400"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Content */}
          <div className="p-8 bg-green-50 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Select And Start Messaging!</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </button>
        </div>
        </DashboardLayout>
      </div>
    
  )
}
