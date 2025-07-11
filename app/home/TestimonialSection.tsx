"use client";
import { Star } from 'lucide-react';
import Image from "next/image";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Srikanth',
      location: 'Bangalore',
      rating: 5,
      text: "I've App Is Perfect For Quick, Tasty Meals. It Saves Me Time, And The Food Is Always Flavorful!",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      name: 'Jihan Das',
      rating: 5,
      text: "Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. A Amet Ut Elenm Aliquam Consectetur.",
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      name: 'Udhyakumar',
      rating: 5,
      text: "I've Always Been Puff With This App Makes It Easy To Get Good, Fresh Food. My Gym Coach & And I'm Healthy.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-green-500 text-2xl">💬</span>
          <h2 className="text-3xl font-bold text-gray-800">Testimonial</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  {testimonial.location && (
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  )}
                </div>
              </div>

              {/* Decorative Wave */}
              <div className="mt-4 flex justify-end">
                <div className="w-16 h-8 bg-green-500 rounded-full opacity-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
