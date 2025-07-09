"use client";
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const TopRatedSection = () => {
  const foods = [
    {
      id: 1,
      name: 'Mixed Vegetable Bowl',
      rating: 4.8,
      price: 7500.99,
      originalPrice: 8500.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      isVeg: true,
      discount: 12
    },
    {
      id: 2,
      name: 'Herbal Rice Platter',
      rating: 4.6,
      price: 5500.99,
      originalPrice: 6500.99,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80',
      isVeg: true,
      discount: 15
    },
    {
      id: 3,
      name: 'Spicy Curry Combo',
      rating: 4.9,
      price: 8500.99,
      originalPrice: 9500.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      isVeg: true,
      discount: 10
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-2xl">🌟</span>
            <h2 className="text-3xl font-bold text-gray-800">Top-Rated Foods</h2>
          </div>
          
          {/* Filter Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
              Sort By
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-500 hover:text-green-500 transition-colors">
              Veg
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-500 hover:text-green-500 transition-colors">
              Non-Veg
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-500 hover:text-green-500 transition-colors">
              Rating 4+
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-500 hover:text-green-500 transition-colors">
              Fast Delivery
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-medium hover:border-green-500 hover:text-green-500 transition-colors">
              Previous
            </button>
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div key={food.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {food.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {food.discount}% OFF
                  </div>
                )}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
                {food.isVeg && (
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-green-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium">{food.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600">₹{food.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">₹{food.originalPrice.toFixed(2)}</span>
                  </div>
                  <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedSection;
