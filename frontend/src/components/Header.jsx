import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="header-nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo">
          <h2 className="heading-2" style={{ margin: 0, fontWeight: 600 }}>TheTrimatrixLab</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="body-medium hover:text-gray-600 transition-colors">Features</a>
          <a href="#demo" className="body-medium hover:text-gray-600 transition-colors">Demo</a>
          <a href="#pricing" className="body-medium hover:text-gray-600 transition-colors">Pricing</a>
          <a href="#comparison" className="body-medium hover:text-gray-600 transition-colors">Compare</a>
        </nav>

        <div className="nav-actions hidden md:flex items-center gap-4">
          <button className="btn-secondary">Sign In</button>
          <button className="btn-primary">Start Free</button>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <nav className="container py-4 flex flex-col gap-4">
            <a href="#features" className="body-medium">Features</a>
            <a href="#demo" className="body-medium">Demo</a>
            <a href="#pricing" className="body-medium">Pricing</a>
            <a href="#comparison" className="body-medium">Compare</a>
            <div className="flex flex-col gap-2 mt-4">
              <button className="btn-secondary">Sign In</button>
              <button className="btn-primary">Start Free</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;