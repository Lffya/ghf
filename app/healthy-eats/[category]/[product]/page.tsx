"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Universal product database for all healthy-eats categories
const productDatabase = {
  // Fresh Products
  "dragon-fruit": {
    name: "Dragon Fruit",
    price: 99.0,
    rating: 0.0,
    weight: "500 G",
    calories: "150 Kcal",
    gain: "150 Kcal",
    description: "GRACE FRESH DRAGON FRUIT",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [{ name: "Protein", per1: "60", per10: "600", per1serving: "60" }],
    ingredients: ["Nature"],
    category: "fresh",
  },
  carrot: {
    name: "Carrot",
    price: 118.0,
    rating: 4.2,
    weight: "1 KG",
    calories: "41 Kcal",
    gain: "41 Kcal",
    description: "FRESH ORGANIC CARROT",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin A", per1: "184%", per10: "1840%", per1serving: "184%" },
      { name: "Fiber", per1: "2.8g", per10: "28g", per1serving: "2.8g" },
    ],
    ingredients: ["Organic Carrot"],
    category: "fresh",
  },
  "orange-imported": {
    name: "Orange Imported",
    price: 289.0,
    rating: 4.5,
    weight: "1 KG",
    calories: "62 Kcal",
    gain: "62 Kcal",
    description: "FRESH IMPORTED ORANGES",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin C", per1: "92.9mg", per10: "929mg", per1serving: "92.9mg" },
      { name: "Folate", per1: "40mcg", per10: "400mcg", per1serving: "40mcg" },
    ],
    ingredients: ["Fresh Orange"],
    category: "fresh",
  },
  "banana-nendran": {
    name: "Banana Nendran",
    price: 94.0,
    rating: 4.3,
    weight: "1 KG",
    calories: "89 Kcal",
    gain: "89 Kcal",
    description: "FRESH NENDRAN BANANAS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Potassium", per1: "358mg", per10: "3580mg", per1serving: "358mg" },
      { name: "Vitamin B6", per1: "0.4mg", per10: "4mg", per1serving: "0.4mg" },
    ],
    ingredients: ["Fresh Banana"],
    category: "fresh",
  },
  capsicum: {
    name: "Capsicum/Kodamulkai",
    price: 59.0,
    rating: 4.0,
    weight: "500 G",
    calories: "31 Kcal",
    gain: "31 Kcal",
    description: "FRESH CAPSICUM",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin C", per1: "190mg", per10: "1900mg", per1serving: "190mg" },
      { name: "Vitamin A", per1: "3131IU", per10: "31310IU", per1serving: "3131IU" },
    ],
    ingredients: ["Fresh Capsicum"],
    category: "fresh",
  },
  "american-corn": {
    name: "American Corn",
    price: 56.0,
    rating: 4.1,
    weight: "500 G",
    calories: "86 Kcal",
    gain: "86 Kcal",
    description: "FRESH AMERICAN CORN",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "2.4g", per10: "24g", per1serving: "2.4g" },
      { name: "Magnesium", per1: "37mg", per10: "370mg", per1serving: "37mg" },
    ],
    ingredients: ["Fresh Corn"],
    category: "fresh",
  },
  "apple-fuji": {
    name: "Apple Fuji",
    price: 184.0,
    rating: 4.4,
    weight: "1 KG",
    calories: "52 Kcal",
    gain: "52 Kcal",
    description: "FRESH FUJI APPLES",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "2.4g", per10: "24g", per1serving: "2.4g" },
      { name: "Vitamin C", per1: "4.6mg", per10: "46mg", per1serving: "4.6mg" },
    ],
    ingredients: ["Fresh Apple"],
    category: "fresh",
  },
  "iceberg-lettuce": {
    name: "Iceberg Lettuce",
    price: 78.0,
    rating: 3.8,
    weight: "500 G",
    calories: "14 Kcal",
    gain: "14 Kcal",
    description: "FRESH ICEBERG LETTUCE",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin K", per1: "24.1mcg", per10: "241mcg", per1serving: "24.1mcg" },
      { name: "Folate", per1: "29mcg", per10: "290mcg", per1serving: "29mcg" },
    ],
    ingredients: ["Fresh Lettuce"],
    category: "fresh",
  },

  // Beverage Products
  "green-tea": {
    name: "Green Tea",
    price: 150.0,
    rating: 4.6,
    weight: "100 G",
    calories: "2 Kcal",
    gain: "2 Kcal",
    description: "PREMIUM ORGANIC GREEN TEA",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
      { name: "Caffeine", per1: "25mg", per10: "250mg", per1serving: "25mg" },
    ],
    ingredients: ["Organic Green Tea Leaves"],
    category: "beverage",
  },
  "filter-coffee": {
    name: "Filter Coffee",
    price: 120.0,
    rating: 4.5,
    weight: "250 G",
    calories: "5 Kcal",
    gain: "5 Kcal",
    description: "AUTHENTIC SOUTH INDIAN FILTER COFFEE",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Caffeine", per1: "95mg", per10: "950mg", per1serving: "95mg" },
      { name: "Antioxidants", per1: "Medium", per10: "High", per1serving: "Medium" },
    ],
    ingredients: ["Coffee Beans", "Chicory"],
    category: "beverage",
  },
  "herbal-tea": {
    name: "Herbal Tea",
    price: 180.0,
    rating: 4.3,
    weight: "100 G",
    calories: "1 Kcal",
    gain: "1 Kcal",
    description: "NATURAL HERBAL TEA BLEND",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
      { name: "Caffeine", per1: "0mg", per10: "0mg", per1serving: "0mg" },
    ],
    ingredients: ["Chamomile", "Peppermint", "Lemon Balm"],
    category: "beverage",
  },
  "cold-brew-coffee": {
    name: "Cold Brew Coffee",
    price: 200.0,
    rating: 4.7,
    weight: "500 ML",
    calories: "10 Kcal",
    gain: "10 Kcal",
    description: "SMOOTH COLD BREW COFFEE",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Caffeine", per1: "200mg", per10: "2000mg", per1serving: "200mg" },
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
    ],
    ingredients: ["Cold Brew Coffee", "Filtered Water"],
    category: "beverage",
  },
  "fresh-juice": {
    name: "Fresh Orange Juice",
    price: 80.0,
    rating: 4.2,
    weight: "300 ML",
    calories: "112 Kcal",
    gain: "112 Kcal",
    description: "FRESHLY SQUEEZED ORANGE JUICE",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin C", per1: "124mg", per10: "1240mg", per1serving: "124mg" },
      { name: "Folate", per1: "74mcg", per10: "740mcg", per1serving: "74mcg" },
    ],
    ingredients: ["Fresh Orange"],
    category: "beverage",
  },
  "coconut-water": {
    name: "Fresh Coconut Water",
    price: 60.0,
    rating: 4.4,
    weight: "300 ML",
    calories: "46 Kcal",
    gain: "46 Kcal",
    description: "NATURAL COCONUT WATER",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Potassium", per1: "600mg", per10: "6000mg", per1serving: "600mg" },
      { name: "Electrolytes", per1: "High", per10: "Very High", per1serving: "High" },
    ],
    ingredients: ["Fresh Coconut Water"],
    category: "beverage",
  },

  // Kids Nutrition Products
  "kids-healthy-mix": {
    name: "Kids Healthy Mix",
    price: 200.0,
    rating: 4.5,
    weight: "500 G",
    calories: "380 Kcal",
    gain: "380 Kcal",
    description: "NUTRITIOUS MIX FOR GROWING KIDS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "15g", per10: "150g", per1serving: "15g" },
      { name: "Calcium", per1: "200mg", per10: "2000mg", per1serving: "200mg" },
      { name: "Iron", per1: "5mg", per10: "50mg", per1serving: "5mg" },
    ],
    ingredients: ["Oats", "Almonds", "Dates", "Milk Powder"],
    category: "kids-nutrition",
  },
  "fruit-puree": {
    name: "Organic Fruit Puree",
    price: 120.0,
    rating: 4.3,
    weight: "200 G",
    calories: "80 Kcal",
    gain: "80 Kcal",
    description: "ORGANIC FRUIT PUREE FOR BABIES",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin C", per1: "30mg", per10: "300mg", per1serving: "30mg" },
      { name: "Fiber", per1: "3g", per10: "30g", per1serving: "3g" },
    ],
    ingredients: ["Organic Apple", "Organic Banana"],
    category: "kids-nutrition",
  },
  "kids-smoothie": {
    name: "Kids Vitamin Smoothie",
    price: 150.0,
    rating: 4.4,
    weight: "250 ML",
    calories: "120 Kcal",
    gain: "120 Kcal",
    description: "VITAMIN-RICH SMOOTHIE FOR KIDS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin A", per1: "500IU", per10: "5000IU", per1serving: "500IU" },
      { name: "Vitamin D", per1: "100IU", per10: "1000IU", per1serving: "100IU" },
    ],
    ingredients: ["Mango", "Yogurt", "Honey"],
    category: "kids-nutrition",
  },
  "healthy-cookies": {
    name: "Healthy Oat Cookies",
    price: 90.0,
    rating: 4.1,
    weight: "200 G",
    calories: "150 Kcal",
    gain: "150 Kcal",
    description: "HEALTHY OAT COOKIES FOR KIDS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "4g", per10: "40g", per1serving: "4g" },
      { name: "Protein", per1: "3g", per10: "30g", per1serving: "3g" },
    ],
    ingredients: ["Oats", "Whole Wheat", "Jaggery"],
    category: "kids-nutrition",
  },

  // Teenage Foods
  "protein-shake": {
    name: "Protein Shake",
    price: 250.0,
    rating: 4.6,
    weight: "300 ML",
    calories: "200 Kcal",
    gain: "200 Kcal",
    description: "HIGH PROTEIN SHAKE FOR TEENAGERS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "25g", per10: "250g", per1serving: "25g" },
      { name: "BCAA", per1: "5g", per10: "50g", per1serving: "5g" },
    ],
    ingredients: ["Whey Protein", "Banana", "Milk"],
    category: "teenage-foods",
  },
  "energy-bars": {
    name: "Natural Energy Bars",
    price: 180.0,
    rating: 4.4,
    weight: "100 G",
    calories: "250 Kcal",
    gain: "250 Kcal",
    description: "NATURAL ENERGY BARS",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Carbs", per1: "30g", per10: "300g", per1serving: "30g" },
      { name: "Protein", per1: "8g", per10: "80g", per1serving: "8g" },
    ],
    ingredients: ["Dates", "Nuts", "Seeds"],
    category: "teenage-foods",
  },
  "vitamin-drink": {
    name: "Vitamin C Drink",
    price: 120.0,
    rating: 4.2,
    weight: "250 ML",
    calories: "60 Kcal",
    gain: "60 Kcal",
    description: "VITAMIN C ENRICHED DRINK",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Vitamin C", per1: "200mg", per10: "2000mg", per1serving: "200mg" },
      { name: "Antioxidants", per1: "High", per10: "Very High", per1serving: "High" },
    ],
    ingredients: ["Orange", "Lemon", "Natural Flavors"],
    category: "teenage-foods",
  },
  "protein-bowl": {
    name: "Protein Power Bowl",
    price: 300.0,
    rating: 4.7,
    weight: "400 G",
    calories: "450 Kcal",
    gain: "450 Kcal",
    description: "PROTEIN-RICH POWER BOWL",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "35g", per10: "350g", per1serving: "35g" },
      { name: "Fiber", per1: "12g", per10: "120g", per1serving: "12g" },
    ],
    ingredients: ["Quinoa", "Chickpeas", "Vegetables", "Nuts"],
    category: "teenage-foods",
  },

  // Adult Balanced Foods
  "quinoa-salad": {
    name: "Quinoa Salad",
    price: 180.0,
    rating: 4.5,
    weight: "300 G",
    calories: "220 Kcal",
    gain: "220 Kcal",
    description: "NUTRITIOUS QUINOA SALAD",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "8g", per10: "80g", per1serving: "8g" },
      { name: "Fiber", per1: "5g", per10: "50g", per1serving: "5g" },
    ],
    ingredients: ["Quinoa", "Vegetables", "Olive Oil"],
    category: "adult-balanced",
  },
  "low-fat-yogurt": {
    name: "Low Fat Greek Yogurt",
    price: 100.0,
    rating: 4.3,
    weight: "200 G",
    calories: "100 Kcal",
    gain: "100 Kcal",
    description: "LOW FAT GREEK YOGURT",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "15g", per10: "150g", per1serving: "15g" },
      { name: "Probiotics", per1: "High", per10: "Very High", per1serving: "High" },
    ],
    ingredients: ["Low Fat Milk", "Live Cultures"],
    category: "adult-balanced",
  },
  "fiber-bowl": {
    name: "High Fiber Bowl",
    price: 220.0,
    rating: 4.4,
    weight: "350 G",
    calories: "280 Kcal",
    gain: "280 Kcal",
    description: "HIGH FIBER NUTRITION BOWL",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Fiber", per1: "15g", per10: "150g", per1serving: "15g" },
      { name: "Protein", per1: "12g", per10: "120g", per1serving: "12g" },
    ],
    ingredients: ["Brown Rice", "Beans", "Vegetables"],
    category: "adult-balanced",
  },
  "balanced-meal": {
    name: "Balanced Nutrition Meal",
    price: 280.0,
    rating: 4.6,
    weight: "450 G",
    calories: "400 Kcal",
    gain: "400 Kcal",
    description: "COMPLETE BALANCED MEAL",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Protein", per1: "20g", per10: "200g", per1serving: "20g" },
      { name: "Carbs", per1: "45g", per10: "450g", per1serving: "45g" },
      { name: "Fat", per1: "12g", per10: "120g", per1serving: "12g" },
    ],
    ingredients: ["Grains", "Legumes", "Vegetables", "Healthy Fats"],
    category: "adult-balanced",
  },

  // Aged Foods
  "heart-healthy-mix": {
    name: "Heart Healthy Mix",
    price: 220.0,
    rating: 4.5,
    weight: "400 G",
    calories: "320 Kcal",
    gain: "320 Kcal",
    description: "HEART HEALTHY NUTRITION MIX",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Omega-3", per1: "2g", per10: "20g", per1serving: "2g" },
      { name: "Fiber", per1: "8g", per10: "80g", per1serving: "8g" },
    ],
    ingredients: ["Oats", "Flaxseeds", "Walnuts"],
    category: "aged-foods",
  },
  "low-sodium-soup": {
    name: "Low Sodium Vegetable Soup",
    price: 150.0,
    rating: 4.2,
    weight: "300 ML",
    calories: "80 Kcal",
    gain: "80 Kcal",
    description: "LOW SODIUM VEGETABLE SOUP",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Sodium", per1: "200mg", per10: "2000mg", per1serving: "200mg" },
      { name: "Potassium", per1: "400mg", per10: "4000mg", per1serving: "400mg" },
    ],
    ingredients: ["Mixed Vegetables", "Low Sodium Broth"],
    category: "aged-foods",
  },
  "diabetic-meal": {
    name: "Diabetic Friendly Meal",
    price: 250.0,
    rating: 4.4,
    weight: "400 G",
    calories: "300 Kcal",
    gain: "300 Kcal",
    description: "DIABETIC FRIENDLY BALANCED MEAL",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Carbs", per1: "30g", per10: "300g", per1serving: "30g" },
      { name: "Fiber", per1: "10g", per10: "100g", per1serving: "10g" },
      { name: "Sugar", per1: "5g", per10: "50g", per1serving: "5g" },
    ],
    ingredients: ["Brown Rice", "Lean Protein", "Vegetables"],
    category: "aged-foods",
  },
  "calcium-rich-drink": {
    name: "Calcium Rich Drink",
    price: 120.0,
    rating: 4.3,
    weight: "250 ML",
    calories: "120 Kcal",
    gain: "120 Kcal",
    description: "CALCIUM ENRICHED DRINK",
    image: "/placeholder.svg?height=400&width=400",
    thumbnails: ["/placeholder.svg?height=80&width=80"],
    isVeg: true,
    nutritionTable: [
      { name: "Calcium", per1: "300mg", per10: "3000mg", per1serving: "300mg" },
      { name: "Vitamin D", per1: "100IU", per10: "1000IU", per1serving: "100IU" },
    ],
    ingredients: ["Milk", "Calcium Carbonate", "Vitamin D"],
    category: "aged-foods",
  },
}

