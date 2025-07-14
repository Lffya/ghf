"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm">
              <span>🌱</span>
              <span>FRESH, WHOLESOME, AND DELICIOUS HEALTHY FOODS</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Fresh & Healthy
              <br />
              <span className="text-green-500">Food For You</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Discover nutritious meals crafted with care. From farm-fresh ingredients to your table, 
              we deliver health and taste in every bite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors">
                Order Now
              </button>
              <button className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-colors">
                Explore Menu
              </button>
            </div>
          </motion.div>

          {/* Right Content - Images from /public folder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image 
                  src="/images/hero1.jpg" 
                  alt="Healthy bowl" 
                  width={500}
                  height={192}
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                  priority
                />
                <Image 
                  src="/images/hero2.jpg" 
                  alt="Fresh salad" 
                  width={500}
                  height={128}
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                  priority
                />
              </div>
              <div className="pt-8">
                <Image 
                  src="/images/hero3.jpg" 
                  alt="Healthy meal" 
                  width={500}
                  height={256}
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
