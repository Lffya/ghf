"use client";
import React from 'react';
import { Truck } from 'lucide-react';

const DeliverySection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-6 mb-8 lg:mb-0">
            <div className="flex items-center space-x-3">
              <Truck size={32} />
              <h2 className="text-3xl font-bold">Delivery</h2>
            </div>
            
            <p className="text-xl font-medium">
              Order us online or contact us & get 25% off on your very first order!
            </p>
            
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Order now
            </button>
          </div>

          {/* Right Images */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80" 
                alt="Healthy meal 1" 
                className="w-48 h-48 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80" 
                alt="Healthy meal 2" 
                className="w-48 h-48 object-cover rounded-2xl shadow-lg absolute -top-4 -right-4 border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
