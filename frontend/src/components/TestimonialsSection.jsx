import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../mock';

const TestimonialsSection = () => {
  return (
    <section style={{ padding: '5rem 0', background: 'var(--bg-section)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Loved by Writers Worldwide
          </h2>
          <p className="body-large">
            See what our users say about TheTrimatrixLab AI Writing Assistant
          </p>
        </div>

        <div className="voice-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="voice-card accent-grey hover-lift">
              <div style={{ marginBottom: '1rem' }}>
                <Quote size={24} style={{ color: 'var(--accent-purple-400)' }} />
              </div>
              
              <p className="body-medium" style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{testimonial.content}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 className="heading-3" style={{ marginBottom: '0.25rem' }}>
                    {testimonial.name}
                  </h4>
                  <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="voice-card accent-purple" style={{ display: 'inline-block', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="heading-1" style={{ color: 'var(--accent-purple-400)' }}>50,000+</div>
                <div className="caption">ACTIVE WRITERS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="heading-1" style={{ color: 'var(--accent-purple-400)' }}>10M+</div>
                <div className="caption">WORDS GENERATED</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="heading-1" style={{ color: 'var(--accent-purple-400)' }}>4.9</div>
                <div className="caption">AVERAGE RATING</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="heading-1" style={{ color: 'var(--accent-purple-400)' }}>120+</div>
                <div className="caption">COUNTRIES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;