// Function to get related products based on category
function getRelatedProducts(currentProductId: string, category: string) {
  const relatedProducts = Object.entries(productDatabase)
    .filter(
      ([id, product]) =>
        id !== currentProductId &&
        (product.category === category ||
          (category === "fresh" && ["fresh"].includes(product.category)) ||
          (category === "beverage" && ["beverage"].includes(product.category)) ||
          (category === "kids-nutrition" && ["kids-nutrition"].includes(product.category)) ||
          (category === "teenage-foods" && ["teenage-foods"].includes(product.category)) ||
          (category === "adult-balanced" && ["adult-balanced"].includes(product.category)) ||
          (category === "aged-foods" && ["aged-foods"].includes(product.category))),
    )
    .slice(0, 4)
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
  const category = params.category as string
  const productId = params.product as string
  const [quantity, setQuantity] = useState(1)

  const product = productDatabase[productId as keyof typeof productDatabase]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link href="/healthy-eats" className="text-green-600 hover:underline">
            Back to Healthy Eats
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = product.price * quantity
  const relatedProducts = getRelatedProducts(productId, category)

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
                <span className="font-semibold">₹{product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span>{product.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span>
                  {product.calories} - (Your Gain: {product.gain})
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">Add to cart</Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </Button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Nutrition Table */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="text-left p-3 font-semibold">NUTRITION NAME</th>
                  <th className="text-left p-3 font-semibold">PER ITEMS SERVING</th>
                  <th className="text-left p-3 font-semibold">PER 10 ITEMS SERVING</th>
                  <th className="text-left p-3 font-semibold">PER 1 ITEMS SERVING</th>
                </tr>
              </thead>
              <tbody>
                {product.nutritionTable.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.per1}</td>
                    <td className="p-3">{row.per10}</td>
                    <td className="p-3">{row.per1serving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">Ingredient</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-center text-gray-600">{product.ingredients.join(", ")}</p>
          </div>
        </div>

        {/* Related Foods */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-6">Related Foods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/healthy-eats/${category}/${relatedProduct.id}`} className="group">
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={150}
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
                          <Button size="sm" variant="ghost" className="p-1">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {relatedProduct.rating.toFixed(1)} ★
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
