"use client";

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const DeliverySection = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/healthy-eats");
    // Scroll to top after navigating
    if (typeof window !== "undefined") {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center justify-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm w-fit mx-auto lg:mx-0">
            <Truck className="mr-2" size={20} />
            Fast & Fresh Delivery
          </div>

          <h2 className="text-4xl font-bold text-gray-800">
            Get Your First Order
          </h2>

          <p className="text-lg text-gray-600">
            Enjoy healthy and tasty meals delivered right to your doorstep. Order online or contact us directly to grab your discount!
          </p>

          <div>
            <button
              onClick={handleExploreClick}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Decorative Icon */}
        <div className="relative w-full max-w-md h-64 bg-green-100 rounded-3xl flex items-center justify-center">
          <Truck className="text-green-500 w-32 h-32 opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
