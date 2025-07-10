import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Healthy breakfast spread"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-400">About Us</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-green-600 mr-2">🏠</span>
                About Us
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Welcome To <strong className="text-green-600">Greenheap Agro Foods Pvt Ltd</strong>, Where Health Meets
                Heritage And Technology Connects You To Nature Goodness. Our Mission Is Simple Yet Profound: To
                Nourish Mankind With Organically Grown, Nutrient-Rich Food Straight From Our Farms To Your Table.
              </p>

              <p className="leading-relaxed">
                At Greenheap, We Believe That Eating Healthy Should Be Effortless And Enjoyable. That is Why We are
                Crafted A Unique Experience Through Our <strong>Web And Mobile Applications</strong>, Greenheap Foods,
                Where You Can Order Meals Tailored To Your Health Goals And Taste Preferences. Whether You Crave A Burst
                Of Traditional Flavors Or International Cuisines, Our Meals Are Crafted With Love In Kitchens That
                Preserve The Authentic Goodness Of Every Ingredient.
              </p>

              <p className="leading-relaxed">
                But We Don not Stop At Meals. From Organic Groceries To Wholesome Snacks And Revitalizing Health Drinks,
                Our Product Range Caters To Every Aspect Of Your Healthy Lifestyle. With Our{" "}
                <strong>Flexible Weekly And Monthly Subscription Plans</strong>, We Ensure Your Pantry Is Always Stocked
                With The Best Of Nature.
              </p>

              <p className="leading-relaxed">
                Greenheap Agro Foods Stands As A Bridge Between Age-Old Farming Traditions And Modern Culinary Needs.
                Our Commitment To Quality, Taste, And Health Drives Us To Grow, Cook, And Deliver With The Utmost Care,
                So You Can Embrace Wellness Without Compromise.
              </p>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 my-8">
                <p className="text-green-800 font-semibold text-lg">
                  Join Us On Our Journey To Bring The Farm To Your Fork, One Nutritious Bite At A Time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To nourish mankind with organically grown, nutrient-rich food straight from our farms to your table,
                    making healthy eating effortless and enjoyable.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To bridge age-old farming traditions with modern culinary needs, ensuring quality, taste, and health
                    in every product we deliver.
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Experience the Greenheap Difference</h3>
                <p className="text-lg mb-6">
                  Discover our range of organic products and healthy meal options designed for your wellness journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Explore Products
                  </Link>
                  <Link
                    href="/healthy-eats"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
