"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, Package, Ticket, Heart, Wallet, Star, Users, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: User, label: "My Profile", href: "/dashboard/profile", color: "text-blue-500" },
    { icon: Package, label: "Orders", href: "/dashboard/orders", color: "text-orange-500" },
    { icon: Ticket, label: "Coupons", href: "/dashboard/coupons", color: "text-green-500" },
    { icon: Heart, label: "Wish List", href: "/dashboard/wishlist", color: "text-red-500" },
    { icon: Wallet, label: "Wallets", href: "/dashboard/wallet", color: "text-blue-600" },
    { icon: Star, label: "Loyalty Points", href: "/dashboard/loyalty", color: "text-yellow-500" },
    { icon: Users, label: "Referral Code", href: "/dashboard/referral", color: "text-gray-500" },
    { icon: MessageCircle, label: "Inbox", href: "/dashboard/inbox", color: "text-green-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen p-6">
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
              <Link
                key={index}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors group ${
                  pathname === item.href ? "bg-green-50 border-r-4 border-green-500" : "hover:bg-gray-50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span
                  className={`font-medium ${
                    pathname === item.href ? "text-green-600" : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
