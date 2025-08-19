import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import LiveDemo from './LiveDemo';
import PricingSection from './PricingSection';
import ComparisonSection from './ComparisonSection';
import TestimonialsSection from './TestimonialsSection';
import ChatbotWidget from './ChatbotWidget';
import Footer from './Footer';

const LandingPage = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <LiveDemo />
      <PricingSection />
      <ComparisonSection />
      <TestimonialsSection />
      <Footer />
      <ChatbotWidget 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
      />
    </div>
  );
};

export default LandingPage;