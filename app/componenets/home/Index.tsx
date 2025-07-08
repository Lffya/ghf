"use client";
import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import CategorySection from './CategorySection';
import TopRatedSection from './TopRatedSection';
import DeliverySection from './DeliverySection';
import TestimonialSection from './TestimonialSection';
import PartnersSection from './PartnersSection';
import NewsletterSection from './NewsletterSection';

const Index = () => {
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

export default Index;
