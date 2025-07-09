"use client"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HealthyEatsPage() {
  const categories = [
    {
      title: "Beverage",
      subtitle: "Tea | Coffee | Cool drinks",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/beverage",
      slug: "beverage",
    },
    {
      title: "Fresh",
      subtitle: "Fruit & vegetables",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/fresh",
      slug: "fresh",
    },
    {
      title: "Nutrition Kids Foods for Ages 1...",
      subtitle: "Age (1 to 10)",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/kids-nutrition",
      slug: "kids-nutrition",
    },
    {
      title: "Healthy Teenage Foods for Age...",
      subtitle: "Age (10 to 20)",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/teenage-foods",
      slug: "teenage-foods",
    },
    {
      title: "Adult Balanced Foods for ages...",
      subtitle: "Age (20 to 40)",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/adult-balanced",
      slug: "adult-balanced",
    },
    {
      title: "Adults Aged Foods for ages 40...",
      subtitle: "Age (40+ Above)",
      image: "/placeholder.svg?height=200&width=300",
      href: "/healthy-eats/aged-foods",
      slug: "aged-foods",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">Choose Your Favourite Category</h1>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                className="pl-10 py-3 rounded-full border-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
