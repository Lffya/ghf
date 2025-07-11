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

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image 
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80" 
                  alt="Healthy bowl" 
                  width={500}
                  height={192}
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                  priority
                />
                <Image 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" 
                  alt="Fresh salad" 
                  width={500}
                  height={128}
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                  priority
                />
              </div>
              <div className="pt-8">
                <Image 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=500&q=80" 
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

      {/* Scroll Down Indicator */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-gray-400 text-xs mb-1">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
