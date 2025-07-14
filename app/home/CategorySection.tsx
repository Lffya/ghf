"use client";
import { useRouter } from 'next/navigation';
import { Apple, Cake, Coffee, UtensilsCrossed } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/healthy-eats');
  };

  const categories = [
    {
      title: 'Beverages',
      subtitle: 'Tea | Coffee | Cool drinks',
      icon: Coffee,
      image: '/images/categories1.jpg',
      href: '/healthy-eats/beverage',
    },
    {
      title: 'Fruits',
      subtitle: 'Fruit & vegetables',
      icon: Apple,
      image: '/images/categories2.jpg',
      href: '/healthy-eats/fresh',
    },
    {
      title: 'Nutritious Foods',
      subtitle: 'Age 1 to 50',
      icon: UtensilsCrossed,
      image: '/images/categories3.jpg',
      href: '/healthy-eats/kids-nutrition',
    },
    {
      title: 'Healthy Beverages',
      subtitle: 'Age 10 to 200',
      icon: Cake,
      image: '/images/categories4.jpg',
      href: '/healthy-eats/teenage-foods',
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
          <button
            onClick={handleExploreClick}
            className="text-green-500 font-medium hover:text-green-600 transition-colors"
          >
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link href={category.href} key={index}>
              <div className="group cursor-pointer">
                <div className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <Image 
                    src={category.image} 
                    alt={category.title}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center bg-white">
                    <category.icon size={32} className="mb-2 mx-auto text-green-600" />
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.subtitle}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
