import React from 'react';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying out our AI writing assistant',
      features: [
        '500 words per month',
        'Basic character roles',
        'Email support',
        'Standard templates',
        'Basic tone adjustment'
      ],
      buttonText: 'Start Free',
      buttonStyle: 'btn-secondary',
      accent: 'accent-grey'
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For serious writers and content creators',
      features: [
        '50,000 words per month',
        'All character roles',
        'Priority support',
        'Advanced templates',
        'Full tone control',
        'Plagiarism checker',
        'Export to multiple formats',
        'API access'
      ],
      buttonText: 'Start Pro',
      buttonStyle: 'btn-primary',
      accent: 'accent-purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For teams and organizations',
      features: [
        'Unlimited words',
        'Custom character roles',
        '24/7 dedicated support',
        'Custom templates',
        'Advanced AI models',
        'Team collaboration',
        'White-label solution',
        'Custom integrations',
        'Analytics dashboard'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'btn-primary',
      accent: 'accent-blue'
    }
  ];

  return (
    <section id="pricing" style={{ padding: '5rem 0', background: 'var(--bg-section)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="body-large">
            Choose the plan that fits your writing needs
          </p>
        </div>

        <div className="ai-grid" style={{ maxWidth: '1000px' }}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`voice-card ${plan.accent} hover-lift`}
              style={{ 
                position: 'relative',
                border: plan.popular ? '2px solid var(--text-primary)' : 'none',
                padding: '2rem'
              }}
            >
              {plan.popular && (
                <div 
                  style={{ 
                    position: 'absolute',
                    top: '-0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--text-primary)',
                    color: 'white',
                    padding: '0.25rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Star size={12} />
                  MOST POPULAR
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 className="heading-2" style={{ marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <span className="heading-hero" style={{ fontSize: '2.5rem' }}>{plan.price}</span>
                  <span className="body-medium" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                </div>
                <p className="body-small" style={{ color: 'var(--text-muted)' }}>{plan.description}</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        marginBottom: '0.75rem' 
                      }}
                    >
                      <Check size={16} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                      <span className="body-small">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={plan.buttonStyle} style={{ width: '100%' }}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p className="mono-text">
            ALL PLANS INCLUDE • 7-DAY FREE TRIAL • CANCEL ANYTIME • NO SETUP FEES
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;