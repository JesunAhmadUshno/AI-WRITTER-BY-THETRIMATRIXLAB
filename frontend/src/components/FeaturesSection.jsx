import React from 'react';
import { PenTool, Users, Zap, BookOpen, MessageSquare, Palette } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <PenTool size={24} />,
      title: "Academic Writing",
      description: "Research papers, essays, and citations with scholarly precision",
      accent: "accent-blue"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Blog & Content",
      description: "Engaging blog posts and marketing content that converts",
      accent: "accent-purple"
    },
    {
      icon: <Zap size={24} />,
      title: "Email Writing",
      description: "Professional emails, newsletters, and communications",
      accent: "accent-orange"
    },
    {
      icon: <Palette size={24} />,
      title: "Tone Adjustment",
      description: "Switch between formal, casual, persuasive, and creative tones",
      accent: "accent-pink"
    },
    {
      icon: <Users size={24} />,
      title: "Character Roles",
      description: "Write as professors, scientists, poets, philosophers, and more",
      accent: "accent-green"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Content Rewriting",
      description: "Transform existing content with improved clarity and style",
      accent: "accent-grey"
    }
  ];

  return (
    <section id="features" style={{ padding: '5rem 0', background: 'var(--bg-section)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Powerful AI Writing Features
          </h2>
          <p className="body-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to create compelling content across all formats and styles
          </p>
        </div>
        
        <div className="voice-grid">
          {features.map((feature, index) => (
            <div key={index} className={`voice-card ${feature.accent} hover-lift`}>
              <div style={{ marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3 className="voice-card-title">{feature.title}</h3>
              <p className="voice-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;