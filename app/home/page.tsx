"use client";
import AboutSection from './AboutSection';
import CategorySection from './CategorySection';
import DeliverySection from './DeliverySection';
import HeroSection from './HeroSection';
import NewsletterSection from './NewsletterSection';
import PartnersSection from './PartnersSection';
import TestimonialSection from './TestimonialSection';
import TopRatedSection from './TopRatedSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <AboutSection />
        <CategorySection />
        <TopRatedSection />
        <DeliverySection />
        <TestimonialSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomePage;
