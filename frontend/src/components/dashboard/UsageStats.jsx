import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, TrendingUp, FileText, Clock, Target, Calendar } from 'lucide-react';

const UsageStats = () => {
  const { user } = useAuth();

  // Mock analytics data
  const stats = {
    totalWords: 8450,
    documentsCreated: 23,
    averageWordsPerDocument: 367,
    timeSpent: 240, // minutes
    favoriteRole: 'Professor',
    favoriteTask: 'Academic Essay',
    weeklyUsage: [120, 340, 280, 150, 420, 380, 290],
    roleUsage: [
      { role: 'Professor', count: 8, percentage: 35 },
      { role: 'Scientist', count: 5, percentage: 22 },
      { role: 'Poet', count: 4, percentage: 17 },
      { role: 'Student', count: 3, percentage: 13 },
      { role: 'Philosopher', count: 2, percentage: 9 },
      { role: 'Gamer', count: 1, percentage: 4 }
    ],
    taskTypes: [
      { task: 'Academic Essay', count: 9, percentage: 39 },
      { task: 'Blog Post', count: 6, percentage: 26 },
      { task: 'Creative Writing', count: 4, percentage: 17 },
      { task: 'Professional Email', count: 3, percentage: 13 },
      { task: 'Marketing Copy', count: 1, percentage: 5 }
    ]
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'accent-blue' }) => (
    <div className={`voice-card ${color} hover-lift`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span className="body-small" style={{ color: 'var(--text-muted)' }}>{title}</span>
        {icon}
      </div>
      <div className="heading-1" style={{ marginBottom: '0.25rem' }}>{value}</div>
      {subtitle && <div className="caption" style={{ color: 'var(--text-muted)' }}>{subtitle}</div>}
    </div>
  );

  const ProgressBar = ({ label, value, max, color = 'var(--accent-blue-400)' }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span className="body-small">{label}</span>
        <span className="body-small" style={{ fontWeight: 500 }}>{value}%</span>
      </div>
      <div style={{ 
        height: '8px', 
        background: 'var(--border-light)', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          background: color, 
          borderRadius: '4px',
          width: `${value}%`,
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>Usage Analytics</h1>
        <p className="body-medium" style={{ color: 'var(--text-muted)' }}>
          Track your AI writing productivity and patterns
        </p>
      </div>

      {/* Overview Stats */}
      <div className="ai-grid" style={{ marginBottom: '3rem' }}>
        <StatCard
          title="Total Words Generated"
          value={stats.totalWords.toLocaleString()}
          subtitle="This month"
          icon={<FileText size={20} style={{ color: 'var(--accent-blue-400)' }} />}
          color="accent-blue"
        />
        
        <StatCard
          title="Documents Created"
          value={stats.documentsCreated}
          subtitle="Across all types"
          icon={<BarChart3 size={20} style={{ color: 'var(--accent-purple-400)' }} />}
          color="accent-purple"
        />
        
        <StatCard
          title="Time Spent Writing"
          value={`${Math.floor(stats.timeSpent / 60)}h ${stats.timeSpent % 60}m`}
          subtitle="Active writing time"
          icon={<Clock size={20} style={{ color: 'var(--accent-orange-400)' }} />}
          color="accent-orange"
        />
        
        <StatCard
          title="Average Per Document"
          value={stats.averageWordsPerDocument}
          subtitle="words per document"
          icon={<Target size={20} style={{ color: 'var(--accent-green-400)' }} />}
          color="accent-green"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Weekly Usage Chart */}
        <div className="voice-card">
          <h3 className="heading-3" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} />
            Weekly Usage
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem', height: '200px', marginBottom: '1rem' }}>
            {stats.weeklyUsage.map((value, index) => {
              const maxValue = Math.max(...stats.weeklyUsage);
              const height = (value / maxValue) * 160;
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '100%',
                      height: `${height}px`,
                      background: 'var(--accent-blue-400)',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '0.5rem',
                      transition: 'height 0.3s ease'
                    }}
                    title={`${value} words`}
                  ></div>
                  <span className="caption">{days[index]}</span>
                </div>
              );
            })}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <span className="body-small" style={{ color: 'var(--text-muted)' }}>
              Daily word generation over the past week
            </span>
          </div>
        </div>

        {/* Character Role Usage */}
        <div className="voice-card">
          <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Character Role Usage</h3>
          
          {stats.roleUsage.map((item, index) => (
            <ProgressBar
              key={index}
              label={item.role}
              value={item.percentage}
              color={`var(--accent-${['blue', 'purple', 'pink', 'orange', 'green', 'grey'][index]}-400)`}
            />
          ))}
          
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--accent-blue-200)', borderRadius: '0.5rem' }}>
            <span className="body-small">
              <strong>Most Used:</strong> {stats.favoriteRole} ({stats.roleUsage[0].count} documents)
            </span>
          </div>
        </div>

        {/* Task Types Distribution */}
        <div className="voice-card">
          <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Writing Task Distribution</h3>
          
          {stats.taskTypes.map((item, index) => (
            <ProgressBar
              key={index}
              label={item.task}
              value={item.percentage}
              color={`var(--accent-${['purple', 'blue', 'pink', 'orange', 'green'][index]}-400)`}
            />
          ))}
          
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--accent-purple-200)', borderRadius: '0.5rem' }}>
            <span className="body-small">
              <strong>Most Popular:</strong> {stats.favoriteTask} ({stats.taskTypes[0].count} documents)
            </span>
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="voice-card">
          <h3 className="heading-3" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} />
            Monthly Goals
          </h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="body-medium">Words Goal</span>
              <span className="body-medium" style={{ fontWeight: 500 }}>
                {stats.totalWords.toLocaleString()} / 10,000
              </span>
            </div>
            <ProgressBar value={85} color="var(--accent-green-400)" />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="body-medium">Documents Goal</span>
              <span className="body-medium" style={{ fontWeight: 500 }}>
                {stats.documentsCreated} / 30
              </span>
            </div>
            <ProgressBar value={77} color="var(--accent-purple-400)" />
          </div>
          
          <div style={{ 
            padding: '1rem', 
            background: 'var(--accent-green-200)', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div className="heading-3" style={{ color: 'var(--accent-green-400)', marginBottom: '0.25rem' }}>
              7 days left
            </div>
            <div className="body-small">to reach your monthly goals</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;