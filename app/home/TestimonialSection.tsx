"use client";
import { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Srikanth",
      location: "Bangalore",
      rating: 5,
      text: "I've App Is Perfect For Quick, Tasty Meals. It Saves Me Time, And The Food Is Always Flavorful!"
    },
    {
      id: 2,
      name: "Jihan Das",
      location: "Hyderabad",
      rating: 5,
      text: "Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. A Amet Ut Elenm Aliquam Consectetur."
    },
    {
      id: 3,
      name: "Udhyakumar",
      location: "Chennai",
      rating: 5,
      text: "I've Always Been Puff With This App Makes It Easy To Get Good, Fresh Food. My Gym Coach & And I'm Healthy."
    }
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center space-x-2 justify-center mb-8">
          <span className="text-green-500 text-2xl">💬</span>
          <h2 className="text-3xl font-bold text-gray-800">Testimonials</h2>
        </div>

        {/* Arrows + Card */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="bg-white shadow p-2 rounded-full hover:bg-green-100 transition"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="text-green-600" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-2xl transition-all duration-500 ease-in-out">
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4 justify-center">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-500 fill-current" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-600 mb-6 text-lg text-center leading-relaxed">
              &quot;{testimonials[current].text}&quot;
            </p>

            {/* Name & Location */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800">{testimonials[current].name}</h4>
              <p className="text-sm text-gray-500">{testimonials[current].location}</p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="bg-white shadow p-2 rounded-full hover:bg-green-100 transition"
            aria-label="Next testimonial"
          >
            <ArrowRight className="text-green-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
