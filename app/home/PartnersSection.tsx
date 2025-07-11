"use client";
import Image from "next/image";

const PartnersSection = () => {
  const partners = [
    {
      name: 'BigBasket',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Swiggy',
      logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Zomato',
      logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Amazon',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-green-500 text-2xl">🤝</span>
          <h2 className="text-3xl font-bold text-gray-800">Our Associate Partners</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="font-medium text-gray-700">{partner.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
