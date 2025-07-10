"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Universal product database for main Products section
const productsDatabase = {
  // Masalas & Spices
  "best-food": {
    name: "Best Food",
    price: 10.0,
    rating: 0.0,
    weight: "100 G",
    calories: "50 Kcal",
    gain: "50 Kcal",
    description: "Premium quality food product",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "5g", per10: "50g", per1serving: "5g" },
      { name: "Carbs", per1: "8g", per10: "80g", per1serving: "8g" },
    ],
    ingredients: ["Natural Ingredients"],
    category: "masalas",
  },
  "dia-powder": {
    name: "Dia Powder",
    price: 100.0,
    rating: 4.2,
    weight: "250 G",
    calories: "320 Kcal",
    gain: "320 Kcal",
    description: "Premium diabetic-friendly powder",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "12g", per10: "120g", per1serving: "12g" },
      { name: "Sugar", per1: "2g", per10: "20g", per1serving: "2g" },
    ],
    ingredients: ["Organic Powder", "Natural Sweeteners"],
    category: "powder",
  },
  "virudhunagar-special": {
    name: "Virudhunagar Special",
    price: 100.0,
    rating: 4.5,
    weight: "200 G",
    calories: "280 Kcal",
    gain: "280 Kcal",
    description: "Traditional Virudhunagar specialty",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "8g", per10: "80g", per1serving: "8g" },
      { name: "Fat", per1: "15g", per10: "150g", per1serving: "15g" },
    ],
    ingredients: ["Traditional Spices", "Rice Flour"],
    category: "snacks",
  },
  "filter-murukku": {
    name: "Filter Murukku",
    price: 100.0,
    rating: 4.3,
    weight: "250 G",
    calories: "450 Kcal",
    gain: "450 Kcal",
    description: "Crispy traditional murukku",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Carbs", per1: "60g", per10: "600g", per1serving: "60g" },
      { name: "Fat", per1: "20g", per10: "200g", per1serving: "20g" },
    ],
    ingredients: ["Rice Flour", "Urad Dal", "Spices"],
    category: "snacks",
  },
  "filter-thattai": {
    name: "Filter Thattai",
    price: 100.0,
    rating: 4.1,
    weight: "200 G",
    calories: "380 Kcal",
    gain: "380 Kcal",
    description: "Crunchy traditional thattai",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Carbs", per1: "55g", per10: "550g", per1serving: "55g" },
      { name: "Protein", per1: "6g", per10: "60g", per1serving: "6g" },
    ],
    ingredients: ["Rice Flour", "Chana Dal", "Curry Leaves"],
    category: "snacks",
  },
  "green-tea": {
    name: "Green Tea",
    price: 100.0,
    rating: 4.6,
    weight: "100 G",
    calories: "2 Kcal",
    gain: "2 Kcal",
    description: "Premium organic green tea",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
      { name: "Caffeine", per1: "25mg", per10: "250mg", per1serving: "25mg" },
    ],
    ingredients: ["Organic Green Tea Leaves"],
    category: "tea",
  },
  "herbal-filter-coffee": {
    name: "Herbal Filter Coffee",
    price: 100.0,
    rating: 4.4,
    weight: "250 G",
    calories: "5 Kcal",
    gain: "5 Kcal",
    description: "Aromatic herbal filter coffee",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Caffeine", per1: "80mg", per10: "800mg", per1serving: "80mg" },
      { name: "Antioxidants", per1: "Medium", per10: "High", per1serving: "Medium" },
    ],
    ingredients: ["Coffee Beans", "Herbal Extracts"],
    category: "coffee",
  },
  "herbal-natural-tea": {
    name: "Herbal Natural Tea",
    price: 70.0,
    rating: 4.2,
    weight: "100 G",
    calories: "1 Kcal",
    gain: "1 Kcal",
    description: "Natural herbal tea blend",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
      { name: "Caffeine", per1: "0mg", per10: "0mg", per1serving: "0mg" },
    ],
    ingredients: ["Chamomile", "Mint", "Lemon Grass"],
    category: "tea",
  },
  "karam-peanut": {
    name: "Karam Peanut",
    price: 120.0,
    rating: 4.3,
    weight: "200 G",
    calories: "567 Kcal",
    gain: "567 Kcal",
    description: "Spicy karam peanuts",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "26g", per10: "260g", per1serving: "26g" },
      { name: "Fat", per1: "49g", per10: "490g", per1serving: "49g" },
    ],
    ingredients: ["Peanuts", "Red Chili", "Spices"],
    category: "snacks",
  },
  "sweet-peanut": {
    name: "Sweet Peanut",
    price: 100.0,
    rating: 4.0,
    weight: "200 G",
    calories: "520 Kcal",
    gain: "520 Kcal",
    description: "Sweet coated peanuts",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "24g", per10: "240g", per1serving: "24g" },
      { name: "Sugar", per1: "15g", per10: "150g", per1serving: "15g" },
    ],
    ingredients: ["Peanuts", "Jaggery", "Cardamom"],
    category: "snacks",
  },
  "multi-masala-laddu": {
    name: "Multi Masala Laddu",
    price: 100.0,
    rating: 4.4,
    weight: "250 G",
    calories: "400 Kcal",
    gain: "400 Kcal",
    description: "Traditional multi masala laddu",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "12g", per10: "120g", per1serving: "12g" },
      { name: "Fat", per1: "18g", per10: "180g", per1serving: "18g" },
    ],
    ingredients: ["Gram Flour", "Ghee", "Mixed Spices"],
    category: "snacks",
  },
  "nuts-laddu": {
    name: "Nuts Laddu",
    price: 100.0,
    rating: 4.5,
    weight: "200 G",
    calories: "480 Kcal",
    gain: "480 Kcal",
    description: "Nutritious nuts laddu",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "15g", per10: "150g", per1serving: "15g" },
      { name: "Healthy Fats", per1: "22g", per10: "220g", per1serving: "22g" },
    ],
    ingredients: ["Mixed Nuts", "Dates", "Ghee"],
    category: "snacks",
  },
  "peanut-jam": {
    name: "Peanut Jam",
    price: 115.0,
    rating: 4.1,
    weight: "300 G",
    calories: "350 Kcal",
    gain: "350 Kcal",
    description: "Creamy peanut jam",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "20g", per10: "200g", per1serving: "20g" },
      { name: "Fat", per1: "25g", per10: "250g", per1serving: "25g" },
    ],
    ingredients: ["Peanuts", "Sugar", "Salt"],
    category: "jam",
  },
  "vita-powder": {
    name: "Vita Powder",
    price: 90.0,
    rating: 4.3,
    weight: "200 G",
    calories: "300 Kcal",
    gain: "300 Kcal",
    description: "Vitamin enriched powder",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamins", per1: "High", per10: "Very High", per1serving: "High" },
      { name: "Minerals", per1: "Medium", per10: "High", per1serving: "Medium" },
    ],
    ingredients: ["Vitamin Mix", "Minerals", "Natural Flavors"],
    category: "powder",
  },
  "vegetables-nuts-jam": {
    name: "Vegetables Nuts Jam",
    price: 140.0,
    rating: 4.2,
    weight: "250 G",
    calories: "280 Kcal",
    gain: "280 Kcal",
    description: "Healthy vegetables and nuts jam",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "8g", per10: "80g", per1serving: "8g" },
      { name: "Protein", per1: "6g", per10: "60g", per1serving: "6g" },
    ],
    ingredients: ["Mixed Vegetables", "Nuts", "Natural Preservatives"],
    category: "jam",
  },
  "dia-powder-special": {
    name: "Dia Powder Special",
    price: 100.0,
    rating: 4.4,
    weight: "300 G",
    calories: "250 Kcal",
    gain: "250 Kcal",
    description: "Special diabetic powder blend",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "15g", per10: "150g", per1serving: "15g" },
      { name: "Sugar", per1: "1g", per10: "10g", per1serving: "1g" },
    ],
    ingredients: ["Diabetic-friendly Mix", "Natural Sweeteners"],
    category: "powder",
  },
  "maga-masala-laddu": {
    name: "Maga Masala Laddu",
    price: 75.0,
    rating: 4.0,
    weight: "200 G",
    calories: "420 Kcal",
    gain: "420 Kcal",
    description: "Traditional maga masala laddu",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "10g", per10: "100g", per1serving: "10g" },
      { name: "Carbs", per1: "45g", per10: "450g", per1serving: "45g" },
    ],
    ingredients: ["Gram Flour", "Spices", "Ghee"],
    category: "snacks",
  },
}

