"use client";
import Image from "next/image";

const PartnersSection = () => {
  const partners = [
    { name: "BigBasket", logo: "/images/bigbasket.png" },
    { name: "Swiggy", logo: "/images/swiggy.png" },
    { name: "Zomato", logo: "/images/zomato.png" },
    { name: "Amazon", logo: "/images/amazon.png" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex items-center space-x-2 mb-12 justify-center">
          <span className="text-green-500 text-2xl">🤝</span>
          <h2 className="text-3xl font-bold text-gray-800">Our Associate Partners</h2>
        </div>

        {/* Grid of Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition-all"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-3">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
