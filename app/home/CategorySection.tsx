"use client";
import { Apple, Cake, Coffee, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

const CategorySection = () => {
  const categories = [
    {
      title: 'Beverages',
      subtitle: 'Tea | Coffee | Cool drinks',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80',
      color: 'from-orange-400 to-red-400'
    },
    {
      title: 'Foods',
      subtitle: 'Fruit & vegetables',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
      color: 'from-green-400 to-emerald-400'
    },
    {
      title: 'Nutritious Foods',
      subtitle: 'Age 1 to 50',
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80',
      color: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Healthy Beverages',
      subtitle: 'Age 10 to 200',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=300&q=80',
      color: 'from-blue-400 to-cyan-400'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-2xl">🤔</span>
            <h2 className="text-3xl font-bold text-gray-800">What&apos;s on Your Mind?</h2>
          </div>
          <button className="text-green-500 font-medium hover:text-green-600 transition-colors">
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <category.icon size={36} className="mb-4 text-white" />
              <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
              <p className="text-white text-xs mb-2">{category.subtitle}</p>
              <Image
                src={category.image}
                alt={category.title}
                width={300}
                height={180}
                className="rounded-xl w-full h-28 object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
