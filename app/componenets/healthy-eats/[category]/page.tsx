"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Heart, ShoppingCart, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Sample product data for different categories
const categoryData = {
  fresh: {
    title: "Fresh",
    filters: ["All", "Fruit", "vegetables"],
    products: [
      {
        id: "dragon-fruit",
        name: "Dragon fruit",
        price: 99.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "fruit",
      },
      {
        id: "carrot",
        name: "Carrot",
        price: 118.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "vegetables",
      },
      {
        id: "orange-imported",
        name: "Orange imported",
        price: 289.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "fruit",
      },
      {
        id: "banana-nendran",
        name: "Banana nendran",
        price: 94.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "fruit",
      },
      {
        id: "capsicum",
        name: "Capsicum/kodamulkai",
        price: 59.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "vegetables",
      },
      {
        id: "american-corn",
        name: "American corn",
        price: 56.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "vegetables",
      },
      {
        id: "apple-fuji",
        name: "Apple fuji",
        price: 184.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "fruit",
      },
      {
        id: "iceberg-lettuce",
        name: "Iceberg lettuce",
        price: 78.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "vegetables",
      },
    ],
  },
  beverage: {
    title: "Beverage",
    filters: ["All", "Tea", "Coffee", "Cool drinks"],
    products: [
      {
        id: "green-tea",
        name: "Green Tea",
        price: 150.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "tea",
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        price: 120.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "coffee",
      },
      {
        id: "herbal-tea",
        name: "Herbal Tea",
        price: 180.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "tea",
      },
      {
        id: "cold-brew-coffee",
        name: "Cold Brew Coffee",
        price: 200.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "coffee",
      },
      {
        id: "fresh-juice",
        name: "Fresh Orange Juice",
        price: 80.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "cool drinks",
      },
      {
        id: "coconut-water",
        name: "Fresh Coconut Water",
        price: 60.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "cool drinks",
      },
    ],
  },
  "kids-nutrition": {
    title: "Nutrition Kids Foods for Ages 1-10",
    filters: ["All", "Snacks", "Drinks", "Meals"],
    products: [
      {
        id: "kids-healthy-mix",
        name: "Kids Healthy Mix",
        price: 200.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "20-25 min",
        category: "meals",
      },
      {
        id: "fruit-puree",
        name: "Organic Fruit Puree",
        price: 120.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "snacks",
      },
      {
        id: "kids-smoothie",
        name: "Kids Vitamin Smoothie",
        price: 150.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "drinks",
      },
      {
        id: "healthy-cookies",
        name: "Healthy Oat Cookies",
        price: 90.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "snacks",
      },
    ],
  },
  "teenage-foods": {
    title: "Healthy Teenage Foods for Age 10-20",
    filters: ["All", "Protein", "Vitamins", "Energy"],
    products: [
      {
        id: "protein-shake",
        name: "Protein Shake",
        price: 250.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "protein",
      },
      {
        id: "energy-bars",
        name: "Natural Energy Bars",
        price: 180.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "energy",
      },
      {
        id: "vitamin-drink",
        name: "Vitamin C Drink",
        price: 120.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "vitamins",
      },
      {
        id: "protein-bowl",
        name: "Protein Power Bowl",
        price: 300.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "25-30 min",
        category: "protein",
      },
    ],
  },
  "adult-balanced": {
    title: "Adult Balanced Foods for ages 20-40",
    filters: ["All", "Balanced", "Low-fat", "High-fiber"],
    products: [
      {
        id: "quinoa-salad",
        name: "Quinoa Salad",
        price: 180.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "25-30 min",
        category: "balanced",
      },
      {
        id: "low-fat-yogurt",
        name: "Low Fat Greek Yogurt",
        price: 100.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "low-fat",
      },
      {
        id: "fiber-bowl",
        name: "High Fiber Bowl",
        price: 220.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "20-25 min",
        category: "high-fiber",
      },
      {
        id: "balanced-meal",
        name: "Balanced Nutrition Meal",
        price: 280.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "30-35 min",
        category: "balanced",
      },
    ],
  },
  "aged-foods": {
    title: "Adults Aged Foods for ages 40+",
    filters: ["All", "Low-sodium", "Heart-healthy", "Diabetic-friendly"],
    products: [
      {
        id: "heart-healthy-mix",
        name: "Heart Healthy Mix",
        price: 220.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "20-25 min",
        category: "heart-healthy",
      },
      {
        id: "low-sodium-soup",
        name: "Low Sodium Vegetable Soup",
        price: 150.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "15-20 min",
        category: "low-sodium",
      },
      {
        id: "diabetic-meal",
        name: "Diabetic Friendly Meal",
        price: 250.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "25-30 min",
        category: "diabetic-friendly",
      },
      {
        id: "calcium-rich-drink",
        name: "Calcium Rich Drink",
        price: 120.0,
        image: "/placeholder.svg?height=200&width=200",
        isVeg: true,
        deliveryTime: "10-15 min",
        category: "heart-healthy",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categoryInfo = categoryData[category as keyof typeof categoryData]

  if (!categoryInfo) {
    return <div>Category not found</div>
  }

  const filteredProducts = categoryInfo.products.filter((product) => {
    const matchesFilter = selectedFilter === "All" || product.category === selectedFilter.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="max-w-md mx-auto relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Products..."
                className="pl-10 py-3 rounded-lg border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location and Branch Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-700">
                  <span className="mr-2">🌿</span>
                  <span className="text-sm">If Food Is Unavailable? Look At Other Branches</span>
                </div>
                <ArrowRight className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-right text-sm text-gray-600 mt-2">37, 4th Avenue, Ashok Nagar, Chennai - 600083</div>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Search Result For Near By Branch <span className="text-green-600">{categoryInfo.title}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryInfo.filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/healthy-eats/${category}/${product.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded px-2 py-1">
                      <span className="text-xs text-gray-600">{product.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 flex-1">{product.name}</h3>
                      {product.isVeg && (
                        <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="p-1">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
