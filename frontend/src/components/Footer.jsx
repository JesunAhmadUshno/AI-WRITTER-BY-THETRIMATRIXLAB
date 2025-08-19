import React from 'react';
import { Mail, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--text-primary)', color: 'white', padding: '3rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Company Info */}
          <div>
            <h3 className="heading-2" style={{ color: 'white', marginBottom: '1rem' }}>
              TheTrimatrixLab
            </h3>
            <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
              Advanced AI writing assistant with character role-playing capabilities. 
              Write like never before with our intelligent content generation.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', transition: 'color 0.2s ease' }}>
                <Twitter size={20} />
              </a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', transition: 'color 0.2s ease' }}>
                <Linkedin size={20} />
              </a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)', transition: 'color 0.2s ease' }}>
                <Github size={20} />
              </a>
              <a href="mailto:support@trimatrixlab.com" style={{ color: 'rgba(255, 255, 255, 0.8)', transition: 'color 0.2s ease' }}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="heading-3" style={{ color: 'white', marginBottom: '1rem' }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#features" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Features
              </a>
              <a href="#demo" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Live Demo
              </a>
              <a href="#pricing" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Pricing
              </a>
              <a href="#comparison" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Comparisons
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                API Documentation
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="heading-3" style={{ color: 'white', marginBottom: '1rem' }}>
              Resources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Writing Guide
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Character Roles Guide
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Academic Writing Tips
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Blog
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Help Center
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="heading-3" style={{ color: 'white', marginBottom: '1rem' }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                About Us
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Careers
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Contact
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Privacy Policy
              </a>
              <a href="#" className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem', 
            borderRadius: '1rem', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}
        >
          <h4 className="heading-3" style={{ color: 'white', marginBottom: '0.5rem' }}>
            Stay Updated
          </h4>
          <p className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Get the latest updates on new features and writing tips
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '2rem',
                minWidth: '200px',
                fontSize: '0.875rem'
              }}
            />
            <button 
              className="btn-secondary" 
              style={{ 
                background: 'white', 
                color: 'var(--text-primary)',
                border: 'none'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
            © 2024 TheTrimatrixLab. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;