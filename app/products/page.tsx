"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Heart, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filters = ["All", "Masalas", "Organic", "Food additives", "Tea", "Coffee", "Powder", "Jam", "Snacks", "Mixing"]

  const products = [
    {
      id: "best-food",
      name: "Best food",
      price: 10.0,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
    {
      id: "dia-powder",
      name: "Dia Powder",
      price: 100,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
    {
      id: "virudhunagar-special",
      name: "Virudhunagar Special",
      price: 100.0,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
    {
      id: "filter-murukku",
      name: "Filter Murukku",
      price: 100.0,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
    {
      id: "filter-thattai",
      name: "Filter Thattai",
      price: 100.0,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
    {
      id: "green-tea",
      name: "Green Tea",
      price: 100.0,
      originalPrice: null,
      discount: null,
      image: "/placeholder.svg?height=200&width=200",
      isVeg: true,
      deliveryTime: "10-20 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Search Result for Near by branch &quot;Products&quot;
            </h1>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Search Products..." className="pl-10 py-3 rounded-lg border-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
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
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Link href={`/products/${product.id}`} className="block">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-blue-600">₹{product.discount}</Badge>
                    )}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <span className="text-xs text-green-600">{product.deliveryTime}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="absolute bottom-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 flex-1">
                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                      </h3>
                      {product.isVeg && (
                        <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                        {typeof product.originalPrice === 'number' && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{(product.originalPrice as number).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="p-1 group/heart" aria-label="Add to wishlist">
                          <Heart className="w-4 h-4 group-hover/heart:text-red-500 transition-colors duration-150" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 border border-green-600 text-green-600 hover:bg-green-50 group/cart"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                              const idx = cart.findIndex((item: { id: string }) => item.id === product.id);
                              if (idx > -1) {
                                cart[idx].qty += 1;
                              } else {
                                cart.push({
                                  id: product.id,
                                  name: product.name,
                                  image: product.image,
                                  price: product.price,
                                  qty: 1,
                                });
                              }
                              localStorage.setItem("cart", JSON.stringify(cart));
                              window.dispatchEvent(
                                new StorageEvent("storage", { key: "cart", newValue: JSON.stringify(cart) })
                              );
                            }
                          }}
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4 group-hover/cart:text-green-700 transition-colors duration-150" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
