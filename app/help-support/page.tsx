import Image from "next/image"
import { MapPin, Mail } from "lucide-react"

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Customer support illustration"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Need any help ?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Communicate with our support team to get proper guidance to your questionaries
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Call Us */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">24</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Call Us</h3>
            <a href="tel:+918190049994" className="text-gray-600 hover:text-green-600 transition-colors text-lg">
              +918190049994
            </a>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
            <div className="text-gray-600 text-sm leading-relaxed">
              <p className="font-medium">GREENHEAP AGRO FOODS PVT LTD,</p>
              <p>NO:1/PL922, 66th Street, 11th Sector,</p>
              <p>K.K Nagar, Chennai, Tamil Nadu-600078</p>
            </div>
          </div>

          {/* Mail Us */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Mail Us</h3>
            <a href="mailto:contact@greenheapfoods.in" className="text-gray-600 hover:text-green-600 transition-colors">
              contact@greenheapfoods.in
            </a>
          </div>
        </div>

        {/* Additional Support Information */}
        <div className="max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How We Can Help You</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Order Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Order placement assistance</li>
                <li>• Order tracking and updates</li>
                <li>• Delivery schedule changes</li>
                <li>• Payment and billing queries</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Product Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Nutritional information</li>
                <li>• Ingredient details</li>
                <li>• Allergen information</li>
                <li>• Product availability</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Account Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Profile updates</li>
                <li>• Subscription management</li>
                <li>• Password reset</li>
                <li>• Account deactivation</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Technical Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Website navigation help</li>
                <li>• Mobile app assistance</li>
                <li>• Payment gateway issues</li>
                <li>• General troubleshooting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="max-w-2xl mx-auto mt-12 bg-green-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="font-medium">Phone Support</p>
              <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Email Support</p>
              <p>24/7 - We will respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
