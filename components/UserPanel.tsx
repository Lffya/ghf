"use client"

import { useState } from "react"
import { User, Package, Ticket, Heart, Wallet, Star, Users, MessageCircle, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserPanel({ isOpen, onClose }: UserPanelProps) {
  const [activeMessageTab, setActiveMessageTab] = useState("Seller")

  const menuItems = [
    { icon: User, label: "My Profile", color: "text-blue-500" },
    { icon: Package, label: "Orders", color: "text-orange-500" },
    { icon: Ticket, label: "Coupons", color: "text-green-500" },
    { icon: Heart, label: "Wish List", color: "text-red-500" },
    { icon: Wallet, label: "Wallets", color: "text-blue-600" },
    { icon: Star, label: "Loyalty Points", color: "text-yellow-500" },
    { icon: Users, label: "Referral Code", color: "text-gray-500" },
    { icon: MessageCircle, label: "Inbox", color: "text-green-600" },
  ]

  const messageTabs = ["Seller", "Delivery Man", "Nutrition"]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white z-50 shadow-2xl flex">
        {/* Close Button */}
        <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-4 right-4 z-10">
          <X className="w-5 h-5" />
        </Button>

        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-8">
            <Avatar className="w-16 h-16 bg-gray-400">
              <AvatarFallback className="bg-gray-400 text-white text-xl">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-600">Joined Jul 8th 25</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors group"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-gray-700 group-hover:text-gray-900 font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area - Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages Header */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 bg-green-50 border-green-200 focus:border-green-400"
              />
            </div>

            {/* Message Tabs */}
            <div className="flex space-x-1">
              {messageTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMessageTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeMessageTab === tab
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
          <div className="flex-1 flex items-center justify-center bg-green-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Select And Start Messaging!</p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="absolute bottom-6 right-6">
            <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
