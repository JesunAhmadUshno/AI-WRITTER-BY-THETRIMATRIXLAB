import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import WritingWorkspace from './WritingWorkspace';
import DocumentsList from './DocumentsList';
import AccountSettings from './AccountSettings';
import UsageStats from './UsageStats';
import { FileText, PenTool, Settings, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('workspace');

  const tabs = [
    { id: 'workspace', label: 'Writing Workspace', icon: <PenTool size={20} /> },
    { id: 'documents', label: 'My Documents', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Usage Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings size={20} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'workspace':
        return <WritingWorkspace />;
      case 'documents':
        return <DocumentsList />;
      case 'analytics':
        return <UsageStats />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <WritingWorkspace />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <DashboardHeader />
      
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{ 
          width: '280px', 
          background: 'var(--bg-card)', 
          borderRight: '1px solid var(--border-light)',
          padding: '2rem 0',
          overflowY: 'auto'
        }}>
          {/* Welcome Section */}
          <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
            <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>
              Welcome back, {user?.name}!
            </h2>
            <p className="body-small" style={{ color: 'var(--text-muted)' }}>
              Ready to create amazing content?
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
            <div className="voice-card accent-purple" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="body-small">Words Used</span>
                <span className="caption" style={{ color: 'var(--accent-purple-400)' }}>
                  {user?.plan?.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="heading-3">{user?.wordsUsed}</span>
                <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                  / {user?.wordsLimit === -1 ? '∞' : user?.wordsLimit}
                </span>
              </div>
              <div style={{ 
                height: '4px', 
                background: 'var(--border-light)', 
                borderRadius: '2px', 
                marginTop: '0.5rem' 
              }}>
                <div style={{ 
                  height: '100%', 
                  background: 'var(--accent-purple-400)', 
                  borderRadius: '2px',
                  width: user?.wordsLimit === -1 ? '20%' : `${(user?.wordsUsed / user?.wordsLimit) * 100}%`
                }}></div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ padding: '0 1rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  background: activeTab === tab.id ? 'var(--accent-purple-200)' : 'transparent',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: activeTab === tab.id ? 'var(--accent-purple-400)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab.id ? 500 : 400
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;