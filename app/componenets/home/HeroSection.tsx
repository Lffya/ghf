
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
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
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80" 
                  alt="Healthy bowl" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" 
                  alt="Fresh salad" 
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                />
              </div>
              <div className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=500&q=80" 
                  alt="Healthy meal" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">5★</span>
                </div>
                <div>
                  <p className="font-semibold">1000+ Reviews</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
