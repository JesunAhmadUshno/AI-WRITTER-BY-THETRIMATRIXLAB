import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-announcement">
          <Sparkles size={16} />
          <span>NEW: Character Role-Playing AI</span>
        </div>
        
        <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
          AI Writing Assistant That Thinks Like You
        </h1>
        
        <p className="body-large" style={{ marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          From academic papers to creative content, our AI adapts to any writing style. 
          Play roles as professors, scientists, poets, and more. Write like never before.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Try Free Demo
            <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">
            Watch Demo Video
          </button>
        </div>
        
        <div className="mono-text" style={{ marginTop: '2rem' }}>
          500 FREE WORDS • NO CREDIT CARD • INSTANT ACCESS
        </div>
      </div>
    </section>
  );
};

export default HeroSection;