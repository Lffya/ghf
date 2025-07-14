"use client";
import { Leaf } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-500">
              <Leaf size={24} />
              <h2 className="text-3xl font-bold">About Us</h2>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-800">
              Welcome To Greenheap Agro Foods Pvt Ltd
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              Greenheap Agro Foods Pvt Ltd, offers Smart, Health, 
              Heritage and Technology Connect We To Nature&apos;s Goodness. Our 
              Mission Is Simple Yet Profound: To Bring You Locally 
              Grown, Nutrient-Rich Food Straight From Our Farms To Your Table.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              At Greenheap, we believe that healthy eating should be accessible, 
              convenient, and delicious. Our commitment to sustainable farming 
              practices ensures that every product meets the highest standards 
              of quality and nutrition.
            </p>
            
            <Link href="/about-us">
              <button className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors">
                Read More
              </button>
            </Link>
          </div>

          {/* Right Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Image 
                src="/images/about1.jpg" 
                alt="Fresh produce" 
                width={500}
                height={256}
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <div className="space-y-4">
                <Image 
                  src="/images/about2.jpg" 
                  alt="Healthy cooking" 
                  width={500}
                  height={128}
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                />
                <Image 
                  src="/images/about3.jpg" 
                  alt="Fresh vegetables" 
                  width={500}
                  height={112}
                  className="rounded-2xl shadow-lg w-full h-28 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
