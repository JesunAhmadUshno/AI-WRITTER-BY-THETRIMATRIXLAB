import React from 'react';
import { Check, X, Zap } from 'lucide-react';

const ComparisonSection = () => {
  const features = [
    { name: 'Character Role-Playing', trimatrix: true, jasper: false, copyai: false },
    { name: 'Academic Writing Focus', trimatrix: true, jasper: false, copyai: false },
    { name: 'Unlimited Word Count (Enterprise)', trimatrix: true, jasper: true, copyai: false },
    { name: 'Tone Adjustment', trimatrix: true, jasper: true, copyai: true },
    { name: 'Blog Post Generation', trimatrix: true, jasper: true, copyai: true },
    { name: 'Email Writing', trimatrix: true, jasper: true, copyai: true },
    { name: 'API Access', trimatrix: true, jasper: true, copyai: true },
    { name: 'Plagiarism Checker', trimatrix: true, jasper: true, copyai: false },
    { name: 'Custom Templates', trimatrix: true, jasper: true, copyai: true },
    { name: 'Multi-language Support', trimatrix: true, jasper: true, copyai: true },
    { name: 'White-label Solution', trimatrix: true, jasper: false, copyai: false },
    { name: '24/7 Support', trimatrix: true, jasper: false, copyai: false }
  ];

  const pricing = [
    { plan: 'Free Plan', trimatrix: '$0 (500 words)', jasper: '$0 (10,000 words)', copyai: '$0 (2,000 words)' },
    { plan: 'Pro Plan', trimatrix: '$29 (50,000 words)', jasper: '$49 (unlimited)', copyai: '$36 (unlimited)' },
    { plan: 'Enterprise', trimatrix: '$99 (unlimited)', jasper: '$125+ (unlimited)', copyai: '$186+ (unlimited)' }
  ];

  return (
    <section id="comparison" style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            How We Compare
          </h2>
          <p className="body-large">
            See why TheTrimatrixLab stands out from the competition
          </p>
        </div>

        {/* Features Comparison */}
        <div className="voice-card" style={{ marginBottom: '3rem', overflow: 'auto' }}>
          <h3 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Feature Comparison
          </h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 500 }}>Features</th>
                <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 600, color: 'var(--accent-purple-400)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Zap size={16} />
                    TheTrimatrixLab
                  </div>
                </th>
                <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 500 }}>Jasper</th>
                <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 500 }}>Copy.ai</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td className="body-medium" style={{ padding: '1rem' }}>{feature.name}</td>
                  <td style={{ textAlign: 'center', padding: '1rem' }}>
                    {feature.trimatrix ? (
                      <Check size={20} style={{ color: '#10B981' }} />
                    ) : (
                      <X size={20} style={{ color: '#EF4444' }} />
                    )}
                  </td>
                  <td style={{ textAlign: 'center', padding: '1rem' }}>
                    {feature.jasper ? (
                      <Check size={20} style={{ color: '#10B981' }} />
                    ) : (
                      <X size={20} style={{ color: '#EF4444' }} />
                    )}
                  </td>
                  <td style={{ textAlign: 'center', padding: '1rem' }}>
                    {feature.copyai ? (
                      <Check size={20} style={{ color: '#10B981' }} />
                    ) : (
                      <X size={20} style={{ color: '#EF4444' }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Comparison */}
        <div className="voice-card">
          <h3 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Pricing Comparison
          </h3>
          
          <div className="ai-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {pricing.map((item, index) => (
              <div key={index} className="voice-card accent-grey">
                <h4 className="heading-3" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  {item.plan}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="body-small" style={{ fontWeight: 600, color: 'var(--accent-purple-400)' }}>
                      TheTrimatrixLab
                    </span>
                    <span className="body-medium" style={{ fontWeight: 500 }}>{item.trimatrix}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="body-small">Jasper</span>
                    <span className="body-medium">{item.jasper}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="body-small">Copy.ai</span>
                    <span className="body-medium">{item.copyai}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
            <Zap size={16} />
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;