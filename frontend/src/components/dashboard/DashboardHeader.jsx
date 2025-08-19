import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Crown, Settings } from 'lucide-react';

const DashboardHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getPlanBadge = () => {
    const plan = user?.plan || 'free';
    const colors = {
      free: { bg: 'var(--accent-grey-200)', text: 'var(--text-primary)' },
      pro: { bg: 'var(--accent-purple-200)', text: 'var(--accent-purple-400)' },
      enterprise: { bg: 'var(--accent-blue-200)', text: 'var(--accent-blue-400)' }
    };

    return (
      <div style={{ 
        background: colors[plan].bg, 
        color: colors[plan].text,
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        {plan === 'pro' || plan === 'enterprise' ? <Crown size={12} /> : null}
        {plan}
      </div>
    );
  };

  return (
    <header style={{ 
      height: '80px',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      <div>
        <h1 className="heading-2" style={{ margin: 0 }}>TheTrimatrixLab</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Upgrade Button for Free Users */}
        {user?.plan === 'free' && (
          <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            <Crown size={16} style={{ marginRight: '0.5rem' }} />
            Upgrade to Pro
          </button>
        )}

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--accent-grey-200)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--accent-purple-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple-400)',
              fontWeight: 600
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="body-small" style={{ fontWeight: 500 }}>{user?.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getPlanBadge()}
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              width: '200px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 1000
            }}>
              <div style={{ padding: '0.5rem' }}>
                <button
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--accent-grey-200)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <User size={16} />
                  Profile Settings
                </button>
                
                <button
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--accent-grey-200)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <Settings size={16} />
                  Account Settings
                </button>

                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.5rem 0' }}></div>
                
                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#DC2626',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#FEF2F2'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;