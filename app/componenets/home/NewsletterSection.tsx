
import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-400 via-green-500 to-yellow-400 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail size={32} />
            <h2 className="text-3xl font-bold">Never Miss An Update</h2>
          </div>
          
          <p className="text-xl max-w-2xl mx-auto">
            Sign up for our newsletter and learn about the latest health tips, 
            new menu items and special promotions.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="flex rounded-full overflow-hidden shadow-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white text-green-600 px-8 py-4 font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
