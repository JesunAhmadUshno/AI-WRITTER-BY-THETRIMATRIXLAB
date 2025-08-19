import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, CreditCard, Bell, Shield, Crown, ExternalLink } from 'lucide-react';

const AccountSettings = () => {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    timezone: 'UTC-8'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyReports: true,
    newFeatures: false,
    securityAlerts: true
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'account', label: 'Account Security', icon: <Shield size={16} /> },
    { id: 'billing', label: 'Billing & Plans', icon: <CreditCard size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Mock update - replace with real API call
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Mock password change - replace with real API call
    alert('Password changed successfully!');
  };

  const renderProfileSection = () => (
    <div className="voice-card" style={{ padding: '2rem' }}>
      <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Profile Information</h2>
      
      <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--accent-purple-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-purple-400)',
            fontSize: '2rem',
            fontWeight: 600
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <button className="btn-secondary" style={{ marginBottom: '0.5rem' }}>
              Change Avatar
            </button>
            <p className="caption" style={{ color: 'var(--text-muted)' }}>
              JPG, GIF or PNG. Max size 2MB.
            </p>
          </div>
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
          />
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
          />
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)',
              resize: 'vertical'
            }}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Timezone
          </label>
          <select
            value={profileData.timezone}
            onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
          >
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC+0">UTC</option>
            <option value="UTC+1">Central European Time</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
          Save Changes
        </button>
      </form>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="voice-card" style={{ padding: '2rem' }}>
      <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Account Security</h2>
      
      <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Current Password
          </label>
          <input
            type="password"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            New Password
          </label>
          <input
            type="password"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="body-medium" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Confirm New Password
          </label>
          <input
            type="password"
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--bg-card)'
            }}
            placeholder="Confirm new password"
          />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
          Update Password
        </button>
      </form>

      <div style={{ padding: '1.5rem', background: 'var(--accent-orange-200)', borderRadius: '0.5rem' }}>
        <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Two-Factor Authentication</h3>
        <p className="body-medium" style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Add an extra layer of security to your account with 2FA.
        </p>
        <button className="btn-secondary">
          Enable 2FA
        </button>
      </div>
    </div>
  );

  const renderBillingSection = () => (
    <div>
      <div className="voice-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Current Plan</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            padding: '0.5rem 1rem',
            background: user?.plan === 'free' ? 'var(--accent-grey-200)' : 'var(--accent-purple-200)',
            color: user?.plan === 'free' ? 'var(--text-primary)' : 'var(--accent-purple-400)',
            borderRadius: '0.5rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {user?.plan !== 'free' && <Crown size={16} />}
            {user?.plan} Plan
          </div>
          
          {user?.plan === 'free' && (
            <button className="btn-primary">
              <Crown size={16} style={{ marginRight: '0.5rem' }} />
              Upgrade to Pro
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <div className="heading-3">{user?.wordsUsed?.toLocaleString() || '0'}</div>
            <div className="body-small" style={{ color: 'var(--text-muted)' }}>Words Used This Month</div>
          </div>
          <div>
            <div className="heading-3">
              {user?.wordsLimit === -1 ? '∞' : user?.wordsLimit?.toLocaleString() || '500'}
            </div>
            <div className="body-small" style={{ color: 'var(--text-muted)' }}>Word Limit</div>
          </div>
          <div>
            <div className="heading-3">
              {user?.plan === 'free' ? '$0' : user?.plan === 'pro' ? '$29' : '$99'}
            </div>
            <div className="body-small" style={{ color: 'var(--text-muted)' }}>Monthly Cost</div>
          </div>
        </div>
      </div>

      {user?.plan !== 'free' && (
        <div className="voice-card" style={{ padding: '2rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Billing Information</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="body-medium">Next billing date</span>
              <span className="body-medium" style={{ fontWeight: 500 }}>February 15, 2024</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="body-medium">Payment method</span>
              <span className="body-medium" style={{ fontWeight: 500 }}>•••• •••• •••• 4242</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-secondary">
                Update Payment Method
              </button>
              <button className="btn-secondary">
                <ExternalLink size={16} style={{ marginRight: '0.5rem' }} />
                View Invoices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="voice-card" style={{ padding: '2rem' }}>
      <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Notification Preferences</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="body-medium" style={{ marginBottom: '0.25rem' }}>
                {key === 'emailUpdates' && 'Email Updates'}
                {key === 'weeklyReports' && 'Weekly Usage Reports'}
                {key === 'newFeatures' && 'New Features Announcements'}
                {key === 'securityAlerts' && 'Security Alerts'}
              </div>
              <div className="body-small" style={{ color: 'var(--text-muted)' }}>
                {key === 'emailUpdates' && 'Receive email notifications about your account'}
                {key === 'weeklyReports' && 'Get weekly summaries of your writing activity'}
                {key === 'newFeatures' && 'Be notified when we release new features'}
                {key === 'securityAlerts' && 'Important security notifications (recommended)'}
              </div>
            </div>
            
            <button
              onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
              style={{
                width: '48px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                background: value ? 'var(--text-primary)' : 'var(--border-primary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '2px',
                left: value ? '26px' : '2px',
                transition: 'left 0.2s ease'
              }}></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Settings Sidebar */}
      <div style={{ 
        width: '280px', 
        background: 'var(--bg-card)', 
        borderRight: '1px solid var(--border-light)',
        padding: '2rem 0',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h2 className="heading-2">Settings</h2>
        </div>
        
        <nav style={{ padding: '0 1rem' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                background: activeSection === section.id ? 'var(--accent-purple-200)' : 'transparent',
                border: 'none',
                borderRadius: '0.5rem',
                color: activeSection === section.id ? 'var(--accent-purple-400)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '0.25rem',
                fontSize: '0.875rem',
                fontWeight: activeSection === section.id ? 500 : 400
              }}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
        {activeSection === 'profile' && renderProfileSection()}
        {activeSection === 'account' && renderSecuritySection()}
        {activeSection === 'billing' && renderBillingSection()}
        {activeSection === 'notifications' && renderNotificationsSection()}
      </div>
    </div>
  );
};

export default AccountSettings;