// Function to get related products
function getRelatedProducts(currentProductId: string) {
  const relatedProducts = Object.entries(productsDatabase)
    .filter(([id]) => id !== currentProductId)
    .slice(0, 5)
    .map(([id, product]) => ({
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      deliveryTime: "15-20 min",
      isVeg: product.isVeg,
      rating: product.rating,
    }))

  return relatedProducts
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.product as string
  const [quantity, setQuantity] = useState(1)

  const product = productsDatabase[productId as keyof typeof productsDatabase]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link href="/products" className="text-green-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = product.price * quantity
  const relatedProducts = getRelatedProducts(productId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex gap-2">
              {product.thumbnails.map((thumb, index) => (
                <div key={index} className="w-16 h-16 bg-white rounded border overflow-hidden">
                  <Image
                    src={thumb || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                {product.isVeg && (
                  <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {product.rating.toFixed(1)} ★
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Starts From:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 py-1"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="px-3 py-1 text-sm font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-1 bg-green-600 text-white hover:bg-green-700"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("add-to-cart", {
                      detail: {
                        id: productId,
                        name: product.name,
                        price: product.price,
                        qty: quantity,
                        image: product.image,
                      },
                    })
                  );
                }}
              >
                Add to cart
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-black text-white hover:bg-gray-800">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-50"
                aria-label="Add to cart"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("add-to-cart", {
                      detail: {
                        id: productId,
                        name: product.name,
                        price: product.price,
                        qty: quantity,
                        image: product.image,
                      },
                    })
                  );
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-black-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Foods */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-6">Related Foods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group">
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded px-2 py-1">
                        <span className="text-xs text-gray-600">{relatedProduct.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm flex-1">{relatedProduct.name}</h4>
                        {relatedProduct.isVeg && (
                          <div className="w-3 h-3 border border-green-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600 text-sm">₹{relatedProduct.price.toFixed(2)}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="p-1">
                            <Heart className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1"
                            onClick={() => {
                              window.dispatchEvent(
                                new CustomEvent("add-to-cart", {
                                  detail: {
                                    id: relatedProduct.id,
                                    name: relatedProduct.name,
                                    price: relatedProduct.price,
                                    qty: 1,
                                    image: relatedProduct.image,
                                  },
                                })
                              );
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
